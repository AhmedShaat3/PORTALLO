import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/lib/providers';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import LoadingScreen from '@/components/LoadingScreen';
import profile from '@/content/profile.json';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: `${profile.name} — Software Engineer, AI Specialist & Cybersecurity Professional`,
  description: profile.tagline,
  keywords: ['software engineer', 'AI specialist', 'cybersecurity', 'machine learning', 'portfolio'],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Software Engineer, AI Specialist & Cybersecurity Professional`,
    description: profile.tagline,
    type: 'website',
    images: [profile.photo]
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.name,
    description: profile.tagline
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body custom-cursor-enabled`}>
        <AppProviders>
          <LoadingScreen />
          <ScrollProgress />
          <CustomCursor />
          {children}
          <BackToTop />
        </AppProviders>
      </body>
    </html>
  );
}
