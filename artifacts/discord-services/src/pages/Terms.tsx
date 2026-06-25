import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-10 text-sm">Last Updated: June 25, 2025</p>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>Please read these Terms of Service carefully before using our website or purchasing any of our plans or services. By accessing or using this site, you agree to be bound by these terms.</p>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By visiting our website or making a purchase, you confirm that you have read, understood, and agree to these Terms of Service. If you do not agree, please do not use our site or services.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
              <p>We provide digital subscription plans and service packs as described on our Pricing page. The exact features and content of each plan are listed at the time of purchase. We reserve the right to update or modify plans with reasonable notice.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Account Registration</h2>
              <p>To access certain services, you may be required to create an account. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Keeping your login credentials confidential</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us immediately if you suspect unauthorized access</li>
              </ul>
              <p className="mt-3">We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Payment and Billing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed on the Pricing page and are in USD unless otherwise stated</li>
                <li>Payments are processed securely through <strong className="text-foreground">Paddle</strong></li>
                <li>By completing a purchase, you authorize the charge to your selected payment method</li>
                <li>You will receive an Order ID confirmation by email after every successful payment</li>
                <li>Subscription plans will renew automatically unless cancelled before the renewal date</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Cancellation</h2>
              <p>You may cancel your subscription at any time by contacting us at <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a>. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused time within a billing period unless covered by our Refund Policy.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Prohibited Uses</h2>
              <p>You agree not to use our services to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable laws or regulations</li>
                <li>Share your account access with unauthorized third parties</li>
                <li>Resell, redistribute, or sublicense our services without written permission</li>
                <li>Attempt to reverse engineer, hack, or disrupt our platform</li>
                <li>Submit false information at checkout or during support requests</li>
                <li>Initiate fraudulent chargebacks</li>
              </ul>
              <p className="mt-3">Violation of any prohibited use may result in immediate account termination without refund.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, and software — is our property and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any part of our content without explicit written permission.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services</li>
                <li>Our total liability to you for any claim shall not exceed the amount you paid for the service in question</li>
                <li>We do not guarantee uninterrupted or error-free service at all times</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Service Availability</h2>
              <p>We aim to keep our services available at all times but do not guarantee 100% uptime. We may perform maintenance or updates that temporarily affect availability. We will try to notify users in advance of planned downtime.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Modifications to Terms</h2>
              <p>We reserve the right to update these Terms of Service at any time. The updated date at the top of this page will reflect the latest version. Continued use of our services after changes are posted constitutes your acceptance of the updated terms.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Termination</h2>
              <p>We reserve the right to suspend or permanently terminate your account at any time if you violate these Terms of Service, without prior notice and without liability.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Contact</h2>
              <p>For any questions regarding these Terms of Service: <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
