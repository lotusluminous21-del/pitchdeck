'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ExecutiveSummary() {
  const t = useTranslations('ExecSummary');

  return (
    <section id="strategy" className="relative w-full py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Abstract background elements for "room to rest" */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
          
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-12 leading-tight">
            {t('title')}
          </h2>

          <div className="space-y-8 text-lg font-inter text-muted-foreground leading-relaxed">
            <p className="text-xl md:text-2xl font-playfair text-foreground/90 leading-snug">
              {t('p1')}
            </p>
            
            <p className="font-semibold text-primary">
              {t('p2')}
            </p>
            
            <p>
              {t('p3')}
            </p>

            <div className="pt-6 border-t border-border/50">
              <p className="italic text-foreground/80">
                "{t('p4')}"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
