import { motion } from "framer-motion";
import { Search, ShoppingCart, LogIn, Key } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description: "Browse our catalog and select the perfect plan or tool.",
    icon: <Search className="w-6 h-6 text-primary" />,
  },
  {
    number: "02",
    title: "Secure Checkout",
    description: "Complete payment via Lemon Squeezy's encrypted checkout.",
    icon: <ShoppingCart className="w-6 h-6 text-secondary" />,
  },
  {
    number: "03",
    title: "Join Our Server",
    description: "Click the invite link to join the NexusHub Discord community.",
    icon: <LogIn className="w-6 h-6 text-emerald-400" />,
  },
  {
    number: "04",
    title: "Instant Access",
    description: "Your role, access, or digital product is delivered automatically.",
    icon: <Key className="w-6 h-6 text-blue-400" />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background/80 relative z-10 overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden lg:block -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Get instant access to your premium services in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-6 h-full text-center hover:border-primary/50 transition-colors group">
                <div className="w-16 h-16 mx-auto bg-background/80 border border-border rounded-2xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-primary mb-2 tracking-widest">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
