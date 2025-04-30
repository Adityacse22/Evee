
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Activity, Users, Settings, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdminStationsList } from "@/components/admin/AdminStationsList";
import { AdminRevenueChart } from "@/components/admin/AdminRevenueChart";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminSettings } from "@/components/admin/AdminSettings";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated or not admin
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You must be logged in as an administrator to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your charging stations and monitor performance.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="stations" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Stations</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,428</div>
                  <p className="text-xs text-muted-foreground">
                    +24% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+28</div>
                  <p className="text-xs text-muted-foreground">
                    Current active charging sessions
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Stations Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42/48</div>
                  <p className="text-xs text-muted-foreground">
                    Operational stations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Issues Reported
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <div className="text-2xl font-bold">6</div>
                  <AlertTriangle className="ml-2 h-4 w-4 text-amber-500" />
                  <p className="ml-auto text-xs text-muted-foreground">
                    Needs attention
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <AdminRevenueChart />
          </TabsContent>
          
          <TabsContent value="stations" className="space-y-6">
            <AdminStationsList />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <AdminAnalytics />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
