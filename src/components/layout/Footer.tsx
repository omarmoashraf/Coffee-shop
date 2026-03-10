import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-coffee-dark text-primary-foreground/80 pattern-overlay">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Al Qahwa" className="h-10 w-auto" />
              <span className="font-heading text-xl text-primary-foreground">Al Qahwa</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Bringing the ancient tradition of Arabian coffee to the modern world.
              Every cup tells a story of heritage, quality, and passion.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-coffee-dark transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-primary-foreground">Quick Links</h3>
            <div className="arabesque-divider w-16 mb-4" />
            <nav className="flex flex-col gap-2">
              {[
                { to: '/shop', label: 'Shop Coffee' },
                { to: '/about', label: 'Our Story' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/shop?category=arabic-coffee', label: 'Arabic Coffee' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-primary-foreground">Customer Service</h3>
            <div className="arabesque-divider w-16 mb-4" />
            <nav className="flex flex-col gap-2">
              {['Shipping & Returns', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((label) => (
                <a key={label} href="#" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-primary-foreground">Newsletter</h3>
            <div className="arabesque-divider w-16 mb-4" />
            <p className="text-sm text-primary-foreground/60">
              Subscribe for exclusive blends and brewing tips.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-coffee-brown/50 border border-gold/20 rounded-l-sm px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold/50"
              />
              <button className="px-4 py-2 bg-gold text-coffee-dark text-sm font-medium rounded-r-sm hover:bg-gold-light transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 text-center">
          <p className="text-xs text-primary-foreground/40 tracking-wider">
            © 2026 Al Qahwa Coffee. All rights reserved. Crafted with tradition & passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
