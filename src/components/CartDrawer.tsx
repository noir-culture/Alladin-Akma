import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const price = currency === 'KM' ? item.product.priceKM : item.product.priceEUR;
    return sum + price * item.quantity;
  }, 0);

  // Free shipping above 200 KM (or 100 EUR)
  const freeShippingThreshold = currency === 'KM' ? 200 : 100;
  const isFreeShipping = total >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] border-l border-[#222222] text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#1C1C1C] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-white" />
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono-tech">
                KORPA / NOIR ARCHIVE ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#222222] hover:border-white text-[#AAAAAA] hover:text-white transition-colors cursor-pointer"
              aria-label="Zatvori korpu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Meter: Free shipping over 200 KM */}
          <div className="px-5 py-3 bg-[#050505] border-b border-[#1A1A1A] text-xs font-mono-tech">
            {isFreeShipping ? (
              <div className="text-[#10b981] flex items-center gap-1.5 font-bold">
                <span>✓ OSTVARILI STE BESPLATNU DOSTAVU (IZNAD 200 KM)</span>
              </div>
            ) : (
              <div className="text-[#888888]">
                Besplatna dostava iznad{' '}
                <span className="text-white font-bold">
                  {currency === 'KM' ? '200 KM' : '€100'}
                </span>
                . Dodajte još{' '}
                <span className="text-[#8B0000] font-bold">
                  {currency === 'KM' ? `${remainingForFreeShipping} KM` : `€${remainingForFreeShipping}`}
                </span>
                .
              </div>
            )}
            <div className="w-full bg-[#1A1A1A] h-1 mt-2 overflow-hidden">
              <div
                className="bg-[#8B0000] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-[#666666] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#888888]" />
              <span>Dostava 48h ili besplatno lično preuzimanje Sarajevo</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#1A1A1A]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 border border-[#222222] flex items-center justify-center text-[#555555]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase font-syne text-white">
                    Vaša korpa je prazna
                  </p>
                  <p className="text-xs font-typewriter text-[#777777] max-w-xs">
                    Istražite 3 regular majice iz Drop 01. Svaka majica je limitirana na samo 50 komada.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-3 bg-white text-black text-xs font-mono-tech uppercase font-bold tracking-wider hover:bg-[#E0E0E0] cursor-pointer"
                >
                  Pogledaj Majice (50 KM)
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice =
                  currency === 'KM'
                    ? `${item.product.priceKM * item.quantity} KM`
                    : `€${item.product.priceEUR * item.quantity}`;

                return (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#000000] border border-[#222222] overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="text-[10px] font-typewriter text-[#666666]">
                          {item.product.code}
                        </div>
                        <h4 className="text-xs font-bold font-syne uppercase text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-xs font-mono-tech text-[#888888]">
                          <span>Veličina: <strong className="text-white">{item.size}</strong></span>
                          <span>·</span>
                          <span className="text-[#AAAAAA]">100% pamuk</span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[#222222] bg-[#050505]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:text-white text-[#777777] transition-colors cursor-pointer"
                            aria-label="Smanji količinu"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono-tech tabular-nums font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:text-white text-[#777777] transition-colors cursor-pointer"
                            aria-label="Povećaj količinu"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold font-mono-tech tabular-nums text-white">
                            {itemPrice}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#666666] hover:text-[#8B0000] transition-colors p-1 cursor-pointer"
                            aria-label="Ukloni artikal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#1C1C1C] bg-[#050505] space-y-4">
              <div className="space-y-2 text-xs font-mono-tech">
                <div className="flex justify-between text-[#888888]">
                  <span>Iznos artikala:</span>
                  <span className="text-white tabular-nums">
                    {currency === 'KM' ? `${total} KM` : `€${total}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#888888]">
                  <span>Dostava:</span>
                  <span className="text-white">
                    {isFreeShipping ? 'BESPLATNO (Iznad 200 KM)' : currency === 'KM' ? '12 KM' : '€6'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1C1C1C] flex justify-between text-sm font-bold text-white">
                  <span>Ukupno:</span>
                  <span className="text-base font-mono-tech tabular-nums">
                    {currency === 'KM'
                      ? `${total + (isFreeShipping ? 0 : 12)} KM`
                      : `€${total + (isFreeShipping ? 0 : 6)}`}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-white hover:bg-[#E5E5E5] text-black font-mono-tech text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>ZAVRŠI NARUDŽBU</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-[#666666]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#888888]" />
                <span>PLAĆANJE POUZEĆEM GOTOVINOM KURIRU</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
