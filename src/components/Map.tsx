
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Station, Location } from "../types";
import { MapPin, Zap, Compass, Layers, PlusCircle, MinusCircle, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MapProps {
  stations: Station[];
  userLocation?: Location;
  onStationSelect: (station: Station) => void;
  selectedStation?: Station | null;
}

export function Map({ stations, userLocation, onStationSelect, selectedStation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [isRotating, setIsRotating] = useState(false);
  
  // Memoize station positions for better performance
  const stationPositions = useMemo(() => {
    return stations.map(station => ({
      id: station.id,
      station,
      // Generate fixed positions to avoid re-renders moving stations around
      position: {
        x: hashStringToNumber(station.id, 10, 90),
        y: hashStringToNumber(station.name, 10, 90),
        z: hashStringToNumber(station.id + station.name, -10, 10),
      }
    }));
  }, [stations]);
  
  useEffect(() => {
    // In a real app, this would initialize a 3D mapping API
    if (!mapInitialized && mapRef.current) {
      console.log("Map would initialize with 3D mapping API");
      setMapInitialized(true);
      
      // Simulate a loading animation
      const timer = setTimeout(() => {
        const mapElement = mapRef.current;
        if (mapElement) {
          mapElement.classList.add('map-initialized');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [mapInitialized]);
  
  const handleMarkerClick = useCallback((station: Station) => {
    // Add click effect
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Trigger haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    onStationSelect(station);
  }, [onStationSelect]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(10, newZoom));
    });
    
    // Trigger haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }, []);

  const toggleRotation = useCallback(() => {
    setIsRotating(prev => !prev);
  }, []);

  const toggle3DMode = useCallback(() => {
    setIs3DMode(prev => !prev);
  }, []);
  
  return (
    <div className="relative w-full h-full overflow-hidden bg-cyber-darker rounded-lg border border-neon-blue/30 shadow-lg">
      {/* Animated grid overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 animate-pulse-slow"></div>
      
      {/* Perspective container for 3D effect */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          is3DMode ? 'perspective-1000 transform-style-3d' : ''
        } ${isRotating ? 'animate-slow-rotate' : ''}`}
      >
        <div 
          ref={mapRef} 
          className={`relative z-10 w-full h-full transition-all duration-700 ${
            is3DMode ? 'transform rotateX(20deg)' : ''
          }`}
        >
          {/* Cyberpunk Map UI */}
          <div className="absolute inset-0 p-4 flex flex-col">
            <div className="mb-4 text-left">
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-neon-blue font-mono flex items-center"
              >
                <Compass className="h-4 w-4 mr-2 animate-pulse-slow" />
                HOLOGRAPHIC MAP <span className="animate-pulse ml-2">⟁</span>
                <span className="ml-auto text-xs text-neon-green">ZOOM: {zoomLevel}</span>
              </motion.p>
            </div>
            
            <div className="flex-1 relative">
              {/* Animated radial gradient for depth */}
              <div className="absolute inset-0 bg-cyber-radial opacity-40 animate-pulse-slow"></div>
              
              {/* Map grid lines */}
              <div className="absolute inset-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={`grid-x-${i}`} 
                    className="absolute h-px bg-neon-blue/20 w-full transform transition-all duration-500"
                    style={{ 
                      top: `${i * 10}%`, 
                      opacity: i % 2 === 0 ? 0.3 : 0.1,
                      transform: is3DMode ? `translateZ(${i * 2}px)` : 'none'
                    }}
                  ></div>
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={`grid-y-${i}`} 
                    className="absolute w-px bg-neon-blue/20 h-full transform transition-all duration-500"
                    style={{ 
                      left: `${i * 10}%`, 
                      opacity: i % 2 === 0 ? 0.3 : 0.1,
                      transform: is3DMode ? `translateZ(${i * 2}px)` : 'none'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Map Markers for Stations */}
              <AnimatePresence>
                {stationPositions.map(({ id, station, position }) => (
                  <motion.div 
                    key={id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: selectedStation?.id === id ? 1.25 : 1,
                      z: is3DMode ? position.z * zoomLevel : 0
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute cursor-pointer"
                    style={{ 
                      left: `${position.x}%`, 
                      top: `${position.y}%`,
                      zIndex: selectedStation?.id === id ? 10 : 0,
                      transform: is3DMode ? `translateZ(${position.z * 2}px)` : 'none'
                    }}
                    onClick={() => handleMarkerClick(station)}
                    whileHover={{ scale: selectedStation?.id === id ? 1.3 : 1.15, zIndex: 20 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className={`relative h-10 w-10 rounded-full flex items-center justify-center ${
                        station.availability.available > 0 
                          ? "bg-cyber-accent/80 backdrop-blur-sm border-2 border-neon-green text-neon-green shadow-neon-green" 
                          : "bg-cyber-accent/80 backdrop-blur-sm border-2 border-red-500 text-red-500"
                      } font-mono shadow-lg transition-all duration-300`}
                    >
                      <div className="absolute inset-0 rounded-full animate-pulse opacity-50"></div>
                      <span className="text-lg">{station.availability.available}</span>
                      
                      {/* Concentric rings animation for available stations */}
                      {station.availability.available > 0 && (
                        <>
                          <div className="absolute -inset-4 border border-neon-green/30 rounded-full animate-ping"></div>
                          <div className="absolute -inset-8 border border-neon-green/10 rounded-full animate-ping animation-delay-500"></div>
                        </>
                      )}
                    </div>
                    
                    {selectedStation?.id === id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-neon-green rotate-45 shadow-neon-green" 
                      />
                    )}
                    
                    {/* Station data tooltip */}
                    <AnimatePresence>
                      {selectedStation?.id === id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 glass-morphism p-3 w-64 font-mono rounded z-30"
                        >
                          <div className="text-neon-green text-lg font-bold">{station.name}</div>
                          <div className="text-white/70 truncate text-sm">{station.address}</div>
                          <div className="flex justify-between mt-2 items-center">
                            <span className="text-neon-blue text-lg">${station.price}/{station.priceUnit}</span>
                            <div className="data-chip">
                              <span>{station.availability.available}/{station.availability.total}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* User Location Marker */}
              {userLocation && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute z-20"
                  style={{ 
                    left: "50%", 
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <div className="h-12 w-12 bg-neon-purple/80 backdrop-blur-sm border-2 border-white/80 rounded-full flex items-center justify-center animate-pulse-slow shadow-neon-purple">
                    <div className="h-3 w-3 bg-white rounded-full"></div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-neon-purple font-mono"
                  >
                    YOU
                  </motion.div>
                  
                  {/* Pulse animation */}
                  <div className="absolute -inset-4 border border-neon-purple/30 rounded-full animate-ping"></div>
                  <div className="absolute -inset-8 border border-neon-purple/20 rounded-full animate-ping animation-delay-300"></div>
                </motion.div>
              )}
              
              {/* Simulated scan line effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="h-px w-full bg-neon-blue/30 animate-scanline"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Controls - Cyberpunk styled */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-30">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleZoom('in')}
          className="h-12 w-12 neo-control rounded-full flex items-center justify-center text-neon-blue border border-neon-blue/30 hover:shadow-neon-blue transition-all"
        >
          <PlusCircle className="h-6 w-6" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleZoom('out')}
          className="h-12 w-12 neo-control rounded-full flex items-center justify-center text-neon-blue border border-neon-blue/30 hover:shadow-neon-blue transition-all"
        >
          <MinusCircle className="h-6 w-6" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle3DMode}
          className={`h-12 w-12 neo-control rounded-full flex items-center justify-center ${
            is3DMode ? 'text-neon-green border-neon-green/30 hover:shadow-neon-green' : 'text-neon-blue border-neon-blue/30 hover:shadow-neon-blue'
          } transition-all`}
        >
          <Layers className="h-6 w-6" />
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRotation}
          className={`h-12 w-12 neo-control rounded-full flex items-center justify-center ${
            isRotating ? 'text-neon-purple border-neon-purple/30 hover:shadow-neon-purple' : 'text-neon-blue border-neon-blue/30 hover:shadow-neon-blue'
          } transition-all`}
        >
          <RotateCw className={`h-6 w-6 ${isRotating ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>
      
      {/* HUD elements */}
      <div className="absolute top-4 right-4 glass-morphism px-4 py-2 text-sm font-mono text-neon-blue z-30 rounded-md">
        <div className="flex items-center"><span className="mr-2 animate-pulse">⟁</span> GRID ACTIVE</div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 glass-morphism px-4 py-2 text-sm font-mono text-neon-green z-30 rounded-md"
      >
        <div>{stations.length} CHARGING NODES DETECTED</div>
      </motion.div>
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
