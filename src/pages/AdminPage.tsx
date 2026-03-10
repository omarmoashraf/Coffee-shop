import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { products } from '@/data/products';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const mockOrders = [
  { id: 'AQ-001', customer: 'Ahmed Al-Rashid', total: 64.98, status: 'delivered', date: '2026-03-05' },
  { id: 'AQ-002', customer: 'Sarah Mitchell', total: 29.99, status: 'shipped', date: '2026-03-06' },
  { id: 'AQ-003', customer: 'Omar Khalil', total: 97.97, status: 'processing', date: '2026-03-07' },
  { id: 'AQ-004', customer: 'Fatima Hassan', total: 35.99, status: 'pending', date: '2026-03-08' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const statusColors: Record<string, string> = {
    pending: 'bg-gold/20 text-gold',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-green-100 text-green-700',
    delivered: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-coffee-dark min-h-screen p-4 hidden lg:block">
        <div className="flex items-center gap-2 px-4 py-3 mb-6">
          <img src="/images/logo.png" alt="Al Qahwa" className="h-8 w-auto" />
          <div>
            <span className="text-primary-foreground font-heading text-sm">Al Qahwa</span>
            <p className="text-[10px] text-gold">Admin Panel</p>
          </div>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold/20 text-gold'
                  : 'text-primary-foreground/60 hover:text-primary-foreground'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-coffee-dark border-t border-gold/10 flex z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 text-[10px] ${
              activeTab === tab.id ? 'text-gold' : 'text-primary-foreground/50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-8 pb-20 lg:pb-8">
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h1 className="font-heading text-2xl text-foreground">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: '1,247', change: '+12%' },
                { label: 'Revenue', value: '$38,420', change: '+8%' },
                { label: 'Customers', value: '856', change: '+23%' },
                { label: 'Products', value: '8', change: '0' },
              ].map(({ label, value, change }) => (
                <div key={label} className="bg-card p-6 rounded-lg shadow-warm">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-heading text-2xl text-foreground mt-1">{value}</p>
                  <p className="text-xs text-gold mt-1">{change}</p>
                </div>
              ))}
            </div>
            <div className="bg-card p-6 rounded-lg shadow-warm">
              <h2 className="font-heading text-lg text-foreground mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-left">
                      <th className="pb-3 font-medium">Order</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-3 font-medium text-foreground">{order.id}</td>
                        <td className="py-3 text-muted-foreground">{order.customer}</td>
                        <td className="py-3 text-foreground">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="py-3 text-muted-foreground">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-2xl text-foreground">Products</h1>
              <button className="flex items-center gap-1 px-4 py-2 bg-gold text-coffee-dark text-sm font-medium rounded-sm hover:bg-gold-light transition-colors">
                <Plus size={16} /> Add Product
              </button>
            </div>
            <div className="bg-card rounded-lg shadow-warm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left bg-secondary/50">
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Rating</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                          <span className="font-medium text-foreground">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">${p.price.toFixed(2)}</td>
                      <td className="p-4 text-muted-foreground capitalize">{p.category.replace('-', ' ')}</td>
                      <td className="p-4 text-foreground">{p.rating}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-muted-foreground hover:text-gold"><Eye size={14} /></button>
                          <button className="p-1.5 text-muted-foreground hover:text-gold"><Edit size={14} /></button>
                          <button className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="font-heading text-2xl text-foreground">Orders</h1>
            <div className="bg-card rounded-lg shadow-warm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left bg-secondary/50">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50">
                      <td className="p-4 font-medium text-foreground">{order.id}</td>
                      <td className="p-4 text-muted-foreground">{order.customer}</td>
                      <td className="p-4 text-foreground">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="p-4 text-muted-foreground">{order.date}</td>
                      <td className="p-4">
                        <select className="bg-background border border-border rounded-sm px-2 py-1 text-xs text-foreground">
                          <option>Update Status</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="font-heading text-2xl text-foreground">Customers</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Ahmed Al-Rashid', 'Sarah Mitchell', 'Omar Khalil', 'Fatima Hassan', 'James Chen', 'Layla Noor'].map((name, i) => (
                <div key={name} className="bg-card p-6 rounded-lg shadow-warm">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-heading text-lg mb-3">
                    {name.charAt(0)}
                  </div>
                  <h3 className="font-heading text-foreground">{name}</h3>
                  <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 10) + 1} orders</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="font-heading text-2xl text-foreground">Analytics</h1>
            <div className="bg-card p-8 rounded-lg shadow-warm text-center">
              <BarChart3 className="mx-auto text-gold mb-4" size={48} />
              <p className="text-muted-foreground">Sales analytics charts coming soon.</p>
              <p className="text-xs text-muted-foreground mt-1">Connect to a backend to enable real-time analytics.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
