
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Station, ChargingSpeed, PlugType } from "@/types";
import { mockStations } from "@/data/mockData";

export function AdminStationsList() {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const toggleStationStatus = (stationId: string) => {
    setStations(
      stations.map((station) =>
        station.id === stationId
          ? {
              ...station,
              availability: {
                ...station.availability,
                available:
                  station.availability.available === 0
                    ? station.availability.total
                    : 0,
              },
            }
          : station
      )
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Charging Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Plug Types</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
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
                    {station.availability.available}/{station.availability.total}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={station.availability.available > 0}
                        onCheckedChange={() => toggleStationStatus(station.id)}
                      />
                      <span>
                        {station.availability.available > 0 ? "Online" : "Offline"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStation(station)}
                        >
                          Details
                        </Button>
                      </DialogTrigger>
                      {selectedStation && (
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle>{selectedStation.name}</DialogTitle>
                            <DialogDescription>
                              {selectedStation.address}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <h4 className="mb-2 text-sm font-medium">Station Details</h4>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-sm font-medium">Price</p>
                                  <p className="text-sm text-muted-foreground">
                                    ${selectedStation.price} {selectedStation.priceUnit}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Rating</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedStation.rating}/5
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Charging Speed</p>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedStation.chargingSpeed.map((speed) => (
                                      <Badge key={speed} variant="outline">
                                        {speed}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Amenities</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedStation.amenities.join(", ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Edit Station</Button>
                            <Button variant="destructive">Maintenance Mode</Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
