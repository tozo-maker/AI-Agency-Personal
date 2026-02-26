import React from "react";
import { X, MessageSquare, Phone } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

interface ChatHeaderProps {
  progressPercentage: number;
  chatMode: "text" | "voice";
  setChatMode: (mode: "text" | "voice") => void;
  onClose: () => void;
}

export function ChatHeader({
  progressPercentage,
  chatMode,
  setChatMode,
  onClose,
}: ChatHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center p-6 border-b border-border-subtle">
      <div className="flex items-center space-x-8">
        <div className="text-sm text-text-muted font-medium tracking-wide uppercase">
          {t('discoverySession')}
        </div>

        {/* Progress Indicator */}
        <div className="hidden md:flex items-center space-x-4 w-48">
          <span className="text-xs text-text-muted">
            {progressPercentage}% {t('complete')}
          </span>
          <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex bg-bg-elevated rounded-full p-1">
          <button
            onClick={() => setChatMode("text")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${chatMode === "text" ? "bg-text-main text-bg-base shadow-sm" : "text-text-muted hover:text-text-main"}`}
          >
            <MessageSquare size={14} />
            <span>{t('text')}</span>
          </button>
          <button
            onClick={() => setChatMode("voice")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${chatMode === "voice" ? "bg-text-main text-bg-base shadow-sm" : "text-text-muted hover:text-text-main"}`}
          >
            <Phone size={14} />
            <span>{t('voice')}</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-text-muted hover:text-text-main transition-colors rounded-full hover:bg-bg-elevated"
          aria-label={t('closeChat')}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
