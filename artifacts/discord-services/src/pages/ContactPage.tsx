import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl pt-8 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-0">We're here to help. Send us a message and we'll respond within 12 hours.</p>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
