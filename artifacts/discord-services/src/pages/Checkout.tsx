import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Lock, Check } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const PRODUCTS = [
  {
    name: "Professional Member Portal Access",
    price: "14.00",
    description: "Permanent access to our private professional portal with curated expert resources",
    badge: null,
  },
  {
    name: "1-on-1 Expert Advisory Session",
    price: "60.00",
    description: "2-hour private digital consultation with a senior advisor, scheduled via email",
    badge: null,
  },
  {
    name: "Complete Advisory Package",
    price: "120.00",
    description: "Full portal access + advisory session + 30 days premium resource access",
    badge: "Best Value",
  },
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email address."),
  planName: z.string().min(1, "Please select a service."),
  planPrice: z.string(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

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
    const match = PRODUCTS.find((p) =>
      p.name.toLowerCase() === preselectedPlan.toLowerCase()
    );
    if (match) {
      form.setValue("planName", match.name);
      form.setValue("planPrice", match.price);
      setSelectedProduct(match);
    } else if (preselectedPlan && preselectedPrice) {
      form.setValue("planName", preselectedPlan);
      form.setValue("planPrice", preselectedPrice);
      setSelectedProduct({ name: preselectedPlan, price: preselectedPrice, description: "", badge: null });
    }
  }, []);

  function selectProduct(product: typeof PRODUCTS[0]) {
    form.setValue("planName", product.name);
    form.setValue("planPrice", product.price);
    setSelectedProduct(product);
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
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
              <p className="text-muted-foreground">One-time payment. No subscription. No renewals.</p>
            </div>

            <div className="flex items-center justify-center gap-5 mb-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Secured</span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-primary" /> Powered by Paddle</span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> One-Time Payment</span>
            </div>

            {/* Service selector */}
            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-3">Select your service:</p>
              <div className="grid grid-cols-1 gap-3">
                {PRODUCTS.map((product) => {
                  const isSelected = selectedProduct?.name === product.name;
                  return (
                    <button
                      key={product.name}
                      type="button"
                      onClick={() => selectProduct(product)}
                      className={`w-full text-left flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border/50 bg-card/40 hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{product.name}</span>
                            {product.badge && (
                              <span className="text-xs bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full">{product.badge}</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.description}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-foreground shrink-0 ml-4">${product.price}</span>
                    </button>
                  );
                })}
              </div>
              {form.formState.errors.planName && (
                <p className="text-xs text-destructive mt-2">{form.formState.errors.planName.message}</p>
              )}
            </div>

            {/* Order form */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  </div>

                  {selectedProduct && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold">{selectedProduct.name}</p>
                        <p className="text-xs text-muted-foreground">One-Time Payment</p>
                      </div>
                      <span className="text-2xl font-bold text-foreground shrink-0 ml-4">${selectedProduct.price} <span className="text-sm text-muted-foreground font-normal">USD</span></span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold"
                    disabled={isSubmitting || !selectedProduct}
                  >
                    {isSubmitting ? "Placing Order..." : `Pay $${selectedProduct?.price ?? "—"} — One-Time`}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By placing an order you agree to our{" "}
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                    You will receive a confirmation email with your Order ID after purchase.
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
