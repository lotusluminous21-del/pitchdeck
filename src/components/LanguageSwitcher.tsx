'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full shadow-sm">
      <button
        onClick={() => switchLanguage('el')}
        className={`relative px-3 py-1 text-sm font-medium rounded-full transition-colors z-10 ${
          locale === 'el' ? 'text-primary-foreground' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        {locale === 'el' && (
          <motion.div
            layoutId="lang-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        EL
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`relative px-3 py-1 text-sm font-medium rounded-full transition-colors z-10 ${
          locale === 'en' ? 'text-primary-foreground' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        {locale === 'en' && (
          <motion.div
            layoutId="lang-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        EN
      </button>
    </div>
  );
}
