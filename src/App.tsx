import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Manifesto } from './components/Manifesto';
import { EditorialPackagingShowcase } from './components/EditorialPackagingShowcase';
import { ContactModal } from './components/ContactModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Size, CartItem, Currency, Order, OrderStatus } from './types';
import { Bell, Check, Instagram, Mail, MapPin, Truck, Sparkles } from 'lucide-react';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'NC-4891-ARCHIVE',
    customerName: 'Faris Džanko',
    phone: '+387 61 452 899',
    deliveryType: 'pickup',
    city: 'Sarajevo (Preuzimanje)',
    items: [
      {
        productId: 'noir-culture-core-tee',
        productName: 'NOIR CASUAL',
        size: 'L',
        quantity: 1,
        unitPrice: 50,
      },
    ],
    subtotal: 50,
    shippingCost: 0,
    total: 50,
    status: 'U PRIPREMI',
    createdAt: '2026-10-16T15:20:00Z',
  },
  {
    id: 'ord-102',
    orderNumber: 'NC-6124-ARCHIVE',
    customerName: 'Tarik Hadžić',
    phone: '+387 62 119 402',
    deliveryType: 'delivery',
    address: 'Zlatarska 14, Stan 2',
    city: 'Tuzla',
    postalCode: '75000',
    items: [
      {
        productId: 'noir-samurai-regular-tee',
        productName: 'BORN BROKE DIE RICH',
        size: 'XL',
        quantity: 1,
        unitPrice: 50,
      },
    ],
    subtotal: 50,
    shippingCost: 12,
    total: 62,
    status: 'NOVO',
    createdAt: '2026-10-16T17:10:00Z',
  },
];

const INITIAL_VIP_EMAILS = [
  'faris.dz@gmail.com',
  'urban.noir.sarajevo@outlook.com',
  'streetwear.collector@yahoo.com',
];

