import { ShieldCheck, Activity } from "lucide-react";
import { SiLemonsqueezy } from "react-icons/si";

export function SocialProof() {
  return (
    <div className="w-full bg-card/80 border-y border-border/50 py-4 backdrop-blur-sm z-20 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>3 people purchased in the last hour</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm font-semibold text-foreground">
            Trusted by 2,400+ members across 12 countries
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <SiLemonsqueezy className="w-4 h-4 text-[#7047EB]" />
            <span>Powered by Lemon Squeezy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
