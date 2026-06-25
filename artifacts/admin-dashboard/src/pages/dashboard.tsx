import { AppLayout } from "@/components/layout/AppLayout";
import { useGetAdminDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutList, CheckCircle, Package, Package2, AlertTriangle, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetAdminDashboard();

  if (isLoading) {
    return (
      <AppLayout title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </AppLayout>
    );
  }

  if (!stats) return null;

  return (
    <AppLayout title="Dashboard">
      {stats.maintenanceMode && (
        <Alert variant="destructive" className="mb-6 bg-yellow-500/10 text-yellow-500 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Maintenance Mode Active</AlertTitle>
          <AlertDescription>
            Warning: Maintenance mode is currently enabled. The site is offline to users.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Plans" value={stats.totalPlans} icon={<LayoutList className="h-5 w-5 text-primary" />} />
        <StatCard title="Active Plans" value={stats.activePlans} icon={<CheckCircle className="h-5 w-5 text-emerald-500" />} />
        <StatCard title="Total Packs" value={stats.totalPacks} icon={<Package className="h-5 w-5 text-blue-500" />} />
        <StatCard title="Available Packs" value={stats.activePacks} icon={<Package2 className="h-5 w-5 text-cyan-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-6">
                {stats.recentActivity.map((log) => (
                  <div key={log.id} className="flex gap-4">
                    <div className="mt-1">
                      <ActionBadge action={log.action} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none flex items-center gap-2">
                        {log.adminUsername} {log.action.toLowerCase()}d <Badge variant="outline">{log.entityType}</Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No recent activity.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/plans" className="w-full">
              <Button variant="outline" className="w-full justify-between group">
                Manage Plans
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href="/packs" className="w-full">
              <Button variant="outline" className="w-full justify-between group">
                Manage Packs
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href="/settings" className="w-full">
              <Button variant="outline" className="w-full justify-between group">
                Site Settings
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
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
