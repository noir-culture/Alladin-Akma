import React, { useState } from 'react';
import { X, CheckCircle, Package, MapPin, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, Currency, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onClearCart: () => void;
  onOrderCreated?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onClearCart,
  onOrderCreated,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = items.reduce((sum, item) => {
    const price = currency === 'KM' ? item.product.priceKM : item.product.priceEUR;
    return sum + price * item.quantity;
  }, 0);

  // Free delivery threshold: 200 KM
  const freeShippingThreshold = currency === 'KM' ? 200 : 100;
  const isFreeDelivery = total >= freeShippingThreshold || deliveryType === 'pickup';
  const shippingCost = isFreeDelivery ? 0 : currency === 'KM' ? 12 : 6;
  const finalTotal = total + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = `NC-${Math.floor(1000 + Math.random() * 9000)}-ARCHIVE`;
      setOrderNumber(generatedOrder);

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generatedOrder,
        customerName: formData.fullName,
        phone: formData.phone,
        deliveryType,
        address: deliveryType === 'delivery' ? formData.address : undefined,
        city: deliveryType === 'delivery' ? formData.city : 'Sarajevo (Preuzimanje)',
        postalCode: deliveryType === 'delivery' ? formData.postalCode : undefined,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          size: i.size,
          quantity: i.quantity,
          unitPrice: currency === 'KM' ? i.product.priceKM : i.product.priceEUR * 2,
        })),
        subtotal: total,
        shippingCost,
        total: finalTotal,
        status: 'NOVO',
        createdAt: new Date().toISOString(),
      };

      if (onOrderCreated) {
        onOrderCreated(newOrder);
      }

      setIsSubmitting(false);
      setStep('success');
      onClearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-[#262626] text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#1E1E1E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-white" />
            <span className="text-xs font-mono-tech tracking-widest uppercase font-bold">
              {step === 'form' ? 'NOIR CULTURE // BLAGAJNA' : 'POTVRDA NARUDŽBE'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#222222] hover:border-white text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Quick Cart Summary */}
            <div className="p-4 bg-[#080808] border border-[#1C1C1C] text-xs font-mono-tech flex justify-between items-center">
              <div>
                <span className="text-[#777777]">Artikli u narudžbi ({items.length}): </span>
                <span className="text-white font-bold">
                  {items.map((i) => `${i.product.name} [${i.size}] (x${i.quantity})`).join(', ')}
                </span>
              </div>
              <div className="text-right ml-4 shrink-0 font-bold text-white">
                {currency === 'KM' ? `${finalTotal} KM` : `€${finalTotal}`}
              </div>
            </div>

            {/* Delivery Option Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#888888] border-b border-[#1A1A1A] pb-2">
                01. NAČIN PREUZIMANJA / DOSTAVE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 border cursor-pointer flex items-start gap-3 transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-white bg-[#151515]'
                      : 'border-[#222222] bg-[#0A0A0A] hover:border-[#444444]'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={deliveryType === 'delivery'}
                    onChange={() => setDeliveryType('delivery')}
                    className="mt-0.5 accent-white"
                  />
                  <div>
                    <div className="text-xs font-bold font-mono-tech uppercase text-white flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-white" />
                      Kurirska dostava 48h
                    </div>
                    <div className="text-[11px] font-typewriter text-[#888888] mt-1">
                      {total >= freeShippingThreshold
                        ? 'Besplatna dostava (iznad 200 KM)'
                        : 'Dostava na vašu adresu (12 KM)'}
                    </div>
                  </div>
                </label>

                <label
                  className={`p-3.5 border cursor-pointer flex items-start gap-3 transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-white bg-[#151515]'
                      : 'border-[#222222] bg-[#0A0A0A] hover:border-[#444444]'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={() => setDeliveryType('pickup')}
                    className="mt-0.5 accent-white"
                  />
                  <div>
                    <div className="text-xs font-bold font-mono-tech uppercase text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                      Lično preuzimanje Sarajevo
                    </div>
                    <div className="text-[11px] font-typewriter text-[#888888] mt-1">
                      Besplatno preuzimanje po dogovoru u Sarajevu
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#888888] border-b border-[#1A1A1A] pb-2">
                02. PODACI KUPCA
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                    Ime i Prezime *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Amar Karić"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                    Broj Telefona *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+387 61 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {deliveryType === 'delivery' ? (
                <>
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                      Adresa za dostavu (Ulica i broj) *
                    </label>
                    <input
                      type="text"
                      required={deliveryType === 'delivery'}
                      placeholder="npr. Ferhadija 12 / Stan 3"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                        Grad *
                      </label>
                      <input
                        type="text"
                        required={deliveryType === 'delivery'}
                        placeholder="Sarajevo / Mostar / Tuzla / Zenica"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-[#AAAAAA] mb-1">
                        Poštanski broj *
                      </label>
                      <input
                        type="text"
                        required={deliveryType === 'delivery'}
                        placeholder="71000"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-white px-3 py-2.5 text-xs font-mono-tech text-white outline-none transition-colors"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-3 bg-[#111111] border border-[#2A2A2A] text-xs font-typewriter text-[#CCCCCC]">
                  <p className="font-bold text-white mb-1">Lokacija ličnog preuzimanja:</p>
                  <p>Sarajevo (Centar / Novo Sarajevo po dogovoru). Nakon narudžbe kontaktirat ćemo vas putem telefona ili WhatsApp/Instagrama za tačnu lokaciju i termin preuzimanja.</p>
                </div>
              )}
            </div>

            {/* Payment Method Notice: ONLY Cash on delivery / In person */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#888888] border-b border-[#1A1A1A] pb-2">
                03. NAČIN PLAĆANJA
              </h3>
              <div className="p-4 bg-[#141414] border border-white text-xs font-mono-tech text-white flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold uppercase">
                    {deliveryType === 'delivery'
                      ? 'Plaćanje pouzećem (Gotovinom kuriru)'
                      : 'Plaćanje gotovinom pri ličnom preuzimanju'}
                  </div>
                  <div className="text-[11px] font-typewriter text-[#AAAAAA] mt-1">
                    {deliveryType === 'delivery'
                      ? 'Iznos plaćate kuriru u gotovini kada preuzmete paket na vašoj adresi.'
                      : 'Iznos plaćate gotovinom prilikom ličnog preuzimanja u Sarajevu.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 bg-[#080808] border border-[#1E1E1E] space-y-2 text-xs font-mono-tech">
              <div className="flex justify-between text-[#888888]">
                <span>Iznos artikala:</span>
                <span className="text-white tabular-nums">
                  {currency === 'KM' ? `${total} KM` : `€${total}`}
                </span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Preuzimanje / Dostava:</span>
                <span className="text-white">
                  {deliveryType === 'pickup'
                    ? 'BESPLATNO (Lično Sarajevo)'
                    : shippingCost === 0
                    ? 'BESPLATNO (Iznad 200 KM)'
                    : currency === 'KM'
                    ? '12 KM'
                    : '€6'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1C1C1C] flex justify-between text-sm font-bold text-white">
                <span>ZA PLATITI:</span>
                <span className="text-base text-white tabular-nums">
                  {currency === 'KM' ? `${finalTotal} KM` : `€${finalTotal}`}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white hover:bg-[#E0E0E0] text-black font-mono-tech text-xs uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'OBRAĐUJEM REZERVACIJU...' : 'POTVRDI I REZERVIŠI MAJICU'}
            </button>

            <p className="text-[10px] text-center font-typewriter text-[#666666]">
              Limitirano na 50 komada po modelu. Potvrdom rezervacije čuvamo vašu veličinu.
            </p>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#141414] border border-[#333333] flex items-center justify-center text-[#10b981]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono-tech tracking-widest text-[#10b981] uppercase block">
                NARUDŽBA USPJEŠNO EVIDENTIRANA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-syne uppercase text-white tracking-tight">
                HVALA NA POVJERENJU
              </h3>
              <p className="text-xs font-typewriter text-[#888888] max-w-md mx-auto leading-relaxed">
                Vaša regular majica iz <strong>Drop 01 (limitirano na 50 komada)</strong> je rezervisana.
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="p-6 bg-[#080808] border border-[#222222] text-left max-w-md mx-auto space-y-3 font-mono-tech text-xs">
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">KOD NARUDŽBE:</span>
                <span className="text-white font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">PRIMALAC:</span>
                <span className="text-white">{formData.fullName || 'Kupac'}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">PREUZIMANJE:</span>
                <span className="text-white">
                  {deliveryType === 'pickup' ? 'Lično Sarajevo' : `Dostava 48h (${formData.city || 'BiH'}) — 12 KM`}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#666666]">PLAĆANJE:</span>
                <span className="text-white uppercase">Gotovinom pri preuzimanju</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#666666]">ROK ISPORUKE:</span>
                <span className="text-[#10b981] font-bold">
                  {deliveryType === 'pickup' ? 'Termin po dogovoru' : 'Dostava u roku 48h'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-mono-tech text-xs uppercase tracking-wider font-bold hover:bg-[#E5E5E5] cursor-pointer"
              >
                NAZAD NA STRANICU
              </button>
              <a
                href="https://instagram.com/cltr.noir"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-[#333333] hover:border-white text-white font-mono-tech text-xs uppercase tracking-wider transition-colors"
              >
                INSTAGRAM CLTR.NOIR
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
