"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Activity } from "lucide-react";

export default function ClinicOSWidget() {
  const metrics = [
    { label: "Monthly MRR Config.", value: "€124,500", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Active Patients", value: "842", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Booked Slots", value: "94%", icon: Calendar, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "AI Lead Conv.", value: "18.2%", icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" }
  ];

  return (
    <div className="w-full h-full min-h-[400px] bg-[#0a0f18] rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 font-inter flex flex-col justify-between">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Clinic OS Portal</h3>
          <p className="text-sm text-slate-400 mt-1">Unified Performance Overview</p>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Data Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${metric.bg}`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">{metric.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between"
      >
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white">AI Revenue Predictor</div>
          <div className="text-xs text-slate-400">Projected Q3 Growth based on real-time bookings</div>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-mono font-bold">+24.5%</div>
        </div>
      </motion.div>
    </div>
  );
}
