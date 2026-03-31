'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TheGap() {
  const t = useTranslations('TheGap');

  return (
    <section id="vision" className="relative w-full py-16 md:py-36 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 md:space-y-8 pl-5 md:pl-10 border-l-4 border-secondary/40 py-2 relative"
        >
          <div className="absolute top-0 -left-1 w-1 h-12 bg-secondary rounded-full" />

          <p className="font-playfair text-2xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.3] tracking-tight font-medium">
            {t('line1')}
          </p>

          <p className="font-playfair text-2xl md:text-4xl lg:text-[2.75rem] text-foreground/60 leading-[1.3] tracking-tight font-medium italic">
            {t('line2')}
          </p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-secondary font-inter text-lg md:text-2xl font-semibold pt-3 md:pt-4"
          >
            {t('line3')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
