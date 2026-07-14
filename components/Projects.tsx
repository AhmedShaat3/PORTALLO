'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Users, Activity } from 'lucide-react';
import projects from '@/content/projects.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

export default function Projects() {
  const { t } = useLanguage();
  const categories = useMemo(() => [t('projects.all'), ...Array.from(new Set(projects.map((p) => p.category)))], [t]);
  const [active, setActive] = useState(t('projects.all'));

  const filtered = active === t('projects.all') ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-28">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-cursor-hover
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  active === cat
                    ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-400'
                    : 'border-white/10 bg-white/[0.02] text-ink-400 hover:text-ink-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass group overflow-hidden rounded-2xl"
            >
              <div className="relative h-52 overflow-hidden bg-base-800">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-ink-200 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-ink-100">{project.title}</h3>
                <p className="mt-2 text-sm text-ink-400">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-ink-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-5 text-xs text-ink-500">
                  <span className="flex items-center gap-1"><Star size={12} /> {project.stats.stars}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {project.stats.users}</span>
                  <span className="flex items-center gap-1"><Activity size={12} /> {project.stats.uptime}</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <a href={project.github} target="_blank" rel="noreferrer" data-cursor-hover className="btn-ghost flex-1 !py-2 text-xs">
                    <Github size={14} /> {t('projects.viewGithub')}
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer" data-cursor-hover className="btn-primary flex-1 !py-2 text-xs">
                    <ExternalLink size={14} /> {t('projects.viewDemo')}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
