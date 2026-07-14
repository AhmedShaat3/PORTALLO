'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Twitter, ArrowDown, ShieldCheck, BrainCircuit } from 'lucide-react';
import profile from '@/content/profile.json';
import { useLanguage } from '@/lib/providers';
import AnimatedBackground from './AnimatedBackground';

function useTypingEffect(roles: string[]) {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return text;
}

export default function Hero() {
  const { t } = useLanguage();
  const typed = useTypingEffect(profile.typingRoles);

  const socials = [
    { href: profile.social.github, icon: Github, label: 'GitHub' },
    { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.social.twitter, icon: Twitter, label: 'Twitter / X' },
    { href: profile.social.email, icon: Mail, label: 'Email' }
  ];

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <AnimatedBackground />

      <div className="container-app relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow" />
            Available for select opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 flex h-8 items-center font-mono text-lg text-cyan-400 sm:text-xl"
          >
            <span>{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] animate-blink bg-cyan-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base text-ink-300 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href={profile.resumeUrl} download className="btn-primary" data-cursor-hover>
              <Download size={16} />
              {t('hero.downloadCv')}
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-ghost" data-cursor-hover>
              {t('hero.contactMe')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex items-center gap-4"
          >
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-400"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-aurora opacity-30 blur-3xl" />
          <div className="card-glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] p-2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] bg-base-800">
              {/* Swap /public/images/hero/profile-placeholder.jpg for your real headshot — same filename, zero code changes */}
              <Image src={profile.photo} alt={profile.name} fill priority sizes="416px" className="object-cover" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -left-6 top-6 flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-glow"
          >
            <ShieldCheck size={16} className="text-cyan-400" />
            <span className="text-xs font-semibold text-ink-100">Security Hardened</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="glass absolute -right-4 bottom-10 flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-glow-blue"
          >
            <BrainCircuit size={16} className="text-electric-400" />
            <span className="text-xs font-semibold text-ink-100">AI-Driven Systems</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-500"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
