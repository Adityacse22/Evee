
import { useState } from "react";
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
  
  // Update filters in the hook when local state changes
  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
    setFilter(newFilters);
  };

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
            <PageHeader 
              showFilters={showFilters} 
              setShowFilters={setShowFilters}
              showUserProfile={showUserProfile}
              setShowUserProfile={setShowUserProfile}
            />

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
