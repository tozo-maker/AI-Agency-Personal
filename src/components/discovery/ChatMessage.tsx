import React from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Message } from "./types";
import { ContextForm } from "./ContextForm";
import { MultiSelectForm } from "./MultiSelectForm";
import { BudgetTimelineForm } from "./BudgetTimelineForm";
import { useLanguage } from "../../lib/i18n";

interface ChatMessageProps {
  msg: Message;
  contextData: any;
  setContextData: any;
  multiSelectData: any;
  setMultiSelectData: any;
  genUIData: any;
  setGenUIData: any;
  handleGenUISubmit: (messageId: string, summaryText: string, promptText: string) => void;
  handleSend: (text: string) => void;
}

export function ChatMessage({
  msg,
  contextData,
  setContextData,
  multiSelectData,
  setMultiSelectData,
  genUIData,
  setGenUIData,
  handleGenUISubmit,
  handleSend,
}: ChatMessageProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
    >
      {msg.isGenUI ? (
        <div className="text-sm text-text-muted italic">
          {t('providedPracticalDetails')}
        </div>
      ) : (
        <div
          className={`max-w-[85%] md:max-w-[75%] p-4 md:p-6 rounded-2xl ${msg.role === "user" ? "bg-text-main text-bg-base" : "bg-bg-elevated text-text-main border border-border-subtle"}`}
        >
          {msg.role === "ai" ? (
            <div className="markdown-body prose prose-sm md:prose-base max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:font-serif prose-a:text-accent hover:prose-a:text-accent/80">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="leading-relaxed">{msg.content}</p>
          )}
        </div>
      )}

      {msg.groundingSources && msg.groundingSources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 max-w-[85%] md:max-w-[75%]">
          {msg.groundingSources.map((source, idx) => (
            <a
              key={idx}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-bg-surface border border-border-subtle px-2 py-1 rounded-md text-text-muted hover:text-text-main transition-colors truncate max-w-[200px]"
            >
              {source.title || source.uri}
            </a>
          ))}
        </div>
      )}

      {msg.suggestedOptions && msg.suggestedOptions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {msg.suggestedOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSend(opt)}
              className="text-sm bg-bg-surface border border-border-subtle px-4 py-2 rounded-full text-text-main hover:border-text-main transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {msg.uiRequest && !msg.uiRequest.isCompleted && (
        <div className="mt-4 w-full flex justify-start">
          {msg.uiRequest.type === "context_input" && (
            <ContextForm
              msg={msg}
              contextData={contextData}
              setContextData={setContextData}
              handleGenUISubmit={handleGenUISubmit}
            />
          )}
          {msg.uiRequest.type === "multi_select" && (
            <MultiSelectForm
              msg={msg}
              multiSelectData={multiSelectData}
              setMultiSelectData={setMultiSelectData}
              handleGenUISubmit={handleGenUISubmit}
            />
          )}
          {msg.uiRequest.type === "budget_timeline" && (
            <BudgetTimelineForm
              msg={msg}
              genUIData={genUIData}
              setGenUIData={setGenUIData}
              handleGenUISubmit={handleGenUISubmit}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
