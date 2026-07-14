'use client';

import { motion } from 'framer-motion';
import skillGroups from '@/content/skills.json';
import { useLanguage } from '@/lib/providers';
import { getIcon } from '@/lib/icon-map';
import SectionHeading from './SectionHeading';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('skills.eyebrow')} title={t('skills.title')} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const GroupIcon = getIcon(group.icon);
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
                className="card-glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-cyan-400">
                    <GroupIcon size={17} />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-ink-100">{group.category}</h3>
                </div>

                <div className="mt-6 space-y-5">
                  {group.items.map((skill, i) => {
                    const SkillIcon = getIcon(skill.icon);
                    return (
                      <div key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-ink-200">
                            <SkillIcon size={12} className="text-ink-500" />
                            {skill.name}
                          </span>
                          <span className="font-mono text-ink-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                            className="h-full rounded-full bg-aurora"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
