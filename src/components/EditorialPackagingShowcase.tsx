import React, { useState } from 'react';
import { Camera, Package, CheckCircle2, Maximize2, X, ArrowRight, Layers } from 'lucide-react';
import { PHOTOSHOOT_IMAGE, PACKAGING_IMAGE, PACKAGING_BOX_CLOSED, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface EditorialPackagingShowcaseProps {
  onSelectProduct: (product: Product) => void;
}

export const EditorialPackagingShowcase: React.FC<EditorialPackagingShowcaseProps> = ({
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'photoshoot' | 'packaging'>('both');
  const [packagingView, setPackagingView] = useState<'unboxing' | 'closed'>('unboxing');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const coreTee = PRODUCTS.find((p) => p.id === 'noir-culture-core-tee') || PRODUCTS[0];

  const currentPackagingImage = packagingView === 'unboxing' ? PACKAGING_IMAGE : PACKAGING_BOX_CLOSED;

  return (
    <section id="lookbook-packaging" className="py-20 sm:py-28 bg-[#040404] border-t border-[#1F1F1F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-6 mb-12 gap-6">
          <div>
            <div className="text-[11px] font-mono-tech text-[#888888] uppercase tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-[1px] bg-[#8B0000]" />
              <span>VIZUELNI DOKAZ // REAL PRODUCT & PACKAGING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-syne uppercase tracking-tight mt-2">
              SLIKANJE & PAKOVANJE
            </h2>
            <p className="mt-2 text-xs font-typewriter text-[#888888] max-w-2xl leading-relaxed">
              Autentični prikaz regular majica na modelu pod direktnim noćnim bljeskom i originalno NOIR CULTURE kolekcionarsko pakovanje koje dobijate uz svaku naručenu majicu (limitirano na 50 komada).
            </p>
          </div>

          {/* Filter / View Toggles */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0D0D0D] border border-[#222222] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'both' ? 'bg-white text-black font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              Sve Zajedno
            </button>
            <button
              onClick={() => setActiveTab('photoshoot')}
              className={`px-3 py-1.5 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'photoshoot' ? 'bg-white text-black font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              Slikanje (Model)
            </button>
            <button
              onClick={() => setActiveTab('packaging')}
              className={`px-3 py-1.5 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'packaging' ? 'bg-white text-black font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              Pakovanje (Kutija)
            </button>
          </div>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* 1. SLIKANJE / PHOTOSHOOT CARD */}
          {(activeTab === 'both' || activeTab === 'photoshoot') && (
            <div className="bg-[#0A0A0A] border border-[#222222] flex flex-col justify-between group hover:border-[#444444] transition-all duration-300">
              <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#141414] border border-[#2A2A2A]">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#888888] uppercase block tracking-wider">
                      // EDITORIAL SESSION
                    </span>
                    <h3 className="text-lg font-bold font-syne text-white uppercase tracking-tight">
                      POKAZ SLIKANJA (MODEL & FIT)
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono-tech px-2.5 py-1 bg-black border border-[#2A2A2A] text-[#CCCCCC]">
                  35MM FLASH
                </span>
              </div>

              {/* Photoshoot Image */}
              <div
                onClick={() =>
                  setZoomImage({
                    src: PHOTOSHOOT_IMAGE,
                    title: 'POKAZ SLIKANJA — NOIR CULTURE REGULAR TEE',
                    subtitle: 'Realni kroj na modelu u betonskom brutalističkom prolazu · Noćni direct-flash snimak',
                  })
                }
                className="relative aspect-[4/3] bg-black overflow-hidden cursor-zoom-in"
              >
                <img
                  src={PHOTOSHOOT_IMAGE}
                  alt="NOIR CULTURE majica na modelu photoshoot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-115 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/85 border border-[#333333] text-xs font-mono-tech text-white hover:bg-white hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Uvećaj sliku</span>
                </div>
              </div>

              {/* Photoshoot Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-2 text-xs font-typewriter text-[#A0A0A0] leading-relaxed">
                  <p>
                    <strong className="text-white font-mono-tech uppercase">Realni kroj bez šminke:</strong> Snimljeno u noćnom betonskom ambijentu uz direct 35mm flash rasvjetu kako biste vidjeli tačan pad regular kroja na tijelu, ojačani rebrasti ovratnik i čistoću bijele tipo-grafike na crnom 100% pamuku.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1A1A1A] text-xs font-mono-tech text-[#888888]">
                  <div className="p-2.5 bg-[#070707] border border-[#1A1A1A]">
                    <span className="text-[#666666] block text-[10px] uppercase">Kroj</span>
                    <span className="text-white font-bold">REGULAR FIT</span>
                  </div>
                  <div className="p-2.5 bg-[#070707] border border-[#1A1A1A]">
                    <span className="text-[#666666] block text-[10px] uppercase">Održavanje</span>
                    <span className="text-white font-bold">40°C NAOPAKO</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProduct(coreTee)}
                  className="w-full mt-2 py-3 bg-[#111111] hover:bg-white hover:text-black border border-[#333333] hover:border-white text-white font-mono-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>POGLEDAJ OVAJ MODEL MAJICE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. PAKOVANJE / PACKAGING CARD (WITH REAL PHOTO OF NOIR CULTURE PACKAGING) */}
          {(activeTab === 'both' || activeTab === 'packaging') && (
            <div className="bg-[#0A0A0A] border border-[#222222] flex flex-col justify-between group hover:border-[#444444] transition-all duration-300">
              <div className="p-6 border-b border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#141414] border border-[#2A2A2A]">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#888888] uppercase block tracking-wider">
                      // NOIR CULTURE ORIGINAL
                    </span>
                    <h3 className="text-lg font-bold font-syne text-white uppercase tracking-tight">
                      POKAZ PAKOVANJA (KUTIJA & STIKERI)
                    </h3>
                  </div>
                </div>

                {/* Sub-view switcher */}
                <div className="flex items-center gap-1 p-0.5 bg-black border border-[#262626]">
                  <button
                    type="button"
                    onClick={() => setPackagingView('unboxing')}
                    className={`px-2 py-1 text-[10px] font-mono-tech uppercase transition-colors cursor-pointer ${
                      packagingView === 'unboxing'
                        ? 'bg-[#1C1C1C] text-white font-bold'
                        : 'text-[#777777] hover:text-white'
                    }`}
                  >
                    Unboxing
                  </button>
                </div>
              </div>

              {/* Packaging Image */}
              <div
                onClick={() =>
                  setZoomImage({
                    src: currentPackagingImage,
                    title: 'POKAZ PAKOVANJA — NOIR CULTURE MADE TO PRODUCE',
                    subtitle: 'Mat crna kutija sa utisnutim srebrenim logotipom, holografski zip bag sa stikerima i NOIR CLTR majica',
                  })
                }
                className="relative aspect-[4/3] bg-black overflow-hidden cursor-zoom-in"
              >
                <img
                  src={currentPackagingImage}
                  alt="NOIR CULTURE unboxing pakovanje majice sa kutijom i stikerima"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/85 border border-[#333333] text-xs font-mono-tech text-white hover:bg-white hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Uvećaj sliku</span>
                </div>
              </div>

              {/* Packaging Details Checklist Matching User's Real Photo */}
              <div className="p-6 space-y-4">
                <div className="text-xs font-mono-tech text-white uppercase tracking-wider font-bold">
                  ŠTA DOLAZI U VAŠOJ KUTIJI (50 KM):
                </div>

                <div className="space-y-2.5 text-xs font-typewriter text-[#A0A0A0]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Mat crna rigidna kutija:</strong> Brendirana sa srebrnim natpisom <em>"NOIR CULTURE / MADE TO PRODUCE"</em> i zvjezdanim orbitalnim amblemom.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">NOIR CLTR regular majica:</strong> Složena majica od 100% pamuka sa prepoznatljivim uličnim otiskom.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Holografski zip pouch & stikeri:</strong> Specijalna iridescentna vrećica s kolekcionarskim stikerima (uključujući neon-crveni NOIR amblem i logotipe).
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Limitirani status (50 komada):</strong> Svaki paket je dio prve serije brenda, pripremljen za preuzimanje u Sarajevu ili brzu dostavu.
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A] text-[11px] font-mono-tech text-[#888888] flex items-center justify-between">
                  <span>Dostava 48h širom BiH</span>
                  <span className="text-white font-bold">Besplatno preuzimanje Sarajevo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn cursor-zoom-out"
        >
          <div
            className="relative max-w-5xl max-h-[92vh] flex flex-col bg-[#0A0A0A] border border-[#333333] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-black/90 border-b border-[#222222] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold font-syne text-white uppercase tracking-wider">
                  {zoomImage.title}
                </h4>
                <p className="text-xs font-mono-tech text-[#888888] mt-0.5">
                  {zoomImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => setZoomImage(null)}
                className="p-2 bg-[#141414] border border-[#333333] text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Zatvori pregled"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto flex items-center justify-center p-2 bg-black max-h-[75vh]">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="max-w-full max-h-[72vh] object-contain filter contrast-110"
              />
            </div>

            <div className="p-3 bg-[#0A0A0A] border-t border-[#222222] text-center text-xs font-mono-tech text-[#CCCCCC]">
              NOIR CULTURE // DROP 01 // LIMITIRANO NA 50 KOMADA // 100% PAMUK // 
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
