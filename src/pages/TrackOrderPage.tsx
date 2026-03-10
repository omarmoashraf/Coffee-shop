import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';

const stages = [
  { icon: Clock, label: 'Order Placed', status: 'complete' },
  { icon: Package, label: 'Processing', status: 'complete' },
  { icon: Truck, label: 'Shipped', status: 'current' },
  { icon: CheckCircle, label: 'Delivered', status: 'pending' },
];

export default function TrackOrderPage() {
  const { orderId: paramId } = useParams();
  const [orderId, setOrderId] = useState(paramId || '');
  const [tracking, setTracking] = useState(!!paramId);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-coffee-dark py-16 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl text-primary-foreground">Track Your Order</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-xl">
        {!tracking ? (
          <div className="bg-card p-8 rounded-lg shadow-warm">
            <p className="text-muted-foreground mb-4">Enter your order number to track your coffee delivery.</p>
            <div className="flex gap-0">
              <input
                type="text"
                placeholder="Order number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1 bg-background border border-border rounded-l-sm px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
              <button onClick={() => orderId && setTracking(true)} className="px-6 py-3 bg-gold text-coffee-dark rounded-r-sm hover:bg-gold-light transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-8 rounded-lg shadow-warm">
            <div className="text-center mb-8">
              <p className="text-xs text-muted-foreground">Order</p>
              <p className="font-heading text-xl text-gold">{orderId}</p>
            </div>
            <div className="space-y-0">
              {stages.map((s, i) => (
                <div key={s.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      s.status === 'complete' ? 'bg-gold text-coffee-dark' :
                      s.status === 'current' ? 'bg-gold/20 text-gold border-2 border-gold' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      <s.icon size={18} />
                    </div>
                    {i < stages.length - 1 && (
                      <div className={`w-0.5 h-12 ${s.status === 'complete' ? 'bg-gold' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className={`font-medium text-sm ${s.status !== 'pending' ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.status === 'complete' ? 'Completed' : s.status === 'current' ? 'In Progress' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
