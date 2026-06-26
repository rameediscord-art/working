import { useAuth } from "@/contexts/auth";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, LayoutList, Package, Settings, FileText, Menu, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/plans", label: "Plans", icon: LayoutList },
  { href: "/packs", label: "Packs", icon: Package },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/audit-logs", label: "Audit Logs", icon: FileText },
];

export function AppLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavItems = () => (
    <div className="flex flex-col gap-1 w-full">
      {NAV_LINKS.map((link) => {
        const isActive = location === link.href;
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href} className="w-full">
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 rounded-md px-3 ${isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-[100dvh] w-full flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-sidebar-border bg-sidebar shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="font-bold text-lg text-sidebar-foreground tracking-tight">NexusHub <span className="font-medium text-muted-foreground text-sm ml-1">Admin</span></span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <NavItems />
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-9 w-9 border border-sidebar-border">
              <AvatarFallback className="bg-primary/20 text-primary">{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-sidebar-foreground truncate">{user?.username}</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2 border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-card sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border text-sidebar-foreground">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                      N
                    </div>
                    <span className="font-bold text-lg text-sidebar-foreground">NexusHub</span>
                  </div>
                </div>
                <nav className="p-4">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 hidden md:block">
              <AvatarFallback className="bg-primary/10 text-primary">{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
