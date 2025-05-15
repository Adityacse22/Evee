
import { memo } from "react";
import { ChargingSpeed, PlugType, Station } from "../types";
import { Plug, Zap, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const getAvailabilityStyle = () => {
    const ratio = availability.available / availability.total;
    if (ratio > 0.5) return "text-neon-green border-neon-green";
    if (ratio > 0) return "text-neon-yellow border-neon-yellow";
    return "text-red-500 border-red-500";
  };
  
  // Function to get style for charging speed
  const getChargingSpeedStyle = (speed: ChargingSpeed) => {
    switch (speed) {
      case ChargingSpeed.LEVEL_1:
        return "border-neon-blue text-neon-blue";
      case ChargingSpeed.LEVEL_2:
        return "border-neon-purple text-neon-purple";
      case ChargingSpeed.DC_FAST:
        return "border-neon-green text-neon-green";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div className="cyber-card bg-cyber-light/20 backdrop-blur-md overflow-hidden">
      {/* Glowing top accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"></div>
      
      {/* Station info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-cyberpunk font-bold text-neon-blue drop-shadow-neon-text-blue">
              {name}
            </h3>
            <p className="mt-1 flex items-center text-white/70 font-mono text-sm">
              <MapPin className="h-3 w-3 mr-1 text-neon-purple" /> {address}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-cyber-accent px-2 py-0.5 rounded">
              <span className="text-neon-green font-mono">{rating}</span>
              <span className="text-neon-green">★</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          {/* Plug types */}
          <div className="flex flex-wrap gap-2">
            {plugTypes.map((plugType) => (
              <span 
                key={plugType} 
                className="text-xs border border-neon-blue/70 text-neon-blue px-2 py-1 rounded flex items-center gap-1 bg-cyber-dark"
              >
                <Plug className="h-3 w-3" /> {plugType}
              </span>
            ))}
          </div>
          
          {/* Charging speeds */}
          <div className="flex flex-wrap gap-2">
            {chargingSpeed.map((speed) => (
              <span 
                key={speed} 
                className={`text-xs border px-2 py-1 rounded flex items-center gap-1 bg-cyber-dark ${getChargingSpeedStyle(speed)}`}
              >
                <Zap className="h-3 w-3" /> {speed}
              </span>
            ))}
          </div>
          
          {/* Price and availability */}
          <div className="flex justify-between items-center p-3 rounded-lg neo bg-cyber-dark">
            <div>
              <p className="text-xs font-mono text-white/70">PRICE</p>
              <p className="text-xl font-mono font-bold text-neon-green neon-text-green">${price}/{priceUnit}</p>
            </div>
            
            <div>
              <p className="text-xs font-mono text-white/70">AVAILABILITY</p>
              <p className={`text-sm font-mono font-bold ${getAvailabilityStyle()}`}>
                {availability.available}/{availability.total}
              </p>
            </div>
          </div>
          
          {/* Wait time */}
          {waitTime !== undefined && waitTime > 0 && (
            <div className="text-sm flex items-center font-mono text-white/70">
              <Clock className="h-3 w-3 mr-1 text-neon-purple" />
              <span className="font-medium">ETA:</span> ~{waitTime} min
            </div>
          )}
          
          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="text-xs font-mono">
              <span className="text-white/70">FACILITIES:</span> 
              <span className="text-neon-blue ml-1">{amenities.join(" · ")}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking action */}
      <div className="px-4 pb-4 pt-2 flex justify-end">
        <button
          onClick={() => onBookClick(station)}
          disabled={availability.available === 0}
          className={`cyber-button ${
            availability.available > 0 
              ? "border-neon-green text-neon-green hover:shadow-neon-green" 
              : "border-red-500/50 text-red-500/50 opacity-60 cursor-not-allowed"
          }`}
        >
          {availability.available > 0 ? "BOOK NOW" : "UNAVAILABLE"}
        </button>
      </div>
    </div>
  );
});

StationCard.displayName = "StationCard";
