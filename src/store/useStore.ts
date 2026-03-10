import { create } from 'zustand';
import { CartItem, Product, User } from '@/types';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  wishlist: string[];
  searchQuery: string;
  addToCart: (product: Product, quantity: number, weight: number, grind: 'whole' | 'ground') => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  setUser: (user: User | null) => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  user: null,
  wishlist: [],
  searchQuery: '',

  addToCart: (product, quantity, weight, grind) => {
    set((state) => {
      const existing = state.cart.find(
        (item) => item.product.id === product.id && item.weight === weight && item.grind === grind
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id && item.weight === weight && item.grind === grind
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity, weight, grind }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((item) => item.product.id !== productId)
        : state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  cartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  setUser: (user) => set({ user }),

  toggleWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
}));
