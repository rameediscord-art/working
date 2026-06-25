import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { AuthProvider } from "@/contexts/auth";
import { AuthGuard } from "@/components/layout/AuthGuard";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Plans from "@/pages/plans";
import Packs from "@/pages/packs";
import Settings from "@/pages/settings";
import AuditLogs from "@/pages/audit-logs";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      {/* Protected Routes */}
      <Route path="/">
        <AuthGuard><Dashboard /></AuthGuard>
      </Route>
      <Route path="/plans">
        <AuthGuard><Plans /></AuthGuard>
      </Route>
      <Route path="/packs">
        <AuthGuard><Packs /></AuthGuard>
      </Route>
      <Route path="/settings">
        <AuthGuard><Settings /></AuthGuard>
      </Route>
      <Route path="/audit-logs">
        <AuthGuard><AuditLogs /></AuthGuard>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
