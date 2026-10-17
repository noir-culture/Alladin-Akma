import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenCart: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  currency,
  onToggleCurrency,
  onOpenCart,
  onOpenContact,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#222222] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#"
              className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-syne whitespace-nowrap hover:opacity-85 transition-opacity"
            >
              NOIR CULTURE
            </a>
            <span className="hidden sm:inline-block text-[11px] font-mono-tech tracking-wider text-[#666666] border-l border-[#222222] pl-3 py-0.5">
              CLTR.NOIR
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-mono-tech text-[#999999]">
            <a
              href="#drop"
              className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              Drop 01 (3 Majice)
            </a>
            <a
              href="#lookbook-packaging"
              className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              Slikanje & Pakovanje
            </a>
            <a
              href="#manifesto"
              className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              O Nama
            </a>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all text-left uppercase cursor-pointer"
            >
              Kontakt
            </button>
            <a
              href="https://instagram.com/cltr.noir"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-[#777777] hover:text-white"
            >
              cltr.noir
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Zone 3: Actions (Admin, Currency & Cart) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Panel button */}
            <button
              onClick={onOpenAdmin}
              aria-label="Admin panel"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 border border-[#262626] hover:border-white text-xs font-mono-tech text-[#888888] hover:text-white bg-[#0A0A0A] transition-colors cursor-pointer"
              title="Admin Panel za vlasnika brenda"
            >
              <Shield className="w-3 h-3 text-[#8B0000]" />
              <span className="font-bold">ADMIN</span>
            </button>

            {/* Currency toggle */}
            <button
              onClick={onToggleCurrency}
              aria-label="Promijeni valutu"
              className="text-xs font-mono-tech px-2.5 py-1.5 border border-[#222222] hover:border-[#444444] text-[#CCCCCC] hover:text-white bg-[#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-[#666666]">VALUTA:</span>
              <span className="font-bold text-white tracking-wider">{currency}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="Otvori korpu"
              className="relative p-2.5 border border-[#222222] bg-[#0D0D0D] hover:bg-[#161616] hover:border-[#444444] text-white transition-all flex items-center gap-2 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-mono-tech tracking-wider uppercase">
                Korpa
              </span>
              <span className="min-w-5 h-5 px-1 bg-[#8B0000] text-white text-[11px] font-mono-tech font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white border border-[#222222] bg-[#0A0A0A]"
              aria-label="Meni"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bg-black/98 border-b border-[#222222] z-30 px-6 py-6 font-mono-tech space-y-4 backdrop-blur-xl">
          <div className="text-[11px] text-[#666666] tracking-widest uppercase">
            // NAVIGACIJA
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <a
              href="#drop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#8B0000] transition-colors py-1 border-b border-[#1A1A1A]"
            >
              01. DROP 01 // 3 MAJICE (50 KM)
            </a>
            <a
              href="#lookbook-packaging"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#8B0000] transition-colors py-1 border-b border-[#1A1A1A]"
            >
              02. SLIKANJE & PAKOVANJE // SHOWCASE
            </a>
            <a
              href="#manifesto"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#8B0000] transition-colors py-1 border-b border-[#1A1A1A]"
            >
              03. O NAMA // MANIFESTO
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-white hover:text-[#8B0000] transition-colors py-1 border-b border-[#1A1A1A]"
            >
              04. KONTAKT & UPITI
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left text-[#CCCCCC] hover:text-white transition-colors py-1 border-b border-[#1A1A1A] flex items-center justify-between"
            >
              <span>05. ADMIN PANEL // KONTROLA DROPA</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#8B0000] text-white">VLASNIK</span>
            </button>
            <a
              href="https://instagram.com/cltr.noir"
              target="_blank"
              rel="noreferrer"
              className="text-[#999999] hover:text-white flex items-center justify-between py-1"
            >
              <span>INSTAGRAM: CLTR.NOIR</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
