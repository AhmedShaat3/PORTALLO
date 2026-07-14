import { getCertificates } from '@/lib/media';
import CertificatesGallery from './CertificatesGallery';

export default function Certificates() {
  const certificates = getCertificates();
  return <CertificatesGallery certificates={certificates} />;
}