export default function App() {
  const [currency, setCurrency] = useState<Currency>('KM');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'noir-samurai-regular-tee-L',
      product: PRODUCTS[0],
      size: 'L',
      quantity: 1,
    },
  ]);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('noir_orders_data');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [vipEmails, setVipEmails] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('noir_vip_emails');
      return saved ? JSON.parse(saved) : INITIAL_VIP_EMAILS;
    } catch {
      return INITIAL_VIP_EMAILS;
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // VIP Alert form state
  const [vipEmail, setVipEmail] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('noir_orders_data', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('noir_vip_emails', JSON.stringify(vipEmails));
    } catch {
      // ignore
    }
  }, [vipEmails]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'KM' ? 'EUR' : 'KM'));
  };

  const handleAddToCart = (product: Product, size: Size) => {
    const cartItemId = `${product.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: cartItemId, product, size, quantity: 1 }];
    });

    showToast(`DODANO: ${product.name} [${size}]`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNewOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // decrease stock for ordered items
    setProducts((prev) =>
      prev.map((prod) => {
        const itemOrdered = newOrder.items.find((i) => i.productId === prod.id);
        if (itemOrdered) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - itemOrdered.quantity),
          };
        }
        return prod;
      })
    );

    showToast(`NOVA NARUDŽBA #${newOrder.orderNumber} EVIDENTIRANA`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`STATUS NARUDŽBE AŽURIRAN: ${newStatus}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('NARUDŽBA UKLONJENA');
  };

  const handleAddSampleOrder = () => {
    const sampleNames = ['Kemal Begić', 'Amina Mehmedović', 'Dino Alikadić', 'Mirza Čengić'];
    const sampleCities = ['Sarajevo', 'Mostar', 'Banja Luka', 'Zenica'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomCity = sampleCities[Math.floor(Math.random() * sampleCities.length)];
    const isPickup = randomCity === 'Sarajevo' && Math.random() > 0.5;

    const sampleOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `NC-${Math.floor(1000 + Math.random() * 9000)}-ARCHIVE`,
      customerName: randomName,
      phone: `+387 61 ${Math.floor(100000 + Math.random() * 900000)}`,
      deliveryType: isPickup ? 'pickup' : 'delivery',
      address: isPickup ? undefined : 'Titova 24 / Stan 5',
      city: isPickup ? 'Sarajevo (Preuzimanje)' : randomCity,
      postalCode: isPickup ? undefined : '71000',
      items: [
        {
          productId: products[1].id,
          productName: products[1].name,
          size: 'L',
          quantity: 1,
          unitPrice: 50,
        },
      ],
      subtotal: 50,
      shippingCost: isPickup ? 0 : 12,
      total: isPickup ? 50 : 62,
      status: 'NOVO',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [sampleOrder, ...prev]);
    showToast(`DODANA TESTNA NARUDŽBA #${sampleOrder.orderNumber}`);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipEmail) return;

    if (!vipEmails.includes(vipEmail)) {
      setVipEmails((prev) => [...prev, vipEmail]);
    }

    setVipSuccess(true);
    setTimeout(() => {
      setVipSuccess(false);
      setVipEmail('');
    }, 4000);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] relative selection:bg-[#8B0000] selection:text-white">
      {/* 35mm Analog Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Banner: Limited to 50 pieces & Free shipping above 200 KM & Delivery 12 KM */}
      <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] px-4 py-2 text-center text-[11px] font-mono-tech tracking-wider text-[#CCCCCC] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
          <strong className="text-white">LIMITIRANO NA 50 KOMADA</strong>
        </div>
        <span className="hidden sm:inline text-[#444444]">·</span>
        <div>BESPLATNA DOSTAVA IZNAD 200 KM</div>
        <span className="hidden sm:inline text-[#444444]">·</span>
        <div className="text-white font-medium">DOSTAVA 12 KM (48H)</div>
        <span className="hidden sm:inline text-[#444444]">·</span>
        <div className="text-[#888888]">BESPLATNO PREUZIMANJE SARAJEVO</div>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={cartCount}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Latest Drop Product Section: 3 Regular T-Shirts */}
      <section id="drop" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-6 mb-12 gap-6">
          <div>
            <div className="text-[11px] font-mono-tech text-[#888888] uppercase tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-[1px] bg-[#8B0000]" />
              <span>DROP 01 // LIMITIRANO NA 50 KOMADA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-syne uppercase tracking-tight mt-2">
              3 REGULAR MAJICE
            </h2>
            <p className="mt-2 text-xs font-typewriter text-[#888888] max-w-xl">
              100% pamuk · Regular kroj · Limitirano na 50 komada · Cijena: 50 KM po majici
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#0D0D0D] border border-[#222222] text-xs font-mono-tech text-white flex items-center gap-2">
              <span className="text-[#8B0000] font-bold">●</span>
              <span>CIJENA: <strong>50 KM</strong> (25 €)</span>
            </div>
            <div className="px-3 py-2 bg-[#0D0D0D] border border-[#222222] text-xs font-mono-tech text-[#AAAAAA]">
              VELIČINE: <strong>S, M, L, XL</strong>
            </div>
          </div>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Delivery & Quality Notice */}
        <div className="mt-16 p-6 sm:p-8 bg-[#080808] border border-[#1F1F1F] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono-tech">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider">DOSTAVA 12 KM (48H)</div>
              <p className="text-[#888888] font-typewriter mt-1">
                Brza kurirska dostava širom BiH u roku od 48h. Besplatna dostava iznad 200 KM.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider">LIČNO PREUZIMANJE SARAJEVO</div>
              <p className="text-[#888888] font-typewriter mt-1">
                Besplatno preuzimanje po dogovoru na lokaciji u Sarajevu (0 KM).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider">100% PAMUK · KVALITET</div>
              <p className="text-[#888888] font-typewriter mt-1">
                Čvrst i udoban regular kroj. Izdržljiv materijal i postojan otisak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Photoshoot (Slikanje) & Packaging Unboxing (Pakovanje) */}
      <EditorialPackagingShowcase onSelectProduct={(p) => setQuickViewProduct(p)} />

      {/* Lookbook Atmosphere Showcase (The 3 Drop 01 Tees) */}
      <section className="py-16 bg-[#050505] border-y border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono-tech text-[#888888] tracking-widest uppercase">
              // NOIR CULTURE ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-syne uppercase text-white mt-1">
              DROP 01 // 3 REGULAR MAJICE
            </h2>
            <p className="text-xs font-typewriter text-[#777777] mt-1">
              50 KM · 100% Pamuk · Limitirano na 50 komada · Dostava 12 KM
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                onClick={() => setQuickViewProduct(prod)}
                className="group relative aspect-[3/4] overflow-hidden bg-black border border-[#222222] cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono-tech text-white">
                  <span className="text-[#888888] text-[10px] block uppercase">
                    MODEL 0{idx + 1} // PREOSTALO: {prod.stock}/50
                  </span>
                  <div className="font-bold font-syne text-sm uppercase mt-0.5">{prod.name}</div>
                  <div className="text-[#10b981] text-[11px] mt-1">50 KM (Klik za detalje)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <Manifesto />

      {/* VIP Early Access / Newsletter Section */}
      <section className="py-20 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-[#2A2A2A] text-[11px] font-mono-tech text-[#AAAAAA] uppercase">
            <Bell className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>NOIR CULTURE REZERVACIJE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-syne uppercase text-white tracking-tight">
            REZERVACIJA I NAJAVE DROPOVA
          </h2>

          <p className="text-xs sm:text-sm font-typewriter text-[#888888] max-w-xl mx-auto leading-relaxed">
            Ostvarite direktan kontakt ili rezervaciju jedne od 50 majica. Pratite nas na Instagramu <strong>cltr.noir</strong> ili pišite na <strong>noir.culture76@gmail.com</strong>.
          </p>

          <form onSubmit={handleVipSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="unesite.email@domena.com"
              value={vipEmail}
              onChange={(e) => setVipEmail(e.target.value)}
              className="flex-1 bg-black border border-[#333333] focus:border-white px-4 py-3 text-xs font-mono-tech text-white outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white hover:bg-[#E0E0E0] text-black font-mono-tech text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0"
            >
              PRIJAVI SE
            </button>
          </form>

          {vipSuccess && (
            <p className="text-xs font-mono-tech text-[#10b981] flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Vaša e-mail adresa je zabilježena u VIP bazi. Hvala.</span>
            </p>
          )}

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono-tech text-[#AAAAAA]">
            <a
              href="https://instagram.com/cltr.noir"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4 text-[#8B0000]" />
              <span>cltr.noir</span>
            </a>
            <span>·</span>
            <a
              href="mailto:noir.culture76@gmail.com"
              className="text-white hover:underline flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-[#8B0000]" />
              <span>noir.culture76@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        currency={currency}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        currency={currency}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={handleClearCart}
        onOrderCreated={handleNewOrder}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onAddSampleOrder={handleAddSampleOrder}
        products={products}
        onUpdateStock={handleUpdateStock}
        vipEmails={vipEmails}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141414] border border-[#333333] text-white px-4 py-3 font-mono-tech text-xs flex items-center gap-3 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="underline hover:text-[#CCCCCC] ml-2 font-bold cursor-pointer"
          >
            Pregledaj korpu
          </button>
        </div>
      )}
    </div>
  );
}
