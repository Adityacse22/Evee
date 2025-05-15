
import { useState, useMemo } from "react";
import { Station } from "@/types";
import { StationCard } from "@/components/StationCard";
import { Calendar, Zap, ArrowLeft, ArrowRight } from "lucide-react";

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
    <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 scrollbar-cyberpunk">
      <div className="glass p-3 flex items-center justify-between border border-neon-blue/30">
        <div className="font-mono text-neon-blue">
          <span className="text-white/70">NODES:</span> {stations.length}
        </div>
        <div className="flex items-center text-sm text-neon-purple font-mono">
          <Calendar className="h-4 w-4 mr-1" /> TODAY
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-60 glass border border-neon-blue/30">
          <div className="animate-pulse-slow flex flex-col items-center">
            <Zap className="h-10 w-10 text-neon-blue" />
            <p className="font-mono text-neon-blue mt-2">SCANNING NETWORK...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-60 glass border border-red-500/50">
          <p className="font-mono text-red-500">CONNECTION ERROR: {error}</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="flex items-center justify-center h-60 glass border border-neon-yellow/30">
          <p className="font-mono text-neon-yellow">NO STATIONS MATCH PARAMETERS</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedStations.map(station => (
              <div key={station.id} className="transition-all duration-300">
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
              <button
                onClick={() => setCurrentPage(curr => Math.max(1, curr - 1))}
                disabled={currentPage === 1}
                className={`h-8 w-8 rounded-full flex items-center justify-center font-mono ${
                  currentPage === 1 
                    ? "bg-cyber-light/20 text-white/30" 
                    : "cyber-button border-neon-blue text-neon-blue"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <span className="text-sm font-mono text-white/70">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(curr => Math.min(totalPages, curr + 1))}
                disabled={currentPage === totalPages}
                className={`h-8 w-8 rounded-full flex items-center justify-center font-mono ${
                  currentPage === totalPages 
                    ? "bg-cyber-light/20 text-white/30" 
                    : "cyber-button border-neon-blue text-neon-blue"
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
