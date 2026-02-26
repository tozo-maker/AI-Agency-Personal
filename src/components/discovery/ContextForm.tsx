import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { Message } from "./types";

interface ContextFormProps {
  msg: Message;
  contextData: {
    name: string;
    email: string;
    company: string;
    website: string;
    linkedin: string;
  };
  setContextData: React.Dispatch<React.SetStateAction<any>>;
  handleGenUISubmit: (messageId: string, summaryText: string, promptText: string) => void;
}

export function ContextForm({ msg, contextData, setContextData, handleGenUISubmit }: ContextFormProps) {
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
      <motion.h4 variants={item} className="font-serif text-lg mb-4">{t('tellUsAboutYou')}</motion.h4>
      <div className="space-y-3">
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder={t('yourName')}
            value={contextData.name}
            onChange={(e) => setContextData({ ...contextData, name: e.target.value })}
            className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
          />
          <input
            type="email"
            placeholder={t('emailAddress')}
            value={contextData.email}
            onChange={(e) => setContextData({ ...contextData, email: e.target.value })}
            className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
          />
        </motion.div>
        <motion.input
          variants={item}
          type="text"
          placeholder={t('companyName')}
          value={contextData.company}
          onChange={(e) => setContextData({ ...contextData, company: e.target.value })}
          className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
        />
        <motion.input
          variants={item}
          type="url"
          placeholder={t('websiteUrl')}
          value={contextData.website}
          onChange={(e) => setContextData({ ...contextData, website: e.target.value })}
          className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
        />
        <motion.input
          variants={item}
          type="url"
          placeholder={t('linkedinProfile')}
          value={contextData.linkedin}
          onChange={(e) => setContextData({ ...contextData, linkedin: e.target.value })}
          className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all"
        />
        <motion.div variants={item} className="flex items-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              handleGenUISubmit(
                msg.id,
                `Provided details for ${contextData.name} at ${contextData.company}.`,
                `The user provided their details: Name: ${contextData.name}, Email: ${contextData.email}, Company: ${contextData.company}, Website: ${contextData.website}, LinkedIn: ${contextData.linkedin}. Please acknowledge and proceed to analyze their company/website using Google Search if provided.`
              )
            }
            disabled={!contextData.name || !contextData.email}
            className="flex items-center space-x-2 text-sm font-medium text-text-main disabled:opacity-50 hover:text-text-muted transition-colors"
          >
            <span>{t('continue')}</span>
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              handleGenUISubmit(
                msg.id,
                t('skipForNow'),
                "The user skipped the context form. Please continue the conversation naturally to discover their needs."
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
