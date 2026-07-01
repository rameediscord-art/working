import { motion } from "framer-motion";
import { Check, Zap, Users, Star } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    id: "discord-access",
    title: "Discord Access",
    description: "Join the private community permanently. One payment, lifetime access.",
    price: "$14",
    label: "One-Time",
    icon: <Users className="w-6 h-6 text-primary" />,
    features: [
      "Permanent Discord server access",
      "Private members-only channels",
      "Exclusive resources & updates",
      "No expiry, no renewal",
    ],
    badge: null,
    href: "/checkout?plan=Discord+Access&price=14",
  },
  {
    id: "live-session",
    title: "Live 1-on-1 Session",
    description: "A 2-hour private session, scheduled directly after purchase.",
    price: "$60",
    label: "One-Time",
    icon: <Zap className="w-6 h-6 text-secondary" />,
    features: [
      "2-hour private live session",
      "Fully personalised to your goals",
      "Scheduled via email after purchase",
      "No subscription required",
    ],
    badge: null,
    href: "/checkout?plan=Live+1-on-1+Session&price=60",
  },
  {
    id: "full-bundle",
    title: "Full Bundle",
    description: "Everything included — Discord, a live session, and full resources for 30 days.",
    price: "$120",
    label: "One-Time",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    features: [
      "Permanent Discord server access",
      "1× private live session (2 hours)",
      "Full resource library (30 days)",
      "Discord invite + session booking by email",
    ],
    badge: "Best Value",
    href: "/checkout?plan=Full+Bundle&price=120",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What We Offer</h2>
          <p className="text-lg text-muted-foreground">
            Three straightforward products. Pay once — get exactly what's listed, with no hidden charges.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <div className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 relative group overflow-hidden flex flex-col rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {service.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center border border-border/50 mb-4 shadow-sm">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl font-extrabold text-foreground">{service.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{service.label}</span>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="w-full flex items-center justify-center h-11 rounded-xl border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
