
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
        <h1 className="text-3xl font-bold text-primary">
          EV Charging Network
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover and reserve charging stations in real-time
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => {
            setShowFilters(!showFilters);
            if (showUserProfile) setShowUserProfile(false);
          }}
          size="sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <Button
          variant={showUserProfile ? "default" : "outline"}
          onClick={() => {
            setShowUserProfile(!showUserProfile);
            if (showFilters) setShowFilters(false);
          }}
          size="sm"
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
        
        <Button
          variant="outline"
          size="sm"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Locate
        </Button>
      </div>
    </div>
  );
}
