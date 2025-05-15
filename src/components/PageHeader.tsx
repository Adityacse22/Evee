
import { Button } from "./ui/button";
import { Filter, User, MapPin } from "lucide-react";

interface PageHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  showUserProfile: boolean;
  setShowUserProfile: (show: boolean) => void;
}

export function PageHeader({
  showFilters,
  setShowFilters,
  showUserProfile,
  setShowUserProfile
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold font-cyberpunk text-neon-blue neon-text-blue">
          EV_CHARGING<span className="text-neon-green neon-text-green">NETWORK</span>
        </h1>
        <p className="text-white/70 font-mono mt-1">
          DISCOVER AND RESERVE CHARGING STATIONS IN REAL-TIME
        </p>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => {
            setShowFilters(!showFilters);
            if (showUserProfile) setShowUserProfile(false);
          }}
          className={`cyber-button ${
            showFilters 
              ? 'bg-cyber-accent border-neon-blue text-white' 
              : 'border-neon-blue text-neon-blue'
          }`}
        >
          <Filter className="h-4 w-4 mr-2" />
          FILTER
        </button>
        
        <button
          onClick={() => {
            setShowUserProfile(!showUserProfile);
            if (showFilters) setShowFilters(false);
          }}
          className={`cyber-button ${
            showUserProfile 
              ? 'bg-cyber-accent border-neon-purple text-white' 
              : 'border-neon-purple text-neon-purple'
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          PROFILE
        </button>
        
        <button
          className={`cyber-button border-neon-green text-neon-green`}
        >
          <MapPin className="h-4 w-4 mr-2" />
          LOCATE
        </button>
      </div>
    </div>
  );
}
