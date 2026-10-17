import React from 'react';
import { ArrowUpRight, Flame, Shield, Sparkles, MapPin } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-24 sm:py-32 bg-black border-t border-[#222222] overflow-hidden">
      {/* Decorative Noir Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-6 mb-16 gap-4">
          <div>
            <div className="text-[11px] font-mono-tech text-[#888888] uppercase tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-[1px] bg-[#8B0000]" />
              <span>02 // O NAMA & FILOZOFIJA BRENDA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-syne uppercase tracking-tight mt-2">
              O NAMA // NOIR CULTURE
            </h2>
          </div>
          <div className="text-xs font-mono-tech text-[#666666] tracking-widest uppercase">
            EST. 2026 · @CLTR.NOIR · SARAJEVO
          </div>
        </div>

        {/* Core Manifesto Prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Manifesto Story */}
          <div className="lg:col-span-8 space-y-8">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight font-display text-balance border-l-2 border-[#8B0000] pl-6 py-1">
              "U svijetu koji neprestano viče u boji, mi smo odlučili progovoriti tišinom duboke crne boje i oštrih monohromatskih kontrasta."
            </blockquote>

            <div className="space-y-6 text-sm sm:text-base font-typewriter text-[#B5B5B5] leading-relaxed">
              <p>
                Sve je počelo u sjenama asfalta, u trenucima kada se gradska vreva utiša, a kreativnost tek počinje da budi svoje mračnije oblike.
              </p>

              <p>
                Spajajući retro estetiku noir filmova sa sirovom energijom moderne ulične kulture, stvorili smo prostor za sve koji ne žele da se uklapaju u kalupe.
              </p>

              <p>
                Svaki naš dizajn — od skica na papiru do preciznog DTF printa na teškom pamuku — nosi dio te neukrotive urbane priče.
              </p>

              <p>
                Kroz motive samuraja i tajanstvenih silueta, u tkaninu utiskujemo duh borbe, snage i nepokolebljivog stava.
              </p>

              <p>
                Ne pratimo prolazne trendove, već gradimo sopstvenu kulturu kroz pažljivo ograničene "dropove" i beskompromisan minimalizam.
              </p>

              <p className="p-4 bg-[#0A0A0A] border-l border-[#333333] text-white">
                Zato svaki paket koji napusti naš studio nije obična pošiljka, već mali ritual sa unikatnim etiketama i posvetom za onoga ko ga otvara.
              </p>

              <p>
                Veličine od S do XL nisu samo mjere odjeće, već ulaznice u zajednicu ljudi koji cijene ekskluzivnost, misteriju i autentičnost.
              </p>

              <p>
                Naš Instagram profil <a href="https://instagram.com/cltr.noir" target="_blank" rel="noreferrer" className="text-white underline font-mono-tech hover:text-[#CCCCCC]">@cltr.noir</a> je prozor u taj svijet, digitalna galerija naših vizuelnih eksperimenata i susret sa istomišljenicima.
              </p>

              <div className="pt-2 text-white font-syne font-bold text-lg sm:text-xl uppercase tracking-tight">
                Jer NOIR CULTURE nije samo odjeća koju nosiš na ulici, već stav koji ostaje u sjenci kad se sva svjetla ugase.
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-[#1F1F1F]">
              <a
                href="https://instagram.com/cltr.noir"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-white hover:text-[#CCCCCC] border-b border-white pb-1 transition-colors"
              >
                <span>INSTAGRAM: @CLTR.NOIR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="mailto:noir.culture76@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#AAAAAA] hover:text-white border-b border-[#444444] pb-1 transition-colors"
              >
                <span>NOIR.CULTURE76@GMAIL.COM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#0B0B0B] border border-[#222222]">
              <div className="text-[11px] font-mono-tech text-[#8B0000] font-bold uppercase tracking-wider mb-2">
                01. PRVI DROP // LIMITIRANO
              </div>
              <h3 className="text-base font-bold font-syne uppercase text-white mb-2">
                50 KOMADA PO MODELU
              </h3>
              <p className="text-xs font-typewriter text-[#888888] leading-relaxed">
                Strogo ograničena serija od 3 regular majice. Kada se serija rasproda, arhiv se zatvara.
              </p>
            </div>

            <div className="p-6 bg-[#0B0B0B] border border-[#222222]">
              <div className="text-[11px] font-mono-tech text-[#8B0000] font-bold uppercase tracking-wider mb-2">
                02. 100% ČISTI PAMUK
              </div>
              <h3 className="text-base font-bold font-syne uppercase text-white mb-2">
                REGULAR KROJ & ODRŽAVANJE
              </h3>
              <p className="text-xs font-typewriter text-[#888888] leading-relaxed">
                Veličine od S do XL. Pranje na 40 stepeni naopako za dugotrajnost tkanine i preciznog printa.
              </p>
            </div>

            <div className="p-6 bg-[#0B0B0B] border border-[#222222]">
              <div className="text-[11px] font-mono-tech text-[#8B0000] font-bold uppercase tracking-wider mb-2">
                03. DOSTAVA & PREUZIMANJE
              </div>
              <h3 className="text-base font-bold font-syne uppercase text-white mb-2">
                SARAJEVO I CIJELA BIH
              </h3>
              <p className="text-xs font-typewriter text-[#888888] leading-relaxed">
                Dostava 48h ili lično preuzimanje Sarajevo. Besplatna dostava iznad 200 KM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
