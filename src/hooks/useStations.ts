
import { useState, useEffect } from "react";
import { Station, Filter, Location } from "../types";
import { mockStations } from "../data/mockData";

interface UseStationsProps {
  initialFilter?: Filter;
  userLocation?: Location;
}

export const useStations = ({ initialFilter, userLocation }: UseStationsProps = {}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter | undefined>(initialFilter);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, use mock data and simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Apply filters if any
        let filteredStations = [...mockStations];
        
        if (filter) {
          if (filter.plugTypes && filter.plugTypes.length > 0) {
            filteredStations = filteredStations.filter(station =>
              station.plugTypes.some(type => filter.plugTypes?.includes(type))
            );
          }
          
          if (filter.chargingSpeed && filter.chargingSpeed.length > 0) {
            filteredStations = filteredStations.filter(station =>
              station.chargingSpeed.some(speed => filter.chargingSpeed?.includes(speed))
            );
          }
          
          if (filter.availability) {
            filteredStations = filteredStations.filter(
              station => station.availability.available > 0
            );
          }
          
          if (filter.maxPrice !== undefined) {
            filteredStations = filteredStations.filter(
              station => station.price <= filter.maxPrice!
            );
          }
          
          if (filter.rating !== undefined) {
            filteredStations = filteredStations.filter(
              station => station.rating >= filter.rating!
            );
          }
        }
        
        setStations(filteredStations);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stations");
        setLoading(false);
      }
    };
    
    fetchStations();
  }, [filter]);
  
  return {
    stations,
    loading,
    error,
    filter,
    setFilter,
    selectedStation,
    setSelectedStation
  };
};
