'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/lib/providers';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Switch language"
      data-cursor-hover
      className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-ink-300 transition-colors hover:text-cyan-400"
    >
      <Languages size={14} />
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
