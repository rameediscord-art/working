import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function Terms() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-purple max-w-none">
          <p>Last Updated: October 2023</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using NexusHub services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2>2. Service Description</h2>
          <p>NexusHub provides digital services including Discord memberships, bot access, coaching, and digital downloads. We reserve the right to modify or discontinue any service with or without notice.</p>

          <h2>3. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate Discord's Terms of Service or Community Guidelines.</li>
            <li>Share, resell, or distribute our premium bot access or digital downloads.</li>
            <li>Use our services for any illegal or unauthorized purpose.</li>
            <li>Attempt to bypass our licensing or access control systems.</li>
          </ul>

          <h2>4. Payments and Subscriptions</h2>
          <p>All payments are processed securely via Lemon Squeezy. Subscriptions auto-renew unless cancelled. You are responsible for managing your subscription through the provided billing portal.</p>

          <h2>5. Delivery</h2>
          <p>Digital access (roles, bot permissions) is delivered instantly upon successful payment. Technical issues delaying delivery should be reported to our support team.</p>

          <h2>6. Account Termination</h2>
          <p>We reserve the right to terminate or suspend your access to our services and Discord server immediately, without prior notice or refund, if you breach these Terms or Discord's Terms of Service.</p>

          <h2>7. Limitation of Liability</h2>
          <p>NexusHub is provided "as is". We are not liable for damages arising from service interruptions, loss of data, or actions taken by Discord affecting your account or server.</p>
        </div>
      </div>
    </div>
  );
}
