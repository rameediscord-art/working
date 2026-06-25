import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-purple max-w-none">
          <p>Last Updated: October 2023</p>
          
          <h2>1. Information We Collect</h2>
          <p>When you use NexusHub, we collect the following types of information:</p>
          <ul>
            <li><strong>Account Information:</strong> Your Discord ID, username, and avatar when you link your account.</li>
            <li><strong>Transaction Data:</strong> Handled securely by our payment processor (Lemon Squeezy). We only receive confirmation of payment, not full credit card details.</li>
            <li><strong>Usage Data:</strong> Basic analytics about how you interact with our website.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used strictly to provide and improve our services:</p>
          <ul>
            <li>To provision Discord roles and bot access automatically.</li>
            <li>To process payments and prevent fraud.</li>
            <li>To communicate with you regarding your purchases or support tickets.</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>We rely on trusted third parties to operate our service:</p>
          <ul>
            <li><strong>Discord:</strong> For authentication and community access.</li>
            <li><strong>Lemon Squeezy:</strong> For secure payment processing.</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>We use essential cookies to maintain your session and preference settings. We do not use intrusive tracking cookies for third-party advertising.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to request access to, or deletion of, your personal data. Contact us in our Discord server or via email to exercise these rights.</p>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this policy, please contact support@nexushub.gg.</p>
        </div>
      </div>
    </div>
  );
}
