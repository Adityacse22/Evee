
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Map } from "@/components/Map";
import { StationCard } from "@/components/StationCard";
import { BookingModal } from "@/components/BookingModal";
import { UserProfile } from "@/components/UserProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlugType, ChargingSpeed, Station, Filter } from "@/types";
import { useStations } from "@/hooks/useStations";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Calendar, Clock, Filter as FilterIcon, ChevronRight, ChevronLeft } from "lucide-react";

export default function Index() {
  const [showFilters, setShowFilters] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
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
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Find EV Charging Stations</h1>
                <p className="text-muted-foreground">Discover and book available charging slots near you</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowUserProfile(!showUserProfile)}
                >
                  {showUserProfile ? 'View Map' : 'My Profile'}
                </Button>
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="mb-6 p-4 border rounded-lg animate-fade-in">
                <h2 className="font-medium mb-3">Filter Stations</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm mb-2">Plug Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(PlugType).map(type => (
                        <Badge 
                          key={type}
                          variant={filters.plugTypes?.includes(type) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter('plugTypes', type)}
                        >
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
                          className="cursor-pointer"
                          onClick={() => toggleFilter('chargingSpeed', speed)}
                        >
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
                        className="cursor-pointer"
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
                <div className="lg:col-span-2 h-[70vh]">
                  <Map 
                    stations={stations} 
                    userLocation={userLocation}
                    onStationSelect={handleStationSelect}
                    selectedStation={selectedStation}
                  />
                </div>
                
                <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="font-medium">
                      {stations.length} Stations Found
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Today
                    </div>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center h-40">
                      <p>Loading stations...</p>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-40">
                      <p className="text-destructive">{error}</p>
                    </div>
                  ) : stations.length === 0 ? (
                    <div className="flex items-center justify-center h-40">
                      <p>No stations match your filters.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stations.map(station => (
                        <StationCard 
                          key={station.id} 
                          station={station} 
                          onBookClick={handleBooking} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
