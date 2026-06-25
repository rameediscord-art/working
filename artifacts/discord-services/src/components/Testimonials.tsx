import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Mercer",
    username: "@alexcodes",
    rating: 5,
    quote: "Got the Pro tier and the coaching session alone was worth the monthly price. Reached my target rank in a week.",
    initials: "AM",
  },
  {
    name: "Sarah Chen",
    username: "@schen_dev",
    rating: 5,
    quote: "The automation tools saved my trading group. Everything is instant, webhook setup was a breeze.",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    username: "@marcusj",
    rating: 5,
    quote: "Role assignment worked perfectly. Clicked buy, joined the server, and boom — VIP access was there.",
    initials: "MJ",
  },
  {
    name: "Elena Rodriguez",
    username: "@elenar",
    rating: 5,
    quote: "Best Discord service marketplace I've used. Clean interface, fast delivery, and the community is actually active.",
    initials: "ER",
  },
  {
    name: "David Kim",
    username: "@dkim",
    rating: 5,
    quote: "Downloaded the server templates. Saved me probably 20 hours of configuration. Highly recommend.",
    initials: "DK",
  },
  {
    name: "Sophie Turner",
    username: "@sophiet",
    rating: 4,
    quote: "Support team is actually helpful. Had an issue with a bot command and they fixed it in my server within 10 minutes.",
    initials: "ST",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Hear from our active community members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-border transition-colors">
                <CardContent className="p-6">
                  <div className="flex text-primary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground/90 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.username}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
