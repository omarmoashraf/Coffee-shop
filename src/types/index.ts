export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  origin: string;
  roastLevel: 'light' | 'medium' | 'dark';
  flavorNotes: string[];
  brewingMethods: string[];
  category: string;
  rating: number;
  reviews: number;
  weights: number[];
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  weight: number;
  grind: 'whole' | 'ground';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
