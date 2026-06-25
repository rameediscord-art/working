import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const PLANS = [
  { name: "Starter — Monthly", price: "9.99" },
  { name: "Starter — Lifetime", price: "79.00" },
  { name: "Pro — Monthly", price: "24.99" },
  { name: "Pro — Lifetime", price: "199.00" },
  { name: "Elite — Monthly", price: "49.99" },
  { name: "Elite — Lifetime", price: "399.00" },
  { name: "VIP Membership — Monthly", price: "9.99" },
  { name: "Premium Tools Access — Monthly", price: "14.99" },
  { name: "Gaming Coaching — Per Session", price: "49.99" },
  { name: "Marketplace Tools — Monthly", price: "24.99" },
  { name: "Automation Services — Monthly", price: "39.99" },
  { name: "Digital Downloads", price: "4.99" },
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email address."),
  planName: z.string().min(1, "Please select a plan."),
  planPrice: z.string(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  const params = new URLSearchParams(window.location.search);
  const preselectedPlan = params.get("plan") ?? "";
  const preselectedPrice = params.get("price")?.replace(/[^0-9.]/g, "") ?? "";

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      planName: preselectedPlan,
      planPrice: preselectedPrice,
    },
  });

  useEffect(() => {
    if (preselectedPlan) {
      const match = PLANS.find((p) => p.name.toLowerCase().startsWith(preselectedPlan.toLowerCase()));
      if (match) {
        form.setValue("planName", match.name);
        form.setValue("planPrice", match.price);
        setSelectedPrice(match.price);
      } else if (preselectedPlan && preselectedPrice) {
        form.setValue("planName", preselectedPlan);
        form.setValue("planPrice", preselectedPrice);
        setSelectedPrice(preselectedPrice);
      }
    }
  }, []);

  function onPlanChange(planName: string) {
    const plan = PLANS.find((p) => p.name === planName);
    if (plan) {
      form.setValue("planPrice", plan.price);
      setSelectedPrice(plan.price);
    }
    form.setValue("planName", planName);
  }

  async function onSubmit(values: CheckoutForm) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create order.");
      setLocation(`/order-confirmation/${data.orderId}`);
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your order below. You will receive an Order ID by email.</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Secured</span>
              <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-primary" /> Powered by Paddle</span>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border p-6 md:p-8 rounded-2xl">
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-muted-foreground">
                <strong className="text-foreground">Manual Payment Process:</strong> After submitting this form, our team will review your order and send payment instructions to your email within a few hours. Your access will be activated once payment is confirmed.
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Plan</FormLabel>
                        <Select
                          onValueChange={(v) => onPlanChange(v)}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Choose a plan..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PLANS.map((plan) => (
                              <SelectItem key={plan.name} value={plan.name}>
                                {plan.name} — ${plan.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedPrice && (
                    <div className="p-4 rounded-xl bg-card border border-border/50 flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Order Total</span>
                      <span className="text-2xl font-bold text-foreground">${selectedPrice} <span className="text-sm text-muted-foreground">USD</span></span>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By placing an order you agree to our{" "}
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
