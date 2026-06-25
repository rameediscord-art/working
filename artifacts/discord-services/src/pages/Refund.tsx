import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function Refund() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Refund Policy</h1>
          <p className="text-muted-foreground mb-10 text-sm">Last Updated: June 25, 2025</p>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>We want you to be satisfied with your purchase. Please read this Refund Policy carefully before buying any plan or pack from our platform.</p>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Refund Eligibility Window</h2>
              <p>You may request a refund within <strong className="text-foreground">7 days</strong> of your purchase date. Requests submitted after 7 days will not be eligible for a refund under any circumstances.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. What Qualifies for a Refund</h2>
              <p>You are eligible for a refund if:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You were charged but did not receive access to the service</li>
                <li>You were charged twice for the same order</li>
                <li>The service you received was significantly different from what was described on the pricing page</li>
                <li>You experienced a technical issue on our side that prevented you from using the service and our support team was unable to resolve it within a reasonable time</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. What Does Not Qualify for a Refund</h2>
              <p>Refunds will not be issued in the following cases:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You have already accessed, used, or downloaded the service or digital product</li>
                <li>You changed your mind after purchase</li>
                <li>You purchased the wrong plan by mistake (please contact us before completing your purchase if unsure)</li>
                <li>Your refund request is submitted after the 7-day window</li>
                <li>Violations of our Terms of Service that resulted in account suspension</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. How to Request a Refund</h2>
              <p>To request a refund, send an email to <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a> with the following information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your full name</li>
                <li>Your email address used at checkout</li>
                <li>Your <strong className="text-foreground">Order ID</strong> (found in your confirmation email, format: ORD-YYYYMMDD-XXXXX)</li>
                <li>Reason for the refund request</li>
              </ul>
              <p className="mt-3">We will review your request and respond within 2 business days.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Refund Processing Time</h2>
              <p>Once your refund is approved, it will be processed within <strong className="text-foreground">3 to 5 business days</strong>. The time it takes to appear in your account depends on your bank or payment provider.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Digital Product Disclaimer</h2>
              <p>All of our products and services are digital in nature. Once a digital product has been accessed, delivered, or downloaded, it is considered used and is no longer eligible for a refund unless a technical fault on our part is confirmed.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Partial Refunds</h2>
              <p>In certain cases where only part of a service was delivered or accessible, we may at our discretion offer a partial refund or service credit.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Chargebacks</h2>
              <p>We ask that you contact us at <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a> before initiating a chargeback with your bank. We are happy to resolve any issue directly. Unjustified chargebacks may result in account suspension.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact</h2>
              <p>For all refund requests and questions: <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
              <p className="mt-2">Please include your Order ID in every message so we can locate your purchase quickly.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
