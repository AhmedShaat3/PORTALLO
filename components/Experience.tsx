'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import experience from '@/content/experience.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />

        <div className="relative mt-14 border-s border-white/10 ps-8 sm:ps-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -start-[41px] top-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 bg-base-950 sm:-start-[49px]">
                <Image src={job.logo} alt={job.company} width={20} height={20} />
              </span>

              <div className="card-glass rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-100">{job.position}</h3>
                    <p className="mt-0.5 text-sm text-cyan-400">{job.company} · {job.location}</p>
                  </div>
                  <span className="font-mono text-xs text-ink-500">{job.period}</span>
                </div>

                <p className="mt-4 text-sm text-ink-300">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-ink-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-1.5">
                  {job.achievements.map((a) => (
                    <div key={a} className="flex items-start gap-2 text-xs text-ink-400">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-electric-400" />
                      <span>{a}</span>
                    </div>
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
