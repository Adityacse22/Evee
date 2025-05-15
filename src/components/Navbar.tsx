
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
    <header className="sticky top-0 z-50 w-full border-b border-neon-blue/30 bg-cyber-dark/80 backdrop-blur-md supports-[backdrop-filter]:bg-cyber-dark/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-neon-blue mr-2" />
            <div className="text-2xl font-bold font-cyberpunk text-white">
              <span className="text-neon-blue neon-text-blue">SPARK</span>
              <span className="text-neon-purple neon-text-purple">SLOT</span>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-mono text-white/70 hover:text-neon-blue hover:drop-shadow-neon-text-blue transition-all">
            FIND_STATIONS
          </a>
          <a href="#" className="text-sm font-mono text-white/70 hover:text-neon-blue hover:drop-shadow-neon-text-blue transition-all">
            MY_BOOKINGS
          </a>
          <a href="#" className="text-sm font-mono text-white/70 hover:text-neon-blue hover:drop-shadow-neon-text-blue transition-all">
            HELP.SYS
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full relative h-10 w-10 p-0 border border-neon-purple/50 bg-cyber-light/20 hover:bg-cyber-light/40">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profileImage} alt={user?.name} className="border-2 border-neon-purple" />
                    <AvatarFallback className="bg-cyber-dark text-neon-purple border border-neon-purple">{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-cyber-dark border border-neon-blue/50 backdrop-blur-md">
                <DropdownMenuLabel className="font-mono text-neon-blue">USER_PROFILE</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neon-blue/30" />
                <DropdownMenuItem className="font-mono text-white/70 hover:bg-cyber-light hover:text-neon-blue cursor-pointer">PROFILE</DropdownMenuItem>
                <DropdownMenuItem className="font-mono text-white/70 hover:bg-cyber-light hover:text-neon-blue cursor-pointer">BOOKINGS</DropdownMenuItem>
                <DropdownMenuItem className="font-mono text-white/70 hover:bg-cyber-light hover:text-neon-blue cursor-pointer">SETTINGS</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neon-blue/30" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="font-mono text-red-400 hover:bg-cyber-light hover:text-red-500 cursor-pointer"
                >
                  LOGOUT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="cyber-button border-neon-green text-neon-green hover:shadow-neon-green"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
      
      {/* Data stream effect under the navbar */}
      <div className="h-1">
        <div className="data-stream"></div>
      </div>
    </header>
  );
}
