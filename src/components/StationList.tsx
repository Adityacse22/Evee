
import { Station } from "@/types";
import { StationCard } from "@/components/StationCard";
import { Calendar, Zap } from "lucide-react";

interface StationListProps {
  stations: Station[];
  loading: boolean;
  error: string | null;
  onBookStation: (station: Station) => void;
}

export const StationList = ({ stations, loading, error, onBookStation }: StationListProps) => {
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
                onBookClick={onBookStation} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
