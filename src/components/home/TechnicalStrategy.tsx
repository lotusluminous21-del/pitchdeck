'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers, User, ShieldX, Server, Code, Database, Globe } from 'lucide-react';

export default function TechnicalStrategy() {
  const t = useTranslations('TechStrategy');

  return (
    <section id="risks" className="relative w-full py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <span className="text-secondary font-inter font-bold tracking-widest uppercase text-sm mb-4 block">
            {t('mainLabel')}
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('mainTitle')}
          </h2>
          <p className="text-lg text-muted-foreground font-inter">
            {t('mainDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Tech Stack & Dev Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Dev Profile */}
            <div>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
                <User className="w-6 h-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">
                  {t('devLabel')}
                </h3>
              </div>
              <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                {t('devDesc')}
              </p>
            </div>

            {/* Tech Stack List */}
            <div>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
                <Layers className="w-6 h-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">
                  {t('stackLabel')}
                </h3>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 font-inter text-foreground/80">
                <li className="flex items-start gap-4">
                  <Code className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>{t('s1')}</span>
                </li>
                <li className="flex items-start gap-4">
                  <Database className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>{t('s2')}</span>
                </li>
                <li className="flex items-start gap-4">
                  <Server className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>{t('s3')}</span>
                </li>
                <li className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>{t('s4')}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Red Team Vetoes */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-destructive/5 dark:bg-destructive/10 border border-destructive/20 rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                  <ShieldX className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground">
                  {t('vetoTitle')}
                </h3>
              </div>

              <div className="space-y-6 font-inter border-l-2 border-destructive/30 pl-4">
                <p className="text-foreground/80 leading-relaxed text-sm">
                  <strong className="text-destructive font-semibold">1. </strong>
                  {t('veto1')}
                </p>
                <div className="w-full h-px bg-border/50" />
                <p className="text-foreground/80 leading-relaxed text-sm">
                  <strong className="text-destructive font-semibold">2. </strong>
                  {t('veto2')}
                </p>
                <div className="w-full h-px bg-border/50" />
                <p className="text-foreground/80 leading-relaxed text-sm">
                  <strong className="text-destructive font-semibold">3. </strong>
                  {t('veto3')}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
