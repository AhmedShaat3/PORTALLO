'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { useLanguage } from '@/lib/providers';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import profile from '@/content/profile.json';
import projects from '@/content/projects.json';
import skills from '@/content/skills.json';

const SECTIONS = [
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'projects' },
  { id: 'certificates', key: 'certificates' },
  { id: 'awards', key: 'awards' },
  { id: 'education', key: 'education' },
  { id: 'gallery', key: 'gallery' },
  { id: 'testimonials', key: 'testimonials' },
  { id: 'contact', key: 'contact' }
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const searchIndex = useMemo(() => {
    const projectItems = projects.map((p) => ({ label: p.title, type: 'Project', target: 'projects' }));
    const skillItems = skills.flatMap((cat) => cat.items.map((s) => ({ label: s.name, type: 'Skill', target: 'skills' })));
    return [...projectItems, ...skillItems];
  }, []);

  const results = query.trim()
    ? searchIndex.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  const scrollTo = (id: string) => {
    setOpen(false);
    setSearchOpen(false);
    setQuery('');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4">
      <div
        className={`container-app flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass shadow-panel' : 'bg-transparent'
        }`}
      >
        <button onClick={() => scrollTo('hero')} className="font-display text-sm font-semibold tracking-wide text-ink-100" data-cursor-hover>
          {profile.name.split(' ').map((w) => w[0]).join('')}
          <span className="text-cyan-400">.</span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-xs font-medium uppercase tracking-wide text-ink-300 transition-colors hover:text-cyan-400"
              data-cursor-hover
            >
              {t(`nav.${s.key}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search site"
              data-cursor-hover
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-300 transition-colors hover:text-cyan-400"
            >
              <Search size={16} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass absolute right-0 top-12 w-72 rounded-2xl p-3 rtl:right-auto rtl:left-0"
                >
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects, skills…"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none"
                  />
                  {results.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {results.map((r, i) => (
                        <li key={i}>
                          <button
                            onClick={() => scrollTo(r.target)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink-200 hover:bg-white/5"
                          >
                            <span>{r.label}</span>
                            <span className="font-mono text-[10px] text-ink-500">{r.type}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ThemeToggle />
          <LanguageToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-cursor-hover
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-300 lg:hidden"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col bg-base-950/98 p-6 lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                <X size={18} />
              </button>
            </div>
            <nav className="mt-10 flex flex-1 flex-col items-center justify-center gap-6">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="font-display text-2xl font-medium text-ink-100 transition-colors hover:text-cyan-400"
                >
                  {t(`nav.${s.key}`)}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
