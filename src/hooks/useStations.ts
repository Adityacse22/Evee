import { useState, useEffect } from "react";
import { Station, Filter, Location } from "../types";
import { stationsAPI } from "../lib/api";

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
        setError(null);
        
        // Fetch stations from API
        const data = await stationsAPI.getAll(filter, userLocation);
        setStations(data);
      } catch (err) {
        console.error("Error fetching stations:", err);
        setError("Failed to fetch stations");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStations();
  }, [filter, userLocation]);
  
  // Function to get a single station by ID
  const getStationById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const station = await stationsAPI.getById(id);
      return station;
    } catch (err) {
      console.error("Error fetching station:", err);
      setError("Failed to fetch station");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    stations,
    loading,
    error,
    filter,
    setFilter,
    selectedStation,
    setSelectedStation,
    getStationById
  };
};
