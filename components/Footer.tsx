'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import profile from '@/content/profile.json';
import { useLanguage } from '@/lib/providers';

const LINKS = ['about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { href: profile.social.github, icon: Github },
    { href: profile.social.linkedin, icon: Linkedin },
    { href: profile.social.twitter, icon: Twitter },
    { href: profile.social.email, icon: Mail }
  ];

  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="container-app grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <span className="font-display text-lg font-semibold text-ink-100">{profile.name}</span>
          <p className="mt-2 max-w-xs text-sm text-ink-500">{profile.title}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('footer.quickLinks')}</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {LINKS.map((id) => (
              <li key={id}>
                <button
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-ink-400 transition-colors hover:text-cyan-400"
                >
                  {t(`nav.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('footer.connect')}</h4>
          <div className="mt-3 flex gap-3">
            {socials.map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 transition-colors hover:text-cyan-400"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app mt-10 border-t border-white/5 pt-6 text-center text-xs text-ink-600">
        © {year} {profile.name}. {t('footer.rights')}
      </div>
    </footer>
  );
}
