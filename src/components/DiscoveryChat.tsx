import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  X,
  ArrowRight,
  Mic,
  MicOff,
  Phone,
  MessageSquare,
  Download,
  Calendar,
} from "lucide-react";
import { getGeminiClient, SYSTEM_INSTRUCTION, DISCOVERY_RESPONSE_SCHEMA } from "../lib/gemini";
import { Type, Modality } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../lib/i18n";
import { ChatMessage } from "./discovery/ChatMessage";
import { Message, DiscoveryChatProps } from "./discovery/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ChatHeader } from "./discovery/ChatHeader";
import { VoiceInterface } from "./discovery/VoiceInterface";
import { StrategicBrief as StrategicBriefComponent } from "./discovery/StrategicBrief";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import { VoiceVisualizer } from "./discovery/VoiceVisualizer";

const parseGeminiResponse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    try {
      // Try to extract JSON from markdown block
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        return JSON.parse(match[1]);
      }
      // Try to find anything that looks like a JSON object
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.error("Failed to parse extracted JSON:", err, text);
    }
    console.error("JSON parse error:", e, text);
    return { text: text || "I'm processing that information..." };
  }
};

export function DiscoveryChat({
  isOpen,
  onClose,
  initialContext,
  onBookCall,
}: DiscoveryChatProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [genUIData, setGenUIData] = useLocalStorage("chat_genUIData", { budget: "", timeline: "" });
  const [contextData, setContextData] = useLocalStorage("chat_contextData", {
    name: "",
    email: "",
    company: "",
    website: "",
    linkedin: "",
  });
  const [multiSelectData, setMultiSelectData] = useLocalStorage<{
    selected: string[];
    custom: string;
  }>("chat_multiSelectData", { selected: [], custom: "" });
  const [isListening, setIsListening] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(10);

  const [chatMode, setChatMode] = useState<"text" | "voice">("text");
  const [voiceName, setVoiceName] = useState("Zephyr");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [strategicBrief, setStrategicBrief] = useLocalStorage<string | null>("chat_strategicBrief", null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [liveCaptions, setLiveCaptions] = useState<string>("");
  const briefRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    window.print();
  };

  const liveSessionRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleListening = async () => {
    if (isListening) {
      mediaRecorderRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          stream.getTracks().forEach((track) => track.stop());

          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64data = (reader.result as string).split(",")[1];
            setIsLoading(true);
            try {
              const client = getGeminiClient();
              if (!client) return;
              const response = await client.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: [
                  { inlineData: { data: base64data, mimeType: "audio/webm" } },
                  {
                    text: "Transcribe this audio accurately. Return ONLY the transcription, nothing else.",
                  },
                ],
              });
              if (response.text) {
                setInput(
                  (prev) => prev + (prev ? " " : "") + response.text.trim(),
                );
              }
            } catch (e) {
              console.error("Transcription error", e);
            } finally {
              setIsLoading(false);
            }
          };
        };

        mediaRecorder.start();
        setIsListening(true);
      } catch (e) {
        console.error("Mic access denied", e);
      }
    }
  };

  const prevContextRef = useRef(initialContext);

  // Reset chat when initialContext changes
  useEffect(() => {
    if (
      prevContextRef.current.businessType !== initialContext.businessType ||
      prevContextRef.current.focusArea !== initialContext.focusArea
    ) {
      setChatSession(null);
      setMessages([]);
      setProgressPercentage(10);
      setContextData({
        name: "",
        email: "",
        company: "",
        website: "",
        linkedin: "",
      });
      setGenUIData({ budget: "", timeline: "" });
      setMultiSelectData({ selected: [], custom: "" });
      setStrategicBrief(null);
      prevContextRef.current = initialContext;
    }
  }, [initialContext.businessType, initialContext.focusArea]);

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !chatSession) {
      const initChat = async () => {
        const client = getGeminiClient();
        if (!client) return;

        const session = client.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: `${SYSTEM_INSTRUCTION}\n\nIMPORTANT CONTEXT: The user is running a ${initialContext.businessType} and their primary focus is ${initialContext.focusArea}. You MUST tailor all your advice, questions, and the final strategic brief specifically around ${initialContext.focusArea}. Focus heavily on automation opportunities, AI workflows, and operational efficiency.\n\nCRITICAL LANGUAGE INSTRUCTION: You MUST communicate entirely in the following language code: ${language}. Translate all your responses, questions, and UI elements to this language.`,
            temperature: 0.7,
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: DISCOVERY_RESPONSE_SCHEMA,
          },
        });
        setChatSession(session);

        const firstMessage = language === 'ka' 
          ? `თქვენ მართავთ ${initialContext.businessType} და თქვენი მთავარი ფოკუსი ახლა არის ${initialContext.focusArea}. ეს მნიშვნელოვანი ადგილია ფოკუსირებისთვის. სანამ რაიმე სასარგებლოს გაგიზიარებთ, მოდით მივიღოთ გარკვეული კონტექსტი, რათა შევძლო ეს მოვარგო თქვენს კონკრეტულ სიტუაციას.`
          : language === 'ru'
          ? `Вы руководите ${initialContext.businessType}, и ваш главный фокус сейчас — это ${initialContext.focusArea}. Это важное направление. Прежде чем я поделюсь чем-то полезным, давайте получим некоторый контекст, чтобы я мог адаптировать это к вашей конкретной ситуации.`
          : `You run a ${initialContext.businessType} and the biggest focus right now is ${initialContext.focusArea}. That's a meaningful place to be focusing. Before I share anything useful, let's get some context so I can tailor this to your specific situation.`;

        setMessages([
          {
            id: "1",
            role: "ai",
            content: firstMessage,
            uiRequest: { type: "context_input" },
          },
        ]);
      };
      initChat();
    }
  }, [
    isOpen,
    initialContext.businessType,
    initialContext.focusArea,
    chatSession,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading || !chatSession) return;

    setInput("");
    if (isListening) {
      mediaRecorderRef.current?.stop();
      setIsListening(false);
    }

    setMessages((prev) => {
      // Remove suggested options from the last AI message once user replies
      const newMsgs = [...prev];
      const lastAiIdx = newMsgs.map((m) => m.role).lastIndexOf("ai");
      if (lastAiIdx !== -1) {
        newMsgs[lastAiIdx] = { ...newMsgs[lastAiIdx], suggestedOptions: [] };
      }
      return [
        ...newMsgs,
        { id: Date.now().toString(), role: "user", content: textToSend },
      ];
    });

    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: textToSend });
      let data;
      try {
        data = parseGeminiResponse(response.text);
      } catch (e) {
        console.error("JSON parse error:", e, response.text);
        data = { text: "I'm processing that information..." };
      }

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = chunks?.map((c: any) => c.web).filter(Boolean) || [];

      if (data.progressPercentage)
        setProgressPercentage(data.progressPercentage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: data.text,
          suggestedOptions: data.suggestedOptions || [],
          uiRequest: data.uiRequest,
          groundingSources: sources,
        },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);

      if (
        error?.message?.includes("429") ||
        error?.message?.includes("quota") ||
        error?.status === 429 ||
        error?.status === "RESOURCE_EXHAUSTED"
      ) {
        if (window.aistudio?.openSelectKey) {
          try {
            await window.aistudio.openSelectKey();
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "ai",
                content:
                  "API key updated. Please try sending your message again.",
              },
            ]);
            return;
          } catch (e) {
            console.error("Failed to open select key dialog", e);
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content:
            "I encountered an issue processing that. Could you try again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    handleSend(input);
  };

  const handleGenUISubmit = async (
    messageId: string,
    summaryText: string,
    promptText: string,
  ) => {
    // Mark the UI as completed
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.uiRequest
          ? { ...m, uiRequest: { ...m.uiRequest, isCompleted: true } }
          : m,
      ),
    );

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: summaryText,
        isGenUI: true,
      },
    ]);

    setIsLoading(true);
    try {
      const response = await chatSession.sendMessage({ message: promptText });
      let data;
      try {
        data = parseGeminiResponse(response.text);
      } catch (e) {
        console.error("JSON parse error:", e, response.text);
        data = { text: "I'm processing that information..." };
      }

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = chunks?.map((c: any) => c.web).filter(Boolean) || [];

      if (data.progressPercentage)
        setProgressPercentage(data.progressPercentage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: data.text,
          suggestedOptions: data.suggestedOptions || [],
          uiRequest: data.uiRequest,
          groundingSources: sources,
        },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      if (
        error?.message?.includes("429") ||
        error?.message?.includes("quota") ||
        error?.status === 429 ||
        error?.status === "RESOURCE_EXHAUSTED"
      ) {
        if (window.aistudio?.openSelectKey) {
          try {
            await window.aistudio.openSelectKey();
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "ai",
                content: "API key updated. Please try submitting again.",
              },
            ]);
            return;
          } catch (e) {
            console.error("Failed to open select key dialog", e);
          }
        }
      }
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content:
            "I encountered an issue processing that. Could you try again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const stopVoiceCall = () => {
    setIsVoiceActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (liveSessionRef.current) {
      try {
        liveSessionRef.current.close();
      } catch (e) {
        console.error("Error closing live session", e);
      }
      liveSessionRef.current = null;
    }
  };

  const startVoiceCall = async () => {
    setIsVoiceActive(true);
    const client = getGeminiClient();
    if (!client) return;

    try {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey && window.aistudio.openSelectKey) {
          await window.aistudio.openSelectKey();
        }
      }

      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const playCtx = new AudioContextClass({ sampleRate: 24000 });
      let nextStartTime = playCtx.currentTime;

      const sessionPromise = client.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        callbacks: {
          onopen: () => {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then((stream) => {
                streamRef.current = stream;
                const recordCtx = new AudioContextClass({ sampleRate: 16000 });
                audioCtxRef.current = recordCtx;
                const source = recordCtx.createMediaStreamSource(stream);
                const processor = recordCtx.createScriptProcessor(4096, 1, 1);
                source.connect(processor);
                processor.connect(recordCtx.destination);

                processor.onaudioprocess = (e) => {
                  if (!isVoiceActive) return;
                  const pcm = e.inputBuffer.getChannelData(0);
                  const int16 = new Int16Array(pcm.length);
                  for (let i = 0; i < pcm.length; i++)
                    int16[i] = Math.max(
                      -32768,
                      Math.min(32767, pcm[i] * 32768),
                    );
                  const base64 = btoa(
                    String.fromCharCode(...new Uint8Array(int16.buffer)),
                  );
                  sessionPromise.then((session) => {
                    session.sendRealtimeInput({
                      media: { data: base64, mimeType: "audio/pcm;rate=16000" },
                    });
                  });
                };
              })
              .catch((err) => {
                console.error("Mic error", err);
                setIsVoiceActive(false);
              });
          },
          onmessage: (message: any) => {
            if (message.serverContent?.modelTurn) {
              const parts = message.serverContent.modelTurn.parts;
              const textPart = parts.find((p: any) => p.text);
              if (textPart) {
                setLiveCaptions((prev) => prev + textPart.text + " ");
              }
            }
            const base64Audio =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++)
                bytes[i] = binaryString.charCodeAt(i);
              const int16Array = new Int16Array(bytes.buffer);
              const float32Array = new Float32Array(int16Array.length);
              for (let i = 0; i < int16Array.length; i++)
                float32Array[i] = int16Array[i] / 32768.0;

              const buffer = playCtx.createBuffer(
                1,
                float32Array.length,
                24000,
              );
              buffer.getChannelData(0).set(float32Array);
              const source = playCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(playCtx.destination);

              const startTime = Math.max(nextStartTime, playCtx.currentTime);
              source.start(startTime);
              nextStartTime = startTime + buffer.duration;
            }
            if (message.serverContent?.interrupted) {
              nextStartTime = playCtx.currentTime;
            }
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName } },
          },
          systemInstruction:
            SYSTEM_INSTRUCTION +
            `\n\nIMPORTANT CONTEXT: The user is building a ${initialContext.businessType} and their primary focus is ${initialContext.focusArea}. You MUST tailor all your advice, questions, and the final strategic brief specifically around ${initialContext.focusArea}. If they selected automation, focus heavily on automation opportunities, AI workflows, and operational efficiency. Have a natural voice conversation to discover their needs. Do not use JSON schema, just talk.\n\nCRITICAL LANGUAGE INSTRUCTION: You MUST communicate entirely in the following language code: ${language}. Translate all your responses to this language.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
      });

      liveSessionRef.current = await sessionPromise;
    } catch (e) {
      console.error("Voice call error:", e);
      setIsVoiceActive(false);
    }
  };

  const generateBrief = async () => {
    setIsGeneratingBrief(true);
    try {
      const client = getGeminiClient();
      if (!client) return;
      const conversationHistory = messages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n\n");
      const response = await client.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `You are an elite AI Automation & Operations Architect. The user is running a ${initialContext.businessType} and their primary focus is ${initialContext.focusArea}. 
        
