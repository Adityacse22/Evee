
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Map } from "@/components/Map";
import { StationCard } from "@/components/StationCard";
import { BookingModal } from "@/components/BookingModal";
import { UserProfile } from "@/components/UserProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlugType, ChargingSpeed, Station, Filter } from "@/types";
import { useStations } from "@/hooks/useStations";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Calendar, Clock, Filter as FilterIcon, ChevronRight, ChevronLeft, Zap, Plug } from "lucide-react";

export default function Index() {
  const [showFilters, setShowFilters] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(45);
  const [filters, setFilters] = useState<Filter>({
    availability: true,
    plugTypes: [],
    chargingSpeed: [],
  });
  
  // Default user location - would come from geolocation API in a real app
  const userLocation = { lat: 40.7128, lng: -74.006 };
  
  // Get stations using our hook
  const { 
    stations, 
    loading, 
    error,
    setFilter
  } = useStations({ initialFilter: filters, userLocation });

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setShowUserProfile(false); // Hide profile when selecting a station
  };
  
  const handleBooking = (station: Station) => {
    setSelectedStation(station);
    setBookingModalOpen(true);
  };
  
  const toggleFilter = (filterName: string, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (filterName === 'plugTypes') {
        const plugTypes = [...(prev.plugTypes || [])];
        const index = plugTypes.indexOf(value);
        
        if (index >= 0) {
          plugTypes.splice(index, 1);
        } else {
          plugTypes.push(value);
        }
        
        newFilters.plugTypes = plugTypes;
      } 
      else if (filterName === 'chargingSpeed') {
        const speeds = [...(prev.chargingSpeed || [])];
        const index = speeds.indexOf(value);
        
        if (index >= 0) {
          speeds.splice(index, 1);
        } else {
          speeds.push(value);
        }
        
        newFilters.chargingSpeed = speeds;
      } 
      else if (filterName === 'availability') {
        newFilters.availability = !prev.availability;
      }
      
      // Update the stations list with new filters
      setFilter(newFilters);
      return newFilters;
    });
  };

  // Simulated charge progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setChargeProgress(prev => {
        const newValue = prev + 1;
        return newValue > 100 ? 0 : newValue;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col gradient-bg">
          <Navbar />
          
          {/* Animated header with charge stream effect */}
          <div className="bg-gradient-to-r from-blue-600/10 via-electric-500/10 to-purple-600/10 dark:from-blue-600/20 dark:via-electric-500/20 dark:to-purple-600/20 p-2">
            <div className="charge-stream"></div>
          </div>
          
          <main className="flex-1 container mx-auto px-4 py-6 relative">
            <div className="flex justify-between items-center mb-6">
              <div className="animate-float">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-electric-600 to-blue-600 bg-clip-text text-transparent">
                  Find EV Charging Stations
                </h1>
                <p className="text-muted-foreground">Discover and book available charging slots near you</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="neuromorphic"
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  onClick={() => setShowUserProfile(!showUserProfile)}
                  className="gradient-button"
                >
                  {showUserProfile ? 'View Map' : 'My Profile'}
                </Button>
              </div>
            </div>

            {/* 3D Progress Ring */}
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="flex justify-center items-center">
                <div className="progress-ring-container w-40 h-40 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-200 dark:text-gray-700" strokeWidth="5" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <circle 
                      className="text-electric-500" 
                      strokeWidth="5" 
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * chargeProgress) / 100}
                      strokeLinecap="round" 
                      stroke="url(#gradient)" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-electric-600">{chargeProgress}%</div>
                      <div className="text-xs text-muted-foreground">Network Load</div>
                    </div>
                  </div>
                  {/* Orbital nodes representing nearby stations */}
                  <div className="orbital" style={{ animationDelay: '0s' }}></div>
                  <div className="orbital" style={{ animationDelay: '2s' }}></div>
                  <div className="orbital" style={{ animationDelay: '4s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Filters Section - enhanced with glass morphism */}
            {showFilters && (
              <div className="mb-6 p-4 glass-card animate-fade-in">
                <h2 className="font-medium mb-3">Filter Stations</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm mb-2">Plug Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(PlugType).map(type => (
                        <Badge 
                          key={type}
                          variant={filters.plugTypes?.includes(type) ? "default" : "outline"}
                          className={`cursor-pointer transition-transform hover:scale-110 ${
                            filters.plugTypes?.includes(type) ? 'pulse' : ''
                          }`}
                          onClick={() => toggleFilter('plugTypes', type)}
                        >
                          <Plug className="w-3 h-3 mr-1" />
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm mb-2">Charging Speed</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(ChargingSpeed).map(speed => (
                        <Badge 
                          key={speed}
                          variant={filters.chargingSpeed?.includes(speed) ? "default" : "outline"}
                          className={`cursor-pointer transition-transform hover:scale-110 ${
                            filters.chargingSpeed?.includes(speed) ? 'pulse' : ''
                          }`}
                          onClick={() => toggleFilter('chargingSpeed', speed)}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {speed}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm mb-2">Other Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={filters.availability ? "default" : "outline"}
                        className={`cursor-pointer transition-transform hover:scale-110 ${
                          filters.availability ? 'pulse' : ''
                        }`}
                        onClick={() => toggleFilter('availability', null)}
                      >
                        Available Now
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {showUserProfile ? (
              <div className="animate-fade-in">
                <UserProfile showBookings={true} />
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[70vh] glass-card">
                  <Map 
                    stations={stations} 
                    userLocation={userLocation}
                    onStationSelect={handleStationSelect}
                    selectedStation={selectedStation}
                  />
                </div>
                
                <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                  <div className="p-3 glass-card flex items-center justify-between">
                    <div className="font-medium">
                      {stations.length} Stations Found
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Today
                    </div>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center h-40 glass-card">
                      <div className="animate-pulse-slow">
                        <Zap className="h-10 w-10 text-electric-500" />
                        <p>Searching for stations...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-40 glass-card">
                      <p className="text-destructive">{error}</p>
                    </div>
                  ) : stations.length === 0 ? (
                    <div className="flex items-center justify-center h-40 glass-card">
                      <p>No stations match your filters.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stations.map(station => (
                        <div 
                          key={station.id}
                          className="tilt-card" 
                          style={{ transformStyle: 'preserve-3d' }}
                          onMouseMove={(e) => {
                            const el = e.currentTarget;
                            const rect = el.getBoundingClientRect();
                            const x = e.clientX - rect.left; 
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = (y - centerY) / 15;
                            const rotateY = (centerX - x) / 15;
                            
                            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
                          }}
                        >
                          <StationCard 
                            station={station} 
                            onBookClick={handleBooking} 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Gradient wave footer */}
            <div className="h-16 relative mt-8">
              <div className="gradient-wave"></div>
            </div>
          </main>
          
          <BookingModal
            station={selectedStation}
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
