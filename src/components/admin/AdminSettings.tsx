
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function AdminSettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure system-wide settings for the charging network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications for important events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Send SMS alerts for critical events
                </p>
              </div>
              <Switch />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pricing</h3>
            <div className="grid gap-2">
              <Label htmlFor="base-rate">Base Rate ($/kWh)</Label>
              <Input id="base-rate" defaultValue="0.30" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="peak-multiplier">Peak Hours Multiplier</Label>
              <Input id="peak-multiplier" defaultValue="1.25" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dynamic Pricing</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically adjust prices based on demand
                </p>
              </div>
              <Switch />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Maintenance</h3>
            <div className="grid gap-2">
              <Label htmlFor="check-interval">Maintenance Check Interval (days)</Label>
              <Input id="check-interval" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Reporting</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically report issues detected by the system
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure security and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin users
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Automatically log out after 30 minutes of inactivity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-attempts">Max Login Attempts</Label>
            <Input id="login-attempts" defaultValue="5" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Security Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
