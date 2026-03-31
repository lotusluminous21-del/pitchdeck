"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, CalendarCheck, CheckCircle2, ShoppingBag, Package, Star, Camera, Brain, Sparkles, Plus, ChevronLeft, ArrowRight } from "lucide-react";

export default function MySenecaWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: Dashboard (wait 3.5s, shows fake tap)
    // 1: Camera (wait 2.5s, shows fake shutter tap)
    // 2: Scanning (wait 3s)
    // 3: Upsell (wait 4s, shows fake add tap)
    // 4: Success (wait 2.5s)
    // 5: Updated Dashboard (wait 5s, loops back to 0)
    const timers = [3500, 2500, 3000, 4000, 2500, 5000];

    if (step < timers.length) {
      const timer = setTimeout(() => {
        setStep((s) => (s + 1) % timers.length);
      }, timers[step]);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full h-full flex flex-col font-inter bg-slate-950 relative overflow-hidden text-white/90">
      
      {/* Dynamic Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          
          {/* STEP 0 and 5: Dashboard view */}
          {(step === 0 || step === 5) && (
            <motion.div
              key="dashboard"
              initial={step === 0 ? { opacity: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
              className="absolute inset-0 overflow-y-auto px-4 pb-4 pt-10 scrollbar-hide flex flex-col space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center text-white shrink-0">
                <h2 className="text-lg font-bold">Hello, Alex</h2>
                <UserCircle className="w-7 h-7 text-slate-400" />
              </div>

              {/* Recovery Progress Card */}
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl relative overflow-hidden shrink-0 mt-2">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-3xl -mr-10 -mt-10 rounded-full" />
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">Post-Op Day 14</div>
                <div className="text-base font-semibold text-white mb-2 leading-tight">Recovery on Track</div>
                <div className="w-full bg-black/50 rounded-full h-1.5 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1 }}
                    className="bg-primary h-full rounded-full"
                  />
                </div>
                <p className="text-[10px] text-primary/70">Next checkup in 16 days</p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 shrink-0 pt-1">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-1">Today&apos;s Protocol</h3>

                {/* Task 1 */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Morning Wash</div>
                    <div className="text-[10px] text-slate-500">Done · 08:30 AM</div>
                  </div>
                </div>

                {/* Task 2 (The actionable one) */}
                <motion.div 
                  animate={step === 0 ? {
                    scale: [1, 0.97, 1],
                  } : {}}
                  transition={{ delay: 3, duration: 0.3 }}
                  className={`p-3 rounded-xl border flex items-center gap-3 relative overflow-hidden transition-colors duration-500 ${step === 5 ? 'bg-slate-900/60 border-white/5' : 'bg-slate-800/80 border-secondary/40 shadow-[0_0_15px_-3px_rgba(26,100,100,0.3)]'}`}
                >
                  {/* Fake click ripple */}
                  {step === 0 && (
                     <motion.div 
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: [0, 2, 4], opacity: [0, 0.5, 0] }}
                       transition={{ delay: 3.1, duration: 0.4 }}
                       className="absolute top-1/2 left-1/2 -ml-4 -mt-4 w-8 h-8 pointer-events-none bg-white rounded-full z-10" 
                     />
                  )}
                  
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-colors duration-500 ${step === 5 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary/20 text-secondary'}`}>
                    {step === 5 ? <CheckCircle2 className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Upload Progress Photo</div>
                    <div className="text-[10px] text-slate-400">{step === 5 ? 'Done · Just now' : 'Due today by 8 PM'}</div>
                  </div>
                </motion.div>
              </div>

              {/* Care Kit Section */}
              <div className="space-y-2.5 shrink-0 pb-6 pt-1">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-1">Your Care Kit</h3>

                <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 p-3.5 rounded-xl border border-white/5 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white">Daily Finasteride 1mg</div>
                      
                      <AnimatePresence>
                        {step === 5 && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                            className="text-[11px] font-medium text-secondary flex items-center gap-1 overflow-hidden"
                          >
                            <Plus className="w-2.5 h-2.5 shrink-0" /> <span className="truncate">SENSO Soothing Serum</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3 h-3 text-secondary fill-secondary" />
                        <span className="text-[10px] text-slate-400 font-medium tracking-wide">Auto-Refill</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-white/5 pt-2">
                     <span className="text-[10px] text-slate-500">Ships April 12</span>
                     <span className="text-xs font-bold text-white transition-all duration-500">{step === 5 ? '€48' : '€29'}<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Camera View */}
          {step === 1 && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 bg-black flex flex-col z-30"
            >
              <div className="p-4 flex justify-between items-center text-white/50 z-10 w-full pt-8 h-16 shrink-0">
                 <ChevronLeft className="w-6 h-6" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Frontal View</span>
                 <div className="w-6" />
              </div>
              
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                 {/* Fake camera viewfinder */}
                 <div className="absolute inset-6 border-2 border-dashed border-white/20 rounded-[2rem]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/10" />
                 </div>
                 
                 {/* Flash effect */}
                 <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ delay: 1.8, duration: 0.3 }}
                   className="absolute inset-0 bg-white shadow-[0_0_100px_white] pointer-events-none opacity-0 z-20"
                 />
              </div>

              <div className="h-32 bg-black flex flex-col items-center justify-center pb-8 shrink-0 relative">
                 <div className="text-[10px] text-white/50 mb-4 tracking-wide font-medium">Align hairline in frame</div>
                 
                 {/* Shutter button */}
                 <motion.div 
                   animate={{ scale: [1, 0.9, 1] }}
                   transition={{ delay: 1.75, duration: 0.2 }}
                   className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center p-1 relative"
                 >
                    <div className="w-full h-full bg-white rounded-full"></div>
                    {/* Fake click ripple */}
                    <motion.div 
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: [0, 1.5, 2.5], opacity: [0, 0.5, 0] }}
                       transition={{ delay: 1.7, duration: 0.4 }}
                       className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 pointer-events-none bg-white/50 rounded-full z-10" 
                    />
                 </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: AI Scanning */}
          {step === 2 && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 z-40 text-center shadow-inner"
            >
              <div className="relative w-40 h-40 mb-10 mt-[-20px]">
                 {/* Mock image thumbnail */}
                 <div className="absolute inset-0 bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                    <Camera className="w-10 h-10 text-white/20" />
                    
                    {/* Scanning laser */}
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-emerald-400 z-20 shadow-[0_0_15px_3px_rgba(52,211,153,0.5)]"
                    />
                 </div>
                 
                 {/* Abstract rings */}
                 <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-6 border-[1.5px] border-emerald-500/30 rounded-[3rem]"
                 />
                 <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                    className="absolute -inset-10 border-[1.5px] border-emerald-500/10 rounded-[3.5rem]"
                 />
              </div>

              <Brain className="w-8 h-8 text-emerald-400 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-xs text-slate-400 max-w-[220px] leading-relaxed">Extracting follicular density & tissue health metrics...</p>
            </motion.div>
          )}

          {/* STEP 3 & 4: Insights & Upsell */}
          {(step === 3 || step === 4) && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute inset-0 bg-slate-950 flex flex-col z-40 overflow-hidden"
            >
              {/* Header */}
              <div className="pt-12 pb-5 px-5 bg-emerald-500/10 border-b border-emerald-500/20 shrink-0">
                 <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Analysis Complete</span>
                 </div>
                 <p className="text-sm font-medium text-white leading-relaxed">
                   Healing looks excellent! We noticed slight donor area dryness, which is completely normal for Day 14.
                 </p>
              </div>

              {/* Upsell Card */}
              <div className="p-5 flex-1 overflow-y-auto w-full max-w-sm mx-auto">
                 <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3 px-1">Recommended Protocol</h3>
                 
                 <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-secondary/10 p-4 rounded-2xl border border-secondary/20 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/10 blur-[40px] rounded-full pointer-events-none" />
                    
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                       <Package className="w-6 h-6 text-secondary" />
                    </div>
                    
                    <h4 className="text-base font-bold text-white mb-1">SENSO Soothing Serum</h4>
                    <p className="text-[11px] text-slate-400 mb-5 leading-relaxed pr-2">
                      Clinically proven to reduce itching and hydrate donor sites instantly.
                    </p>
                    
                    <div className="flex items-center justify-between mb-5">
                       <span className="text-lg font-bold text-white leading-none">€19<span className="text-[10px] text-slate-400 font-medium ml-1.5 align-middle">One-time add</span></span>
                    </div>
                    
                    {step === 3 ? (
                      <motion.div 
                        animate={{ scale: [1, 0.95, 1] }}
                        transition={{ delay: 3, duration: 0.2 }}
                        className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-colors"
                      >
                         {/* Fake click ripple */}
                         <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 2, 4], opacity: [0, 0.3, 0] }}
                            transition={{ delay: 3.1, duration: 0.4 }}
                            className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 pointer-events-none bg-white rounded-full z-10" 
                         />
                         Add to Next Delivery <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold flex items-center justify-center gap-2"
                      >
                         <CheckCircle2 className="w-4 h-4" /> Added to Care Kit!
                      </motion.div>
                    )}
                 </div>
                 
                 <div className="mt-5 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer">Skip for now</span>
                 </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Bottom Nav Bar */}
      <AnimatePresence>
        {(step === 0 || step === 5) && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="h-14 bg-slate-950 border-t border-white/5 px-8 flex items-center justify-between pb-1 z-20 shrink-0"
          >
            <CalendarCheck className="w-5 h-5 text-slate-500" />
            <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_12px_rgba(26,59,76,0.6)]" />
            <ShoppingBag className="w-5 h-5 text-slate-500" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
