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
    description: "Digital plans and tools activated within 24 hours of purchase — no delays.",
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
              About NexusHub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Who We Are
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              NexusHub is a premium digital services platform specialising in memberships, automation tools, coaching, and marketplace services for digital entrepreneurs and enthusiasts.
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
                  We build and operate a curated marketplace of premium digital services. Our platform gives customers instant access to exclusive memberships, professional coaching, advanced automation tools, and digital downloads — all delivered through a simple, secure checkout process.
                </p>
                <p>
                  Every service we offer is carefully vetted and clearly described. We believe customers deserve to know exactly what they are purchasing before they pay — no vague promises, no surprise charges.
                </p>
                <p>
                  Payments are processed securely through Paddle, a globally trusted payment processor. After every purchase, you receive an Order ID by email that you can use to track your order or contact our support team.
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
                  NexusHub serves digital entrepreneurs, gaming enthusiasts, online community managers, and anyone looking to access premium tools and services that help them grow, automate, and perform at a higher level.
                </p>
                <p>
                  Whether you are looking for a VIP membership with exclusive features, a one-on-one coaching session to improve your skills, or powerful automation tools to streamline your workflow — NexusHub has a plan built for you.
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
              Questions about our services or want to learn more? We're happy to help.
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
