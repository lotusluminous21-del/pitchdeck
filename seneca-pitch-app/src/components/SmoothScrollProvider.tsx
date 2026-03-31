'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

function AnchorScroller() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(anchor.hash, { offset: -80 }); // offset for sticky header
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      smoothWheel: true
    }}>
      <AnchorScroller />
      {children}
    </ReactLenis>
  );
}
