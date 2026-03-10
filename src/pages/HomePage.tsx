import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Coffee, Leaf, Award, Globe } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories, testimonials } from '@/data/products';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-coffee.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/70 via-coffee-dark/50 to-coffee-dark/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-body"
          >
            Since 1892 · Premium Arabian Coffee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-warm-white leading-tight"
          >
            The Art of
            <br />
            <span className="text-gold italic">Arabian Coffee</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-primary-foreground/70 text-lg md:text-xl font-accent max-w-xl mx-auto"
          >
            Where centuries of tradition meet the finest beans from around the world.
            Every cup is a journey through heritage and excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm hover:bg-gold-light transition-all duration-300 rounded-sm"
            >
              Shop Coffee
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-gold/40 text-gold font-medium tracking-wider uppercase text-sm hover:bg-gold/10 transition-all duration-300 rounded-sm"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background pattern-overlay">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Explore</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">Coffee Collections</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group block p-6 lg:p-8 bg-card rounded-lg text-center hover:shadow-gold transition-all duration-500 border border-transparent hover:border-gold/20"
                >
                  <Coffee className="mx-auto mb-4 text-gold" size={32} />
                  <h3 className="font-heading text-lg text-foreground group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Handpicked</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">Featured Coffees</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 border border-gold/40 text-gold font-medium tracking-wider uppercase text-sm hover:bg-gold hover:text-coffee-dark transition-all duration-300 rounded-sm"
            >
              View All Coffees
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-coffee-dark text-primary-foreground pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="text-gold tracking-[0.3em] uppercase text-xs">Our Heritage</p>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground">
                A Legacy Brewed in <span className="text-gold italic">Tradition</span>
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed font-accent text-lg">
                For over a century, Al Qahwa has honored the sacred Arabian tradition of coffee.
                From the highlands of Yemen to the bustling souks of the Gulf, our coffee
                carries the warmth of generations past.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Globe, label: '12+ Origins' },
                  { icon: Leaf, label: 'Ethically Sourced' },
                  { icon: Award, label: 'Award Winning' },
                  { icon: Coffee, label: 'Freshly Roasted' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="text-gold" size={20} />
                    <span className="text-sm text-primary-foreground/70">{label}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-gold text-sm tracking-wider uppercase hover:gap-3 transition-all"
              >
                Read Our Story <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-elevated"
            >
              <img src="/images/about-farm.jpg" alt="Coffee farm" className="w-full h-[400px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Most Loved</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">Best Sellers</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">What Our Customers Say</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card p-8 rounded-lg shadow-warm text-center"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground font-accent text-lg italic leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-6">
                  <p className="font-heading text-foreground">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-coffee-dark pattern-overlay">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <motion.div {...fadeUp}>
            <Coffee className="mx-auto text-gold mb-6" size={40} />
            <h2 className="font-heading text-3xl text-primary-foreground mb-4">
              Join the Al Qahwa Family
            </h2>
            <p className="text-primary-foreground/60 mb-8">
              Subscribe for exclusive blends, brewing guides, and special offers.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-coffee-brown/50 border border-gold/20 rounded-l-sm px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50"
              />
              <button className="px-6 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-r-sm hover:bg-gold-light transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
