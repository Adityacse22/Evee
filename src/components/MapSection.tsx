
import { Map } from "@/components/Map";
import { Station, Location } from "@/types";
import { motion } from "framer-motion";

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
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="lg:col-span-2 h-[70vh] glass-morphism"
    >
      <Map 
        stations={stations}
        userLocation={userLocation}
        onStationSelect={onStationSelect}
        selectedStation={selectedStation}
      />
    </motion.div>
  );
};
