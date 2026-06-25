import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListAdminPacks, useCreateAdminPack, useUpdateAdminPack, useDeleteAdminPack, getListAdminPacksQueryKey } from "@workspace/api-client-react";
import { StarterPack, StarterPackInput } from "@workspace/api-client-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const packSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  items: z.array(z.string()).default([]),
  checkoutUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export default function Packs() {
  const { data: packs = [], isLoading } = useListAdminPacks();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createPack = useCreateAdminPack();
  const updatePack = useUpdateAdminPack();
  const deletePack = useDeleteAdminPack();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<StarterPack | null>(null);
  const [packToDelete, setPackToDelete] = useState<StarterPack | null>(null);

  const form = useForm<z.infer<typeof packSchema>>({
    resolver: zodResolver(packSchema),
    defaultValues: {
      name: "",
      price: "",
      discountPercentage: 0,
      items: [],
      checkoutUrl: "",
      isActive: true,
    }
  });

  const [itemInput, setItemInput] = useState("");

  const openAddModal = () => {
    setEditingPack(null);
    form.reset({
      name: "",
      price: "",
      discountPercentage: 0,
      items: [],
      checkoutUrl: "",
      isActive: true,
    });
    setItemInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (pack: StarterPack) => {
    setEditingPack(pack);
    form.reset({
      name: pack.name,
      price: pack.price.toString(),
      discountPercentage: pack.discountPercentage || 0,
      items: pack.items || [],
      checkoutUrl: pack.checkoutUrl || "",
      isActive: pack.isActive,
    });
    setItemInput("");
    setIsModalOpen(true);
  };

  const onSubmit = (values: z.infer<typeof packSchema>) => {
    if (editingPack) {
      updatePack.mutate({ id: editingPack.id, data: { ...values, price: Number(values.price) } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPacksQueryKey() });
          toast({ title: "Success", description: "Pack updated successfully." });
          setIsModalOpen(false);
        }
      });
    } else {
      createPack.mutate({ data: { ...values, price: Number(values.price) } as StarterPackInput }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminPacksQueryKey() });
          toast({ title: "Success", description: "Pack created successfully." });
          setIsModalOpen(false);
        }
      });
    }
  };

  const confirmDelete = () => {
    if (!packToDelete) return;
    deletePack.mutate({ id: packToDelete.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAdminPacksQueryKey() });
        toast({ title: "Success", description: "Pack deleted successfully." });
        setPackToDelete(null);
      }
    });
  };

  const handleToggle = (id: number, currentValue: boolean) => {
    updatePack.mutate({ id, data: { isActive: !currentValue } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAdminPacksQueryKey() });
      }
    });
  };

  const addItem = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (('key' in e && (e.key === 'Enter' || e.key === ',')) || e.type === 'blur') {
      e.preventDefault();
      const val = itemInput.trim().replace(/,$/, "");
      if (val) {
        const current = form.getValues("items");
        if (!current.includes(val)) {
          form.setValue("items", [...current, val], { shouldDirty: true });
        }
        setItemInput("");
      }
    }
  };

  const removeItem = (idx: number) => {
    const current = form.getValues("items");
    form.setValue("items", current.filter((_, i) => i !== idx), { shouldDirty: true });
  };

  return (
    <AppLayout title="Starter Packs">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage digital starter packs and bundles.</p>
        <Button onClick={openAddModal} data-testid="button-add-pack" className="gap-2">
          <Plus className="h-4 w-4" /> Add Pack
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : packs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No packs found. Create one to get started.</TableCell>
              </TableRow>
            ) : (
              packs.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell className="font-medium">{pack.name}</TableCell>
                  <TableCell>${pack.price}</TableCell>
                  <TableCell>{pack.discountPercentage ? `${pack.discountPercentage}%` : '-'}</TableCell>
                  <TableCell><Badge variant="secondary">{pack.items.length} items</Badge></TableCell>
                  <TableCell>
                    <Switch 
                      checked={pack.isActive} 
                      onCheckedChange={() => handleToggle(pack.id, pack.isActive)} 
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(pack)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setPackToDelete(pack)}>
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingPack ? 'Edit Pack' : 'Add New Pack'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Design Bundle" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input placeholder="49.99" type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="discountPercentage" render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount %</FormLabel>
                  <FormControl><Input type="number" min="0" max="100" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="items" render={() => (
                <FormItem>
                  <FormLabel>Items Included (Press Enter to add)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {form.watch("items").map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1">
                            {item}
                            <button type="button" onClick={() => removeItem(idx)} className="text-muted-foreground hover:text-foreground">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input 
                        value={itemInput} 
                        onChange={(e) => setItemInput(e.target.value)} 
                        onKeyDown={addItem}
                        onBlur={addItem}
                        placeholder="Type an item and press Enter..." 
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

              <FormField control={form.control} name="isActive" render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg border p-4 w-1/2">
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Available for purchase</FormLabel>
                  </div>
                </FormItem>
              )} />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createPack.isPending || updatePack.isPending}>
                  {editingPack ? 'Save Changes' : 'Create Pack'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!packToDelete} onOpenChange={(o) => !o && setPackToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete '{packToDelete?.name}'. This cannot be undone.
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
