export interface SauceOption {
  id: string;
  name: string;
  vietnameseName: string;
  description: string;
  flavorProfile: string;
  spicyLevel: 0 | 1 | 2 | 3; // 0: không cay, 1: nhẹ, 2: vừa, 3: cay nồng
  price: number;
  bottleSize: string;
  popular?: boolean;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface JellyfishProduct {
  id: string;
  name: string;
  category: 'ready-to-eat' | 'fresh-pack' | 'sauce' | 'topping';
  price: number;
  originalPrice?: number;
  description: string;
  shortDesc: string;
  weight: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  includesSauceCount: number; // e.g. 1 if includes 1 free sauce
  availableSauces?: string[]; // IDs of sauces that can be picked
  tags: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  shelfLife: string;
  servingSuggestion: string;
}

export interface CartItem {
  cartItemId: string;
  product: JellyfishProduct;
  quantity: number;
  selectedSauce?: SauceOption | null;
  extraSauces: { sauce: SauceOption; quantity: number }[];
  selectedToppings: { topping: ToppingOption; quantity: number }[];
  spicyPreference: 'Không cay' | 'Cay vừa' | 'Cay nồng đậm vị';
  note?: string;
  totalPrice: number;
}

export type PaymentMethod = 'vietqr' | 'momo' | 'vnpay' | 'card' | 'cod';

export interface OrderInfo {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  district: string;
  deliveryTime: 'instant' | 'scheduled';
  scheduledTimeNote?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  voucherCode?: string;
  total: number;
  note?: string;
  createdAt: string;
  estimatedDeliveryMinutes: number;
}
