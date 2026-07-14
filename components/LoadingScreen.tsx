'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 22, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
        }
        return next;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-base-950"
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="grid-overlay absolute inset-0 opacity-60" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="font-mono text-sm tracking-[0.3em] text-cyan-400">
              INITIALIZING<span className="animate-blink">_</span>
            </div>
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-aurora"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="font-mono text-xs text-ink-500">{Math.floor(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
