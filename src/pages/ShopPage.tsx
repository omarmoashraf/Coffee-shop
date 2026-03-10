import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/store/useStore';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [roast, setRoast] = useState('all');
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const { searchQuery } = useStore();

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (roast !== 'all') result = result.filter((p) => p.roastLevel === roast);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.flavorNotes.some((n) => n.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [category, roast, sort, searchQuery]);

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-3">Category</h3>
        <div className="flex flex-col gap-1">
          <button onClick={() => setCategory('all')} className={`text-left text-sm px-3 py-2 rounded-sm transition-colors ${category === 'all' ? 'bg-gold/20 text-gold' : 'text-muted-foreground hover:text-foreground'}`}>All Coffee</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`text-left text-sm px-3 py-2 rounded-sm transition-colors ${category === c.id ? 'bg-gold/20 text-gold' : 'text-muted-foreground hover:text-foreground'}`}>{c.name}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-3">Roast Level</h3>
        <div className="flex flex-col gap-1">
          {['all', 'light', 'medium', 'dark'].map((r) => (
            <button key={r} onClick={() => setRoast(r)} className={`text-left text-sm px-3 py-2 rounded-sm capitalize transition-colors ${roast === r ? 'bg-gold/20 text-gold' : 'text-muted-foreground hover:text-foreground'}`}>{r === 'all' ? 'All Roasts' : `${r} Roast`}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-coffee-dark py-16 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Collection</p>
          <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground">Our Coffees</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterSection />
          </aside>

          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">{filtered.length} products</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-1 text-sm text-foreground border border-border px-3 py-2 rounded-sm">
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-card border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold">
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-accent text-lg">No coffees found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-coffee-dark/50 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="w-72 h-full bg-background p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg">Filters</h2>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            <FilterSection />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
