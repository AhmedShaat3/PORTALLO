'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import testimonials from '@/content/testimonials.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} align="center" />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote className="mx-auto mb-4 text-cyan-400/40" size={32} />

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="card-glass rounded-2xl p-8 text-center"
              >
                <p className="text-base leading-relaxed text-ink-200">"{current.quote}"</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white/5">
                    <Image src={current.photo} alt={current.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-sm font-semibold text-ink-100">{current.name}</p>
                    <p className="text-xs text-ink-500">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" data-cursor-hover className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 hover:text-cyan-400">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((tst, i) => (
                <button
                  key={tst.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" data-cursor-hover className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 hover:text-cyan-400">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
