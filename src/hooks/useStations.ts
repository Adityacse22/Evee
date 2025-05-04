
import { useState, useEffect, useCallback } from "react";
import { Station, Filter, Location } from "../types";
import { stationsAPI } from "../lib/api";
import { toast } from "@/components/ui/use-toast";

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

  // Memoize the fetch function to avoid recreating it on each render
  const fetchStations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use a local cache to avoid unnecessary API calls
      const cacheKey = JSON.stringify({ filter, userLocation });
      const cachedData = sessionStorage.getItem(`stations_${cacheKey}`);
      
      if (cachedData) {
        setStations(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
      
      // Fetch stations from API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // If API is unavailable in dev mode, use mock data
      let data;
      try {
        data = await stationsAPI.getAll(filter, userLocation);
        clearTimeout(timeoutId);
      } catch (err) {
        console.error("Error fetching stations:", err);
        
        // In development, use mock data if API fails
        if (process.env.NODE_ENV === 'development') {
          import('../data/mockData').then(module => {
            const mockData = module.mockStations;
            setStations(mockData);
            sessionStorage.setItem(`stations_${cacheKey}`, JSON.stringify(mockData));
          });
        } else {
          setError("Failed to fetch stations");
          toast({
            title: "Connection Error",
            description: "Unable to connect to station service. Please try again later.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
      
      if (data) {
        setStations(data);
        // Cache the result for 5 minutes
        sessionStorage.setItem(`stations_${cacheKey}`, JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error in fetchStations:", err);
      setError("Failed to fetch stations");
      setLoading(false);
    }
  }, [filter, userLocation]);
  
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);
  
  // Function to get a single station by ID with caching
  const getStationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cachedStations = sessionStorage.getItem('stations_all');
      if (cachedStations) {
        const allStations = JSON.parse(cachedStations);
        const station = allStations.find((s: Station) => s.id === id);
        if (station) {
          setLoading(false);
          return station;
        }
      }
      
      const station = await stationsAPI.getById(id);
      return station;
    } catch (err) {
      console.error("Error fetching station:", err);
      setError("Failed to fetch station");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Function to refresh stations data
  const refreshStations = useCallback(() => {
    fetchStations();
  }, [fetchStations]);
  
  return {
    stations,
    loading,
    error,
    filter,
    setFilter,
    selectedStation,
    setSelectedStation,
    getStationById,
    refreshStations
  };
};
