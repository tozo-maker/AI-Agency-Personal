import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { Message } from "./types";

interface MultiSelectFormProps {
  msg: Message;
  multiSelectData: {
    selected: string[];
    custom: string;
  };
  setMultiSelectData: React.Dispatch<React.SetStateAction<any>>;
  handleGenUISubmit: (messageId: string, summaryText: string, promptText: string) => void;
}

export function MultiSelectForm({ msg, multiSelectData, setMultiSelectData, handleGenUISubmit }: MultiSelectFormProps) {
  const { t } = useLanguage();

  if (!msg.uiRequest?.options) return null;

  const container = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-[85%] md:max-w-[75%] p-6 rounded-2xl bg-bg-surface border border-border-subtle text-text-main shadow-md"
    >
      <motion.h4 variants={item} className="font-serif text-lg mb-4">{t('selectAllThatApply')}</motion.h4>
      <div className="space-y-3">
        {msg.uiRequest.options.map((opt) => (
          <motion.label
            variants={item}
            whileHover={{ x: 4 }}
            key={opt}
            className="flex items-start space-x-3 cursor-pointer group"
          >
            <motion.div
              layout
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${multiSelectData.selected.includes(opt) ? "border-text-main bg-text-main" : "border-text-muted group-hover:border-text-main"}`}
            >
              {multiSelectData.selected.includes(opt) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-2 h-2 bg-bg-surface rounded-sm"
                />
              )}
            </motion.div>
            <span className="text-sm leading-tight">{opt}</span>
            <input
              type="checkbox"
              className="hidden"
              checked={multiSelectData.selected.includes(opt)}
              onChange={(e) => {
                if (e.target.checked)
                  setMultiSelectData((prev: any) => ({
                    ...prev,
                    selected: [...prev.selected, opt],
                  }));
                else
                  setMultiSelectData((prev: any) => ({
                    ...prev,
                    selected: prev.selected.filter((i: string) => i !== opt),
                  }));
              }}
            />
          </motion.label>
        ))}
        <motion.div variants={item} className="pt-2">
          <input
            type="text"
            placeholder={t('otherSpecify')}
            value={multiSelectData.custom}
            onChange={(e) =>
              setMultiSelectData({ ...multiSelectData, custom: e.target.value })
            }
            className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
          />
        </motion.div>
        <motion.div variants={item} className="flex items-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const answers = [...multiSelectData.selected, multiSelectData.custom]
                .filter(Boolean)
                .join(", ");
              handleGenUISubmit(
                msg.id,
                `Selected: ${answers}`,
                `The user selected/entered the following options: ${answers}. Acknowledge and continue.`
              );
            }}
            disabled={multiSelectData.selected.length === 0 && !multiSelectData.custom}
            className="flex items-center space-x-2 text-sm font-medium text-text-main disabled:opacity-50 hover:text-text-muted transition-colors"
          >
            <span>{t('submitSelection')}</span>
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              handleGenUISubmit(
                msg.id,
                t('skipForNow'),
                "The user skipped the selection form. Please continue the conversation naturally."
              )
            }
            className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
          >
            {t('skipForNow')}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
