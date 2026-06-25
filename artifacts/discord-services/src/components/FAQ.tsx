import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I receive my Discord role after purchase?",
    answer: "Our system automatically integrates with Lemon Squeezy and Discord. Upon successful payment, you will be redirected to connect your Discord account. Once linked, our custom bot instantly assigns your purchased roles and unlocks access to the corresponding channels.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery is virtually instantaneous. For roles, memberships, and digital downloads, access is granted within seconds of payment confirmation. For coaching sessions, you will receive a scheduling link immediately to book your time.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We process all payments securely through Lemon Squeezy. We accept all major credit/debit cards (Visa, MasterCard, Amex, Discover), PayPal, Apple Pay, Google Pay, and localized payment methods depending on your region.",
  },
  {
    question: "Can I request a refund?",
    answer: "Yes. We offer a 7-day refund window for most digital memberships and tool subscriptions if you are unsatisfied. However, digital downloads and completed coaching sessions are non-refundable. Please review our full Refund Policy for detailed terms.",
  },
  {
    question: "Is support available after purchase?",
    answer: "Absolutely. All premium tiers include access to dedicated support channels within our Discord server. Pro and Elite members receive priority support with guaranteed response times under 12 hours.",
  },
  {
    question: "How do Discord subscriptions work?",
    answer: "Subscriptions are billed automatically on a monthly basis based on your start date. Your Discord roles are tied to your active subscription. If a payment fails or you cancel, access is gracefully revoked at the end of your billing period.",
  },
  {
    question: "Are my payment details secure?",
    answer: "We do not store or process your payment information on our servers. All transactions are handled by Lemon Squeezy, a globally trusted merchant of record that complies with strict PCI-DSS security standards.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can manage your subscription at any time through the billing portal link provided in your welcome email or by typing `/billing` in our Discord server. Upgrades are prorated automatically.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our services and billing.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
