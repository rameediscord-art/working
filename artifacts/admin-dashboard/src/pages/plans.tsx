import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListAdminPlans, useCreateAdminPlan, useUpdateAdminPlan, useDeleteAdminPlan, getListAdminPlansQueryKey } from "@workspace/api-client-react";
import { MembershipPlan, MembershipPlanInput } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  billingCycle: z.enum(["monthly", "yearly", "lifetime", "one_time"]),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  checkoutUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export default function Plans() {
  const { data: plans = [], isLoading } = useListAdminPlans();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createPlan = useCreateAdminPlan();
  const updatePlan = useUpdateAdminPlan();
  const deletePlan = useDeleteAdminPlan();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<MembershipPlan | null>(null);

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      price: "",
      billingCycle: "monthly",
      description: "",
      features: [],
      checkoutUrl: "",
      isActive: true,
      isFeatured: false,
    }
  });

  const [featureInput, setFeatureInput] = useState("");

  const openAddModal = () => {
    setEditingPlan(null);
    form.reset({
      name: "",
      price: "",
      billingCycle: "monthly",
      description: "",
      features: [],
      checkoutUrl: "",
      isActive: true,
      isFeatured: false,
    });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    form.reset({
      name: plan.name,
      price: plan.price.toString(),
      billingCycle: plan.billingCycle,
      description: plan.description || "",
      features: plan.features || [],
      checkoutUrl: plan.checkoutUrl || "",
      isActive: plan.isActive,
      isFeatured: plan.isFeatured,
    });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const onSubmit = (values: z.infer<typeof planSchema>) => {
    if (editingPlan) {
      updatePlan.mutate({ id: editingPlan.id, data: { ...values, price: Number(values.price) } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
          toast({ title: "Success", description: "Plan updated successfully." });
          setIsModalOpen(false);
        }
      });
    } else {
      createPlan.mutate({ data: { ...values, price: Number(values.price) } as MembershipPlanInput }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
          toast({ title: "Success", description: "Plan created successfully." });
          setIsModalOpen(false);
        }
      });
    }
  };

  const confirmDelete = () => {
    if (!planToDelete) return;
    deletePlan.mutate({ id: planToDelete.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
        toast({ title: "Success", description: "Plan deleted successfully." });
        setPlanToDelete(null);
      }
    });
  };

  const handleToggle = (id: number, field: "isActive" | "isFeatured", currentValue: boolean) => {
    updatePlan.mutate({ id, data: { [field]: !currentValue } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
      }
    });
  };

  const addFeature = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (('key' in e && (e.key === 'Enter' || e.key === ',')) || e.type === 'blur') {
      e.preventDefault();
      const val = featureInput.trim().replace(/,$/, "");
      if (val) {
        const current = form.getValues("features");
        if (!current.includes(val)) {
          form.setValue("features", [...current, val], { shouldDirty: true });
        }
        setFeatureInput("");
      }
    }
  };

  const removeFeature = (idx: number) => {
    const current = form.getValues("features");
    form.setValue("features", current.filter((_, i) => i !== idx), { shouldDirty: true });
  };

  return (
    <AppLayout title="Membership Plans">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage your subscription tiers and pricing.</p>
        <Button onClick={openAddModal} data-testid="button-add-plan" className="gap-2">
          <Plus className="h-4 w-4" /> Add Plan
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No plans found. Create one to get started.</TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.price}</TableCell>
                  <TableCell className="capitalize">{plan.billingCycle.replace("_", " ")}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={plan.isActive} 
                      onCheckedChange={() => handleToggle(plan.id, "isActive", plan.isActive)} 
                    />
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={plan.isFeatured} 
                      onCheckedChange={() => handleToggle(plan.id, "isFeatured", plan.isFeatured)} 
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(plan)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setPlanToDelete(plan)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Pro Tier" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input placeholder="9.99" type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <FormField control={form.control} name="billingCycle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Cycle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select cycle" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                      <SelectItem value="one_time">One Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Brief description of the plan" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="features" render={() => (
                <FormItem>
                  <FormLabel>Features (Press Enter to add)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {form.watch("features").map((f, idx) => (
                          <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1">
                            {f}
                            <button type="button" onClick={() => removeFeature(idx)} className="text-muted-foreground hover:text-foreground">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input 
                        value={featureInput} 
                        onChange={(e) => setFeatureInput(e.target.value)} 
                        onKeyDown={addFeature}
                        onBlur={addFeature}
                        placeholder="Type a feature and press Enter..." 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="checkoutUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Checkout URL (Optional)</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex gap-8">
                <FormField control={form.control} name="isActive" render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 flex-1">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                    </div>
                  </FormItem>
                )} />
                <FormField control={form.control} name="isFeatured" render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 flex-1">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                    </div>
                  </FormItem>
                )} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createPlan.isPending || updatePlan.isPending}>
                  {editingPlan ? 'Save Changes' : 'Create Plan'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!planToDelete} onOpenChange={(o) => !o && setPlanToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete '{planToDelete?.name}'. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
