
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const complaintsData = [
  {
    id: "c-001",
    userId: "u-123",
    userName: "John Smith",
    stationId: "s-456",
    stationName: "Downtown Charger",
    type: "Technical",
    description: "Charger not working properly, shows ready but doesn't charge.",
    status: "pending",
    date: "2025-04-25",
    refundRequested: true,
  },
  {
    id: "c-002",
    userId: "u-124",
    userName: "Emma Johnson",
    stationId: "s-789",
    stationName: "EastSide Plaza",
    type: "Billing",
    description: "I was charged twice for the same session.",
    status: "in-progress",
    date: "2025-04-27",
    refundRequested: true,
  },
  {
    id: "c-003",
    userId: "u-125",
    userName: "Michael Brown",
    stationId: "s-101",
    stationName: "Airport Charging Hub",
    type: "Access",
    description: "Station was listed as available but was blocked by non-EV vehicles.",
    status: "resolved",
    date: "2025-04-28",
    refundRequested: false,
  },
  {
    id: "c-004",
    userId: "u-126",
    userName: "Sarah Wilson",
    stationId: "s-222",
    stationName: "Westfield Mall",
    type: "Technical",
    description: "Charging stopped unexpectedly after 10 minutes.",
    status: "pending",
    date: "2025-04-29",
    refundRequested: true,
  },
  {
    id: "c-005",
    userId: "u-127",
    userName: "David Clark",
    stationId: "s-333",
    stationName: "Central Park Garage",
    type: "Other",
    description: "Poor lighting around the charging station at night, feels unsafe.",
    status: "pending",
    date: "2025-04-30",
    refundRequested: false,
  }
];

export function SuperAdminComplaints() {
  const [complaints, setComplaints] = useState(complaintsData);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const updateStatus = (id: string, newStatus: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
    
    toast({
      title: "Status updated",
      description: `Complaint ID: ${id} status changed to ${newStatus}.`
    });
  };

  const processRefund = (id: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? 
          { ...complaint, status: "resolved", refundRequested: false } : 
          complaint
      )
    );
    
    toast({
      title: "Refund processed",
      description: `Refund for complaint ID: ${id} has been processed.`
    });
  };

  const filteredComplaints = statusFilter === "all" 
    ? complaints 
    : complaints.filter(complaint => complaint.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Complaints</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-mono">{complaint.id}</TableCell>
                <TableCell>{complaint.userName}</TableCell>
                <TableCell>{complaint.stationName}</TableCell>
                <TableCell>
                  <Badge variant="outline">{complaint.type}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={complaint.description}>
                  {complaint.description}
                </TableCell>
                <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                <TableCell>{complaint.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {complaint.status !== "resolved" && (
                      <Select 
                        value={complaint.status} 
                        onValueChange={(value) => updateStatus(complaint.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    
                    {complaint.refundRequested && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => processRefund(complaint.id)}
                        disabled={complaint.status === "resolved"}
                      >
                        Process Refund
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
