
import { useState, useMemo } from "react";
import { Station } from "@/types";
import { StationCard } from "@/components/StationCard";
import { Calendar, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StationListProps {
  stations: Station[];
  loading: boolean;
  error: string | null;
  onBookStation: (station: Station) => void;
}

export const StationList = ({ stations, loading, error, onBookStation }: StationListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const stationsPerPage = 5;
  
  // Memoize paginated stations to avoid recalculation on every render
  const paginatedStations = useMemo(() => {
    const startIdx = (currentPage - 1) * stationsPerPage;
    const endIdx = startIdx + stationsPerPage;
    return stations.slice(startIdx, endIdx);
  }, [stations, currentPage]);
  
  const totalPages = Math.ceil(stations.length / stationsPerPage);

  return (
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
            <Zap className="h-10 w-10 text-teal-500" />
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
        <>
          <div className="space-y-4">
            {paginatedStations.map(station => (
              <div key={station.id} className="transition-all duration-300 hover:shadow-md">
                <StationCard 
                  station={station} 
                  onBookClick={onBookStation} 
                />
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(curr => Math.max(1, curr - 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(curr => Math.min(totalPages, curr + 1))}
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
