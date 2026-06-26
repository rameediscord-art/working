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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
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
      description: "",
      features: [],
      isActive: true,
      isFeatured: false,
    }
  });

  const [featureInput, setFeatureInput] = useState("");

  const openAddModal = () => {
    setEditingPlan(null);
    form.reset({ name: "", price: "", description: "", features: [], isActive: true, isFeatured: false });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    form.reset({
      name: plan.name,
      price: String(plan.price),
      description: plan.description || "",
      features: plan.features || [],
      isActive: plan.isActive,
      isFeatured: plan.isFeatured,
    });
    setFeatureInput("");
    setIsModalOpen(true);
  };

  const onSubmit = (values: z.infer<typeof planSchema>) => {
    const payload = { ...values, price: Number(values.price), billingCycle: "one_time" as const };
    if (editingPlan) {
      updatePlan.mutate({ id: editingPlan.id, data: payload }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
          toast({ title: "Success", description: "Product updated." });
          setIsModalOpen(false);
        },
        onError: () => toast({ title: "Error", description: "Failed to update product.", variant: "destructive" }),
      });
    } else {
      createPlan.mutate({ data: payload as MembershipPlanInput }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
          toast({ title: "Success", description: "Product created." });
          setIsModalOpen(false);
        },
        onError: () => toast({ title: "Error", description: "Failed to create product.", variant: "destructive" }),
      });
    }
  };

  const confirmDelete = () => {
    if (!planToDelete) return;
    deletePlan.mutate({ id: planToDelete.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() });
        toast({ title: "Success", description: "Product deleted." });
        setPlanToDelete(null);
      }
    });
  };

  const handleToggle = (id: number, field: "isActive" | "isFeatured", currentValue: boolean) => {
    updatePlan.mutate({ id, data: { [field]: !currentValue } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListAdminPlansQueryKey() }),
    });
  };

  const addFeature = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (('key' in e && (e.key === 'Enter' || e.key === ',')) || e.type === 'blur') {
      e.preventDefault();
      const val = featureInput.trim().replace(/,$/, "");
      if (val) {
        const current = form.getValues("features");
        if (!current.includes(val)) form.setValue("features", [...current, val], { shouldDirty: true });
        setFeatureInput("");
      }
    }
  };

  const removeFeature = (idx: number) => {
    form.setValue("features", form.getValues("features").filter((_, i) => i !== idx), { shouldDirty: true });
  };

  return (
    <AppLayout title="Products">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage your one-time purchase products and pricing.</p>
        <Button onClick={openAddModal} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Active</TableHead>
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
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No products yet. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell className="font-semibold">${plan.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                      One-Time
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={plan.isActive} onCheckedChange={() => handleToggle(plan.id, "isActive", plan.isActive)} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={plan.isFeatured} onCheckedChange={() => handleToggle(plan.id, "isFeatured", plan.isFeatured)} />
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
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Discord Access" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl><Input placeholder="14.00" type="number" step="0.01" min="0" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Brief description shown on the pricing page" {...field} className="resize-none" rows={3} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="features" render={() => (
                <FormItem>
                  <FormLabel>Features (press Enter to add)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 min-h-[32px]">
                        {form.watch("features").map((f, idx) => (
                          <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1">
                            {f}
                            <button type="button" onClick={() => removeFeature(idx)} className="text-muted-foreground hover:text-foreground ml-0.5">
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
                </FormItem>
              )} />

              <div className="flex gap-4">
                <FormField control={form.control} name="isActive" render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 flex-1">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer">Active (visible on site)</FormLabel>
                  </FormItem>
                )} />
                <FormField control={form.control} name="isFeatured" render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 flex-1">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer">Featured (best value badge)</FormLabel>
                  </FormItem>
                )} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createPlan.isPending || updatePlan.isPending}>
                  {editingPlan ? "Save Changes" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!planToDelete} onOpenChange={(o) => !o && setPlanToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{planToDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product. This action cannot be undone.
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
