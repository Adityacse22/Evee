
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChargingSpeed, PlugType, Station } from "../types";

interface StationCardProps {
  station: Station;
  onBookClick: (station: Station) => void;
}

export function StationCard({ station, onBookClick }: StationCardProps) {
  const { 
    name, 
    address, 
    plugTypes, 
    chargingSpeed, 
    price, 
    priceUnit, 
    availability, 
    waitTime,
    rating, 
    amenities 
  } = station;

  // Function to get appropriate color for availability
  const getAvailabilityColor = () => {
    const ratio = availability.available / availability.total;
    if (ratio > 0.5) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (ratio > 0) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };
  
  // Function to get chip color for charging speed
  const getChargingSpeedColor = (speed: ChargingSpeed) => {
    switch (speed) {
      case ChargingSpeed.LEVEL_1:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case ChargingSpeed.LEVEL_2:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case ChargingSpeed.DC_FAST:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="station-card animate-slide-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="mt-1">{address}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">{rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {plugTypes.map((plugType) => (
              <Badge key={plugType} variant="outline">
                {plugType}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {chargingSpeed.map((speed) => (
              <Badge 
                key={speed} 
                className={getChargingSpeedColor(speed)}
                variant="secondary"
              >
                {speed}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-lg font-bold">${price}/{priceUnit}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Availability</p>
              <Badge className={getAvailabilityColor()}>
                {availability.available}/{availability.total} available
              </Badge>
            </div>
          </div>
          
          {waitTime !== undefined && waitTime > 0 && (
            <div className="text-sm">
              <span className="font-medium">Estimated wait:</span> ~{waitTime} minutes
            </div>
          )}
          
          {amenities.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">Amenities:</span> {amenities.join(", ")}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button 
          onClick={() => onBookClick(station)}
          disabled={availability.available === 0}
        >
          {availability.available > 0 ? "Book Now" : "Currently Full"}
        </Button>
      </CardFooter>
    </Card>
  );
}
