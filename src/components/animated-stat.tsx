'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

interface AnimatedStatProps {
  value: string;
  label: string;
}

export function AnimatedStat({ value, label }: AnimatedStatProps) {
  const [displayed, setDisplayed] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const match = value.match(/^([^0-9]*)([0-9,.]*)([^0-9%]*)(%?)$/);
  const prefix = match?.[1] ?? '';
  const numStr = (match?.[2] ?? '0').replace(/,/g, '');
  const suffix = (match?.[3] ?? '') + (match?.[4] ?? '');
  const target = parseFloat(numStr) || 0;
  const hasDecimal = numStr.includes('.');
  const decimals = hasDecimal ? (numStr.split('.')[1]?.length ?? 2) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        if (prefersReducedMotion) {
          setDisplayed(hasDecimal ? target.toFixed(decimals) : target.toLocaleString());
          return;
        }

        const duration = 1400;
        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = target * easeOutQuart(progress);
          setDisplayed(hasDecimal ? current.toFixed(decimals) : Math.round(current).toLocaleString());
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasDecimal, decimals, hasAnimated]);

  return (
    <div ref={ref} className='rounded-lg border border-zinc-800 bg-zinc-950 p-6 text-center'>
      <div className='text-3xl font-bold tabular-nums text-white'>
        {prefix}
        {displayed}
        {suffix}
      </div>
      <p className='mt-2 text-sm text-zinc-400'>{label}</p>
    </div>
  );
}
