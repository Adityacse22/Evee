
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Filter as FilterIcon, Plug, Zap } from "lucide-react";
import { PlugType, ChargingSpeed, Filter } from "@/types";

interface FilterSectionProps {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}

export const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const toggleFilter = (filterName: string, value: any) => {
    setFilters((prev: Filter) => {
      const newFilters = { ...prev };
      
      if (filterName === 'plugTypes') {
        const plugTypes = [...(prev.plugTypes || [])];
        const index = plugTypes.indexOf(value);
        
        if (index >= 0) {
          plugTypes.splice(index, 1);
        } else {
          plugTypes.push(value);
        }
        
        newFilters.plugTypes = plugTypes;
      } 
      else if (filterName === 'chargingSpeed') {
        const speeds = [...(prev.chargingSpeed || [])];
        const index = speeds.indexOf(value);
        
        if (index >= 0) {
          speeds.splice(index, 1);
        } else {
          speeds.push(value);
        }
        
        newFilters.chargingSpeed = speeds;
      } 
      else if (filterName === 'availability') {
        newFilters.availability = !prev.availability;
      }
      
      return newFilters;
    });
  };

  return (
    <div className="mb-6 p-4 glass-card animate-fade-in">
      <h2 className="font-medium mb-3">Filter Stations</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm mb-2">Plug Types</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(PlugType).map(type => (
              <Badge 
                key={type}
                variant={filters.plugTypes?.includes(type) ? "default" : "outline"}
                className={`cursor-pointer transition-transform hover:scale-110 ${
                  filters.plugTypes?.includes(type) ? 'pulse' : ''
                }`}
                onClick={() => toggleFilter('plugTypes', type)}
              >
                <Plug className="w-3 h-3 mr-1" />
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm mb-2">Charging Speed</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(ChargingSpeed).map(speed => (
              <Badge 
                key={speed}
                variant={filters.chargingSpeed?.includes(speed) ? "default" : "outline"}
                className={`cursor-pointer transition-transform hover:scale-110 ${
                  filters.chargingSpeed?.includes(speed) ? 'pulse' : ''
                }`}
                onClick={() => toggleFilter('chargingSpeed', speed)}
              >
                <Zap className="w-3 h-3 mr-1" />
                {speed}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm mb-2">Other Filters</h3>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={filters.availability ? "default" : "outline"}
              className={`cursor-pointer transition-transform hover:scale-110 ${
                filters.availability ? 'pulse' : ''
              }`}
              onClick={() => toggleFilter('availability', null)}
            >
              Available Now
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
