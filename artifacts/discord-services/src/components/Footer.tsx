import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/30 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">NexusHub</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Premium digital services, tools, and memberships delivered instantly. Level up your digital journey today.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SSL Secured · Powered by Paddle</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">VIP Memberships</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Premium Tools</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gaming Coaching</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace Tools</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="mailto:rameediscord@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">rameediscord@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexusHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link href="/refund" className="text-xs text-muted-foreground hover:text-primary transition-colors">Refund</Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
