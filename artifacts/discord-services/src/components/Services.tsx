import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown, TrendingUp, Download, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "vip-membership",
    title: "VIP Discord Membership",
    description: "Exclusive community access and perks.",
    price: "$9.99/mo",
    icon: <Crown className="w-6 h-6 text-primary" />,
    features: ["Exclusive VIP channels", "Early access to updates", "Priority direct support"],
  },
  {
    id: "premium-bot",
    title: "Premium Bot Access",
    description: "Supercharge your server with our advanced tools.",
    price: "$14.99/mo",
    icon: <Zap className="w-6 h-6 text-secondary" />,
    features: ["Advanced server automation", "Custom command creation", "99.9% guaranteed uptime", "Role management"],
  },
  {
    id: "gaming-coaching",
    title: "Gaming Coaching",
    description: "Level up your skills with pro players.",
    price: "$49.99/session",
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    features: ["1-on-1 personalized coaching", "In-depth VOD review", "Custom rank improvement strategy"],
  },
  {
    id: "marketplace-tools",
    title: "Marketplace Tools",
    description: "Analytics and alerts for digital traders.",
    price: "$24.99/mo",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    features: ["Real-time arbitrage alerts", "Automated deal finder", "Market analytics dashboard"],
  },
  {
    id: "automation-services",
    title: "Automation Services",
    description: "Connect your workflow seamlessly.",
    price: "$39.99/mo",
    icon: <Settings className="w-6 h-6 text-purple-400" />,
    features: ["Custom workflow automation", "Scheduled server tasks", "Advanced webhook integrations"],
    popular: true,
  },
  {
    id: "digital-downloads",
    title: "Digital Downloads",
    description: "Instant access to premium resources.",
    price: "$4.99+",
    icon: <Download className="w-6 h-6 text-pink-400" />,
    features: ["Server setup templates", "Custom utility scripts", "Moderation guides", "Instant delivery"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Premium Digital Services</h2>
          <p className="text-lg text-muted-foreground">
            Explore our curated selection of high-end tools, memberships, and coaching designed to elevate your digital experience.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 relative group overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground pointer-events-none">
                    Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center border border-border/50 mb-4 shadow-sm">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-2xl font-bold text-foreground mb-6">{service.price}</div>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={service.popular ? "default" : "outline"}
                    asChild
                    data-testid={`button-buy-${service.id}`}
                  >
                    <a href="https://checkout.lemonsqueezy.com/placeholder">Buy Now</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
