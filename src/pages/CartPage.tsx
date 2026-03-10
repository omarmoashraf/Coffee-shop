import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <ShoppingBag className="text-muted-foreground mb-4" size={48} />
        <h1 className="font-heading text-2xl text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Discover our premium Arabian coffees.</p>
        <Link to="/shop" className="px-6 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">
          Shop Coffee
        </Link>
      </div>
    );
  }

  const total = cartTotal();
  const shipping = total > 50 ? 0 : 8.99;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-coffee-dark py-12 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl text-primary-foreground">Shopping Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card p-4 rounded-lg shadow-warm"
              >
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-foreground">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.weight}g · {item.grind} beans</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-sm">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-heading text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card p-6 rounded-lg shadow-warm h-fit sticky top-24">
            <h2 className="font-heading text-xl text-foreground mb-4">Order Summary</h2>
            <div className="arabesque-divider mb-4" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gold">Free shipping on orders over $50</p>
              )}
              <div className="arabesque-divider my-4" />
              <div className="flex justify-between text-lg font-heading text-foreground">
                <span>Total</span>
                <span>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors"
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="mt-3 w-full flex items-center justify-center text-sm text-muted-foreground hover:text-gold transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
