
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";

interface PageHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  showUserProfile: boolean;
  setShowUserProfile: (show: boolean) => void;
}

export const PageHeader = ({
  showFilters,
  setShowFilters,
  showUserProfile,
  setShowUserProfile
}: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="animate-float">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-electric-600 to-blue-600 bg-clip-text text-transparent">
          Find EV Charging Stations
        </h1>
        <p className="text-muted-foreground">Discover and book available charging slots near you</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="neuromorphic"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button
          onClick={() => setShowUserProfile(!showUserProfile)}
          className="gradient-button"
        >
          {showUserProfile ? 'View Map' : 'My Profile'}
        </Button>
      </div>
    </div>
  );
};
