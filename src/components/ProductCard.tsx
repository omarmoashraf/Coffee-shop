import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWished = wishlist.includes(product.id);

  const roastColors: Record<string, string> = {
    light: 'bg-gold-light/30 text-coffee-medium',
    medium: 'bg-gold/20 text-coffee-brown',
    dark: 'bg-coffee-brown/20 text-coffee-dark',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-elevated transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-warm-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-gold transition-colors"
        >
          <Heart size={16} className={isWished ? 'fill-gold text-gold' : 'text-coffee-medium'} />
        </button>

        <span className={`absolute top-3 left-3 px-2 py-1 rounded-sm text-xs font-medium uppercase tracking-wider ${roastColors[product.roastLevel]}`}>
          {product.roastLevel} Roast
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1, product.weights[0], 'whole');
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-gold text-coffee-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold-light"
        >
          <ShoppingBag size={18} />
        </motion.button>
      </div>

      <Link to={`/product/${product.id}`} className="block p-4 space-y-2">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-gold text-gold" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <h3 className="font-heading text-lg text-foreground group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.origin}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading text-xl text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-1">
            {product.flavorNotes.slice(0, 2).map((note) => (
              <span key={note} className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground capitalize">
                {note}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
