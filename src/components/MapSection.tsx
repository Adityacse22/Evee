
import { Map } from "@/components/Map";
import { Station, Location } from "@/types";

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
    <div className="lg:col-span-2 h-[70vh] glass border border-neon-blue/30">
      <Map 
        stations={stations}
        userLocation={userLocation}
        onStationSelect={onStationSelect}
        selectedStation={selectedStation}
      />
    </div>
  );
};
