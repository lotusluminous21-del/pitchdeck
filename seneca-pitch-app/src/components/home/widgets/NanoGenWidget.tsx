"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, ChevronRight, Calendar } from "lucide-react";

export default function NanoGenWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: Landing (wait 3.5s, shows fake start tap)
    // 1: Scanning (wait 3.5s)
    // 2: Processing (wait 2.5s)
    // 3: Swipe Reveal (wait 4.5s)
    // 4: CTA (wait 4s, shows fake book tap) => loops back
    const timers = [3500, 3500, 2500, 4500, 4000];

    if (step < timers.length) {
      const timer = setTimeout(() => {
        setStep((s) => (s + 1) % timers.length);
      }, timers[step]);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full h-full flex flex-col font-inter bg-slate-950 relative overflow-hidden text-white/90">
      
      {/* Background Images Layer */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-black"
          >
             {/* Before Image */}
             <div className="absolute inset-0">
               {/* Using next/img or raw img tags for the generated public assets */}
               <img src="/visualizer/before.png" alt="Before Hairline" className="w-full h-full object-cover object-top opacity-70" />
             </div>

             {/* After Image (revealed via clipPath) */}
             <motion.div 
               initial={{ clipPath: "inset(0 100% 0 0)" }}
               animate={step >= 3 ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
               transition={step >= 3 ? { duration: 2.5, ease: "easeInOut", delay: 0.5 } : { duration: 0 }}
               className="absolute inset-0 z-10"
             >
                <img src="/visualizer/after.png" alt="After Simulated Hairline" className="w-full h-full object-cover object-top opacity-90" />
             </motion.div>

             {/* Swipe Line indicator */}
             {step >= 3 && step <= 4 && (
               <motion.div
                 initial={{ left: "0%", opacity: 0 }}
                 animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                 transition={{ 
                    left: { duration: 2.5, ease: "easeInOut", delay: 0.5 },
                    opacity: { times: [0, 0.1, 0.9, 1], duration: 3, delay: 0.2 }
                 }}
                 className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
               >
                   <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center shrink-0">
                       <div className="flex gap-1 border border-transparent">
                           <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
                           <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
                       </div>
                   </div>
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: Landing */}
        {step === 0 && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.5 } }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-slate-950"
          >
             <motion.div 
               initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
               className="w-20 h-20 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
             >
               <ScanFace className="w-10 h-10 text-secondary" />
             </motion.div>
             <h3 className="text-xl font-playfair font-bold text-white mb-2">Seneca Visualizer</h3>
             <p className="text-xs text-slate-400 mb-10 leading-relaxed max-w-[240px] mx-auto">
               See your future hairline hyper-accurately simulated by our clinical AI before you even step in the clinic.
             </p>
             
             <div className="relative w-full max-w-[200px]">
               <div className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 border border-white/20">
                 Analyze My Hairline <ChevronRight className="w-4 h-4 ml-1" />
               </div>
               <motion.div 
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: [0, 2, 4], opacity: [0, 0.2, 0] }}
                 transition={{ delay: 2.8, duration: 0.5 }}
                 className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 pointer-events-none bg-black rounded-full z-10" 
               />
             </div>
          </motion.div>
        )}

        {/* STEP 1: Scanning Array over Before image */}
        {step === 1 && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col justify-end pb-10 px-4"
          >
             {/* Reticle / Face mapping overlay */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[340px] border border-white/10 rounded-[3rem] z-10 pointer-events-none">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
             </div>
             
             {/* Scanning grid overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(26,100,100,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,100,100,0.1)_1px,transparent_1px)] bg-[size:15px_15px] mix-blend-overlay opacity-50 z-10 pointer-events-none"></div>
             
             {/* Scanline vertical */}
             <motion.div 
               initial={{ top: 0 }}
               animate={{ top: "100%" }}
               transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-0.5 bg-secondary shadow-[0_0_20px_5px_rgba(234,179,8,0.4)] z-20 pointer-events-none"
             />

             {/* UI Panel */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10 z-30 flex items-center gap-4 shadow-2xl mx-1"
             >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                   <ScanFace className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <div className="flex-1">
                   <div className="text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
                     AR Analysis <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                   </div>
                   <div className="text-[10px] text-slate-300 font-mono leading-tight pr-2">Mapping Norwood 3 follicular depletion zones...</div>
                </div>
             </motion.div>
          </motion.div>
        )}

        {/* STEP 2: Processing Block */}
        {step === 2 && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center px-6"
          >
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="w-14 h-14 rounded-full border-t-2 border-r-2 border-primary mb-6 shadow-[0_0_30px_rgba(26,100,100,0.5)]"
             />
             <h3 className="text-lg font-playfair font-bold text-white mb-2 text-center leading-tight">Seneca AI<br/>Neural Generation</h3>
             <p className="text-[10px] text-slate-300 text-center uppercase tracking-widest font-mono opacity-80 mt-1">Simulating 3,500 Grafts...</p>
          </motion.div>
        )}

        {/* STEP 3 & 4: Reveal and CTA */}
        {(step === 3 || step === 4) && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
             {/* Top badges */}
             <div className="absolute inset-x-0 top-0 pt-8 px-5 flex justify-between items-start">
               <motion.div 
                 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                 className="bg-black/70 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl"
               >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-white font-bold tracking-widest uppercase">Projected Result</span>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }}
                 className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center"
               >
                  <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Max Density</span>
               </motion.div>
             </div>
             
             {/* Details CTA - only pops in late on step 4 */}
             <AnimatePresence>
               {step === 4 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                   className="absolute inset-x-0 bottom-0 pt-20 pb-8 px-5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center pointer-events-auto"
                 >
                    <h3 className="text-white text-lg font-playfair font-bold mb-1 shadow-black drop-shadow-lg">Make It Reality</h3>
                    <p className="text-slate-200 text-xs mb-5 text-center px-4">Receive a personalized plan matching this projection.</p>
                    
                    <div className="w-full relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      <div className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold flex items-center justify-center gap-2">
                         <Calendar className="w-4 h-4 text-secondary" /> Book Consultation
                      </div>
                      {/* Fake click ripple */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 2, 4], opacity: [0, 0.2, 0] }}
                        transition={{ delay: 2.8, duration: 0.5 }}
                        className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 pointer-events-none bg-black rounded-full z-10" 
                      />
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
