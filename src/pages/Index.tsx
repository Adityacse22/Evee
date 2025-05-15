
import { useState, useCallback, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { UserProfile } from "@/components/UserProfile";
import { BookingModal } from "@/components/BookingModal";
import { Station, Filter } from "@/types";
import { useStations } from "@/hooks/useStations";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { FilterSection } from "@/components/FilterSection";
import { NetworkStatusRing } from "@/components/NetworkStatusRing";
import { StationList } from "@/components/StationList";
import { MapSection } from "@/components/MapSection";
import { PageHeader } from "@/components/PageHeader";
import { Zap } from "lucide-react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-[70vh] w-full flex items-center justify-center bg-cyber-dark">
    <div className="animate-pulse-slow flex flex-col items-center">
      <div className="text-6xl font-cyberpunk text-neon-blue neon-text-blue animate-neon-flicker mb-4">LOADING</div>
      <Zap className="h-12 w-12 text-neon-blue animate-glow-pulse mb-4" />
      <div className="w-48 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-white/30 animate-pulse"></div>
      </div>
    </div>
  </div>
);

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
    setFilter,
    refreshStations
  } = useStations({ initialFilter: filters, userLocation });
  
  const handleStationSelect = useCallback((station: Station) => {
    setSelectedStation(station);
    setShowUserProfile(false); // Hide profile when selecting a station
  }, []);
  
  const handleBooking = useCallback((station: Station) => {
    setSelectedStation(station);
    setBookingModalOpen(true);
  }, []);
  
  // Update filters in the hook when local state changes
  const handleFilterChange = useCallback((newFilters: Filter) => {
    setFilters(newFilters);
    setFilter(newFilters);
  }, [setFilter]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col gradient-bg">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-6 relative">
            <PageHeader 
              showFilters={showFilters} 
              setShowFilters={setShowFilters}
              showUserProfile={showUserProfile}
              setShowUserProfile={setShowUserProfile}
            />

            <Suspense fallback={<LoadingFallback />}>
              <NetworkStatusRing />
              
              {/* Filters Section */}
              {showFilters && (
                <FilterSection filters={filters} setFilters={handleFilterChange} />
              )}
              
              {showUserProfile ? (
                <div className="animate-fade-in">
                  <UserProfile showBookings={true} />
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  <MapSection 
                    stations={stations}
                    userLocation={userLocation}
                    selectedStation={selectedStation}
                    onStationSelect={handleStationSelect}
                  />
                  
                  <StationList 
                    stations={stations}
                    loading={loading}
                    error={error}
                    onBookStation={handleBooking}
                  />
                </div>
              )}
            </Suspense>
            
            {/* Gradient wave footer */}
            <div className="h-16 relative mt-8">
              <div className="cyber-wave"></div>
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
