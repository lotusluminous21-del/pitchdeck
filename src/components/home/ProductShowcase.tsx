'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AIBookingWidget from './widgets/AIBookingWidget';
import MySenecaWidget from './widgets/MySenecaWidget';
import NanoGenWidget from './widgets/NanoGenWidget';

const WidgetRenderer = ({ id }: { id: number }) => {
  switch (id) {
    case 1: return <AIBookingWidget />;
    case 2: return <MySenecaWidget />;
    case 3: return <NanoGenWidget />;
    default: return null;
  }
};

export default function ProductShowcase() {
  const t = useTranslations('ProductShowcase');

  const products = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  return (
    <section id="solutions" className="relative w-full py-16 md:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-24 max-w-3xl mx-auto"
        >
          <span className="text-secondary font-inter font-bold tracking-widest uppercase text-xs mb-4 block">
            {t('mainLabel')}
          </span>
          <h2 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            {t('mainTitle')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            {t('mainDesc')}
          </p>
        </motion.div>

        {/* Product Items */}
        <div className="flex flex-col">
          {products.map((p, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === products.length - 1;

            return (
              <div key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col gap-8 md:gap-16 lg:gap-24 items-center ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                >
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                    <div className="space-y-4">
                      {/* Subdued Number Label */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border text-muted-foreground font-playfair text-lg mb-4 shadow-sm">
                        0{p.id}
                      </div>
                      <h3 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                        {t(`p${p.id}Title`)}
                      </h3>
                      <p className="text-base md:text-xl font-inter text-muted-foreground leading-relaxed font-light">
                        {t(`p${p.id}Desc`)}
                      </p>
                    </div>

                    <div className="pt-4 space-y-8 flex flex-col">
                      <span className="inline-flex items-center gap-2 text-sm font-inter text-secondary tracking-wide uppercase font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        {t(`p${p.id}WidgetHint`)}
                      </span>

                      {/* Clean Minimal Risk Section instead of a dark box */}
                      <div className="pl-6 border-l-2 border-secondary/30">
                        <h4 className="font-playfair text-foreground font-bold text-lg mb-2">
                          {t(`p${p.id}RiskTitle`)}
                        </h4>
                        <p className="text-base font-inter text-muted-foreground leading-relaxed">
                          {t(`p${p.id}RiskDesc`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Widget Side */}
                  <div className="w-full lg:w-1/2 flex justify-center relative">
                    {/* Subtle ambient glow behind the phone */}
                    <div className="absolute inset-0 bg-primary/5 opacity-40 blur-[100px] -z-10 rounded-full" />
                    
                    {/* Phone Mockup Frame */}
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-slate-950 ring-1 ring-border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] border-[6px] border-slate-900 flex flex-col transition-transform duration-700 hover:scale-[1.02]">
                      {/* Fake Phone Notch */}
                      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
                         <div className="w-24 h-5 bg-slate-900 rounded-b-2xl shadow-sm"></div>
                      </div>
                      
                      {/* Widget Content */}
                      <div className="flex-1 w-full h-full pt-1">
                        <WidgetRenderer id={p.id} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Elegant Minimal Separator (skip for the last item) */}
                {!isLast && (
                  <div className="w-full h-px bg-border/40 max-w-sm mx-auto my-14 md:my-32" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
