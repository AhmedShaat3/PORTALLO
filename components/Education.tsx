'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import education from '@/content/education.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('education.eyebrow')} title={t('education.title')} />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-400">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-100">{edu.university}</h3>
                    <p className="text-sm text-ink-400">{edu.degree}</p>
                  </div>
                </div>
                <span className="whitespace-nowrap font-mono text-xs text-ink-500">{edu.year}</span>
              </div>

              <p className="mt-4 text-xs font-medium text-electric-400">{edu.gpa}</p>

              <div className="mt-4">
                <span className="text-xs uppercase tracking-wide text-ink-500">{t('education.coursework')}</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {edu.coursework.map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-ink-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
