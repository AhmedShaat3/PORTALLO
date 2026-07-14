import fs from 'fs';
import path from 'path';
import certificatesData from '@/content/certificates.json';
import galleryData from '@/content/gallery.json';
import { titleCaseFromFilename } from './utils';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);

function readImageFiles(relativeDir: string): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', relativeDir);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

export interface CertificateEntry {
  file: string;
  src: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  verifyUrl?: string;
  downloadUrl: string;
}

/**
 * Auto-discovers every image dropped into /public/certificates and merges it
 * with optional metadata from content/certificates.json (keyed by filename).
 * Drop a file in, it appears — metadata is optional polish.
 */
export function getCertificates(): CertificateEntry[] {
  const files = readImageFiles('certificates');
  const meta = (certificatesData as any).items ?? {};

  return files.map((file) => {
    const entry = meta[file] ?? {};
    return {
      file,
      src: `/certificates/${file}`,
      title: entry.title ?? titleCaseFromFilename(file),
      issuer: entry.issuer ?? 'Issuing Organization',
      date: entry.date ?? '',
      category: entry.category ?? 'General',
      verifyUrl: entry.verifyUrl,
      downloadUrl: entry.downloadUrl ?? `/certificates/${file}`
    };
  });
}

export interface GalleryEntry {
  file: string;
  src: string;
  caption: string;
  category: string;
}

/**
 * Auto-discovers every image dropped into /public/images/gallery.
 */
export function getGalleryImages(): GalleryEntry[] {
  const files = readImageFiles('images/gallery');
  const meta = (galleryData as any).items ?? {};

  return files.map((file) => {
    const entry = meta[file] ?? {};
    return {
      file,
      src: `/images/gallery/${file}`,
      caption: entry.caption ?? titleCaseFromFilename(file),
      category: entry.category ?? 'General'
    };
  });
}
