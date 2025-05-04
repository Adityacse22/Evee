
import { memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChargingSpeed, PlugType, Station } from "../types";
import { Plug, Zap, Clock, MapPin } from "lucide-react";

interface StationCardProps {
  station: Station;
  onBookClick: (station: Station) => void;
}

export const StationCard = memo(({ station, onBookClick }: StationCardProps) => {
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
    if (ratio > 0.5) return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
    if (ratio > 0) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
  };
  
  // Function to get chip color for charging speed
  const getChargingSpeedColor = (speed: ChargingSpeed) => {
    switch (speed) {
      case ChargingSpeed.LEVEL_1:
        return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300";
      case ChargingSpeed.LEVEL_2:
        return "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300";
      case ChargingSpeed.DC_FAST:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-t-xl"></div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-teal-600 dark:text-teal-400">
              {name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> {address}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-semibold">{rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {plugTypes.map((plugType) => (
              <Badge key={plugType} variant="outline" className="flex items-center gap-1">
                <Plug className="h-3 w-3" /> {plugType}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {chargingSpeed.map((speed) => (
              <Badge 
                key={speed} 
                className={`${getChargingSpeedColor(speed)} flex items-center gap-1`}
                variant="secondary"
              >
                <Zap className="h-3 w-3" /> {speed}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-lg font-bold">${price}/{priceUnit}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Availability</p>
              <Badge className={`${getAvailabilityColor()}`}>
                {availability.available}/{availability.total} available
              </Badge>
            </div>
          </div>
          
          {waitTime !== undefined && waitTime > 0 && (
            <div className="text-sm flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
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
          className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
        >
          {availability.available > 0 ? "Book Now" : "Currently Full"}
        </Button>
      </CardFooter>
    </Card>
  );
});

StationCard.displayName = "StationCard";
