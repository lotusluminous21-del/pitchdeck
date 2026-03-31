"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scan, Activity, FileCheck2, Camera } from "lucide-react";

export default function AIDiagnosisWidget() {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleScan = () => {
    if (scanning || complete) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setComplete(true);
    }, 3000);
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative flex flex-col font-inter">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
            <Scan className="w-4 h-4 text-primary" />
          </div>
          <h4 className="font-semibold text-white">Vision AI Triage</h4>
        </div>
        {complete && (
          <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1">
            <CheckIcon className="w-3 h-3" />
            ANALYSIS COMPLETE
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        {/* Scanner Viewport */}
        <div 
          className="flex-1 rounded-xl bg-black border border-white/5 relative overflow-hidden flex items-center justify-center cursor-pointer group"
          onClick={handleScan}
        >
          {/* Mock Scalp / Grid Image */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black opacity-50"></div>
          
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Central Target */}
          {!scanning && !complete && (
            <div className="z-10 text-center flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity">
              <Camera className="w-10 h-10 text-white/50 mb-3" />
              <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Click to Analyze Donor Area</p>
            </div>
          )}

          {/* Scanning Animation */}
          {scanning && (
            <>
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-1 bg-primary z-20 shadow-[0_0_20px_rgba(234,179,8,1)]"
              />
              <div className="absolute inset-0 bg-primary/5 z-10 animate-pulse"></div>
            </>
          )}

          {/* Result Overlay */}
          {complete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
            >
              <div className="relative">
                <div className="absolute inset-0 border-2 border-primary/50 rounded-full w-48 h-48 -m-24 animate-[spin_10s_linear_infinite] border-dashed"></div>
                <div className="border border-primary bg-primary/10 backdrop-blur-md px-4 py-2 text-primary font-mono text-sm tracking-widest font-bold shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  78 FU/cm² MATCH
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Panel */}
        <div className="w-full md:w-64 flex flex-col gap-3">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex-1">
            <h5 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Live Telemetry</h5>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Follicular Density</span>
                  {complete ? <span className="text-primary font-mono">78 FU/cm²</span> : <span>--</span>}
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: complete ? "78%" : "0%" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Strand Diameter</span>
                  {complete ? <span className="text-emerald-400 font-mono">0.08mm</span> : <span>--</span>}
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: complete ? "65%" : "0%" }}
                    transition={{ delay: 0.2 }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Donor Viability</span>
                  {complete ? <span className="text-amber-400 font-mono">HIGH</span> : <span>--</span>}
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: complete ? "85%" : "0%" }}
                    transition={{ delay: 0.4 }}
                    className="h-full bg-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={!complete}
            className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm transition-all
              ${complete ? 'bg-white hover:bg-slate-200 text-black border-transparent shadow-lg shadow-white/20' : 'bg-transparent text-slate-600 border-white/10 cursor-not-allowed'}
            `}
          >
            <FileCheck2 className="w-4 h-4" />
            Generate Protocol
          </button>

          {complete && (
            <button 
              onClick={() => { setComplete(false); setScanning(false); }}
              className="text-xs text-slate-500 hover:text-white transition-colors text-center pb-2"
            >
              Reset Scan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
