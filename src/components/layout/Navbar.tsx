import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const cartCount = useStore((s) => s.cartCount());
  const { searchQuery, setSearchQuery } = useStore();

  const isHero = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-dark/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Al Qahwa" className="h-10 lg:h-12 w-auto" />
            <div className="flex flex-col">
              <span className="font-heading text-lg lg:text-xl tracking-wider text-primary-foreground">
                Al Qahwa
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Premium Coffee</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-primary-foreground/80 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="hidden lg:block p-2 text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="relative p-2 text-primary-foreground/80 hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-coffee-dark text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden lg:flex items-center gap-1 px-4 py-2 border border-gold/40 text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-coffee-dark transition-all duration-300 rounded-sm"
            >
              <User size={16} />
              Login
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-primary-foreground/80"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-3 border-t border-gold/10">
                <input
                  type="text"
                  placeholder="Search our coffees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-coffee-brown/50 border border-gold/20 rounded-sm px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-coffee-dark border-t border-gold/10 overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 text-sm tracking-wider uppercase transition-colors ${
                    location.pathname === link.path
                      ? 'text-gold bg-coffee-brown/30'
                      : 'text-primary-foreground/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 px-4 border border-gold/40 text-gold text-sm tracking-wider uppercase text-center hover:bg-gold hover:text-coffee-dark transition-all"
              >
                Login / Sign Up
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
