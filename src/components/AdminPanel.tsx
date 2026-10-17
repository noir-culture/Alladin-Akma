import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Package,
  Truck,
  Users,
  Settings,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  Phone,
  MapPin,
  Copy,
  Check,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { Order, OrderStatus, Product, Size } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onAddSampleOrder: () => void;
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
  vipEmails: string[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onAddSampleOrder,
  products,
  onUpdateStock,
  vipEmails,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'vip' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  useEffect(() => {
    // If previously unlocked in session
    const savedAuth = sessionStorage.getItem('noir_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: noir2026 or 1234
    if (pin.toLowerCase() === 'noir2026' || pin === '1234' || pin.toLowerCase() === 'noir') {
      setIsAuthenticated(true);
      sessionStorage.setItem('noir_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('noir_admin_auth', 'true');
    setPinError(false);
  };

  const handleCopyCourierData = (order: Order) => {
    const courierText = `[NOIR CULTURE POŠILJKA]
Primalac: ${order.customerName}
Telefon: ${order.phone}
Adresa: ${order.address || 'Lično preuzimanje Sarajevo'}
Grad: ${order.city || 'Sarajevo'} ${order.postalCode || ''}
Sadržaj: ${order.items.map((i) => `${i.productName} (${i.size}) x${i.quantity}`).join(', ')}
Iznos za naplatu (otkupnina): ${order.total} KM
Način: ${order.deliveryType === 'delivery' ? 'Brza pošta 48h (Dostava 12 KM uračunata)' : 'Lično preuzimanje (0 KM)'}`;

    navigator.clipboard.writeText(courierText);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    return o.status === orderFilter;
  });

  // Calculate KPIs
  const totalRevenueKM = orders
    .filter((o) => o.status !== 'OTKAZANO')
    .reduce((sum, o) => sum + o.total, 0);

  const totalDelivered = orders.filter((o) => o.status === 'PREUZETO').length;
  const totalPending = orders.filter((o) => o.status === 'NOVO' || o.status === 'U PRIPREMI').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn text-white">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-[#0A0A0A] border border-[#2A2A2A] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-black border-b border-[#222222] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#141414] border border-[#333333]">
              <Settings className="w-4 h-4 text-[#8B0000]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#888888]">
                  // BRAND BACKSTAGE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              </div>
              <h2 className="text-lg font-bold font-syne uppercase tracking-wider text-white">
                NOIR CULTURE // ADMIN PANEL
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem('noir_admin_auth');
                }}
                className="text-xs font-mono-tech text-[#888888] hover:text-white px-2.5 py-1 border border-[#222222] hover:border-[#444444] transition-colors cursor-pointer"
              >
                Odjavi se
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 border border-[#2A2A2A] hover:border-white text-white transition-colors cursor-pointer"
              aria-label="Zatvori admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-16 flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
            <div className="w-14 h-14 bg-[#141414] border border-[#333333] flex items-center justify-center text-white">
              <Lock className="w-6 h-6 text-[#8B0000]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-syne uppercase text-white tracking-tight">
                PRIJAVA ZA VLASNIKA BRENDA
              </h3>
              <p className="text-xs font-typewriter text-[#888888]">
                Unesite administratorski PIN za pristup narudžbama, zalihama i bazi kupaca.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                placeholder="Unesite PIN (npr. noir2026)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className={`w-full bg-[#111111] border ${
                  pinError ? 'border-[#8B0000]' : 'border-[#333333] focus:border-white'
                } px-4 py-3 text-center text-sm font-mono-tech text-white outline-none tracking-widest`}
              />

              {pinError && (
                <p className="text-xs font-mono-tech text-[#8B0000]">
                  Neispravan PIN. Pokušajte ponovo ili kliknite ispod.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-bold hover:bg-[#E0E0E0] transition-colors cursor-pointer"
              >
                OTKLJUČAJ PANEL
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-[#141414] hover:bg-[#202020] border border-[#2A2A2A] text-xs font-mono-tech text-[#CCCCCC] transition-colors cursor-pointer"
              >
                Brzi demo pristup (Jedan klik)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* KPI Ribbon */}
            <div className="p-4 sm:px-6 bg-[#0E0E0E] border-b border-[#1E1E1E] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-tech shrink-0">
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[10px] text-[#777777] uppercase block">UKUPAN PROMET</span>
                <span className="text-lg font-bold text-white tabular-nums mt-0.5 block">
                  {totalRevenueKM} KM
                </span>
              </div>
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[10px] text-[#777777] uppercase block">UKUPNO NARUDŽBI</span>
                <span className="text-lg font-bold text-white tabular-nums mt-0.5 block">
                  {orders.length}
                </span>
              </div>
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[10px] text-[#777777] uppercase block">ČEKA ISPORUKU</span>
                <span className="text-lg font-bold text-[#10b981] tabular-nums mt-0.5 block">
                  {totalPending}
                </span>
              </div>
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[10px] text-[#777777] uppercase block">CIJENA DOSTAVE</span>
                <span className="text-lg font-bold text-white tabular-nums mt-0.5 block">
                  12 KM
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 bg-black border-b border-[#222222] flex items-center justify-between overflow-x-auto shrink-0">
              <div className="flex items-center gap-1 py-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                    activeTab === 'orders'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Narudžbe ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                    activeTab === 'inventory'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Zalihe & Limit 50 komada</span>
                </button>

                <button
                  onClick={() => setActiveTab('vip')}
                  className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                    activeTab === 'vip'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>VIP Najave ({vipEmails.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                    activeTab === 'settings'
                      ? 'border-white text-white font-bold'
                      : 'border-transparent text-[#777777] hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Podešavanja</span>
                </button>
              </div>

              {activeTab === 'orders' && (
                <button
                  onClick={onAddSampleOrder}
                  className="text-[11px] font-mono-tech px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#333333] hover:border-white text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Dodaj testnu narudžbu</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0 bg-[#080808]">
              {/* TAB 1: ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Filter Sub-bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1A1A1A]">
                    <div className="flex items-center gap-1 text-[11px] font-mono-tech">
                      {['ALL', 'NOVO', 'U PRIPREMI', 'POSLANO', 'PREUZETO', 'OTKAZANO'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setOrderFilter(status)}
                          className={`px-2.5 py-1 transition-colors cursor-pointer uppercase ${
                            orderFilter === status
                              ? 'bg-white text-black font-bold'
                              : 'text-[#777777] hover:text-white bg-[#111111]'
                          }`}
                        >
                          {status === 'ALL' ? 'Sve' : status}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-mono-tech text-[#888888]">
                      Prikazano: {filteredOrders.length} narudžbi
                    </div>
                  </div>

                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <p className="text-sm font-bold font-syne uppercase text-white">
                        Nema narudžbi u ovoj kategoriji
                      </p>
                      <p className="text-xs font-typewriter text-[#777777]">
                        Svaka nova narudžba napravljena preko blagajne odmah se prikazuje ovdje.
                      </p>
                      <button
                        onClick={onAddSampleOrder}
                        className="px-4 py-2 bg-white text-black text-xs font-mono-tech uppercase font-bold hover:bg-[#E0E0E0] cursor-pointer"
                      >
                        Generiši probnu narudžbu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.id}
                          className="p-5 bg-[#0C0C0C] border border-[#222222] hover:border-[#383838] transition-all space-y-4"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A1A1A] pb-3 gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold font-mono-tech text-white">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`text-[10px] font-mono-tech px-2 py-0.5 uppercase font-bold ${
                                  order.status === 'NOVO'
                                    ? 'bg-[#8B0000] text-white animate-pulse'
                                    : order.status === 'U PRIPREMI'
                                    ? 'bg-[#ca8a04] text-black'
                                    : order.status === 'POSLANO'
                                    ? 'bg-[#2563eb] text-white'
                                    : order.status === 'PREUZETO'
                                    ? 'bg-[#15803d] text-white'
                                    : 'bg-[#333333] text-[#AAAAAA]'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>

                            <div className="text-[11px] font-mono-tech text-[#777777]">
                              {new Date(order.createdAt).toLocaleString('bs-BA')}
                            </div>
                          </div>

                          {/* Order Content Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-tech">
                            {/* Customer Column */}
                            <div className="space-y-1.5 p-3 bg-black border border-[#1A1A1A]">
                              <span className="text-[10px] font-bold text-[#666666] uppercase block">
                                PODACI O KUPCU
                              </span>
                              <div className="font-bold text-white text-sm">{order.customerName}</div>
                              <div className="flex items-center gap-2 text-[#CCCCCC]">
                                <Phone className="w-3.5 h-3.5 text-[#888888]" />
                                <a
                                  href={`tel:${order.phone}`}
                                  className="hover:underline hover:text-white"
                                >
                                  {order.phone}
                                </a>
                              </div>
                              <div className="flex items-start gap-2 text-[#888888]">
                                <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                                <div>
                                  {order.deliveryType === 'pickup' ? (
                                    <span className="text-[#10b981] font-bold">
                                      Lično preuzimanje Sarajevo
                                    </span>
                                  ) : (
                                    <span>
                                      {order.address}, {order.city} {order.postalCode}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Items Column */}
                            <div className="space-y-1.5 p-3 bg-black border border-[#1A1A1A]">
                              <span className="text-[10px] font-bold text-[#666666] uppercase block">
                                NARUČENI ARTIKLI
                              </span>
                              <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-white"
                                  >
                                    <span>
                                      {item.productName}{' '}
                                      <strong className="text-[#8B0000]">[{item.size}]</strong>
                                    </span>
                                    <span className="text-[#888888]">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Total & Courier Copy Column */}
                            <div className="space-y-2 p-3 bg-black border border-[#1A1A1A] flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-[#666666] uppercase block">
                                  FINANSIJE // GOTOVINA
                                </span>
                                <div className="flex justify-between text-[#888888] mt-1">
                                  <span>Artikli:</span>
                                  <span>{order.subtotal} KM</span>
                                </div>
                                <div className="flex justify-between text-[#888888]">
                                  <span>Dostava:</span>
                                  <span>{order.shippingCost === 0 ? '0 KM (Besplatno)' : '12 KM'}</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-sm border-t border-[#222222] pt-1 mt-1">
                                  <span>ZA NAPLATU:</span>
                                  <span className="text-base text-white">{order.total} KM</span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleCopyCourierData(order)}
                                className="w-full py-2 bg-[#141414] hover:bg-[#202020] border border-[#333333] hover:border-white text-[11px] font-mono-tech text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                {copiedOrderId === order.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#10b981]" />
                                    <span>KOPIRANO ZA KURIRA</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Kopiraj za brzu poštu</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Status Actions */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#171717]">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-tech">
                              <span className="text-[#666666] mr-1 text-[10px] uppercase">
                                Promijeni status:
                              </span>
                              {(['NOVO', 'U PRIPREMI', 'POSLANO', 'PREUZETO', 'OTKAZANO'] as OrderStatus[]).map(
                                (st) => (
                                  <button
                                    key={st}
                                    onClick={() => onUpdateOrderStatus(order.id, st)}
                                    className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer border ${
                                      order.status === st
                                        ? 'bg-white text-black border-white'
                                        : 'bg-[#111111] text-[#777777] border-[#222222] hover:border-white hover:text-white'
                                    }`}
                                  >
                                    {st}
                                  </button>
                                )
                              )}
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`Da li ste sigurni da želite obrisati narudžbu ${order.orderNumber}?`)) {
                                  onDeleteOrder(order.id);
                                }
                              }}
                              className="text-[11px] text-[#666666] hover:text-[#8B0000] p-1 flex items-center gap-1 transition-colors cursor-pointer"
                              title="Obriši narudžbu"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Obriši</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: INVENTORY & 50 PIECES LIMIT */}
              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#0D0D0D] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold font-syne uppercase text-white">
                        DROP 01 // LIMITIRANO NA 50 KOMADA PO MODELU
                      </h3>
                      <p className="text-xs font-typewriter text-[#888888] mt-0.5">
                        Ukupan planirani tiraž je 150 majica (3 modela × 50 komada). Svaka majica ima cijenu od 50 KM.
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-black border border-[#333333] text-xs font-mono-tech text-white">
                      Cijena: <strong>50 KM</strong> / Dostava: <strong>12 KM</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => {
                      const totalStock = product.stock;
                      const percentage = Math.round((totalStock / 50) * 100);

                      return (
                        <div
                          key={product.id}
                          className="bg-[#0C0C0C] border border-[#222222] p-5 space-y-4"
                        >
                          <div className="relative aspect-square bg-black border border-[#1A1A1A] overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover filter contrast-110"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/85 border border-[#333333] text-[10px] font-mono-tech text-white">
                              {product.code}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold font-syne uppercase text-white truncate">
                              {product.name}
                            </h4>
                            <div className="text-[11px] font-typewriter text-[#777777]">
                              100% pamuk · Regular kroj · S, M, L, XL
                            </div>
                          </div>

                          {/* Stock Progress Bar */}
                          <div className="space-y-1.5 font-mono-tech text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#888888]">Preostalo na stanju:</span>
                              <span className="text-white font-bold">
                                {totalStock} / 50 kom
                              </span>
                            </div>
                            <div className="w-full h-2 bg-[#1A1A1A] overflow-hidden">
                              <div
                                className="h-full bg-white transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Quick Adjust Buttons */}
                          <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
                            <span className="text-[11px] font-mono-tech text-[#666666]">
                              Prilagodi lager:
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateStock(product.id, Math.max(0, totalStock - 1))}
                                className="w-8 h-8 bg-black border border-[#333333] hover:border-white text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center font-mono-tech font-bold text-white">
                                {totalStock}
                              </span>
                              <button
                                onClick={() => onUpdateStock(product.id, Math.min(50, totalStock + 1))}
                                className="w-8 h-8 bg-black border border-[#333333] hover:border-white text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: VIP EMAILS */}
              {activeTab === 'vip' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#0D0D0D] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold font-syne uppercase text-white">
                        PRIJAVE ZA NAJAVE NOVIH DROPOVA ({vipEmails.length})
                      </h3>
                      <p className="text-xs font-typewriter text-[#888888] mt-0.5">
                        Kupci i pratioci koji su ostavili svoj e-mail za obavijesti o dropovima.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(vipEmails.join(', '));
                        alert('Kopirana lista e-mail adresa u međuspremnik!');
                      }}
                      className="px-4 py-2 bg-white text-black font-mono-tech text-xs uppercase font-bold hover:bg-[#E5E5E5] transition-colors cursor-pointer shrink-0"
                    >
                      Kopiraj sve e-mailove
                    </button>
                  </div>

                  <div className="bg-[#0C0C0C] border border-[#222222] divide-y divide-[#171717] font-mono-tech text-xs">
                    {vipEmails.map((email, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 flex items-center justify-between text-[#CCCCCC] hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#555555]">#{idx + 1}</span>
                          <span className="text-white font-medium">{email}</span>
                        </span>
                        <a
                          href={`mailto:${email}`}
                          className="text-[#888888] hover:text-white hover:underline text-[11px]"
                        >
                          Pošalji e-mail
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                  <div className="p-6 bg-[#0C0C0C] border border-[#222222] space-y-4 font-mono-tech text-xs">
                    <h3 className="text-sm font-bold font-syne uppercase text-white border-b border-[#222222] pb-3">
                      PARAMETRI PRODAVNICE
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black border border-[#1A1A1A]">
                        <span className="text-[#777777] block text-[10px] uppercase">
                          Cijena majica
                        </span>
                        <span className="text-base font-bold text-white">50 KM</span>
                      </div>

                      <div className="p-3 bg-black border border-[#1A1A1A]">
                        <span className="text-[#777777] block text-[10px] uppercase">
                          Cijena dostave
                        </span>
                        <span className="text-base font-bold text-white">12 KM (48h)</span>
                      </div>

                      <div className="p-3 bg-black border border-[#1A1A1A]">
                        <span className="text-[#777777] block text-[10px] uppercase">
                          Besplatna dostava
                        </span>
                        <span className="text-base font-bold text-white">Iznad 200 KM</span>
                      </div>

                      <div className="p-3 bg-black border border-[#1A1A1A]">
                        <span className="text-[#777777] block text-[10px] uppercase">
                          Lično preuzimanje
                        </span>
                        <span className="text-base font-bold text-[#10b981]">0 KM (Sarajevo)</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#222222] space-y-2 text-[#AAAAAA]">
                      <div>
                        <strong>Instagram:</strong> @cltr.noir
                      </div>
                      <div>
                        <strong>E-mail za upite:</strong> noir.culture76@gmail.com
                      </div>
                      <div>
                        <strong>Plaćanje:</strong> Pouzećem gotovinom kuriru ili gotovinom pri preuzimanju
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
