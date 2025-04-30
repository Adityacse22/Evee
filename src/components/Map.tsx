
import { useEffect, useState, useRef } from "react";
import { Station, Location, MapMarker } from "../types";

interface MapProps {
  stations: Station[];
  userLocation?: Location;
  onStationSelect: (station: Station) => void;
  selectedStation?: Station | null;
}

export function Map({ stations, userLocation, onStationSelect, selectedStation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // This would be replaced with actual Google Maps integration in a real app
  // For demo, we'll create a simplified map visualization
  
  useEffect(() => {
    // In a real app, this would initialize Google Maps API
    if (!mapInitialized && mapRef.current) {
      console.log("Map would initialize with Google Maps API");
      setMapInitialized(true);
    }
  }, [mapInitialized]);
  
  const handleMarkerClick = (station: Station) => {
    onStationSelect(station);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-charcoal-800 rounded-lg">
      <div ref={mapRef} className="map-container">
        {/* Simplified Map UI for the demo */}
        <div className="absolute inset-0 p-4 flex flex-col">
          <div className="mb-4 text-left">
            <p className="text-sm text-muted-foreground">Google Maps visualization will be integrated here</p>
          </div>
          
          <div className="flex-1 relative">
            {/* Map Markers for Stations */}
            {stations.map((station) => (
              <div 
                key={station.id}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  selectedStation?.id === station.id 
                    ? "z-10 scale-125" 
                    : "z-0 hover:scale-110"
                }`}
                style={{ 
                  left: `${Math.random() * 80 + 10}%`, 
                  top: `${Math.random() * 80 + 10}%`
                }}
                onClick={() => handleMarkerClick(station)}
              >
                <div 
                  className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    station.availability.available > 0 
                      ? "bg-green-500" 
                      : "bg-red-500"
                  } text-white text-xs shadow-lg`}
                >
                  {station.availability.available}
                </div>
                {selectedStation?.id === station.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                )}
              </div>
            ))}
            
            {/* User Location Marker */}
            {userLocation && (
              <div 
                className="absolute z-20"
                style={{ 
                  left: "50%", 
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="h-6 w-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600">
                  You
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Map Controls - Would be replaced with actual Google Maps controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="h-10 w-10 rounded-full bg-white dark:bg-charcoal-800 shadow-lg flex items-center justify-center">
          <span className="text-xl">+</span>
        </button>
        <button className="h-10 w-10 rounded-full bg-white dark:bg-charcoal-800 shadow-lg flex items-center justify-center">
          <span className="text-xl">-</span>
        </button>
      </div>
    </div>
  );
}
