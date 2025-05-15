
import { memo, useState } from "react";
import { ChargingSpeed, PlugType, Station } from "../types";
import { Plug, Zap, Clock, MapPin, Star, Battery, Wifi, ChevronRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface StationCardProps {
  station: Station;
  onBookClick: (station: Station) => void;
}

export const StationCard = memo(({ station, onBookClick }: StationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
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

  // Play sound effect on click
  const playClickSound = () => {
    try {
      const audio = new Audio('/sounds/click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Trigger haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    } catch (e) {
      console.log('Audio play failed:', e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 15px rgba(0, 0, 0, 0.2)' 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className="card-3d bg-cyber-dark/60 backdrop-blur-xl overflow-hidden transform-gpu cursor-pointer"
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green animate-gradient-x"></div>
      
      {/* 3D hover effect elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovering ? 0.1 : 0 }}
      ></div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{ 
          boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.3)',
          opacity: isHovering ? 1 : 0 
        }}
      ></div>
      
      {/* Station info */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <motion.h3 
              className="text-xl font-cyberpunk font-bold text-neon-blue drop-shadow-neon-text-blue"
              animate={{ textShadow: isHovering ? '0 0 8px rgba(0, 255, 255, 0.7)' : '0 0 0px rgba(0, 255, 255, 0)' }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>
            <p className="mt-1 flex items-center text-white/70 font-mono text-sm">
              <MapPin className="h-3 w-3 mr-1 text-neon-purple" /> {address}
            </p>
          </div>
          
          <div className="flex items-center">
            <motion.div 
              className="flex flex-col items-end"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="flex items-center gap-1 glass-morphism px-3 py-1 rounded-md">
                <span className="text-neon-green font-mono">{rating}</span>
                <Star className="h-3 w-3 text-neon-green fill-neon-green" />
              </div>
            </motion.div>
            
            <motion.button
              className="ml-3 h-8 w-8 rounded-full flex items-center justify-center text-white/50 hover:text-neon-purple transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          className="mt-5 space-y-4"
          animate={{ height: isExpanded ? 'auto' : 'auto' }}
        >
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

          {/* Expanded content - Only show if expanded */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Wait time */}
            {waitTime !== undefined && waitTime > 0 && (
              <motion.div 
                className="flex items-center font-mono text-white/70 glass-morphism px-3 py-2 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
            
            {/* 3D interactive map preview placeholder */}
            <div className="h-32 rounded-md overflow-hidden relative glass-morphism">
              <div className="absolute inset-0 bg-ultra-grid bg-opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono text-white/70">
                  TAP TO VIEW ON MAP
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Booking action */}
      <div className="px-5 pb-5 pt-2 flex justify-between items-center">
        <motion.div
          animate={{ 
            opacity: isExpanded ? 1 : 0.7,
            x: isExpanded ? 0 : 10 
          }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className={`h-5 w-5 text-white/50 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            onBookClick(station);
          }}
          disabled={availability.available === 0}
          className={`button-3d ${
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
