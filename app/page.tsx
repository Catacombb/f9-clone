import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
