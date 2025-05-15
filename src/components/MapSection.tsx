
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="lg:col-span-2 h-[70vh] relative rounded-lg overflow-hidden shadow-lg"
    >
      {/* Map status indicator */}
      <div className="absolute top-4 left-4 z-20 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm backdrop-blur-sm">
        <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span> 
        <span className="text-gray-700 dark:text-gray-200">Live View</span>
      </div>
      
      <div className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full text-xs flex items-center shadow-sm backdrop-blur-sm">
        <span className="text-gray-700 dark:text-gray-200 mr-1">{stations.length}</span> 
        <span className="text-gray-700 dark:text-gray-200">Stations</span>
      </div>

      {/* Main map component */}
      <div className="absolute inset-0">
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
