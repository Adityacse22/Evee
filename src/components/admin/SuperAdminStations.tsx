
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { mockStations } from "@/data/mockData";
import { Station } from "@/types";

const pendingStations = [
  {
    id: "pending-1",
    name: "EVGo Plaza Station",
    address: "1234 Main St, Anytown, CA",
    owner: "EVGo Inc.",
    plugTypes: ["Type 2", "CCS"],
    date: "2025-04-28",
  },
  {
    id: "pending-2",
    name: "ChargePoint Downtown",
    address: "456 Oak Ave, Springfield, IL",
    owner: "ChargePoint LLC",
    plugTypes: ["Type 1", "CHAdeMO", "CCS"],
    date: "2025-04-29",
  },
  {
    id: "pending-3",
    name: "Electrify America Northwest",
    address: "789 Pine Rd, Portland, OR",
    owner: "Electrify America",
    plugTypes: ["Type 2", "CCS", "Tesla"],
    date: "2025-04-30",
  },
];

export function SuperAdminStations() {
  const [stations, setStations] = useState(mockStations);
  const [pending, setPending] = useState(pendingStations);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const approveStation = (id: string) => {
    setPending(pending.filter(station => station.id !== id));
    toast({
      title: "Station approved",
      description: `Station ID: ${id} has been approved.`
    });
  };
  
  const rejectStation = (id: string) => {
    setPending(pending.filter(station => station.id !== id));
    toast({
      title: "Station rejected",
      description: `Station ID: ${id} has been rejected.`
    });
  };
  
  const removeStation = (id: string) => {
    setStations(stations.filter(station => station.id !== id));
    toast({
      title: "Station removed",
      description: `Station ID: ${id} has been removed from the system.`
    });
  };

  const filteredStations = stations.filter(
    station => 
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {pending.length === 0 ? (
            <div className="flex h-24 items-center justify-center">
              <p className="text-muted-foreground">No stations pending approval</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Station Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Plug Types</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((station) => (
                  <TableRow key={station.id}>
                    <TableCell className="font-medium">{station.name}</TableCell>
                    <TableCell>{station.address}</TableCell>
                    <TableCell>{station.owner}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {station.plugTypes.map((type) => (
                          <Badge key={type} variant="outline">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{station.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm"
                          onClick={() => approveStation(station.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => rejectStation(station.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Approved Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input 
              placeholder="Search stations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Plug Types</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell className="font-medium">{station.name}</TableCell>
                  <TableCell>{station.address}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {station.plugTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {station.availability.available > 0 ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{station.rating}/5</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeStation(station.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
