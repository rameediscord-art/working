import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-in slide-in-from-bottom-10">
      <div className="max-w-4xl mx-auto bg-card border border-border shadow-lg p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience and process payments securely. By continuing to use our site, you agree to our <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept All
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
