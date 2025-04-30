
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChargingSpeed, PlugType, Station } from "../types";
import { Plug, Zap, Clock, MapPin } from "lucide-react";

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

  const [isEnergyBurst, setIsEnergyBurst] = useState(false);

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

  const handleBookClick = () => {
    setIsEnergyBurst(true);
    setTimeout(() => {
      setIsEnergyBurst(false);
      onBookClick(station);
    }, 600);
  };

  return (
    <Card className={`glass-card ${isEnergyBurst ? 'energy-burst' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-400 to-blue-500 rounded-t-xl"></div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl bg-gradient-to-r from-electric-600 via-electric-500 to-blue-600 bg-clip-text text-transparent">
              {name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> {address}
            </CardDescription>
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
              <Badge key={plugType} variant="outline" className="flex items-center gap-1 transition-all duration-300 hover:scale-105">
                <Plug className="h-3 w-3" /> {plugType}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {chargingSpeed.map((speed) => (
              <Badge 
                key={speed} 
                className={`${getChargingSpeedColor(speed)} flex items-center gap-1 transition-all duration-300 hover:scale-105`}
                variant="secondary"
              >
                <Zap className="h-3 w-3" /> {speed}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center glass p-2 rounded-lg">
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-lg font-bold">${price}/{priceUnit}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Availability</p>
              <Badge className={`${getAvailabilityColor()} ${availability.available > 0 ? 'animate-pulse-slow' : ''}`}>
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
          onClick={handleBookClick}
          disabled={availability.available === 0}
          className={`gradient-button ${availability.available === 0 ? 'opacity-50' : ''}`}
        >
          {availability.available > 0 ? "Book Now" : "Currently Full"}
        </Button>
      </CardFooter>
    </Card>
  );
}
