import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card p-8 rounded-lg shadow-elevated">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Al Qahwa" className="h-14 mx-auto mb-4" />
          <h1 className="font-heading text-2xl text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the Al Qahwa coffee family</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <input type="text" placeholder="Full Name" className="w-full bg-background border border-border rounded-sm pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <input type="email" placeholder="Email address" className="w-full bg-background border border-border rounded-sm pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full bg-background border border-border rounded-sm pl-10 pr-10 py-2.5 text-foreground focus:outline-none focus:border-gold" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <input type="password" placeholder="Confirm Password" className="w-full bg-background border border-border rounded-sm pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:border-gold" />
          </div>
          <button className="w-full py-3 bg-gold text-coffee-dark font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold-light transition-colors">
            Create Account
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-gold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
