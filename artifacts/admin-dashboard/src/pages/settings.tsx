import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useGetAdminSettings, useUpdateAdminSettings, getGetAdminSettingsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  discordInviteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contactEmail: z.string().email("Must be a valid email"),
  notificationEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]),
  taxRate: z.coerce.number().min(0).max(100),
  maintenanceMode: z.boolean(),
});

export default function Settings() {
  const { data: settings, isLoading } = useGetAdminSettings();
  const updateSettings = useUpdateAdminSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "",
      logoUrl: "",
      discordInviteUrl: "",
      contactEmail: "",
      notificationEmail: "",
      currency: "USD",
      taxRate: 0,
      maintenanceMode: false,
    }
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        siteName: settings.siteName || "",
        logoUrl: settings.logoUrl || "",
        discordInviteUrl: settings.discordInviteUrl || "",
        contactEmail: settings.contactEmail || "",
        notificationEmail: settings.notificationEmail || "",
        currency: (settings.currency as any) || "USD",
        taxRate: settings.taxRate || 0,
        maintenanceMode: settings.maintenanceMode || false,
      });
    }
  }, [settings, form]);

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    updateSettings.mutate({ data: values }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAdminSettingsQueryKey() });
        toast({ title: "Success", description: "Settings saved successfully." });
      }
    });
  };

  if (isLoading) {
    return (
      <AppLayout title="General Settings">
        <div className="space-y-6 max-w-4xl mx-auto">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="General Settings">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
            
            <Card>
              <CardHeader>
                <CardTitle>Site Identity</CardTitle>
                <CardDescription>Brand configuration and basic info.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="siteName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="logoUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl><Input placeholder="https://" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="discordInviteUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord Invite URL</FormLabel>
                    <FormControl><Input placeholder="https://discord.gg/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>Where users and system alerts reach you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="contactEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Contact Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="notificationEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Notification Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormDescription>Leave blank to use the contact email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commerce</CardTitle>
                <CardDescription>Global pricing and tax settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="currency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD ($)</SelectItem>
                          <SelectItem value="AUD">AUD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="taxRate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Rate (%)</FormLabel>
                      <FormControl><Input type="number" step="0.01" min="0" max="100" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Card className={form.watch("maintenanceMode") ? "border-destructive/50" : ""}>
              <CardHeader>
                <CardTitle className={form.watch("maintenanceMode") ? "text-destructive" : ""}>System</CardTitle>
                <CardDescription>Global system flags and toggles.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField control={form.control} name="maintenanceMode" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-semibold">Maintenance Mode</FormLabel>
                      <FormDescription className={field.value ? "text-destructive" : ""}>
                        Warning: Enabling maintenance mode will take the site offline for users.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className={field.value ? "data-[state=checked]:bg-destructive" : ""} />
                    </FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 sticky bottom-6 z-10 bg-background/80 backdrop-blur-md p-4 rounded-xl border shadow-lg">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Discard Changes</Button>
              <Button type="submit" disabled={updateSettings.isPending}>
                {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
