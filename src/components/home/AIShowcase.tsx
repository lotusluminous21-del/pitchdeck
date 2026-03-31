'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Camera, ScanFace, CheckCircle2, ShieldAlert, FileText, Send } from 'lucide-react';

export default function AIShowcase() {
  const t = useTranslations('AIShowcase');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'results'>('idle');

  const handleDemoStart = () => {
    setStage('scanning');
    setTimeout(() => {
      setStage('results');
    }, 3500);
  };

  const handleReset = () => {
    setStage('idle');
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-slate-950 overflow-hidden text-white border-y border-slate-800">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-16"
        >
          <span className="text-secondary font-inter font-bold tracking-widest uppercase text-sm mb-4 block">
            {t('mainLabel')}
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('mainTitle')}
          </h2>
          <p className="text-lg text-slate-400 font-inter leading-relaxed">
            {t('mainDesc')}
          </p>
        </motion.div>

        {/* Prototype Application Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* App Header */}
          <div className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <ScanFace className="w-4 h-4 text-white" />
              </div>
              <span className="font-playfair font-semibold tracking-wide text-slate-200">
                Seneca Internal: <span className="text-primary font-inter font-normal text-sm ml-2">Vertex AI Co-Pilot</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM SECURE
            </div>
          </div>

          {/* Prototype Canvas */}
          <div className="relative min-h-[500px] flex flex-col md:flex-row bg-slate-950/50">
            <AnimatePresence mode="wait">
              
              {/* STAGE: IDLE */}
              {stage === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-slate-700 bg-slate-900 flex flex-col items-center justify-center mb-8 cursor-pointer hover:border-primary/50 transition-colors group">
                    <Camera className="w-12 h-12 text-slate-500 group-hover:text-primary transition-colors mb-4" />
                    <span className="text-sm font-inter text-slate-400 max-w-[120px] leading-tight">
                      {t('uploadPrompt')}
                    </span>
                  </div>
                  <Button 
                    onClick={handleDemoStart}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 shadow-xl shadow-primary/20 text-lg group"
                  >
                    {t('startBtn')}
                  </Button>
                </motion.div>
              )}

              {/* STAGE: SCANNING & RESULTS (Shared photo area on the left) */}
              {(stage === 'scanning' || stage === 'results') && (
                <>
                  {/* Left Column: Image Context */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 border-r border-slate-800/50 flex flex-col justify-center relative"
                  >
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50">
                      {/* Using the generated diagnosis image to simulate the uploaded photo */}
                      <Image 
                        src="/images/ai_diagnosis.png" 
                        alt="Patient Scan" 
                        fill 
                        className="object-cover opacity-60"
                      />
                      
                      {stage === 'scanning' && (
                        <>
                          <motion.div 
                            animate={{ y: [0, 400, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute top-0 left-0 right-0 h-1 bg-secondary shadow-[0_0_20px_rgba(179,139,93,1)] z-20"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-10" />
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Right Column: AI Analysis Output */}
                  <div className="w-full md:w-[55%] p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                    {stage === 'scanning' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-6"
                      >
                         <ShieldAlert className="w-16 h-16 text-secondary animate-pulse" />
                         <p className="font-inter text-lg text-slate-300 font-medium">
                           {t('scanningText')}
                         </p>
                      </motion.div>
                    )}

                    {stage === 'results' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col h-full h-full"
                      >
                        <div className="mb-6 flex items-start gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-[inset_0_1px_1px_rgba(255,185,0,0.1)]">
                          <div className="mt-0.5 p-1.5 rounded-full bg-amber-500/10 shrink-0">
                            <ShieldAlert className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1 text-amber-500/90 text-[11px] font-bold uppercase tracking-widest">
                              Human-In-The-Loop Required
                            </div>
                            <p className="text-amber-500/70 text-xs font-inter leading-relaxed">
                              {t('disclaimer')}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6 flex-1">
                          <h4 className="font-playfair text-2xl font-bold text-white">
                            {t('analysisHeadline')}
                          </h4>
                          
                          <div className="bg-slate-900 rounded-xl p-5 border border-slate-700/50">
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
                              <FileText className="w-4 h-4 text-primary" />
                              {t('findings')}
                            </span>
                            <p className="text-slate-400 font-inter text-sm leading-relaxed">
                              {t('findingsText')}
                            </p>
                          </div>

                          <div className="bg-slate-900 rounded-xl p-5 border border-slate-700/50 shadow-inner">
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              {t('action')}
                            </span>
                            <p className="text-slate-200 font-inter text-sm font-medium">
                              {t('actionText')}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                          <Button 
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {t('approveBtn')}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={handleReset}
                            className="bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl px-4"
                          >
                            Reset
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
