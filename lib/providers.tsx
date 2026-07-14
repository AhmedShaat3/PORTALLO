'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '@/content/translations.json';

type Theme = 'dark' | 'light';
type Lang = 'en' | 'ar';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface LanguageContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNested(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    const storedLang = (localStorage.getItem('lang') as Lang) || 'en';
    setTheme(storedTheme);
    setLang(storedLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
  }, [lang, mounted]);

  const themeValue = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme: () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')) }),
    [theme]
  );

  const languageValue = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      toggleLanguage: () => setLang((p) => (p === 'en' ? 'ar' : 'en')),
      t: (key: string) => getNested((translations as any)[lang], key) ?? key
    }),
    [lang]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={languageValue}>{children}</LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within AppProviders');
  return ctx;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within AppProviders');
  return ctx;
}
