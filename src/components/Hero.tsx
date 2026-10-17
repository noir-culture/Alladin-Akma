import React from 'react';
import { ArrowDown, Package, ShieldCheck, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#222222] bg-black">
      {/* Background Cinematic Image with Noir Contrast Grading & Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="NOIR CULTURE Streetwear Campaign"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.38] scale-[1.02] transform transition-transform duration-1000"
        />
        {/* Multi-layered dark vignette scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
      </div>

      {/* Atmospheric Line Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Pre-title: Prominently stating LIMITED TO 50 PIECES */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#111111]/95 border border-[#333333] text-xs font-mono-tech tracking-[0.2em] text-white uppercase mb-6 backdrop-blur-sm shadow-xl">
          <span className="w-2 h-2 bg-[#8B0000] rounded-none animate-pulse" />
          <span className="font-bold">DROP 01 // LIMITIRANO NA 50 KOMADA</span>
        </div>

        {/* Main Campaign Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight font-display text-balance max-w-4xl leading-[1.05] drop-shadow-2xl">
          NOIR CULTURE
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#E0E0E0] tracking-widest font-syne uppercase">
          PRVI DROP // 3 REGULAR MAJICE
        </p>

        {/* Subtitle in Typewriter Style */}
        <p className="mt-6 text-xs sm:text-sm md:text-base font-typewriter text-[#A0A0A0] max-w-2xl leading-relaxed text-balance">
          "Prvi zvanični drop brenda NOIR CULTURE donosi 3 unikatne regular majice od 100% čistog pamuka. Svaki model je strogo limitiran na 50 komada u veličinama od S do XL. Cijena 50 KM."
        </p>

        {/* Highlighted Delivery Box */}
        <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/80 border border-[#2A2A2A] text-xs font-mono-tech text-[#CCCCCC]">
          <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
          <span>Dostava 12 KM (48h) ili lično preuzimanje Sarajevo</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#drop"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#E5E5E5] text-black font-mono-tech text-xs uppercase tracking-widest font-bold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center border border-white cursor-pointer"
          >
            POGLEDAJ DROP
          </a>
          <a
            href="#manifesto"
            className="w-full sm:w-auto px-8 py-4 bg-[#0A0A0A] hover:bg-[#161616] text-[#E0E0E0] hover:text-white font-mono-tech text-xs uppercase tracking-widest transition-all duration-200 border border-[#333333] hover:border-[#666666] text-center"
          >
            O BRENDU
          </a>
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-[#1C1C1C] bg-black/85 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 divide-x divide-[#1C1C1C] text-[11px] font-mono-tech text-[#777777] uppercase tracking-wider">
          <div className="text-center px-4">
            <span className="text-white font-semibold">100% PAMUK</span> // LIMITIRANA SERIJA
          </div>
          <div className="text-center px-4">
            <span className="text-white font-semibold">VELIČINE S - XL</span> // REGULAR KROJ
          </div>
          <div className="text-center px-4">
            <span className="text-white font-semibold">DOSTAVA 12 KM (48H)</span> // LIČNO PREUZIMANJE SARAJEVO
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#drop"
        aria-label="Skrolaj do kolekcije"
        className="absolute bottom-5 sm:bottom-14 left-1/2 -translate-x-1/2 p-2 text-[#555555] hover:text-white transition-colors"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
