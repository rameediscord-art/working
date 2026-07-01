import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useAdminLogin } from "@workspace/api-client-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type Mode = "login" | "forgot" | "forgot-sent";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const adminLogin = useAdminLogin();
  const [mode, setMode] = useState<Mode>("login");
  const [isSendingReset, setIsSendingReset] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const forgotForm = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onLogin = (values: z.infer<typeof loginSchema>) => {
    adminLogin.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          setLocation("/");
        },
        onError: (err: unknown) => {
          const status = (err as { status?: number })?.status;
          if (status === 423) {
            toast({ title: "Account Locked", description: "Too many failed attempts. Account locked for 30 minutes.", variant: "destructive" });
          } else if (status === 401) {
            toast({ title: "Invalid Credentials", description: "Incorrect username or password.", variant: "destructive" });
          } else {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
          }
        },
      }
    );
  };

  const onForgotPassword = async (values: z.infer<typeof forgotSchema>) => {
    setIsSendingReset(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      await res.json();
      setMode("forgot-sent");
    } catch {
      toast({ title: "Error", description: "Failed to send reset email. Please try again.", variant: "destructive" });
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl relative z-10">
        <CardHeader className="space-y-3 pb-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Ramee Digital</CardTitle>
            <CardDescription className="text-sm font-medium">
              {mode === "login" && "Admin Portal"}
              {mode === "forgot" && "Reset Password"}
              {mode === "forgot-sent" && "Check Your Email"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* LOGIN FORM */}
          {mode === "login" && (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} className="bg-background/50" autoComplete="username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-background/50" autoComplete="current-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-2" disabled={adminLogin.isPending}>
                  {adminLogin.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
                >
                  Forgot your password?
                </button>
              </form>
            </Form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === "forgot" && (
            <Form {...forgotForm}>
              <form onSubmit={forgotForm.handleSubmit(onForgotPassword)} className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Enter your admin email address and we'll send you a reset link valid for 15 minutes.
                </p>
                <FormField
                  control={forgotForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} className="bg-background/50" autoComplete="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSendingReset}>
                  {isSendingReset && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </button>
              </form>
            </Form>
          )}

          {/* FORGOT SENT CONFIRMATION */}
          {mode === "forgot-sent" && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl">✉️</span>
              </div>
              <p className="text-sm text-muted-foreground">
                If that email is registered, a reset link has been sent. Check your inbox and click the link to set a new password. The link expires in <strong className="text-foreground">15 minutes</strong>.
              </p>
              <Button variant="outline" className="w-full" onClick={() => { setMode("login"); forgotForm.reset(); }}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
