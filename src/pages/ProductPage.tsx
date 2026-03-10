import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Minus, Plus, ArrowLeft, Coffee, Flame, Droplets } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0] || 250);
  const [grind, setGrind] = useState<'whole' | 'ground'>('whole');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const roastIcon = { light: '☀️', medium: '🔥', dark: '🌑' };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg overflow-hidden shadow-elevated"
          >
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">{product.origin}</p>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-2xl font-heading text-foreground">${product.price.toFixed(2)}</p>

            <p className="text-muted-foreground leading-relaxed font-accent text-lg">{product.description}</p>

            {/* Flavor & Roast Info */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <Flame className="mx-auto text-gold mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Roast Level</p>
                <p className="text-sm font-medium text-foreground capitalize">{product.roastLevel}</p>
              </div>
              <div className="text-center">
                <Coffee className="mx-auto text-gold mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Origin</p>
                <p className="text-sm font-medium text-foreground">{product.origin}</p>
              </div>
              <div className="text-center">
                <Droplets className="mx-auto text-gold mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Flavor</p>
                <p className="text-sm font-medium text-foreground capitalize">{product.flavorNotes[0]}</p>
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Flavor Notes</p>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span key={note} className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground capitalize">{note}</span>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Weight</p>
              <div className="flex gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-sm text-sm border transition-colors ${selectedWeight === w ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/50'}`}
                  >
                    {w}g
                  </button>
                ))}
              </div>
            </div>

            {/* Grind */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Grind</p>
              <div className="flex gap-2">
                {(['whole', 'ground'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`px-4 py-2 rounded-sm text-sm border capitalize transition-colors ${grind === g ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/50'}`}
                  >
                    {g} Bean{g === 'whole' ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-muted-foreground hover:text-foreground">
                  <Minus size={16} />
                </button>
                <span className="px-4 text-foreground font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-muted-foreground hover:text-foreground">
                  <Plus size={16} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product, quantity, selectedWeight, grind)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </motion.button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded-sm transition-colors ${isWished ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'}`}
              >
                <Heart size={18} className={isWished ? 'fill-gold text-gold' : 'text-muted-foreground'} />
              </button>
            </div>

            {/* Brewing Methods */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Recommended Brewing</p>
              <div className="flex flex-wrap gap-2">
                {product.brewingMethods.map((method) => (
                  <span key={method} className="px-3 py-1 bg-coffee-dark/5 rounded-full text-sm text-muted-foreground">{method}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
