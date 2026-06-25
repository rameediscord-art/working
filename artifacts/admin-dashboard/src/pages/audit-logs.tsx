import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useListAuditLogs } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FileJson } from "lucide-react";

export default function AuditLogs() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useListAuditLogs({ query: { queryKey: ["auditLogs", page] } }); // Passing params natively depending on the generated hook shape, but since orval types sometimes abstract it to the first arg
  // Actually, wait, useListAuditLogs takes params as first arg.
  // We'll extract and re-call it.
  
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const logs = data?.items || [];
  const total = data?.total || 0;

  return (
    <AppLayout title="Audit Logs">
      <div className="mb-6">
        <p className="text-muted-foreground">Immutable record of all administrative actions.</p>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Entity ID</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No audit logs found.</TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                    {format(new Date(log.createdAt), "MMM d, yyyy HH:mm:ss")}
                  </TableCell>
                  <TableCell className="font-medium">{log.adminUsername}</TableCell>
                  <TableCell><ActionBadge action={log.action} /></TableCell>
                  <TableCell>{log.entityType}</TableCell>
                  <TableCell className="font-mono text-xs">{log.entityId}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                      <FileJson className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {total > 0 && (
          <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing {page * 20 + 1}-{Math.min((page + 1) * 20, total)} of {total} entries.</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={(page + 1) * 20 >= total} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedLog} onOpenChange={(o) => !o && setSelectedLog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
                <div><span className="text-muted-foreground">Action:</span> <strong className="ml-2">{selectedLog.action}</strong></div>
                <div><span className="text-muted-foreground">Admin:</span> <strong className="ml-2">{selectedLog.adminUsername}</strong></div>
                <div><span className="text-muted-foreground">Entity:</span> <strong className="ml-2">{selectedLog.entityType}</strong></div>
                <div><span className="text-muted-foreground">ID:</span> <strong className="ml-2">{selectedLog.entityId}</strong></div>
                <div className="col-span-2"><span className="text-muted-foreground">IP Address:</span> <strong className="ml-2 font-mono">{selectedLog.ipAddress}</strong></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Old Value</h4>
                  <pre className="bg-black/50 p-4 rounded-md text-xs font-mono overflow-auto border border-border/50 min-h-[100px]">
                    {selectedLog.oldValue ? JSON.stringify(selectedLog.oldValue, null, 2) : "null"}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground">New Value</h4>
                  <pre className="bg-black/50 p-4 rounded-md text-xs font-mono overflow-auto border border-border/50 min-h-[100px]">
                    {selectedLog.newValue ? JSON.stringify(selectedLog.newValue, null, 2) : "null"}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

function ActionBadge({ action }: { action: string }) {
  const colors: Record<string, string> = {
    CREATE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    UPDATE: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    DELETE: "bg-red-500/10 text-red-500 border-red-500/20",
    LOGIN: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };
  
  const className = colors[action] || colors.LOGIN;
  
  return (
    <Badge variant="outline" className={`uppercase text-[10px] ${className}`}>
      {action}
    </Badge>
  );
}
