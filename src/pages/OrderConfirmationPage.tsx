import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card p-8 md:p-12 rounded-lg shadow-elevated text-center max-w-lg"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <CheckCircle className="mx-auto text-gold" size={64} />
        </motion.div>
        <h1 className="font-heading text-3xl text-foreground mt-6">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-3">
          Thank you for your order. Your premium Arabian coffee is being prepared with care.
        </p>
        <div className="mt-6 p-4 bg-secondary rounded-sm">
          <p className="text-xs text-muted-foreground">Order Number</p>
          <p className="font-heading text-xl text-gold">{orderId}</p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package size={16} /> Estimated delivery: 3-5 business days
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to={`/track-order/${orderId}`} className="flex-1 py-3 border border-gold/40 text-gold text-sm tracking-wider uppercase rounded-sm hover:bg-gold/10 transition-colors text-center">
            Track Order
          </Link>
          <Link to="/shop" className="flex-1 py-3 bg-gold text-coffee-dark font-medium text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-colors text-center flex items-center justify-center gap-1">
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
