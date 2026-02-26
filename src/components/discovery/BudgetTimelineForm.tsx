import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { Message } from "./types";

interface BudgetTimelineFormProps {
  msg: Message;
  genUIData: {
    budget: string;
    timeline: string;
  };
  setGenUIData: React.Dispatch<React.SetStateAction<any>>;
  handleGenUISubmit: (messageId: string, summaryText: string, promptText: string) => void;
}

export function BudgetTimelineForm({ msg, genUIData, setGenUIData, handleGenUISubmit }: BudgetTimelineFormProps) {
  const { t } = useLanguage();

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
      <motion.h4 variants={item} className="font-serif text-lg mb-4">{t('practicalQuestions')}</motion.h4>
      <motion.p variants={item} className="text-sm text-text-muted mb-6">{t('practicalQuestionsDesc')}</motion.p>
      <div className="space-y-6">
        <motion.div variants={item}>
          <label className="block text-sm font-medium mb-3">{t('budgetRange')}</label>
          <div className="space-y-2">
            {[t('budget1'), t('budget2'), t('budget3'), t('budget4')].map((opt) => (
              <motion.label
                whileHover={{ x: 4 }}
                key={opt}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <motion.div
                  layout
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${genUIData.budget === opt ? "border-text-main" : "border-text-muted group-hover:border-text-main"}`}
                >
                  {genUIData.budget === opt && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-2 h-2 bg-text-main rounded-full"
                    />
                  )}
                </motion.div>
                <span className="text-sm">{opt}</span>
                <input
                  type="radio"
                  name="budget"
                  value={opt}
                  className="hidden"
                  onChange={(e) => setGenUIData({ ...genUIData, budget: e.target.value })}
                />
              </motion.label>
            ))}
          </div>
        </motion.div>
        <motion.div variants={item}>
          <label className="block text-sm font-medium mb-3">{t('timeline')}</label>
          <div className="space-y-2">
            {[t('timeline1'), t('timeline2'), t('timeline3')].map((opt) => (
              <motion.label
                whileHover={{ x: 4 }}
                key={opt}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <motion.div
                  layout
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${genUIData.timeline === opt ? "border-text-main" : "border-text-muted group-hover:border-text-main"}`}
                >
                  {genUIData.timeline === opt && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-2 h-2 bg-text-main rounded-full"
                    />
                  )}
                </motion.div>
                <span className="text-sm">{opt}</span>
                <input
                  type="radio"
                  name="timeline"
                  value={opt}
                  className="hidden"
                  onChange={(e) => setGenUIData({ ...genUIData, timeline: e.target.value })}
                />
              </motion.label>
            ))}
          </div>
        </motion.div>
        <motion.div variants={item} className="flex items-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              handleGenUISubmit(
                msg.id,
                `Budget: ${genUIData.budget}, Timeline: ${genUIData.timeline}`,
                `The user provided practical details: Budget: ${genUIData.budget}, Timeline: ${genUIData.timeline}. Acknowledge this briefly and suggest booking a call if appropriate.`
              )
            }
            disabled={!genUIData.budget || !genUIData.timeline}
            className="flex items-center space-x-2 text-sm font-medium text-text-main disabled:opacity-50 hover:text-text-muted transition-colors"
          >
            <span>{t('continueConversation')}</span>
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              handleGenUISubmit(
                msg.id,
                t('skipForNow'),
                "The user skipped the budget/timeline form. Please continue the conversation naturally."
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
