
import { useEffect, useState, useRef, useMemo } from "react";
import { Station, Location } from "../types";
import { MapPin, Zap } from "lucide-react";

interface MapProps {
  stations: Station[];
  userLocation?: Location;
  onStationSelect: (station: Station) => void;
  selectedStation?: Station | null;
}

export function Map({ stations, userLocation, onStationSelect, selectedStation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Memoize station positions for better performance
  const stationPositions = useMemo(() => {
    return stations.map(station => ({
      id: station.id,
      station,
      // Generate fixed positions to avoid re-renders moving stations around
      position: {
        x: hashStringToNumber(station.id, 10, 90),
        y: hashStringToNumber(station.name, 10, 90)
      }
    }));
  }, [stations]);
  
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
    <div className="relative w-full h-full overflow-hidden bg-cyber-dark rounded-lg border border-neon-blue/30 shadow-neon-blue">
      {/* Stylized grid overlay */}
      <div className="absolute inset-0 neon-grid-bg opacity-30"></div>
      
      <div ref={mapRef} className="map-container relative z-10">
        {/* Cyberpunk Map UI */}
        <div className="absolute inset-0 p-4 flex flex-col">
          <div className="mb-4 text-left">
            <p className="text-sm text-neon-blue font-mono">Holographic Map Visualization <span className="animate-pulse">⟁</span></p>
          </div>
          
          <div className="flex-1 relative">
            {/* Radial gradient for depth */}
            <div className="absolute inset-0 bg-cyber-radial opacity-40"></div>
            
            {/* Map Markers for Stations */}
            {stationPositions.map(({ id, station, position }) => (
              <div 
                key={id}
                className={`absolute cursor-pointer transition-all duration-500 transform ${
                  selectedStation?.id === id 
                    ? "z-10 scale-125" 
                    : "z-0 hover:scale-110"
                }`}
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`,
                  transform: selectedStation?.id === id ? 'scale(1.25)' : 'scale(1)',
                  willChange: 'transform'
                }}
                onClick={() => handleMarkerClick(station)}
              >
                <div 
                  className={`relative h-8 w-8 rounded-full flex items-center justify-center ${
                    station.availability.available > 0 
                      ? "bg-cyber-light border-2 border-neon-green text-neon-green glow-green" 
                      : "bg-cyber-light border-2 border-red-500 text-red-500"
                  } font-mono shadow-lg`}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse opacity-50"></div>
                  {station.availability.available}
                  
                  {/* Concentric rings animation for available stations */}
                  {station.availability.available > 0 && (
                    <div className="absolute -inset-4 border border-neon-green/30 rounded-full animate-ping"></div>
                  )}
                </div>
                
                {selectedStation?.id === id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neon-green rotate-45" />
                )}
                
                {/* Station data tooltip */}
                {selectedStation?.id === id && (
                  <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 glass p-2 w-48 text-xs font-mono animate-fade-in rounded">
                    <div className="text-neon-green">{station.name}</div>
                    <div className="text-white/70 truncate">{station.address}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-neon-blue">${station.price}/{station.priceUnit}</span>
                      <span className="text-white/70">{station.availability.available}/{station.availability.total}</span>
                    </div>
                  </div>
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
                <div className="h-8 w-8 bg-neon-purple border-2 border-white/80 rounded-full flex items-center justify-center animate-pulse-slow shadow-neon-purple">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-neon-purple font-mono">
                  YOU
                </div>
                
                {/* Pulse animation */}
                <div className="absolute -inset-2 border border-neon-purple/30 rounded-full animate-ping"></div>
              </div>
            )}
            
            {/* Simulated scan line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="h-px w-full bg-neon-blue/30 animate-scanline"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Controls - Cyberpunk styled */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="h-10 w-10 neo rounded-full flex items-center justify-center text-neon-blue border border-neon-blue/30 hover:shadow-neon-blue transition-all">
          <span className="text-xl">+</span>
        </button>
        <button className="h-10 w-10 neo rounded-full flex items-center justify-center text-neon-blue border border-neon-blue/30 hover:shadow-neon-blue transition-all">
          <span className="text-xl">-</span>
        </button>
      </div>
      
      {/* HUD elements */}
      <div className="absolute top-4 right-4 glass px-3 py-2 text-xs font-mono text-neon-blue">
        <div className="flex items-center"><span className="mr-1">⟁</span> GRID ACTIVE</div>
      </div>
      
      <div className="absolute bottom-4 left-4 glass px-3 py-2 text-xs font-mono text-neon-green">
        <div>{stations.length} CHARGING NODES DETECTED</div>
      </div>
    </div>
  );
}

// Helper function to generate consistent positions from strings
function hashStringToNumber(str: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // Normalize between min and max
  return min + Math.abs(hash) % (max - min);
}
