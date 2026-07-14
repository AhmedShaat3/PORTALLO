'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/providers';
import SectionHeading from './SectionHeading';
import type { GalleryEntry } from '@/lib/media';

// Varying heights keep the masonry columns feeling organic even with
// placeholder tiles of identical aspect ratio.
const HEIGHTS = ['h-56', 'h-72', 'h-64', 'h-80', 'h-60'];

export default function GalleryMasonry({ images }: { images: GalleryEntry[] }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  const next = () => setIndex((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));

  return (
    <section id="gallery" className="relative py-28">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('gallery.eyebrow')}
          title={t('gallery.title')}
          description="Add photos to /public/images/gallery — they populate this masonry grid automatically."
        />

        {images.length === 0 ? (
          <div className="card-glass mt-12 flex flex-col items-center gap-3 rounded-2xl p-16 text-center">
            <Images className="text-ink-600" size={28} />
            <p className="text-sm text-ink-400">No photos yet — add images to /public/images/gallery to populate this section.</p>
          </div>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {images.map((img, i) => (
              <motion.button
                key={img.file}
                onClick={() => setIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                data-cursor-hover
                className={`card-glass group relative block w-full overflow-hidden rounded-2xl ${HEIGHTS[i % HEIGHTS.length]}`}
              >
                <div className="relative h-full w-full bg-base-800">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-xs font-medium text-ink-100">{img.caption}</p>
                  <p className="text-[10px] text-ink-400">{img.category}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {index !== null && images[index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-6"
            onClick={() => setIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-ink-100"
            >
              <ChevronLeft size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="card-glass relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setIndex(null)}
                aria-label="Close preview"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-ink-100"
              >
                <X size={16} />
              </button>
              <div className="relative h-[50vh] bg-base-800">
                <Image src={images[index].src} alt={images[index].caption} fill sizes="672px" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-ink-100">{images[index].caption}</p>
                <p className="text-xs text-ink-500">{images[index].category}</p>
              </div>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-ink-100"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
