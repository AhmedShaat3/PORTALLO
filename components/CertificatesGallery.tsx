'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, X, ImageOff } from 'lucide-react';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';
import type { CertificateEntry } from '@/lib/media';

export default function CertificatesGallery({ certificates }: { certificates: CertificateEntry[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>(t('certificates.all'));
  const [preview, setPreview] = useState<CertificateEntry | null>(null);

  const categories = useMemo(
    () => [t('certificates.all'), ...Array.from(new Set(certificates.map((c) => c.category)))],
    [certificates, t]
  );

  const filtered = active === t('certificates.all') ? certificates : certificates.filter((c) => c.category === active);

  return (
    <section id="certificates" className="relative py-28">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t('certificates.eyebrow')}
            title={t('certificates.title')}
            description="Drop new certificate images into /public/certificates — they show up here automatically."
          />
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
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
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="card-glass mt-12 flex flex-col items-center gap-3 rounded-2xl p-16 text-center">
            <ImageOff className="text-ink-600" size={28} />
            <p className="text-sm text-ink-400">No certificates yet — add images to /public/certificates to populate this gallery.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, i) => (
              <motion.button
                key={cert.file}
                onClick={() => setPreview(cert)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="card-glass group overflow-hidden rounded-2xl text-left"
                data-cursor-hover
              >
                <div className="relative h-44 overflow-hidden bg-base-800">
                  <Image
                    src={cert.src}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-sm font-semibold text-ink-100">{cert.title}</h3>
                  <p className="mt-1 text-xs text-ink-500">{cert.issuer} · {cert.date}</p>
                  <div className="mt-4 flex gap-2">
                    {cert.verifyUrl && (
                      <span className="btn-ghost flex-1 !py-1.5 text-[11px]">
                        <ExternalLink size={12} /> {t('certificates.verify')}
                      </span>
                    )}
                    <span className="btn-ghost flex-1 !py-1.5 text-[11px]">
                      <Download size={12} /> {t('certificates.download')}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="card-glass relative w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setPreview(null)}
                aria-label="Close preview"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-ink-100"
              >
                <X size={16} />
              </button>
              <div className="relative h-64 overflow-hidden bg-base-800">
                <Image src={preview.src} alt={preview.title} fill sizes="512px" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-ink-100">{preview.title}</h3>
                <p className="mt-1 text-sm text-ink-400">{preview.issuer} · {preview.date}</p>
                <div className="mt-5 flex gap-3">
                  {preview.verifyUrl && (
                    <a href={preview.verifyUrl} target="_blank" rel="noreferrer" className="btn-ghost flex-1 text-xs">
                      <ExternalLink size={14} /> {t('certificates.verify')}
                    </a>
                  )}
                  <a href={preview.downloadUrl} download className="btn-primary flex-1 text-xs">
                    <Download size={14} /> {t('certificates.download')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
