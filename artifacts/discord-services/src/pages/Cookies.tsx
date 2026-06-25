import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function Cookies() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground mb-10 text-sm">Last Updated: June 25, 2025</p>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>This Cookie Policy explains what cookies are, which cookies we use on our website, why we use them, and how you can control them. By continuing to use our website, you consent to our use of cookies as described in this policy.</p>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your device — computer, tablet, or phone — when you visit a website. They are widely used to make websites work properly, work more efficiently, and to provide information to the website owners. Cookies do not contain viruses or harmful code. They cannot access other files on your device or gather information beyond what is described in this policy.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">a) Strictly Necessary Cookies</h3>
                  <p>These cookies are essential for the website to function. Without them, core features like logging in, staying logged in, or completing a checkout would not work. These cookies cannot be disabled. Examples of what they do:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Keep you logged into your account during a session</li>
                    <li>Remember items in your cart or selected plan during checkout</li>
                    <li>Maintain your session securely so you are not logged out unexpectedly</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">b) Performance and Analytics Cookies</h3>
                  <p>These cookies help us understand how visitors interact with our website. They collect anonymous information such as which pages are visited most and how long visitors stay. Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Count how many people visit each page</li>
                    <li>Track which features are used most often</li>
                    <li>Identify pages where visitors leave the site</li>
                  </ul>
                  <p className="mt-2">No personally identifiable information is collected by these cookies.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">c) Functional Cookies</h3>
                  <p>These cookies allow the website to remember choices you make and provide enhanced, more personalised features. Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Remember your language or display preferences</li>
                    <li>Remember whether you have dismissed a notice or banner</li>
                    <li>Improve loading speed on return visits</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">d) Payment and Third-Party Cookies</h3>
                  <p>When you proceed to checkout, our payment processor <strong className="text-foreground">Paddle</strong> may set its own cookies on your device to process your transaction securely and prevent fraud. These cookies are governed by Paddle's own Cookie and Privacy Policy. We do not control these cookies.</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. What We Do Not Use Cookies For</h2>
              <p>We do not use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Collect your name, email, or any personally identifiable information without your knowledge</li>
                <li>Track your activity across other websites</li>
                <li>Serve you targeted advertising or share your data with advertising networks</li>
                <li>Sell your browsing behaviour to any third party</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. How Long Cookies Last</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Session Cookies</strong> — these are temporary and are deleted automatically when you close your browser. They are used to keep you logged in and maintain your session during a single visit.</li>
                <li><strong className="text-foreground">Persistent Cookies</strong> — these remain on your device for a set period of time (for example, 30 days). They are used to remember your preferences on return visits.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Third-Party Cookies</h2>
              <p>Some features of our website involve third-party services that may set their own cookies. These include:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Paddle</strong> — for secure payment processing during checkout</li>
                <li><strong className="text-foreground">Email delivery services</strong> — used when you sign up or make a purchase, to send you confirmation emails</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. How to Control and Disable Cookies</h2>
              <p>You have the right to accept or decline cookies at any time. Here is how to manage cookies in the most common browsers:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong className="text-foreground">Mozilla Firefox:</strong> Settings → Privacy and Security → Cookies and Site Data</li>
                <li><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong className="text-foreground">Microsoft Edge:</strong> Settings → Cookies and Site Permissions → Manage and delete cookies</li>
                <li><strong className="text-foreground">Mobile (iOS/Android):</strong> Go to your browser app settings and look for Privacy or Cookies under Site Settings</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. What Happens If You Disable Cookies</h2>
              <p>If you choose to disable all cookies, please be aware that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Some parts of the website may not function correctly</li>
                <li>You may not be able to stay logged into your account</li>
                <li>The checkout process may not work properly</li>
                <li>Your preferences may not be saved between visits</li>
              </ul>
              <p className="mt-3">We recommend keeping strictly necessary cookies enabled for the best experience.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to This Cookie Policy</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes in technology, law, or our services. The updated date at the top of this page will always show the most recent version.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact</h2>
              <p>If you have any questions about how we use cookies, contact us at: <a href="mailto:rameediscord@gmail.com" className="text-primary hover:underline">rameediscord@gmail.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
