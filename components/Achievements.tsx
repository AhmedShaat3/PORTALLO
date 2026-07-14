'use client';

import { motion } from 'framer-motion';
import achievements from '@/content/achievements.json';
import { useLanguage } from '@/lib/providers';
import { getIcon } from '@/lib/icon-map';
import SectionHeading from './SectionHeading';

export default function Achievements() {
  const { t } = useLanguage();

  return (
    <section id="awards" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('awards.eyebrow')} title={t('awards.title')} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => {
            const Icon = getIcon(a.icon);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 24, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glass relative overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-aurora opacity-10 blur-2xl" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-400 shadow-glow">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold leading-snug text-ink-100">{a.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">{a.description}</p>
                <span className="mt-4 inline-block font-mono text-[11px] text-electric-400">{a.date}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
