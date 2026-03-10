import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', country: '',
  });

  const total = cartTotal();
  const shipping = total > 50 ? 0 : 8.99;

  const handleSubmit = () => {
    const orderId = `AQ-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  const updateField = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-coffee-dark py-12 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl text-primary-foreground">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? 'bg-gold text-coffee-dark' : 'bg-secondary text-muted-foreground'
              }`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-12 h-px bg-border" />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card p-8 rounded-lg shadow-warm">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl text-foreground mb-4">Shipping Information</h2>
              {[
                { label: 'Full Name', field: 'name', type: 'text' },
                { label: 'Email', field: 'email', type: 'email' },
                { label: 'Phone', field: 'phone', type: 'tel' },
                { label: 'Address', field: 'address', type: 'text' },
                { label: 'City', field: 'city', type: 'text' },
                { label: 'Country', field: 'country', type: 'text' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="text-sm text-muted-foreground mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              ))}
              <button onClick={() => setStep(1)} className="w-full mt-4 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl text-foreground mb-4">Payment Method</h2>
              <div className="border border-gold/30 bg-gold/5 p-4 rounded-sm">
                <p className="text-sm text-foreground font-medium">Cash on Delivery</p>
                <p className="text-xs text-muted-foreground mt-1">Pay when your order arrives</p>
              </div>
              <div className="border border-border p-4 rounded-sm opacity-50">
                <p className="text-sm text-foreground font-medium">Credit Card (Coming Soon)</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(0)} className="flex-1 py-3 border border-border text-foreground text-sm rounded-sm hover:bg-secondary transition-colors">Back</button>
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">Review Order</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl text-foreground">Order Review</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="arabesque-divider" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-lg font-heading text-foreground"><span>Total</span><span>${(total + shipping).toFixed(2)}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-border text-foreground text-sm rounded-sm hover:bg-secondary transition-colors">Back</button>
                <button onClick={handleSubmit} className="flex-1 py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">Place Order</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
