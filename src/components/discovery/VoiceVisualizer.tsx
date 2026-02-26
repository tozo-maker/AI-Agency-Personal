import React from "react";
import { motion } from "motion/react";

interface VoiceVisualizerProps {
  isActive: boolean;
}

export function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 mx-auto my-8">
      {isActive && (
        <>
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-accent"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute inset-4 rounded-full bg-accent"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute inset-8 rounded-full bg-accent"
          />
        </>
      )}
      <motion.div
        layout
        className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-700 ${
          isActive
            ? "bg-accent text-bg-base shadow-[0_0_40px_rgba(var(--color-accent),0.6)]"
            : "bg-bg-elevated text-text-muted border border-border-subtle shadow-sm"
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </motion.div>
    </div>
  );
}
