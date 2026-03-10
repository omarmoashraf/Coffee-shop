import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-coffee-dark py-16 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Get in Touch</p>
          <h1 className="font-heading text-4xl text-primary-foreground">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground">Whether you have a question about our coffee, need help with an order, or just want to share your brewing experience.</p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@alqahwa.com' },
                { icon: Phone, label: 'Phone', value: '+971 4 123 4567' },
                { icon: MapPin, label: 'Address', value: 'Al Fahidi, Dubai, UAE' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-foreground font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card p-8 rounded-lg shadow-warm">
            {sent ? (
              <div className="text-center py-12">
                <Send className="mx-auto text-gold mb-4" size={40} />
                <h3 className="font-heading text-xl text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                    <input type="text" className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <input type="email" className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Subject</label>
                  <input type="text" className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                  <textarea rows={5} className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-foreground focus:outline-none focus:border-gold resize-none" />
                </div>
                <button onClick={() => setSent(true)} className="w-full py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
