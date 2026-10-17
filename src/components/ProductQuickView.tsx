import React, { useState } from 'react';
import { X, ShoppingBag, Check, Truck, RotateCcw, MapPin, Camera, Package } from 'lucide-react';
import { Product, Size, Currency } from '../types';
import { PHOTOSHOOT_IMAGE, PACKAGING_IMAGE } from '../data/products';

interface ProductQuickViewProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size: Size) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [activeImageKey, setActiveImageKey] = useState<'product' | 'photoshoot' | 'packaging'>('product');
  const [added, setAdded] = useState(false);

  const activeImageSrc =
    activeImageKey === 'photoshoot'
      ? PHOTOSHOOT_IMAGE
      : activeImageKey === 'packaging'
      ? PACKAGING_IMAGE
      : product.image;

  const priceFormatted =
    currency === 'KM'
      ? `${product.priceKM} KM`
      : `€${product.priceEUR}`;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0C0C0C] border border-[#2A2A2A] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/80 border border-[#333333] hover:border-white text-white transition-colors cursor-pointer"
          aria-label="Zatvori modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image & View Switcher */}
          <div className="flex flex-col bg-[#050505] border-b md:border-b-0 md:border-r border-[#222222]">
            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={activeImageSrc}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-110 transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/85 border border-[#333333] text-[10px] font-mono-tech text-[#CCCCCC] uppercase">
                {activeImageKey === 'product' && 'Artikal // 100% Pamuk'}
                {activeImageKey === 'photoshoot' && 'Slikanje // Na modelu'}
                {activeImageKey === 'packaging' && 'Pakovanje // Kutija & Certifikat'}
              </div>
            </div>

            {/* Thumbnail switcher: Artikal / Slikanje / Pakovanje */}
            <div className="p-3 bg-[#080808] border-t border-[#1C1C1C] grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveImageKey('product')}
                className={`p-1.5 border text-[10px] font-mono-tech uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeImageKey === 'product'
                    ? 'border-white bg-[#1A1A1A] text-white font-bold'
                    : 'border-[#222222] bg-black text-[#888888] hover:text-white'
                }`}
              >
                <span>Artikal</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveImageKey('photoshoot')}
                className={`p-1.5 border text-[10px] font-mono-tech uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeImageKey === 'photoshoot'
                    ? 'border-white bg-[#1A1A1A] text-white font-bold'
                    : 'border-[#222222] bg-black text-[#888888] hover:text-white'
                }`}
              >
                <Camera className="w-3 h-3 text-[#8B0000]" />
                <span>Slikanje</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveImageKey('packaging')}
                className={`p-1.5 border text-[10px] font-mono-tech uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeImageKey === 'packaging'
                    ? 'border-white bg-[#1A1A1A] text-white font-bold'
                    : 'border-[#222222] bg-black text-[#888888] hover:text-white'
                }`}
              >
                <Package className="w-3 h-3 text-[#10b981]" />
                <span>Pakovanje</span>
              </button>
            </div>
          </div>

          {/* Right: Specs & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#777777] uppercase tracking-wider mb-2">
                <span>// {product.category}</span>
                <span>{product.code}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-syne text-white">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 text-2xl font-bold font-mono-tech text-white tabular-nums flex items-baseline gap-2">
                <span>{priceFormatted}</span>
                <span className="text-xs text-[#888888] font-normal">
                  (PDV uračunat)
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm font-typewriter text-[#999999] leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Matrix */}
              <div className="mt-6 border border-[#222222] bg-[#080808] divide-y divide-[#1A1A1A] text-xs font-mono-tech">
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Kroj:</span>
                  <span className="text-white text-right font-medium">{product.fit}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Sastav:</span>
                  <span className="text-white text-right font-medium">{product.composition}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Održavanje:</span>
                  <span className="text-white text-right font-medium">{product.care}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Limitirano:</span>
                  <span className="text-[#CCCCCC] text-right font-medium">50 komada</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Pakovanje:</span>
                  <span className="text-white text-right font-medium">Mat kutija + certifikat</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#666666] uppercase">Preuzimanje:</span>
                  <span className="text-[#10b981] text-right font-medium">Dostava 12 KM (48h) ili Sarajevo (0 KM)</span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
                  <span className="text-[#888888] uppercase tracking-wider">Odaberi veličinu:</span>
                  <span className="text-[#666666]">Regular fit (S - XL)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-mono-tech uppercase font-bold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-[#141414] text-[#AAAAAA] border-[#2A2A2A] hover:border-white hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions & Guarantees */}
            <div className="space-y-4 pt-4 border-t border-[#1E1E1E]">
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-xs font-mono-tech uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                  added
                    ? 'bg-[#15803d] border-[#15803d] text-white'
                    : 'bg-white hover:bg-[#E0E0E0] text-black border-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    USPJEŠNO DODANO U KORPU ({selectedSize})
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    DODAJ U KORPU ({selectedSize}) · {priceFormatted}
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-tech text-[#777777] text-center pt-2">
                <div className="flex flex-col items-center gap-1 p-2 bg-[#080808] border border-[#1A1A1A]">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>Dostava 48h</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#080808] border border-[#1A1A1A]">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Lično Sarajevo</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-[#080808] border border-[#1A1A1A]">
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                  <span>Zamjena veličine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