Based on the following discovery conversation, generate a highly professional, comprehensive, and insightful "Strategic Brief". 

CRITICAL INSTRUCTIONS:
1. You MUST use Markdown formatting extensively (Headers, bold text, bullet points, numbered lists).
2. Make it highly visual and scannable. Do not use giant walls of text.
3. If the user provided a company name or website, you MUST incorporate deep, specific insights about their industry or business model.
4. Focus heavily on their specific interest (${initialContext.focusArea}), providing concrete automation opportunities, tool recommendations (e.g., Zapier, Make, LLMs), and operational efficiency tactics.
5. CRITICAL LANGUAGE INSTRUCTION: The entire Strategic Brief MUST be written in the following language code: ${language}.

STRUCTURE THE BRIEF AS FOLLOWS:
# Strategic Brief: [Company Name or "Operations Optimization"]
## 1. Executive Summary & Core Challenge
## 2. Deep Strategic Insight (Industry/Business specific)
## 3. High-Impact Automation Opportunities
## 4. Recommended Action Plan (Step-by-step)
## 5. Expected ROI & Next Steps

Conversation:
${conversationHistory}`,
      });
      setStrategicBrief(response.text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  useEffect(() => {
    return () => {
      stopVoiceCall();
    };
  }, []);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%", opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed inset-0 z-50 bg-bg-base/95 backdrop-blur-md flex flex-col ${!isOpen ? "pointer-events-none" : ""}`}
    >
      <ChatHeader
        progressPercentage={progressPercentage}
        chatMode={chatMode}
        setChatMode={setChatMode}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col">
        {chatMode === "voice" ? (
          <VoiceInterface
            voiceName={voiceName}
            setVoiceName={setVoiceName}
            isVoiceActive={isVoiceActive}
            liveCaptions={liveCaptions}
            onStartCall={startVoiceCall}
            onStopCall={stopVoiceCall}
          />
        ) : strategicBrief ? (
          <div ref={briefRef}>
            <StrategicBriefComponent
              strategicBrief={strategicBrief}
              contextData={contextData}
              onStartOver={() => {
                setStrategicBrief(null);
                setMessages([]);
                setChatSession(null);
                setProgressPercentage(10);
                setContextData({ name: "", email: "", company: "", website: "", linkedin: "" });
                setGenUIData({ budget: "", timeline: "" });
                setMultiSelectData({ selected: [], custom: "" });
              }}
              onDownloadPDF={downloadPDF}
              onBookCall={onBookCall}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8 w-full">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                msg={msg}
                contextData={contextData}
                setContextData={setContextData}
                multiSelectData={multiSelectData}
                setMultiSelectData={setMultiSelectData}
                genUIData={genUIData}
                setGenUIData={setGenUIData}
                handleGenUISubmit={handleGenUISubmit}
                handleSend={handleSend}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-4 text-text-muted flex space-x-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {progressPercentage >= 100 && !strategicBrief && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={generateBrief}
                  disabled={isGeneratingBrief}
                  className="px-6 py-3 bg-accent text-bg-base rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center space-x-2 shadow-md"
                >
                  {isGeneratingBrief ? (
                    <span>{t('synthesizingInsights')}</span>
                  ) : (
                    <>
                      <span>{t('generateStrategicBrief')}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {chatMode === "text" && !strategicBrief && (
        <div className="p-6 border-t border-border-subtle">
          <div className="max-w-2xl mx-auto relative">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center"
            >
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`absolute left-3 p-2 rounded-full transition-colors z-10 ${isListening ? "bg-red-500/10 text-red-500" : "text-text-muted hover:text-text-main hover:bg-bg-elevated"} disabled:opacity-50`}
                title={t('voiceInput')}
              >
                {isListening ? (
                  <Mic size={18} className="animate-pulse" />
                ) : (
                  <MicOff size={18} />
                )}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening ? t('listening') : t('typeResponse')
                }
                disabled={isLoading}
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl pl-12 pr-12 py-4 text-text-main placeholder-text-muted focus:outline-none focus:border-text-muted transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3 p-2 text-text-muted hover:text-text-main disabled:opacity-50 transition-colors rounded-full hover:bg-bg-surface"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={onBookCall}
                className="text-xs text-text-muted hover:text-text-main transition-colors inline-flex items-center space-x-1 group"
              >
                <span>{t('preferToTalk')}</span>
                <span className="group-hover:underline">{t('book30Mins')}</span>
                <ArrowRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
