import { useAuth } from "@/contexts/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
        <Skeleton className="h-16 w-16 rounded-full mb-4" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
