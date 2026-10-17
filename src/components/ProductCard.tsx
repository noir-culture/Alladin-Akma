import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, Size, Currency } from '../types';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product, size: Size) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const priceFormatted =
    currency === 'KM'
      ? `${product.priceKM} KM`
      : `€${product.priceEUR}`;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div className="group relative flex flex-col bg-[#0D0D0D] border border-[#222222] hover:border-[#444444] transition-all duration-300">
      {/* Top Tag: Clean metadata */}
      <div className="px-4 py-2 border-b border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono-tech text-[#888888]">
        <span className="uppercase tracking-widest text-[#AAAAAA]">{product.fit}</span>
        <span className="text-[#AAAAAA]">{product.composition}</span>
      </div>

      {/* Product Image Container with Hover Zoom & Overlay */}
      <div
        className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#080808] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 bg-black/80 text-white border border-[#333333] hover:border-white transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg"
          aria-label="Pregledaj detalje artikla"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Limited 50 pieces label */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#111111]/90 border border-[#333333] text-white text-[10px] font-mono-tech uppercase tracking-wider backdrop-blur-sm">
          Limitirano: 50 komada
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-typewriter text-[#777777] uppercase tracking-wider">
            {product.code}
          </div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-syne hover:text-[#CCCCCC] transition-colors mt-1 cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs font-typewriter text-[#888888] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Size Selector */}
        <div className="space-y-3 pt-3 border-t border-[#1C1C1C]">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono-tech text-[#666666] uppercase">Cijena</span>
            <div className="text-lg font-bold text-white font-mono-tech tabular-nums">
              {priceFormatted}
            </div>
          </div>

          {/* Sizing Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono-tech text-[#555555] uppercase mr-1">
              Veličina:
            </span>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-xs font-mono-tech px-2.5 py-1 border transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#141414] text-[#AAAAAA] border-[#262626] hover:border-[#444444] hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Action Button: Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 px-4 text-xs font-mono-tech uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
              addedAnimation
                ? 'bg-[#15803d] border-[#15803d] text-white'
                : 'bg-[#121212] hover:bg-white text-white hover:text-black border-[#333333] hover:border-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                DODANO U KORPU ({selectedSize})
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                DODAJ U KORPU · {selectedSize}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
