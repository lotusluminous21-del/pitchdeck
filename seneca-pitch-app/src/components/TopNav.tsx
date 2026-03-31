'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function TopNav() {
  const t = useTranslations('TopNav');
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down past 150px
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -150 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 md:px-6 py-3 md:py-4 mx-auto max-w-7xl mt-2 md:mt-4"
    >
      <div className="flex items-center justify-between w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm rounded-2xl px-4 md:px-6 py-2.5 md:py-3 relative">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
            <span className="text-white font-playfair font-bold text-lg leading-none">S</span>
          </div>
          <span className="font-playfair font-bold text-xl text-primary dark:text-white tracking-tight group-hover:opacity-80 transition-opacity">
            Seneca <span className="text-secondary font-inter font-normal text-sm uppercase tracking-widest ml-1">{t('deck')}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-max">
          <a href="#vision" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
            {t('vision')}
          </a>
          <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
            {t('solutions')}
          </a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
            {t('contact')}
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative z-10">
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
