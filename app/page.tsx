import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Achievements from '@/components/Achievements';
import Education from '@/components/Education';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Statistics from '@/components/Statistics';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Achievements />
      <Education />
      <Statistics />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
