
import { PlugType, ChargingSpeed, Filter } from "@/types";
import { Filter as FilterIcon, Plug, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filter Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm text-muted-foreground mb-3">Connector Types</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(PlugType).map(type => (
              <Button 
                key={type}
                variant={filters.plugTypes?.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('plugTypes', type)}
                className="text-xs flex items-center gap-1.5 h-8"
              >
                <Plug className="w-3.5 h-3.5" />
                {type}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-muted-foreground mb-3">Charging Speed</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(ChargingSpeed).map(speed => (
              <Button 
                key={speed}
                variant={filters.chargingSpeed?.includes(speed) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('chargingSpeed', speed)}
                className="text-xs flex items-center gap-1.5 h-8"
              >
                <Zap className="w-3.5 h-3.5" />
                {speed}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-muted-foreground mb-3">Status Filters</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filters.availability ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter('availability', null)}
              className="text-xs h-8"
            >
              Available Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
