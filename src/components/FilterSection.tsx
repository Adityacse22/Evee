
import { useState } from "react";
import { Filter as FilterIcon, Plug, Zap } from "lucide-react";
import { PlugType, ChargingSpeed, Filter } from "@/types";

interface FilterSectionProps {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}

export const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const toggleFilter = (filterName: string, value: any) => {
    const newFilters = { ...filters };
    
    if (filterName === 'plugTypes') {
      const plugTypes = [...(filters.plugTypes || [])];
      const index = plugTypes.indexOf(value);
      
      if (index >= 0) {
        plugTypes.splice(index, 1);
      } else {
        plugTypes.push(value);
      }
      
      newFilters.plugTypes = plugTypes;
    } 
    else if (filterName === 'chargingSpeed') {
      const speeds = [...(filters.chargingSpeed || [])];
      const index = speeds.indexOf(value);
      
      if (index >= 0) {
        speeds.splice(index, 1);
      } else {
        speeds.push(value);
      }
      
      newFilters.chargingSpeed = speeds;
    } 
    else if (filterName === 'availability') {
      newFilters.availability = !filters.availability;
    }
    
    setFilters(newFilters);
  };

  return (
    <div className="mb-6 p-4 glass border border-neon-blue/30 animate-fade-in">
      <h2 className="font-mono text-neon-blue mb-4 flex items-center">
        <FilterIcon className="h-4 w-4 mr-2 text-neon-purple" />
        FILTER_PARAMETERS
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-mono text-white/70 mb-3">CONNECTOR_TYPES</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(PlugType).map(type => (
              <button 
                key={type}
                className={`transition-all duration-300 px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 ${
                  filters.plugTypes?.includes(type)
                    ? 'bg-cyber-accent border border-neon-blue text-neon-blue shadow-neon-blue'
                    : 'bg-cyber-dark/60 border border-white/20 text-white/60 hover:border-neon-blue/50 hover:text-neon-blue/50'
                }`}
                onClick={() => toggleFilter('plugTypes', type)}
              >
                <Plug className="w-3.5 h-3.5" />
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-mono text-white/70 mb-3">CHARGING_SPEED</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(ChargingSpeed).map(speed => (
              <button 
                key={speed}
                className={`transition-all duration-300 px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 ${
                  filters.chargingSpeed?.includes(speed)
                    ? 'bg-cyber-accent border border-neon-purple text-neon-purple shadow-neon-purple'
                    : 'bg-cyber-dark/60 border border-white/20 text-white/60 hover:border-neon-purple/50 hover:text-neon-purple/50'
                }`}
                onClick={() => toggleFilter('chargingSpeed', speed)}
              >
                <Zap className="w-3.5 h-3.5" />
                {speed}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-mono text-white/70 mb-3">STATUS_FILTERS</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`transition-all duration-300 px-3 py-1.5 rounded font-mono text-xs ${
                filters.availability
                  ? 'bg-cyber-accent border border-neon-green text-neon-green shadow-neon-green'
                  : 'bg-cyber-dark/60 border border-white/20 text-white/60 hover:border-neon-green/50 hover:text-neon-green/50'
              }`}
              onClick={() => toggleFilter('availability', null)}
            >
              AVAILABLE_NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
