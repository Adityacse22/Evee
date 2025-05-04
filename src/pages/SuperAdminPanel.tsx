
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { SuperAdminStations } from "@/components/admin/SuperAdminStations";
import { SuperAdminUsers } from "@/components/admin/SuperAdminUsers";
import { SuperAdminReports } from "@/components/admin/SuperAdminReports";
import { SuperAdminComplaints } from "@/components/admin/SuperAdminComplaints";
import { Shield, Users, AlertTriangle, BarChart } from "lucide-react";

export default function SuperAdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("stations");

  // Redirect if not authenticated or not super admin
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You must be logged in as a super administrator to view this page.
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
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Panel</h1>
          <p className="text-muted-foreground">
            Oversee the entire charging network and manage global settings.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stations" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Station Approval</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stations" className="space-y-6">
            <SuperAdminStations />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <SuperAdminUsers />
          </TabsContent>
          
          <TabsContent value="complaints" className="space-y-6">
            <SuperAdminComplaints />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <SuperAdminReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
