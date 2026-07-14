'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, MapIcon, CheckCircle2 } from 'lucide-react';
import profile from '@/content/profile.json';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Wire this up to your form endpoint of choice (Formspree, Resend, an API route, etc).
    setTimeout(() => setStatus('sent'), 1200);
  };

  const details = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: profile.location, href: undefined },
    { icon: Linkedin, label: 'LinkedIn Profile', href: profile.social.linkedin },
    { icon: Github, label: 'GitHub Profile', href: profile.social.github }
  ];

  return (
    <section id="contact" className="relative py-28">
      <div className="container-app">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} align="center" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, href }) => {
              const content = (
                <div className="card-glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-cyan-400/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-cyan-400">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm text-ink-200">{label}</span>
                </div>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-cursor-hover>
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}

            <div className="card-glass flex h-40 items-center justify-center rounded-xl text-ink-600">
              <div className="flex flex-col items-center gap-2">
                <MapIcon size={22} />
                <span className="text-xs">Google Maps embed placeholder</span>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="card-glass space-y-4 rounded-2xl p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-ink-400" htmlFor="name">{t('contact.name')}</label>
                <input id="name" required className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-cyan-400/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-ink-400" htmlFor="email">{t('contact.email')}</label>
                <input id="email" type="email" required className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-cyan-400/50" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-ink-400" htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" required rows={5} className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-cyan-400/50" />
            </div>
            <button type="submit" disabled={status !== 'idle'} className="btn-primary w-full disabled:opacity-70" data-cursor-hover>
              {status === 'idle' && (<><Send size={15} /> {t('contact.send')}</>)}
              {status === 'sending' && t('contact.sending')}
              {status === 'sent' && (<><CheckCircle2 size={15} /> {t('contact.sent')}</>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
