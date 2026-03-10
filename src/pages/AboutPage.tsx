import { motion } from 'framer-motion';
import { Coffee, Globe, Award, Leaf, Heart, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/about-farm.jpg)' }} />
        <div className="absolute inset-0 bg-coffee-dark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Our Story</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground">The Al Qahwa Heritage</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp} className="text-center space-y-6">
            <h2 className="font-heading text-3xl text-foreground">Where It All Began</h2>
            <div className="arabesque-divider w-48 mx-auto" />
            <p className="font-accent text-lg text-muted-foreground leading-relaxed">
              In 1892, in the misty highlands of Yemen, a young coffee farmer named Hassan Al Qahwa
              discovered a rare variety of coffee beans growing wild among ancient terraces. Their
              extraordinary flavor — complex, aromatic, with notes of cardamom and dried fruits —
              would change his family's destiny forever.
            </p>
            <p className="font-accent text-lg text-muted-foreground leading-relaxed">
              Four generations later, Al Qahwa has grown from a small family farm into a globally
              recognized name in premium coffee. But our philosophy remains unchanged: every bean
              must be ethically sourced, carefully roasted, and served with the warmth and generosity
              of Arabian hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl text-foreground">Our Values</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: 'Ethical Sourcing', desc: 'We partner directly with farmers across 12+ origins, ensuring fair wages and sustainable practices.' },
              { icon: Award, title: 'Uncompromising Quality', desc: 'Every batch is cupped, graded, and roasted to perfection by our master roasters.' },
              { icon: Heart, title: 'Arabian Hospitality', desc: 'Coffee is more than a drink — it\'s a bridge between cultures, a gesture of welcome and friendship.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 bg-card rounded-lg shadow-warm"
              >
                <Icon className="mx-auto text-gold mb-4" size={32} />
                <h3 className="font-heading text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-coffee-dark pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { num: '130+', label: 'Years of Heritage' },
              { num: '12', label: 'Coffee Origins' },
              { num: '50K+', label: 'Happy Customers' },
              { num: '100%', label: 'Ethically Sourced' },
            ].map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-heading text-3xl md:text-4xl text-gold">{num}</p>
                <p className="text-sm text-primary-foreground/60 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brewing Guide */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-2">Tradition</p>
            <h2 className="font-heading text-3xl text-foreground">How to Brew Arabic Coffee</h2>
            <div className="arabesque-divider w-48 mx-auto mt-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'The Beans', desc: 'Start with freshly roasted, lightly ground Arabic coffee beans. Add cardamom for authentic flavor.' },
              { step: '02', title: 'The Dallah', desc: 'Bring water to a gentle boil in a traditional dallah. Add the coffee and cardamom, letting it simmer slowly.' },
              { step: '03', title: 'The Ritual', desc: 'Pour into small finjan cups, always serving the eldest guest first. Serve with dates for the complete experience.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="font-heading text-4xl text-gold/30">{step}</span>
                <h3 className="font-heading text-xl text-foreground mt-2 mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
