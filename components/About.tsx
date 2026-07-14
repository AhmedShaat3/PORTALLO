'use client';

import { motion } from 'framer-motion';
import { Compass, Shield, Sparkles, Target } from 'lucide-react';
import profile from '@/content/profile.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

const VALUE_ICONS = [Shield, Sparkles, Target, Compass];

export default function About() {
  const { t } = useLanguage();
  const { biography, mission, values, timeline } = profile.about;

  return (
    <section id="about" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            {biography.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="mb-4 text-ink-300"
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-glass mt-6 rounded-2xl p-6"
            >
              <span className="section-eyebrow">{t('about.missionLabel')}</span>
              <p className="mt-3 font-display text-lg text-ink-100">{mission}</p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="card-glass rounded-xl p-5"
                  >
                    <Icon size={18} className="text-cyan-400" />
                    <h3 className="mt-3 text-sm font-semibold text-ink-100">{v.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{v.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <span className="section-eyebrow">{t('about.journeyLabel')}</span>
            <ol className="relative mt-6 border-s border-white/10 ps-6">
              {timeline.map((item, i) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative mb-8 last:mb-0"
                >
                  <span className="absolute -start-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/60 bg-base-950">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                  <span className="font-mono text-xs text-cyan-400">{item.year}</span>
                  <p className="mt-1 text-sm text-ink-200">{item.label}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
