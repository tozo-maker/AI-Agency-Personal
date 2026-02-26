import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AdaptiveSentence } from "./components/AdaptiveSentence";
import { DynamicPanel } from "./components/DynamicPanel";
import { DiscoveryChat } from "./components/DiscoveryChat";
import { getDynamicCopyKey } from "./lib/copyMatrix";
import { ArrowRight, Sun, Moon, X, Globe } from "lucide-react";
import { useLanguage, Language } from "./lib/i18n";
import { useLocalStorage } from "./hooks/useLocalStorage";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-bg-surface border border-border-subtle rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main rounded-full hover:bg-bg-elevated transition-colors"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-serif mb-4 text-text-main">{title}</h3>
        <div className="text-text-muted leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [businessType, setBusinessType] = useLocalStorage<string | null>("businessType", null);
  const [focusArea, setFocusArea] = useLocalStorage<string | null>("focusArea", null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [isLangOpen, setIsLangOpen] = useState(false);

  // Theme state
  const [isDark, setIsDark] = useLocalStorage("theme_isDark", true);

  useEffect(() => {
    // Initialize theme based on system preference if not set
    const storedTheme = window.localStorage.getItem("theme_isDark");
    if (storedTheme === null) {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(isSystemDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const dynamicTextKey = getDynamicCopyKey(businessType, focusArea);
  const dynamicText = dynamicTextKey ? t(dynamicTextKey as any) : "";
  const isComplete = businessType && focusArea;

  return (
    <div className="min-h-screen bg-bg-base text-text-main font-sans selection:bg-text-main selection:text-bg-base transition-colors duration-300">
      {/* Header / Theme Toggle */}
      <header className="absolute top-0 right-0 p-6 flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-2 p-2 text-text-muted hover:text-text-main rounded-full hover:bg-bg-elevated transition-colors"
          >
            <Globe size={18} />
            <span className="text-sm uppercase font-medium">{language}</span>
          </button>
          <AnimatePresence>
            {isLangOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-32 bg-bg-surface border border-border-subtle rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <button
                  onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-elevated transition-colors ${language === 'en' ? 'text-text-main font-medium' : 'text-text-muted'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('ka'); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-elevated transition-colors ${language === 'ka' ? 'text-text-main font-medium' : 'text-text-muted'}`}
                >
                  ქართული
                </button>
                <button
                  onClick={() => { setLanguage('ru'); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-elevated transition-colors ${language === 'ru' ? 'text-text-main font-medium' : 'text-text-muted'}`}
                >
                  Русский
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-text-muted hover:text-text-main rounded-full hover:bg-bg-elevated transition-colors"
          aria-label={t('toggleTheme')}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-32">
        <AdaptiveSentence
          businessType={businessType}
          focusArea={focusArea}
          onBusinessTypeChange={setBusinessType}
          onFocusAreaChange={setFocusArea}
        />

        <DynamicPanel text={dynamicText} />

        {/* CTA Block */}
        <div className="mt-12 min-h-[100px]">
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="group flex items-center space-x-3 text-lg font-medium text-text-main hover:opacity-80 transition-opacity"
                >
                  <span>{t('startConversation')}</span>
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
                <p className="text-sm text-text-muted max-w-xl leading-relaxed">
                  {t('conversationGuided')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Below the Fold Content */}
      <section className="border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-6 py-32 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* How It Works */}
          <div>
            <h3 className="text-2xl font-serif tracking-tight mb-12 text-text-main">
              {t('whatActuallyHappens')}
            </h3>
            <div className="space-y-12">
              <div className="flex space-x-6">
                <span className="text-text-muted font-mono text-sm mt-1 opacity-70">
                  01
                </span>
                <div>
                  <h4 className="font-medium text-text-main mb-3 text-lg tracking-tight">
                    {t('step1Title')}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                    {t('step1Desc')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-6">
                <span className="text-text-muted font-mono text-sm mt-1 opacity-70">
                  02
                </span>
                <div>
                  <h4 className="font-medium text-text-main mb-3 text-lg tracking-tight">
                    {t('step2Title')}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                    {t('step2Desc')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-6">
                <span className="text-text-muted font-mono text-sm mt-1 opacity-70">
                  03
                </span>
                <div>
                  <h4 className="font-medium text-text-main mb-3 text-lg tracking-tight">
                    {t('step3Title')}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                    {t('step3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-2xl font-serif tracking-tight mb-12 text-text-main">
              {t('whatICanHelpWith')}
            </h3>
            <ul className="space-y-6 text-text-muted text-sm leading-relaxed">
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap1')}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap2')}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap3')}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap4')}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap5')}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-text-muted">·</span>
                <span>
                  {t('cap6')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-32 md:py-40 text-center">
          <h3 className="text-3xl font-serif tracking-tight mb-10 text-text-main">
            {t('honestTitle')}
          </h3>
          <div className="space-y-8 text-text-muted leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            <p>
              {t('honest1')}
            </p>
            <p>
              {t('honest2')}
            </p>
            <p>
              {t('honest3')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-xs text-text-muted tracking-widest uppercase">
          <div className="flex space-x-6">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-text-main transition-colors"
            >
              {t('about')}
            </button>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hover:text-text-main transition-colors"
            >
              {t('bookCall')}
            </button>
          </div>
          <div>{t('footerText')}</div>
        </div>
      </footer>

      {/* Chat Overlay */}
      <DiscoveryChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialContext={{
          businessType: businessType || "",
          focusArea: focusArea || "",
        }}
        onBookCall={() => {
          setIsChatOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Modals */}
      <AnimatePresence>
        {isAboutOpen && (
          <Modal
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
            title={t('about')}
          >
            <p className="mb-4">
              {t('aboutText1')}
            </p>
            <p className="mb-6">
              {t('aboutText2')}
            </p>
            <button
              onClick={() => {
                setIsAboutOpen(false);
                setIsBookingOpen(true);
              }}
              className="text-text-main font-medium hover:underline flex items-center space-x-2"
            >
              <span>{t('bookCallDirectly')}</span>
              <ArrowRight size={16} />
            </button>
          </Modal>
        )}
        {isBookingOpen && (
          <Modal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            title={t('bookCall')}
          >
            <p className="mb-6">
              {t('bookCallText')}
            </p>
            <div className="aspect-video bg-bg-elevated rounded-xl border border-border-subtle flex items-center justify-center text-sm text-text-muted">
              [ Cal.com Embed Placeholder ]
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
