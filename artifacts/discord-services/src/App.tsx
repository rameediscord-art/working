import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CookieNotice } from "@/components/CookieNotice";

import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { Refund } from "@/pages/Refund";
import { Cookies } from "@/pages/Cookies";
import { About } from "@/pages/About";
import { ContactPage } from "@/pages/ContactPage";
import { Checkout } from "@/pages/Checkout";
import { OrderConfirmation } from "@/pages/OrderConfirmation";

const queryClient = new QueryClient();

function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund" component={Refund} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:orderId" component={OrderConfirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
