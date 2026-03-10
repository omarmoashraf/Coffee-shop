import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wished = products.filter((p) => wishlist.includes(p.id));

  if (wished.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <Heart className="text-muted-foreground mb-4" size={48} />
        <h1 className="font-heading text-2xl text-foreground mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save your favorite coffees for later.</p>
        <Link to="/shop" className="px-6 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">
          Browse Coffee
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-coffee-dark py-12 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl text-primary-foreground">My Wishlist</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wished.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg overflow-hidden shadow-warm"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                <button onClick={() => toggleWishlist(product.id)} className="absolute top-3 right-3 w-8 h-8 bg-warm-white/90 rounded-full flex items-center justify-center">
                  <X size={14} className="text-foreground" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <Link to={`/product/${product.id}`} className="font-heading text-foreground hover:text-gold transition-colors">{product.name}</Link>
                <p className="font-heading text-lg text-foreground">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product, 1, product.weights[0], 'whole')}
                  className="w-full py-2 bg-gold text-coffee-dark text-sm font-medium rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
