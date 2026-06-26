import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is this really a one-time payment?",
    answer: "Yes, completely. Every product on this site is a single one-time payment. There are no subscriptions, no recurring charges, and no renewals. You pay once and that's it — your access never expires unless stated otherwise.",
  },
  {
    question: "What happens after I place my order?",
    answer: "After submitting the checkout form, you will receive a confirmation email with your unique Order ID (format: ORD-YYYYMMDD-XXXXX). Our team will then contact you at your email address to deliver your purchase — usually within a few hours.",
  },
  {
    question: "How do I get my Discord access?",
    answer: "After your order is confirmed, we will send you a Discord invite link directly to your email. Permanent access means you will not need to pay again — the invite is yours to keep.",
  },
  {
    question: "How is the Live 1-on-1 Session scheduled?",
    answer: "After your order is confirmed, we will reach out to your email to schedule the session at a time that works for you. The session lasts 2 hours and is entirely private and personalised to your goals.",
  },
  {
    question: "What does the Full Bundle include?",
    answer: "The Full Bundle gives you everything: permanent Discord server access, one 2-hour private live session, and full access to all resources and materials for 30 days. It is the best-value option and covers everything we offer.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We process all payments securely. We accept all major credit and debit cards including Visa, Mastercard, and American Express, as well as other popular payment methods depending on your region.",
  },
  {
    question: "Can I request a refund?",
    answer: "Yes. We offer a 7-day refund window from the date of purchase. To request a refund, email rameediscord@gmail.com with your Order ID and the reason for your request. Please review our full Refund Policy for the complete terms.",
  },
  {
    question: "Are my payment details secure?",
    answer: "Yes. We do not store or process your card information on our servers. All transactions go through a secure, PCI-compliant payment processor. Your data is encrypted throughout the entire checkout process.",
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
              Everything you need to know before purchasing.
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
