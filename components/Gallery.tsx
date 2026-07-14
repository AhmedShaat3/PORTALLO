import { getGalleryImages } from '@/lib/media';
import GalleryMasonry from './GalleryMasonry';

export default function Gallery() {
  const images = getGalleryImages();
  return <GalleryMasonry images={images} />;
}
