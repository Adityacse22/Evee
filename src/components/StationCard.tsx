
import { memo } from "react";
import { ChargingSpeed, PlugType, Station } from "../types";
import { Plug, Zap, Clock, MapPin, Star, Battery, Wifi } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card bg-cyber-dark/60 backdrop-blur-xl overflow-hidden transform-gpu"
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green animate-gradient-x"></div>
      
      {/* Station info */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-cyberpunk font-bold text-neon-blue drop-shadow-neon-text-blue">
              {name}
            </h3>
            <p className="mt-1 flex items-center text-white/70 font-mono text-sm">
              <MapPin className="h-3 w-3 mr-1 text-neon-purple" /> {address}
            </p>
          </div>
          <motion.div 
            className="flex flex-col items-end"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="flex items-center gap-1 glass-morphism px-3 py-1 rounded-md">
              <span className="text-neon-green font-mono">{rating}</span>
              <Star className="h-3 w-3 text-neon-green fill-neon-green" />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-5 space-y-4">
          {/* Plug types */}
          <div className="flex flex-wrap gap-2">
            {plugTypes.map((plugType) => (
              <motion.span 
                key={plugType} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs border border-neon-blue/70 text-neon-blue px-3 py-1.5 rounded-md flex items-center gap-1 bg-cyber-dark/80 backdrop-blur-sm"
              >
                <Plug className="h-3 w-3" /> {plugType}
              </motion.span>
            ))}
          </div>
          
          {/* Charging speeds */}
          <div className="flex flex-wrap gap-2">
            {chargingSpeed.map((speed) => (
              <motion.span 
                key={speed} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs border px-3 py-1.5 rounded-md flex items-center gap-1 bg-cyber-dark/80 backdrop-blur-sm ${getChargingSpeedStyle(speed)}`}
              >
                <Zap className="h-3 w-3" /> {speed}
              </motion.span>
            ))}
          </div>
          
          {/* Price and availability */}
          <div className="glass-morphism rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-white/70">PRICE</p>
                <p className="text-2xl font-mono font-bold text-neon-green neon-text-green">${price}/{priceUnit}</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs font-mono text-white/70">AVAILABILITY</p>
                <p className={`text-lg font-mono font-bold ${getAvailabilityStyle()}`}>
                  {availability.available}/{availability.total}
                </p>
              </div>
            </div>
            
            {/* Charging estimate */}
            <div className="bg-cyber-dark/40 rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center text-neon-blue">
                <Battery className="h-4 w-4 mr-2 animate-pulse" />
                <span className="font-mono text-sm">80% in ~45 min</span>
              </div>
              <div className="text-xs font-mono text-neon-purple">~35kWh</div>
            </div>
          </div>
          
          {/* Wait time */}
          {waitTime !== undefined && waitTime > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center font-mono text-white/70 glass-morphism px-3 py-2 rounded-md"
            >
              <Clock className="h-3 w-3 mr-1 text-neon-purple" />
              <span className="font-medium">ESTIMATED WAIT:</span> 
              <span className="ml-auto text-neon-purple">{waitTime} min</span>
            </motion.div>
          )}
          
          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="text-xs font-mono glass-morphism px-3 py-2 rounded-md">
              <div className="flex items-center mb-1">
                <Wifi className="h-3 w-3 mr-1 text-neon-blue" />
                <span className="text-white/70">FACILITIES</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {amenities.map((amenity, idx) => (
                  <span key={idx} className="text-neon-blue/80 bg-cyber-dark/40 px-2 py-0.5 rounded-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking action */}
      <div className="px-5 pb-5 pt-2 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onBookClick(station)}
          disabled={availability.available === 0}
          className={`neo-button ${
            availability.available > 0 
              ? "border-neon-green text-neon-green hover:shadow-neon-green" 
              : "border-red-500/50 text-red-500/50 opacity-60 cursor-not-allowed"
          }`}
        >
          {availability.available > 0 ? "BOOK NOW" : "UNAVAILABLE"}
        </motion.button>
      </div>
    </motion.div>
  );
});

StationCard.displayName = "StationCard";
