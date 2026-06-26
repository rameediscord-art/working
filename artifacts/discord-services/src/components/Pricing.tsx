import { motion } from "framer-motion";
import { Check, Zap, Users, Star } from "lucide-react";
import { Link } from "wouter";

const products = [
  {
    id: "discord-access",
    icon: <Users className="w-6 h-6" />,
    name: "Discord Access",
    price: "14",
    label: "One-Time Payment",
    description: "Permanent access to the private community. Pay once, stay forever.",
    features: [
      "Permanent Discord server access",
      "Private members-only channels",
      "Exclusive resources & updates",
      "No renewal, no expiry",
    ],
    badge: null,
    featured: false,
    cta: "Get Access",
  },
  {
    id: "full-bundle",
    icon: <Star className="w-6 h-6" />,
    name: "Full Bundle",
    price: "120",
    label: "One-Time Payment",
    description: "Everything included — Discord access, a live session, and all resources for 30 days.",
    features: [
      "Everything in Discord Access",
      "1× private live session (2 hours)",
      "Full resource library access (30 days)",
      "Scheduled directly after purchase",
      "Discord invite sent immediately",
    ],
    badge: "Best Value",
    featured: true,
    cta: "Get the Bundle",
  },
  {
    id: "live-session",
    icon: <Zap className="w-6 h-6" />,
    name: "Live 1-on-1 Session",
    price: "60",
    label: "One-Time Payment",
    description: "One private live session, 2 hours long. Scheduled at a time that works for you.",
    features: [
      "2-hour private live session",
      "Scheduled after purchase via email",
      "Fully personalised to your goals",
      "No subscription required",
    ],
    badge: null,
    featured: false,
    cta: "Book a Session",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background/50 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Three Products. One-Time Payment.
          </h2>
          <p className="text-lg text-muted-foreground">
            No subscriptions. No hidden fees. No renewals. You pay once and you're in — permanently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border ${
                product.featured
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 via-card/60 to-card/40 shadow-[0_0_40px_rgba(124,58,237,0.18)]"
                  : "border-border/50 bg-card/40"
              } backdrop-blur-sm`}
            >
              {product.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    <Star className="w-3 h-3 fill-current" /> {product.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${product.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.label}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-tight text-foreground">${product.price}</span>
                    <span className="text-muted-foreground text-sm font-medium ml-1">USD</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{product.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${product.featured ? "bg-primary/20" : "bg-primary/10"}`}>
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/checkout?plan=${encodeURIComponent(product.name)}&price=${product.price}`}
                  className={`w-full flex items-center justify-center h-12 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    product.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                      : "border border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/60"
                  }`}
                >
                  {product.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 space-y-2">
          <p className="text-sm text-muted-foreground">
            All payments are one-time. No subscriptions. No recurring charges. Ever.
          </p>
          <p className="text-sm text-muted-foreground">
            Questions?{" "}
            <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">
              rameediscord@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
