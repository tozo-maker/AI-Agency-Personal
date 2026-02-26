import React from "react";
import { VoiceVisualizer } from "./VoiceVisualizer";
import { useLanguage } from "../../lib/i18n";

interface VoiceInterfaceProps {
  voiceName: string;
  setVoiceName: (name: string) => void;
  isVoiceActive: boolean;
  liveCaptions: string;
  onStartCall: () => void;
  onStopCall: () => void;
}

export function VoiceInterface({
  voiceName,
  setVoiceName,
  isVoiceActive,
  liveCaptions,
  onStartCall,
  onStopCall,
}: VoiceInterfaceProps) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h3 className="font-serif text-2xl mb-2">{t('voiceDiscovery')}</h3>
        <p className="text-text-muted text-sm max-w-sm mx-auto">
          {t('voiceDesc')}
        </p>
      </div>

      <div className="mb-12">
        <label className="text-sm text-text-muted mr-3">
          {t('agentVoice')}
        </label>
        <select
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          disabled={isVoiceActive}
          className="bg-bg-elevated border border-border-subtle rounded-lg px-3 py-1.5 text-sm text-text-main outline-none focus:border-text-muted transition-colors disabled:opacity-50"
        >
          <option value="Zephyr">Zephyr</option>
          <option value="Puck">Puck</option>
          <option value="Charon">Charon</option>
          <option value="Kore">Kore</option>
          <option value="Fenrir">Fenrir</option>
        </select>
      </div>

      <VoiceVisualizer isActive={isVoiceActive} />

      {isVoiceActive ? (
        <button
          onClick={onStopCall}
          className="px-8 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full font-medium transition-colors"
        >
          {t('endCall')}
        </button>
      ) : (
        <button
          onClick={onStartCall}
          className="px-8 py-3 bg-text-main text-bg-base hover:opacity-90 rounded-full font-medium transition-colors"
        >
          {t('startVoiceCall')}
        </button>
      )}

      {isVoiceActive && liveCaptions && (
        <div className="mt-12 max-w-lg w-full p-6 bg-bg-surface border border-border-subtle rounded-2xl shadow-sm">
          <h4 className="text-xs text-text-muted uppercase tracking-wider mb-3 font-medium">
            {t('liveCaptions')}
          </h4>
          <div className="text-sm text-text-main leading-relaxed h-32 overflow-y-auto flex flex-col-reverse">
            <div>{liveCaptions}</div>
          </div>
        </div>
      )}
    </div>
  );
}
