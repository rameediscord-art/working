import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Mail, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planPrice: string;
  paymentStatus: string;
  createdAt: string;
}

export function OrderConfirmation() {
  const [, params] = useRoute("/order-confirmation/:orderId");
  const orderId = params?.orderId ?? "";
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setOrder(data);
      })
      .catch(() => setError("Failed to load order details."))
      .finally(() => setLoading(false));
  }, [orderId]);

  function copyOrderId() {
    navigator.clipboard.writeText(orderId).then(() => {
      toast({ title: "Copied!", description: "Order ID copied to clipboard." });
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading order details...</div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{error || "Order not found."}</p>
            <Link href="/" className="text-primary hover:underline">Return Home</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Received!</h1>
              <p className="text-muted-foreground">
                Thank you, <strong className="text-foreground">{order.customerName}</strong>. Your order has been placed successfully.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 space-y-6">
              {/* Order ID highlight */}
              <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-medium">Your Order ID</p>
                <p className="text-3xl font-bold text-primary tracking-widest mb-3">{order.orderId}</p>
                <Button variant="outline" size="sm" onClick={copyOrderId} className="gap-2">
                  <Copy className="w-4 h-4" /> Copy Order ID
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Save this ID — you'll need it for support or refund requests.</p>
              </div>

              {/* Order details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{order.planName}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${order.planPrice} USD</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{order.customerEmail}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1 text-yellow-400 font-medium capitalize">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Next steps */}
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Check your email</p>
                    <p className="text-muted-foreground text-sm">A confirmation email with your Order ID and next steps has been sent to <strong className="text-foreground">{order.customerEmail}</strong>. Our team will activate your plan within 24 hours.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">Return Home</Button>
                </Link>
                <a href="mailto:rameediscord@gmail.com" className="flex-1">
                  <Button className="w-full gap-2">
                    Contact Support <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
