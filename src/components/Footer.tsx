import React from 'react';
import { Instagram, ArrowUpRight, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenAdmin }) => {
  return (
    <footer className="bg-black border-t border-[#1F1F1F] text-[#888888]">
      {/* Upper Footer: Brand & Social */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-black text-white font-syne uppercase tracking-widest">
              NOIR CULTURE
            </div>
            <p className="text-xs font-typewriter text-[#777777] max-w-sm leading-relaxed">
              Streetwear brend posvećen minimalističkoj noir estetici. Prvi drop: 3 unikatne regular majice od 100% pamuka, limitirane na 50 komada.
            </p>
            <div className="pt-2 flex flex-col gap-1 text-xs font-mono-tech text-[#AAAAAA]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Sarajevo // Dostava 12 KM (48h) ili lično preuzimanje</span>
              </div>
              <div className="text-[11px] text-[#777777] pl-5.5">
                Besplatna dostava za sve narudžbe iznad 200 KM
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3 font-mono-tech text-xs">
            <div className="text-white uppercase font-bold tracking-wider mb-2">
              DROP 01
            </div>
            <div>
              <a href="#drop" className="hover:text-white transition-colors block py-1">
                3 Regular Majice (50 KM)
              </a>
            </div>
            <div>
              <a href="#lookbook-packaging" className="hover:text-white transition-colors block py-1">
                Slikanje & Pakovanje
              </a>
            </div>
            <div>
              <a href="#manifesto" className="hover:text-white transition-colors block py-1">
                O Nama & Manifesto
              </a>
            </div>
            <div>
              <button
                onClick={onOpenContact}
                className="hover:text-white transition-colors block py-1 text-left cursor-pointer"
              >
                Veličine S - XL
              </button>
            </div>
            <div>
              <button
                onClick={onOpenContact}
                className="hover:text-white transition-colors block py-1 text-left cursor-pointer"
              >
                Lično preuzimanje Sarajevo (0 KM)
              </button>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-4 space-y-4 font-mono-tech text-xs">
            <div className="text-white uppercase font-bold tracking-wider mb-2">
              KONTAKT & MREŽE
            </div>
            <p className="text-xs font-typewriter text-[#777777]">
              Javite nam se direktno putem Instagrama ili e-maila za rezervaciju ili upite.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/cltr.noir"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#CCCCCC] bg-[#111111] border border-[#262626] hover:border-[#444444] px-4 py-2.5 transition-colors w-fit"
              >
                <Instagram className="w-4 h-4 text-[#8B0000]" />
                <span className="font-bold">cltr.noir</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <a
                href="mailto:noir.culture76@gmail.com"
                className="inline-flex items-center gap-2 text-[#CCCCCC] hover:text-white py-1 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8B0000]" />
                <span>noir.culture76@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Footer: Copyright & Admin link */}
        <div className="mt-16 pt-8 border-t border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-[#555555]">
          <div>
            © {new Date().getFullYear()} NOIR CULTURE (CLTR.NOIR). SVA PRAVA ZADRŽANA.
          </div>
          <div className="flex items-center gap-5">
            <span className="hover:text-[#888888] cursor-pointer" onClick={onOpenContact}>
              DOSTAVA 12 KM
            </span>
            <span>·</span>
            <span className="hover:text-[#888888] cursor-pointer" onClick={onOpenContact}>
              LIMITIRANO NA 50 KOMADA
            </span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#888888] hover:text-white underline cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#8B0000]" />
              <span>ADMIN PANEL</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
