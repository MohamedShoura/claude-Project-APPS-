export type CategorySlug =
  | "electronics"
  | "fashion"
  | "beauty"
  | "home"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  nameAr: string;
  nameEn: string;
  image: string;
  productCount: number;
}

export interface ProductVariationOption {
  label: string;
  value: string;
  hex?: string;
  extraPrice?: number;
}

export interface ProductVariation {
  nameAr: string;
  nameEn: string;
  options: ProductVariationOption[];
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  dateISO: string;
  productPurchased: string;
  verified: boolean;
  textAr: string;
  textEn: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  category: CategorySlug;
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  shortDescEn: string;
  descriptionAr: string;
  descriptionEn: string;
  specs: { keyAr: string; keyEn: string; valueAr: string; valueEn: string }[];
  images: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFlashDeal: boolean;
  flashDealEndsISO?: string;
  variations?: ProductVariation[];
  reviews: Review[];
  tags: string[];
}

export type OrderStatus =
  | "new"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderItem {
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  image: string;
  qty: number;
  price: number;
  originalPrice: number;
  variation?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  mobile: string;
  email?: string;
  governorate: string;
  city: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "card" | "wallet" | "instapay";
  status: OrderStatus;
  createdAtISO: string;
  couponCode?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastPurchaseISO: string;
  joinedISO: string;
}

export interface Coupon {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minOrder?: number;
  usageCount: number;
  usageLimit: number;
  active: boolean;
  expiresISO: string;
}

export interface Governorate {
  nameAr: string;
  nameEn: string;
  region: "cairo" | "giza" | "alex" | "delta" | "upper" | "other";
  fee: number;
  etaDays: string;
}
