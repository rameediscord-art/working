import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function Refund() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-invert prose-purple max-w-none">
          <p>Last Updated: October 2023</p>
          
          <h2>1. 7-Day Refund Window</h2>
          <p>We stand behind the quality of our premium memberships and bot services. If you are unsatisfied with your subscription, you may request a full refund within 7 days of your initial purchase.</p>

          <h2>2. Non-Refundable Items</h2>
          <p>The following items are strictly non-refundable due to their nature:</p>
          <ul>
            <li><strong>Digital Downloads:</strong> Templates, scripts, and guides cannot be returned once accessed.</li>
            <li><strong>Completed Coaching:</strong> Once a coaching session has been delivered, the fee is non-refundable. (Cancellations made 24 hours prior to the session are eligible for a refund).</li>
            <li><strong>Subscription Renewals:</strong> The 7-day window applies to the first charge only. Subsequent monthly renewals are non-refundable. You must cancel before the renewal date.</li>
          </ul>

          <h2>3. Service Disruptions</h2>
          <p>If our bots or services experience extended downtime (exceeding 24 hours), we will issue prorated credits to your account. Full refunds are not issued for temporary outages.</p>

          <h2>4. Banned Accounts</h2>
          <p>If your account is banned from our Discord server for violating our rules or Discord's Terms of Service, you forfeit any right to a refund for your active subscription.</p>

          <h2>5. How to Request a Refund</h2>
          <p>To request a refund within the eligible window:</p>
          <ol>
            <li>Open a support ticket in our Discord server OR email support@nexushub.gg.</li>
            <li>Provide your Lemon Squeezy order number or the email used for purchase.</li>
            <li>State the reason for the refund request (helps us improve).</li>
          </ol>
          <p>Refunds are processed to the original payment method and typically take 3-5 business days to appear on your statement.</p>
        </div>
      </div>
    </div>
  );
}
