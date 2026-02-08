import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import HomeProjects from "./components/HomeProjects";
import Footer from "./components/Footer";
import GlitchText from "./components/GlitchText";
import ScrollingMarquee from "./components/ScrollingMarquee";
import BentoGrid from "./components/BentoGrid";
import ServicesLineup from "./components/ServicesLineup";
import MagneticButton from "./components/MagneticButton";
import InteractiveTitle from "./components/InteractiveTitle";
import AtmosphericBackground from "./components/AtmosphericBackground";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-x-hidden text-white relative">

      <AtmosphericBackground />

      {/* 1. HERO: SWISS MINIMALIST - REDESIGNED */}
      <section className="min-h-screen w-full flex flex-col justify-between relative pt-32 border-b border-white/20 mt-1">

        {/* Top Bar Info (Moved Higher with Absolute Positioning) */}
        <div className="absolute top-6 left-0 w-full px-8 flex justify-between items-start text-white/50 font-mono text-xs md:text-sm uppercase tracking-widest z-50">
          <div>
            <p className="text-white">Deniz Kaya</p>
            <p>Media Designer</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white">Bild & Ton</p>
            <p>Munich, DE</p>
          </div>
        </div>

        {/* Massive Interactive Title */}
        <div className="w-full px-4 flex flex-col items-center justify-center z-20">
          <InteractiveTitle />
        </div>

        {/* Bottom Bar / Role */}
        <div className="w-full border-t border-white/20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="py-6 md:p-8 border-b md:border-b-0 border-r-0 md:border-r border-white/20 flex items-center justify-center md:justify-start backdrop-blur-sm">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-neon-green rounded-full animate-pulse mr-4 shadow-[0_0_10px_#ccff00]" />
              <span className="text-white uppercase tracking-widest text-xs md:text-sm font-bold">Available for hire</span>
            </div>
            <div className="p-0 flex items-center justify-center md:justify-end">
              <Link href="#projects" className="w-full h-full block">
                <button className="w-full h-full py-6 md:py-0 bg-white text-black font-black uppercase tracking-widest hover:bg-neon-green transition-colors text-lg md:text-xl flex items-center justify-center gap-2 group">
                  Select Work
                  <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 md:hidden" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-24 px-4 relative border-b border-white/20">
        <div className="max-w-7xl mx-auto mb-12 border-l border-white/20 pl-8">
          <p className="text-neon-green font-mono text-sm tracking-widest mb-2">01</p>
          <h2 className="text-5xl font-bold text-white uppercase tracking-tighter">The <span className="text-neutral-500">Profile</span></h2>
        </div>
        <BentoGrid />
      </section>

      {/* 3. SERVICES: HIGH IMPACT LIST - Sticky Header */}
      <section id="services" className="w-full py-32 relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row">

          {/* Sticky Header */}
          <div className="md:w-1/3 mb-16 md:mb-0 md:sticky md:top-32 self-start h-fit">
            <p className="text-neon-green font-mono text-sm tracking-widest mb-2">02</p>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase">What I <span className="text-neutral-500">Do</span></h3>
          </div>

          {/* List */}
          <div className="md:w-2/3">
            <ServicesLineup />
          </div>
        </div>
      </section>

      {/* 4. WORK: PROJECTS */}
      <HomeProjects />

      {/* 5. CTA: CONTACT */}
      <section className="w-full py-64 px-4 text-center mt-32 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-neon-green/50" />

        <p className="text-neon-green font-mono text-sm tracking-widest mb-4">// INITIATE_COMMUNICATION</p>
        <h2 className="text-[8vw] font-black leading-none uppercase text-white hover:text-neon-pink transition-colors cursor-pointer mix-blend-difference inline-block">
          Let's Talk
        </h2>
        <p className="text-gray-400 text-xl mt-8 font-mono">Ready to start your next project?</p>

        <div className="mt-8">
          <a href="mailto:deniz20070206@gmail.com" className="inline-block text-white/80 text-2xl font-bold border-b-2 border-neon-green hover:text-neon-green hover:border-white transition-colors pb-1">
            deniz20070206@gmail.com
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}