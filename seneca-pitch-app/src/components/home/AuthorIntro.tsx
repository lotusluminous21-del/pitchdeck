'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AuthorIntro() {
  const t = useTranslations('AuthorIntro');

  return (
    <section className="relative w-full py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center md:items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl transform scale-150" />
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[4px] border-slate-200 dark:border-slate-800 shadow-lg">
              <Image 
                src="/images/profile_pic.png" 
                alt="Fotis (Lotus) Dovas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 192px"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col text-center md:text-left space-y-4 flex-1">
            <div>
              <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-2 block opacity-90">
                {t('label')}
              </span>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t('name')}
              </h3>
              <p className="text-base md:text-lg font-medium text-slate-600 dark:text-slate-400 mt-2 font-inter">
                {t('title')}
              </p>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground font-inter leading-relaxed max-w-2xl">
              {t('description')}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-5">
              <a href="https://www.linkedin.com/in/fotis-dovas-358a46184/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full rounded-full px-6 h-12 border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-all duration-300 font-medium group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#0A66C2] dark:text-[#70B5F9] group-hover:scale-110 transition-transform">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  {t('linkedinBtn')}
                </Button>
              </a>
              <span className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                {t('experience')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
