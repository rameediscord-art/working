import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I receive my service after purchase?",
    answer: "After completing the checkout form and submitting your order, you will receive a confirmation email with your Order ID. Our team will activate your plan within 24 hours and send you access instructions by email.",
  },
  {
    question: "How long does delivery take?",
    answer: "For most digital plans and memberships, access is granted within 24 hours of payment confirmation. For coaching sessions, you will receive a scheduling link by email to book your preferred time.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We process all payments securely through Paddle. Paddle accepts all major credit and debit cards including Visa, Mastercard, and American Express, as well as other popular payment methods.",
  },
  {
    question: "Can I request a refund?",
    answer: "Yes. We offer a 7-day refund window for most digital memberships and subscriptions if you are unsatisfied. Please review our full Refund Policy page for detailed terms. To request a refund, email rameediscord@gmail.com with your Order ID.",
  },
  {
    question: "Is support available after purchase?",
    answer: "Yes. You can reach our support team at any time by emailing rameediscord@gmail.com. We aim to respond to all support requests within 12 hours.",
  },
  {
    question: "How do subscriptions work?",
    answer: "Subscriptions are billed automatically on a monthly basis from your purchase date. If you cancel, access continues until the end of your current billing period. To cancel, email rameediscord@gmail.com with your Order ID.",
  },
  {
    question: "Are my payment details secure?",
    answer: "We do not store or process your payment information on our servers. All transactions are handled securely by Paddle, a globally trusted payment processor that complies with strict PCI-DSS security standards.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes. To change your plan, email rameediscord@gmail.com with your Order ID and the plan you'd like to switch to. We will process the change and adjust your billing accordingly.",
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
