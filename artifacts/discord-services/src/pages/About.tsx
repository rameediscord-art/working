import { motion } from "framer-motion";
import { Shield, Zap, Users, HeartHandshake } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

const values = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Transparency",
    description: "Clear pricing, no hidden fees, and honest descriptions of every service we offer.",
  },
  {
    icon: <Zap className="w-6 h-6 text-secondary" />,
    title: "Fast Delivery",
    description: "Discord access and session scheduling handled within a few hours of purchase — no delays.",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "Customer First",
    description: "Every decision we make is guided by what is best for our customers.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-pink-400" />,
    title: "Reliability",
    description: "99.8% uptime and responsive support available via email at all times.",
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              About Ramee Digital Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Who We Are
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ramee Digital Services offers exclusive digital products — private Discord access, live one-on-one sessions, and full bundles — all as simple, one-time purchases with no subscriptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">What We Do</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We offer three focused digital products: permanent Discord server access, private live sessions, and a full bundle that includes everything. Every purchase is a one-time payment — no subscriptions, no recurring charges, no renewals.
                </p>
                <p>
                  Every product is clearly described before you buy. We believe customers deserve to know exactly what they are purchasing — no vague promises, no surprise charges.
                </p>
                <p>
                  After every purchase, you receive an Order ID by email. Our team will contact you to deliver your product — usually within a few hours of your order being placed.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Who We Serve</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We serve anyone looking for exclusive community access, personalised coaching, or a complete bundle of digital services — delivered simply and without unnecessary complexity.
                </p>
                <p>
                  Whether you want permanent access to our private Discord server, a dedicated two-hour live session tailored to your goals, or the full bundle that covers everything — there is a product for you.
                </p>
                <p>
                  We serve thousands of customers and are committed to delivering quality, reliability, and responsive support every step of the way.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 rounded-2xl bg-card/40 border border-border/50"
          >
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Questions about our products or want to learn more? We're happy to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:rameediscord@gmail.com"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                rameediscord@gmail.com
              </a>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-transparent px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contact Form
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
