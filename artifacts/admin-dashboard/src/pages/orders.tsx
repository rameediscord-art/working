import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListAdminOrders, useUpdateAdminOrder } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

type Order = {
  id: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planPrice: string;
  paymentStatus: "pending" | "confirmed" | "refunded";
  notes: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  refunded: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function Orders() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editNotes, setEditNotes] = useState("");

  const { data, isLoading, refetch } = useListAdminOrders({
    search: search || undefined,
    status: statusFilter !== "all" ? (statusFilter as "pending" | "confirmed" | "refunded") : undefined,
    limit: 50,
    offset: 0,
  });

  const updateOrder = useUpdateAdminOrder();

  function openEdit(order: Order) {
    setEditOrder(order);
    setEditStatus(order.paymentStatus);
    setEditNotes(order.notes);
  }

  function saveEdit() {
    if (!editOrder) return;
    updateOrder.mutate(
      {
        id: editOrder.id,
        data: { paymentStatus: editStatus as "pending" | "confirmed" | "refunded", notes: editNotes },
      },
      {
        onSuccess: () => {
          toast({ title: "Order updated", description: `${editOrder.orderId} has been updated.` });
          setEditOrder(null);
          refetch();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to update order.", variant: "destructive" });
        },
      }
    );
  }

  const orders: Order[] = (data?.items ?? []) as Order[];

  return (
    <AppLayout title="Orders">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Order ID, email, or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => refetch()} title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total", value: data?.total ?? 0 },
            { label: "Pending", value: orders.filter(o => o.paymentStatus === "pending").length },
            { label: "Confirmed", value: orders.filter(o => o.paymentStatus === "confirmed").length },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium mb-1">No orders found</p>
                <p className="text-sm">Orders will appear here once customers check out.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Plan</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs font-medium text-primary">{order.orderId}</td>
                        <td className="py-3 px-2">
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                        </td>
                        <td className="py-3 px-2 hidden md:table-cell">
                          <div>{order.planName}</div>
                          <div className="text-xs text-muted-foreground font-medium">${order.planPrice}</div>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground hidden lg:table-cell">
                          {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className={`capitalize ${STATUS_COLORS[order.paymentStatus] ?? ""}`}>
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="outline" size="sm" onClick={() => openEdit(order)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={!!editOrder} onOpenChange={(o) => !o && setEditOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
          </DialogHeader>
          {editOrder && (
            <div className="space-y-4 py-2">
              <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                <p><span className="text-muted-foreground">Order ID: </span><strong className="font-mono text-primary">{editOrder.orderId}</strong></p>
                <p><span className="text-muted-foreground">Customer: </span>{editOrder.customerName} ({editOrder.customerEmail})</p>
                <p><span className="text-muted-foreground">Plan: </span>{editOrder.planName} — ${editOrder.planPrice}</p>
              </div>
              <div className="space-y-2">
                <Label>Payment Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  placeholder="Internal notes about this order..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOrder(null)}>Cancel</Button>
            <Button onClick={saveEdit} disabled={updateOrder.isPending}>
              {updateOrder.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
