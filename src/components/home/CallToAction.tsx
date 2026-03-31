'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Phone, ShieldCheck, Users, Globe, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CallToAction() {
  const t = useTranslations('CTA');

  const badges = [
    { icon: ShieldCheck, label: t('badge1') },
    { icon: Brain, label: t('badge2') },
    { icon: Globe, label: t('badge3') },
    { icon: Users, label: t('badge4') },
  ];

  return (
    <section id="contact" className="relative w-full py-16 md:py-36 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            {t('headline')}
          </h2>

          <p className="text-base md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="mailto:lotus.luminous.21@gmail.com" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-8 md:px-10 h-14 md:h-16 text-base md:text-lg font-medium shadow-[0_8px_30px_rgb(26,59,76,0.25)] hover:shadow-[0_8px_30px_rgb(26,59,76,0.45)] transition-all duration-300 group"
              >
                <Mail className="mr-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                {t('primaryBtn')}
              </Button>
            </a>

            <a href="tel:+306949604038" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full px-8 md:px-10 h-14 md:h-16 text-base md:text-lg font-medium border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group"
              >
                <Phone className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('secondaryBtn')}
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 pt-10 md:mt-24 md:pt-16 border-t border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-3 md:gap-5 group cursor-default"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:shadow-[0_8px_30px_-4px_rgba(26,59,76,0.1)] group-hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary dark:text-white/80 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium font-inter text-slate-600 dark:text-slate-400 text-center leading-tight max-w-[140px]">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
