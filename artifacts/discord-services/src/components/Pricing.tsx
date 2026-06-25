import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

const tiers = [
  {
    name: "Starter",
    description: "Perfect for individuals looking to get started.",
    monthlyPrice: "$9.99",
    lifetimePrice: "$79",
    billing: { monthly: "/month", lifetime: " one-time" },
    features: ["VIP community access", "1 premium tool license", "Email support", "All standard features"],
    popular: false,
  },
  {
    name: "Pro",
    description: "Ideal for power users who need more features.",
    monthlyPrice: "$24.99",
    lifetimePrice: "$199",
    billing: { monthly: "/month", lifetime: " one-time" },
    features: [
      "Everything in Starter",
      "Up to 3 premium tool licenses",
      "1 coaching session/month",
      "Marketplace tools access",
      "Priority support within 12h",
    ],
    popular: true,
  },
  {
    name: "Elite",
    description: "The ultimate package for serious digital entrepreneurs.",
    monthlyPrice: "$49.99",
    lifetimePrice: "$399",
    billing: { monthly: "/month", lifetime: " one-time" },
    features: [
      "Everything in Pro",
      "Unlimited tool licenses",
      "Weekly coaching sessions",
      "Full automation suite",
      "Dedicated support line",
      "Early beta access",
    ],
    popular: false,
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "lifetime">("monthly");

  return (
    <section id="pricing" className="py-24 bg-background/50 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the perfect plan for your needs. All prices are in USD. No hidden fees, cancel anytime.
          </p>

          <div className="inline-flex items-center p-1 bg-muted/50 rounded-full border border-border/50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("lifetime")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "lifetime"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Lifetime <span className="ml-1 text-xs text-emerald-400 font-bold">Save ~30%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {tier.popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-secondary/20 blur-xl rounded-3xl" />
              )}
              <Card
                className={`h-full relative flex flex-col bg-card/40 backdrop-blur-sm border-border/50 ${
                  tier.popular ? "border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.15)]" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="h-10">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {billingCycle === "monthly" ? tier.monthlyPrice : tier.lifetimePrice}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {billingCycle === "monthly" ? tier.billing.monthly : tier.billing.lifetime}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={`/checkout?plan=${encodeURIComponent(tier.name)}&price=${encodeURIComponent(billingCycle === "monthly" ? tier.monthlyPrice : tier.lifetimePrice)}&billing=${billingCycle}`}>
                      Get {tier.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Payments processed securely by Paddle. Questions?{" "}
          <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}
