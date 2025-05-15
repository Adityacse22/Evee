
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Zap } from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-primary mr-2" />
            <div className="text-2xl font-bold">
              <span className="text-primary">Spark</span>
              <span className="text-primary/70">Slot</span>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Find Stations
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            My Bookings
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Help
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full relative h-10 w-10 p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Bookings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => setShowLoginModal(true)}
              variant="default"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
