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
            <p>We want you to be satisfied with your purchase. Please read this Refund Policy carefully before buying any product from our platform. All purchases are one-time payments — there are no subscriptions or recurring charges.</p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Refund Eligibility Window</h2>
              <p>You may request a refund within <strong className="text-foreground">7 days</strong> of your purchase date. Requests submitted after 7 days will not be eligible for a refund under any circumstances.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. What Qualifies for a Refund</h2>
              <p>You are eligible for a refund if:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You were charged but did not receive any access or delivery of your product</li>
                <li>You were charged twice for the same order</li>
                <li>The product you received was significantly different from what was described on the pricing page</li>
                <li>You experienced a technical issue on our side that prevented delivery and our team was unable to resolve it within a reasonable time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. What Does Not Qualify for a Refund</h2>
              <p>Refunds will not be issued in the following cases:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You have already accessed, used, or received the digital product (e.g. Discord invite accepted, session completed)</li>
                <li>You changed your mind after purchase</li>
                <li>You purchased the wrong product by mistake — please contact us before purchasing if unsure</li>
                <li>Your refund request is submitted after the 7-day window</li>
                <li>Your access was revoked due to a violation of our Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Live Session Cancellation</h2>
              <p>If you have purchased a Live 1-on-1 Session or the Full Bundle and the session has not yet been scheduled or delivered, you may request a refund within the 7-day window. If the session has already taken place, it is non-refundable.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. How to Request a Refund</h2>
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
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Refund Processing Time</h2>
              <p>Once your refund is approved, it will be processed within <strong className="text-foreground">3 to 5 business days</strong>. The time it takes to appear in your account depends on your bank or payment provider.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. One-Time Payment Disclaimer</h2>
              <p>All products on this platform are sold as one-time purchases. There are no subscriptions, no recurring billing, and no automatic renewals. Refund requests cannot relate to "future charges" as no future charges will ever occur.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Chargebacks</h2>
              <p>We ask that you contact us at <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a> before initiating a chargeback with your bank. We are happy to resolve any issue directly. Unjustified chargebacks may result in access revocation.</p>
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
