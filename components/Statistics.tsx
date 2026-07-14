'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import stats from '@/content/stats.json';
import { useLanguage } from '@/lib/providers';
import { getIcon } from '@/lib/icon-map';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-ink-100 sm:text-5xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const { t } = useLanguage();

  return (
    <section id="statistics" className="relative py-24">
      <div className="container-app">
        <div className="card-glass rounded-3xl px-6 py-14">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-ink-100">{t('stats.title')}</h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex flex-col items-center text-center"
                >
                  <Icon size={20} className="mb-3 text-cyan-400" />
                  <Counter value={s.value} suffix={s.suffix} />
                  <span className="mt-1 text-xs text-ink-500">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
