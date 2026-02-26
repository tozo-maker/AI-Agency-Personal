import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/i18n';

interface DynamicPanelProps {
  text: string;
}

export function DynamicPanel({ text }: DynamicPanelProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[120px] mt-8">
      <AnimatePresence mode="wait">
        {text ? (
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl font-sans"
          >
            {text}
          </motion.p>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-text-muted font-sans tracking-wide uppercase"
          >
            {t('selectBothToContinue')}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
