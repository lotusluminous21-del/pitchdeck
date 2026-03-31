"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Camera, ShieldCheck, RefreshCw } from "lucide-react";

type MessageType = "text" | "photo-request" | "photo-upload" | "analysis";

interface ScriptItem {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  type?: MessageType;
  delayBefore: number;
  typingDuration?: number; // if user, means typed in input; if assistant, means 'Processing...' indicator
}

const script: ScriptItem[] = [
  { id: "1", role: "assistant", content: "Hello! I'm Seneca's AI assistant. I can book appointments, answer questions, and even run a quick photo pre-assessment. How can I help you today?", delayBefore: 800 },
  { id: "2", role: "user", content: "I'd like to book a consultation in Athens.", delayBefore: 1200, typingDuration: 1500 },
  { id: "3", role: "assistant", content: "I'd be happy to help! I can see our Athens clinic has availability this Thursday at 10:00 AM or Friday at 2:30 PM. Would either work for you?", delayBefore: 600, typingDuration: 2000 },
  { id: "4", role: "user", content: "Thursday at 10:00 AM works perfectly.", delayBefore: 1500, typingDuration: 1200 },
  { id: "5", role: "assistant", content: "Thursday at 10:00 AM in Athens — noted! Before I finalize your booking, would you like to upload a quick photo of your hairline? Our AI can provide a preliminary assessment so the consultant is fully prepared for your visit.", type: "photo-request", delayBefore: 600, typingDuration: 2500 },
  { id: "6", role: "user", content: "", type: "photo-upload", delayBefore: 2000, typingDuration: 0 },
  { id: "7", role: "assistant", content: "Analyzing image via Vertex AI...", type: "analysis", delayBefore: 500, typingDuration: 1200 },
  { id: "8", role: "system", content: "Pre-assessment complete — frontal recession consistent with Norwood 3. Donor area appears strong. Your consultant will have this data ready for Thursday.", delayBefore: 2500 },
  { id: "9", role: "assistant", content: "Your booking is confirmed! You'll receive a confirmation email shortly. Is there anything else I can help with?", delayBefore: 2000, typingDuration: 1500 }
];

export default function AIBookingWidget() {
  const [messages, setMessages] = useState<ScriptItem[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showAnalysis, isLoading, input]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    let typingTimerId: NodeJS.Timeout;

    if (step >= script.length) {
      return;
    }

    const currentItem = script[step];

    const executeStep = () => {
      if (currentItem.role === "system") {
        setShowAnalysis(true);
      }

      if (currentItem.role === "user" && currentItem.typingDuration && currentItem.typingDuration > 0) {
        let charIndex = 0;
        const textToType = currentItem.content;
        const interval = currentItem.typingDuration / textToType.length;
        
        typingTimerId = setInterval(() => {
          charIndex++;
          setInput(textToType.substring(0, charIndex));
          if (charIndex >= textToType.length) {
            clearInterval(typingTimerId);
            timerId = setTimeout(() => {
              setInput("");
              setMessages((prev) => [...prev, currentItem]);
              setStep((s) => s + 1);
            }, 400);
          }
        }, interval);

      } else if (currentItem.role === "assistant" && currentItem.typingDuration && currentItem.typingDuration > 0) {
        setIsLoading(true);
        timerId = setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [...prev, currentItem]);
          setStep((s) => s + 1);
        }, currentItem.typingDuration);

      } else {
        setMessages((prev) => [...prev, currentItem]);
        setStep((s) => s + 1);
      }
    };

    timerId = setTimeout(executeStep, currentItem.delayBefore);

    return () => {
      clearTimeout(timerId);
      clearInterval(typingTimerId);
    };
  }, [step]);

  const resetDemo = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setStep(0);
    setShowAnalysis(false);
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-col p-4 border-b border-white/10 bg-black/40 z-10 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center border border-primary/30">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm truncate">
              Seneca AI Concierge
            </h4>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate">Booking + Triage Active</span>
            </p>
          </div>
        </div>

        {/* Dynamic Badge Area */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider truncate">HUMAN REVIEW REQUIRED</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth pb-6">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={`${msg.id}-${index}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-secondary text-secondary-foreground"
                    : msg.role === "system"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-primary/20 text-primary border border-primary/30"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-3.5 h-3.5" />
                ) : msg.role === "system" ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <Bot className="w-3.5 h-3.5" />
                )}
              </div>

              <div
                className={`max-w-[80%] flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Standard Message Content */}
                {msg.content && (
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-br-none shadow-md shadow-secondary/10"
                        : msg.role === "system"
                        ? "bg-emerald-500/10 text-emerald-300 rounded-bl-none border border-emerald-500/20 font-mono text-xs shadow-inner"
                        : "bg-white/10 text-white rounded-bl-none backdrop-blur-md border border-white/5 shadow-lg shadow-black/20"
                    }`}
                  >
                    {msg.content}
                  </div>
                )}

                {/* Photo Request Decoration */}
                {msg.type === "photo-request" && (
                  <div className="mt-2 p-3 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col gap-2 w-full max-w-[200px] mb-1">
                    <div className="flex items-center gap-2">
                       <Camera className="w-4 h-4 text-primary animate-pulse" />
                       <span className="text-xs text-white/60 font-medium">Awaiting photo...</span>
                    </div>
                  </div>
                )}
                
                {/* Photo Upload Fake Preview */}
                {msg.type === "photo-upload" && (
                   <div className="mt-2 w-48 rounded-xl overflow-hidden border border-white/20 relative shadow-xl shadow-black/40">
                      <div className="aspect-[4/3] bg-slate-800 relative flex items-center justify-center overflow-hidden group">
                        <Camera className="w-8 h-8 text-white/20" />
                        
                        {step <= 7 && (
                          <motion.div 
                            initial={{ top: 0 }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] z-10"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 border-t border-white/10">
                           <span className="text-[10px] text-white/80 font-inter">hairline_front.jpg</span>
                        </div>
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/5 p-3.5 rounded-2xl rounded-bl-none shadow-lg shadow-black/20 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-xs text-white/60 font-medium">
                  Thinking...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area (Mocked via state changes) */}
      <div className="p-3 border-t border-white/10 bg-black/40 relative z-10">
        <div className="flex items-center gap-2 opacity-80 pointer-events-none">
          <input
            type="text"
            value={input}
            readOnly
            placeholder={step === 0 ? "Watch the demo..." : "..."}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
          />
          <button
            type="button"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              input.length > 0 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/10 text-white/40"
            }`}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        
        {/* Replay Overlay */}
        <AnimatePresence>
          {step >= script.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center border-t border-white/10"
            >
              <button 
                onClick={resetDemo}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all active:scale-95 border border-white/20 hover:border-white/40 shadow-xl"
              >
                <RefreshCw className="w-4 h-4" />
                Replay Interaction
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
