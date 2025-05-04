
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", revenue: 1200, sessions: 240 },
  { name: "Feb", revenue: 1900, sessions: 320 },
  { name: "Mar", revenue: 2400, sessions: 450 },
  { name: "Apr", revenue: 1700, sessions: 380 },
  { name: "May", revenue: 2200, sessions: 410 },
  { name: "Jun", revenue: 2800, sessions: 490 },
  { name: "Jul", revenue: 3100, sessions: 520 },
  { name: "Aug", revenue: 2900, sessions: 510 },
  { name: "Sep", revenue: 3300, sessions: 540 },
  { name: "Oct", revenue: 3500, sessions: 560 },
  { name: "Nov", revenue: 3700, sessions: 580 },
  { name: "Dec", revenue: 3800, sessions: 600 },
];

export function AdminRevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue & Sessions</CardTitle>
        <CardDescription>
          Monthly revenue and charging session trends
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="sessions" 
                stroke="#0ea5e9" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
