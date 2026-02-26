import React from "react";
import ReactMarkdown from "react-markdown";
import { Download, Calendar } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

interface StrategicBriefProps {
  strategicBrief: string;
  contextData: any;
  onStartOver: () => void;
  onDownloadPDF: () => void;
  onBookCall: () => void;
}

export function StrategicBrief({
  strategicBrief,
  contextData,
  onStartOver,
  onDownloadPDF,
  onBookCall,
}: StrategicBriefProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 md:p-12 shadow-sm print-only">
        <h2 className="font-serif text-3xl mb-8">{t('strategicBrief')}</h2>
        <div className="prose max-w-none prose-headings:font-serif prose-headings:font-normal">
          <ReactMarkdown>{strategicBrief}</ReactMarkdown>
        </div>
      </div>

      {contextData.email && (
        <div className="mt-6 text-center text-sm text-text-muted bg-bg-elevated p-4 rounded-lg border border-border-subtle no-print">
          <p className="mb-2">
            <span className="font-medium text-text-main">{t('demoMode')}:</span> {t('emailSentTo')} <span className="text-text-main font-medium">{contextData.email}</span>.
          </p>
          <p>{t('downloadCopy')}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
        <button
          onClick={onStartOver}
          className="px-6 py-3 bg-bg-elevated border border-border-subtle text-text-main rounded-full font-medium hover:bg-bg-surface transition-colors flex items-center space-x-2"
        >
          <span>{t('startOver') || 'Start Over'}</span>
        </button>
        <button
          onClick={onDownloadPDF}
          className="px-6 py-3 bg-bg-elevated border border-border-subtle text-text-main rounded-full font-medium hover:bg-bg-surface transition-colors flex items-center space-x-2"
        >
          <Download size={18} />
          <span>{t('downloadPDF')}</span>
        </button>
        <button
          onClick={onBookCall}
          className="px-6 py-3 bg-accent text-bg-base rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-md"
        >
          <Calendar size={18} />
          <span>{t('bookCallToExecute')}</span>
        </button>
      </div>
    </div>
  );
}
