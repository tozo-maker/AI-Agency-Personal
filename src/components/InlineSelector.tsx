import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  value: string;
  label: string;
}

interface InlineSelectorProps {
  options: Option[];
  value: string | null;
  onChange: (val: string) => void;
  placeholder: string;
}

export function InlineSelector({ options, value, onChange, placeholder }: InlineSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || value;

  return (
    <span className="relative inline-block" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          transition-colors duration-200 ease-in-out
          ${value ? 'text-text-main font-medium border-b border-text-main/30' : 'text-text-muted border-b border-dashed border-text-muted hover:text-text-main hover:border-text-main/50'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel || placeholder}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 z-50 min-w-max max-w-[90vw] sm:max-w-none"
          >
            <div className="flex flex-col sm:flex-row bg-bg-surface border border-border-subtle rounded-lg shadow-2xl overflow-hidden sm:overflow-x-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="px-4 py-3 text-sm text-left whitespace-nowrap text-text-muted hover:bg-bg-elevated hover:text-text-main transition-colors border-b sm:border-b-0 sm:border-r border-border-subtle last:border-0"
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
