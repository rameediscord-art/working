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
            <p>Please read these Terms of Service carefully before using our website or purchasing any of our services. By accessing or using this site, you agree to be bound by these terms.</p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By visiting our website or making a purchase, you confirm that you have read, understood, and agree to these Terms of Service. If you do not agree, please do not use our site or services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
              <p>We offer three professional digital advisory services, each available as a one-time purchase:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Professional Member Portal Access ($14)</strong> — Permanent access to our private professional portal including curated expert resources, materials, and advisory team communication. No expiry, no renewal required.</li>
                <li><strong className="text-foreground">1-on-1 Expert Advisory Session ($60)</strong> — One private 2-hour digital consultation with a senior professional advisor, scheduled after purchase via email.</li>
                <li><strong className="text-foreground">Complete Advisory Package ($120)</strong> — Includes full Professional Member Portal Access, one 1-on-1 Expert Advisory Session, and 30 days of full premium resource access.</li>
              </ul>
              <p className="mt-3">All purchases are <strong className="text-foreground">one-time payments only</strong>. There are no subscriptions, no recurring charges, and no automatic renewals of any kind.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Payment and Billing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed on our services page and are in USD</li>
                <li>Every purchase is a single, one-time payment — you will never be charged again for the same service</li>
                <li>Payments are processed securely through Paddle, a trusted global payment processor</li>
                <li>By completing a purchase, you authorise the charge to your selected payment method</li>
                <li>You will receive an Order ID confirmation by email after every successful payment</li>
                <li>There are no subscriptions, billing cycles, or renewal charges of any kind</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Delivery</h2>
              <p>After your order is confirmed, our team will contact you at the email address provided during checkout. Delivery timelines:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Professional Member Portal Access</strong> — Access credentials and instructions sent within 24 hours of payment confirmation</li>
                <li><strong className="text-foreground">1-on-1 Expert Advisory Session</strong> — We will email you within 24 hours to schedule the session at a mutually convenient time</li>
                <li><strong className="text-foreground">Complete Advisory Package</strong> — Portal access and session scheduling email sent within 24 hours of confirmation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Prohibited Uses</h2>
              <p>You agree not to use our services to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable laws or regulations</li>
                <li>Share, resell, or transfer your purchase to unauthorised third parties</li>
                <li>Resell or redistribute our digital services without written permission</li>
                <li>Attempt to reverse engineer, hack, or disrupt our platform</li>
                <li>Submit false information at checkout or during support requests</li>
                <li>Initiate fraudulent chargebacks</li>
              </ul>
              <p className="mt-3">Violation of any prohibited use may result in immediate access revocation without refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, advisory materials, and software — is our property and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any part of our content without explicit written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services</li>
                <li>Our total liability to you for any claim shall not exceed the amount you paid for the service in question</li>
                <li>We do not guarantee uninterrupted or error-free service at all times</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Modifications to Terms</h2>
              <p>We reserve the right to update these Terms of Service at any time. The updated date at the top of this page will reflect the latest version. Continued use of our services after changes are posted constitutes your acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Termination</h2>
              <p>We reserve the right to revoke access at any time if you violate these Terms of Service, without prior notice and without refund where the violation is the cause.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
              <p>For any questions regarding these Terms of Service: <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
