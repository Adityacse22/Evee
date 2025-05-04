
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const usageData = [
  { hour: "00:00", usage: 20 },
  { hour: "02:00", usage: 15 },
  { hour: "04:00", usage: 8 },
  { hour: "06:00", usage: 12 },
  { hour: "08:00", usage: 45 },
  { hour: "10:00", usage: 60 },
  { hour: "12:00", usage: 55 },
  { hour: "14:00", usage: 70 },
  { hour: "16:00", usage: 85 },
  { hour: "18:00", usage: 90 },
  { hour: "20:00", usage: 65 },
  { hour: "22:00", usage: 40 },
];

const plugTypeData = [
  { name: "Type 1", value: 15 },
  { name: "Type 2", value: 45 },
  { name: "CHAdeMO", value: 20 },
  { name: "CCS", value: 30 },
  { name: "Tesla", value: 25 },
];

const COLORS = ["#8b5cf6", "#0ea5e9", "#10b981", "#f97316", "#f43f5e"];

export function AdminAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Usage Patterns</CardTitle>
          <CardDescription>
            Hourly distribution of charging sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Plug Type Distribution</CardTitle>
          <CardDescription>Usage by connector type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plugTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plugTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Report</CardTitle>
          <CardDescription>Key metrics overview</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Average Session Duration</p>
                  <p className="text-2xl font-bold">42 min</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Time</p>
                  <p className="text-2xl font-bold">18:00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Utilization Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Average Session Duration</p>
                  <p className="text-2xl font-bold">38 min</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">1,645</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Day</p>
                  <p className="text-2xl font-bold">Friday</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Utilization Rate</p>
                  <p className="text-2xl font-bold">72%</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Average Session Duration</p>
                  <p className="text-2xl font-bold">41 min</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">6,832</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Week</p>
                  <p className="text-2xl font-bold">Week 3</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Utilization Rate</p>
                  <p className="text-2xl font-bold">64%</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
