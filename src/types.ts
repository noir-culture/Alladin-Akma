export type Size = 'S' | 'M' | 'L' | 'XL';

export type Currency = 'KM' | 'EUR';

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  priceKM: number;
  priceEUR: number;
  image: string;
  sizes: Size[];
  fit: string;
  composition: string;
  care: string;
  description: string;
  edition: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // product id + size
  product: Product;
  size: Size;
  quantity: number;
}

export type OrderStatus = 'NOVO' | 'U PRIPREMI' | 'POSLANO' | 'PREUZETO' | 'OTKAZANO';

export interface OrderItem {
  productId: string;
  productName: string;
  size: Size;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  postalCode?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
