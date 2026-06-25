import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10 text-sm">Last Updated: June 25, 2025</p>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. By using our site, you agree to the terms described below.</p>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Personal Identification Information</strong> — your full name and email address when you register or make a purchase</li>
                <li><strong className="text-foreground">Payment Information</strong> — payment details are processed securely through Paddle. We do not store your card number or banking details on our servers</li>
                <li><strong className="text-foreground">Order Information</strong> — your Order ID, plan purchased, purchase date, and payment status</li>
                <li><strong className="text-foreground">Usage Data</strong> — pages visited, time spent on the site, browser type, and device type collected through cookies</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Process and confirm your purchase</li>
                <li>Send you your Order ID and purchase confirmation by email</li>
                <li>Respond to your support or refund requests</li>
                <li>Improve the performance and design of our website</li>
                <li>Send important service updates (not marketing emails without your consent)</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Share Your Information</h2>
              <p>We do not sell your personal data to anyone. We share your data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Paddle</strong> — our payment processor, who handles all transactions securely. Paddle may collect and process your payment and billing information under their own Privacy Policy</li>
                <li><strong className="text-foreground">Email Service Providers</strong> — used only to send you transactional emails such as order confirmations</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage and Security</h2>
              <p>Your data is stored on secure servers with encryption. We use industry-standard security practices to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
              <p>We use cookies to improve your experience on our site. Cookies help us remember your preferences and understand how visitors use our website. You can disable cookies in your browser settings at any time. For full details, see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of any inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Retention</h2>
              <p>We retain your order and account data for as long as necessary to provide services and comply with our business obligations. If you request deletion, we will remove your data within 14 business days unless we are legally required to retain it.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Third-Party Links</h2>
              <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to read their policies.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. The updated date at the top of this page will always reflect the latest version. Continued use of the site after changes means you accept the updated policy.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
              <p>For any privacy-related questions or requests, contact us at: <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
