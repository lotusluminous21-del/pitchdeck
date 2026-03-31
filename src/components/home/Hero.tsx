'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useState, useRef, useCallback } from 'react';

const HeroParticles = dynamic(() => import('./HeroParticles'), {
  ssr: false,
  loading: () => null,
});

/* ─── Luxurious easing curve ─── */
const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Progress thresholds for each content element ─── */
// Particles grow 0→1 over ~3.5s. Each element appears when particles
// reach a specific growth %, creating a guided reveal sequence:
// Context (badge) → Value prop (headline) → Detail (subheadline) → Action (CTA) → Navigation (scroll)
const THRESHOLDS = {
  badge: 0.50,       // ~1.8s – context appears as the field takes shape
  headline: 0.60,    // ~2.1s – the star of the show enters
  subheadline: 0.72, // ~2.6s – supporting detail follows
  cta: 0.82,         // ~2.9s – call to action once the story is told  
  scroll: 0.92,      // ~3.3s – navigation hint last
} as const;

function MagneticCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.12);
    y.set((e.clientY - cy) * 0.12);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reveal wrapper: fades up each element once its threshold fires ─── */
function RevealItem({
  show,
  children,
  className = '',
  y: yOffset = 20,
  duration = 1.0,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration, ease: LUXURY_EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const sectionRef = useRef<HTMLElement>(null);


  const mousePosRef = useRef({ x: 0, y: 0, active: false });

  // Track which elements have been revealed (one-way: once shown, stays shown)
  const [revealed, setRevealed] = useState({
    badge: false,
    headline: false,
    subheadline: false,
    cta: false,
    scroll: false,
  });



  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePosRef.current = { x: nx, y: ny, active: true };
  }, []);

  const handlePointerLeave = useCallback(() => {
    mousePosRef.current = { ...mousePosRef.current, active: false };
  }, []);

  // Called every frame from the Three.js render loop with entrance progress (0→1)
  const handleEntranceProgress = useCallback((progress: number) => {
    setRevealed(prev => {
      let changed = false;
      const next = { ...prev };
      for (const [key, threshold] of Object.entries(THRESHOLDS)) {
        const k = key as keyof typeof THRESHOLDS;
        if (!prev[k] && progress >= threshold) {
          next[k] = true;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[85vh] md:min-h-[92vh] flex flex-col items-center justify-center pt-20 md:pt-28 pb-10 md:pb-12 overflow-hidden bg-background"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ touchAction: 'pan-y' }}
    >
      <HeroParticles mousePos={mousePosRef} onEntranceProgress={handleEntranceProgress} />

      {/* Softer, constrained ambient glow – synced with particle growth */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(179,139,93,0.08) 0%, transparent 65%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />

      {/* ─── Sequenced Content Reveal ─── */}
      <div className="w-full max-w-5xl mx-auto px-5 md:px-12 text-center flex flex-col items-center relative z-10">

        {/* 1. Badge — contextual anchor */}
        <RevealItem show={revealed.badge} className="mb-4" y={12} duration={0.8}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span className="text-sm font-medium tracking-wider font-inter uppercase">{t('badge')}</span>
          </div>
        </RevealItem>

        {/* 2. Headline — the centrepiece, slower & grander reveal */}
        <RevealItem show={revealed.headline} y={24} duration={1.2}>
          <h1 className="font-playfair font-semibold tracking-tight text-foreground leading-[1.05] mb-3 md:mb-4 text-[2.5rem] md:text-7xl lg:text-[6.5rem]">
            {t('headlineP1')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t('headlineP2')}
            </span>
          </h1>
        </RevealItem>

        {/* 3. Subheadline — supporting detail */}
        <RevealItem show={revealed.subheadline} y={16} duration={0.9}>
          <p className="text-base md:text-xl text-muted-foreground font-inter max-w-2xl leading-relaxed mb-6 md:mb-8">
            {t('subheadline')}
          </p>
        </RevealItem>

        {/* 4. CTA — the payoff */}
        <RevealItem show={revealed.cta} className="mb-6 md:mb-10" y={18} duration={0.9}>
          <MagneticCTA>
            <a href="#vision">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 md:px-10 h-14 md:h-16 text-base md:text-lg font-medium transition-all duration-300 group shadow-[0_12px_40px_-8px_rgba(179,139,93,0.3)] hover:shadow-[0_20px_50px_-12px_rgba(179,139,93,0.5)]"
              >
                {t('cta')}
                <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>
          </MagneticCTA>
        </RevealItem>
      </div>

      {/* 5. Scroll indicator — final ambient hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed.scroll
          ? { opacity: [0.3, 0.7, 0.3] }
          : { opacity: 0 }
        }
        transition={revealed.scroll
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.3 }
        }
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-inter uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <div className="w-4 h-6 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-secondary/80"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
