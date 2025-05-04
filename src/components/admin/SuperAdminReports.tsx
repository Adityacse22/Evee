
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

const revenueData = [
  { name: "Jan", value: 18500 },
  { name: "Feb", value: 19200 },
  { name: "Mar", value: 21500 },
  { name: "Apr", value: 24000 },
  { name: "May", value: 26300 },
  { name: "Jun", value: 28200 },
  { name: "Jul", value: 31000 },
  { name: "Aug", value: 32400 },
  { name: "Sep", value: 33800 },
  { name: "Oct", value: 35500 },
  { name: "Nov", value: 36900 },
  { name: "Dec", value: 38500 },
];

const usageData = [
  { name: "Jan", value: 2450 },
  { name: "Feb", value: 2580 },
  { name: "Mar", value: 2720 },
  { name: "Apr", value: 2890 },
  { name: "May", value: 3050 },
  { name: "Jun", value: 3240 },
  { name: "Jul", value: 3480 },
  { name: "Aug", value: 3620 },
  { name: "Sep", value: 3710 },
  { name: "Oct", value: 3860 },
  { name: "Nov", value: 3950 },
  { name: "Dec", value: 4080 },
];

const outageData = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 36 },
  { name: "Mar", value: 28 },
  { name: "Apr", value: 32 },
  { name: "May", value: 22 },
  { name: "Jun", value: 18 },
  { name: "Jul", value: 24 },
  { name: "Aug", value: 16 },
  { name: "Sep", value: 20 },
  { name: "Oct", value: 26 },
  { name: "Nov", value: 30 },
  { name: "Dec", value: 38 },
];

export function SuperAdminReports() {
  const [reportType, setReportType] = useState("revenue");
  const [date, setDate] = useState<Date>();
  const [granularity, setGranularity] = useState("monthly");
  const { toast } = useToast();
  
  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated.`
    });
  };
  
  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been exported to CSV.`
    });
  };
  
  const renderChart = () => {
    let data;
    let color;
    
    switch (reportType) {
      case "revenue":
        data = revenueData;
        color = "#8b5cf6"; // purple
        break;
      case "usage":
        data = usageData;
        color = "#0ea5e9"; // blue
        break;
      case "outages":
        data = outageData;
        color = "#f97316"; // orange
        break;
      default:
        data = revenueData;
        color = "#8b5cf6";
    }
    
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => reportType === "revenue" ? `$${value}` : value} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              name={reportType.charAt(0).toUpperCase() + reportType.slice(1)}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>
            Generate and export system reports for analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="usage">Usage Report</SelectItem>
                  <SelectItem value="outages">Outage Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Granularity</label>
              <Select value={granularity} onValueChange={setGranularity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select granularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end space-x-2">
              <Button onClick={handleGenerateReport}>Generate Report</Button>
              <Button variant="outline" onClick={handleExportReport}>Export CSV</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="revenue" onValueChange={setReportType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="outages">Outages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Report</CardTitle>
              <CardDescription>
                Monthly revenue data across all charging stations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart()}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold">$325,600</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Growth YoY</p>
                  <p className="text-2xl font-bold text-green-600">+24.6%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Average Per Station</p>
                  <p className="text-2xl font-bold">$6,783</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Report</CardTitle>
              <CardDescription>
                Monthly charging sessions across the network
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart()}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">36,580</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Growth YoY</p>
                  <p className="text-2xl font-bold text-green-600">+18.2%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Avg. Session Duration</p>
                  <p className="text-2xl font-bold">42 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="outages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outage Report</CardTitle>
              <CardDescription>
                System outages and maintenance events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart()}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Outages</p>
                  <p className="text-2xl font-bold">332</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Change YoY</p>
                  <p className="text-2xl font-bold text-green-600">-12.5%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Avg. Resolve Time</p>
                  <p className="text-2xl font-bold">4.2 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
