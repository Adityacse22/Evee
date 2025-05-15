
import { Map } from "@/components/Map";
import { Station, Location } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MapSectionProps {
  stations: Station[];
  userLocation: Location;
  selectedStation: Station | null;
  onStationSelect: (station: Station) => void;
}

export const MapSection = ({
  stations,
  userLocation,
  selectedStation,
  onStationSelect
}: MapSectionProps) => {
  // Add a sound effect for map interactions
  const [audio] = useState(() => new Audio("/sounds/click.mp3"));
  
  // Play sound when selected station changes (with volume control)
  useEffect(() => {
    if (selectedStation) {
      audio.volume = 0.2;
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [selectedStation, audio]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="lg:col-span-2 h-[70vh] relative rounded-3xl overflow-hidden"
    >
      {/* Decorative 3D frame elements */}
      <div className="absolute inset-0 border-2 border-neon-blue/30 rounded-3xl pointer-events-none z-10 overflow-hidden">
        <div className="absolute -top-1 -left-1 w-16 h-16 border-t-2 border-l-2 border-neon-blue rounded-tl-3xl"></div>
        <div className="absolute -top-1 -right-1 w-16 h-16 border-t-2 border-r-2 border-neon-blue rounded-tr-3xl"></div>
        <div className="absolute -bottom-1 -left-1 w-16 h-16 border-b-2 border-l-2 border-neon-blue rounded-bl-3xl"></div>
        <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-2 border-r-2 border-neon-blue rounded-br-3xl"></div>
        
        {/* Animated scan lines */}
        <div className="scanline animate-scanline"></div>
        <div className="scanline animate-scanline animation-delay-700"></div>
        
        {/* 3D depth effect layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Floating UI elements */}
      <div className="absolute top-4 left-4 z-20 glass-morphism px-3 py-1 rounded-full text-xs font-mono text-neon-green flex items-center gap-1">
        <span className="inline-block h-2 w-2 bg-neon-green rounded-full animate-pulse"></span> 
        LIVE VIEW
      </div>
      
      <div className="absolute top-4 right-4 z-20 glass-morphism px-3 py-1 rounded-full text-xs font-mono text-neon-blue flex items-center">
        <span>{stations.length}</span> <span className="ml-1">STATIONS</span>
      </div>
      
      {/* Rotating cubic frame (decorative) */}
      <div className="absolute -bottom-40 -right-40 w-80 h-80 border border-neon-purple/20 rounded-lg transform rotate-45 animate-slow-rotate opacity-30 pointer-events-none"></div>

      {/* Main map component */}
      <div className="absolute inset-0 glass-morphism">
        <Map 
          stations={stations}
          userLocation={userLocation}
          onStationSelect={onStationSelect}
          selectedStation={selectedStation}
        />
      </div>
    </motion.div>
  );
};
