
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockBookings } from "@/data/mockData";
import { BookingStatus } from "@/types";
import { Clock, CreditCard, Calendar } from "lucide-react";

interface UserProfileProps {
  showBookings?: boolean;
}

export function UserProfile({ showBookings = true }: UserProfileProps) {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  const getStatusStyle = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return "text-neon-green border-neon-green";
      case BookingStatus.PENDING:
        return "text-neon-yellow border-neon-yellow";
      case BookingStatus.COMPLETED:
        return "text-neon-blue border-neon-blue";
      case BookingStatus.CANCELLED:
        return "text-red-500 border-red-500";
      default:
        return "text-white/70 border-white/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* User profile card */}
      <div className="glass border border-neon-blue/30 backdrop-blur-md overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center gap-6 relative">
          {/* Decorative hexagon background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-blue/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl"></div>
          </div>
          
          {/* Avatar with glow effect */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-70 blur"></div>
              <Avatar className="h-24 w-24 border-2 border-white/10 relative">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback className="bg-cyber-dark text-neon-blue text-xl font-cyberpunk">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="mt-4 text-center md:text-left">
              <h2 className="text-xl font-bold font-cyberpunk text-neon-blue neon-text-blue">{user.name}</h2>
              <p className="text-sm text-white/70 font-mono">{user.email}</p>
            </div>
          </div>
          
          {/* User details */}
          <div className="flex-1 space-y-4">
            {user.vehicle && (
              <div>
                <h3 className="text-sm font-mono text-white/70 mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-neon-green rounded-full mr-2"></span>
                  VEHICLE_PROFILE
                </h3>
                <div className="neo bg-cyber-dark/60 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-cyberpunk text-white">{user.vehicle.make} {user.vehicle.model}</p>
                      <p className="text-sm text-white/70 font-mono">{user.vehicle.year}</p>
                    </div>
                    <div className="px-3 py-1 border border-neon-purple text-neon-purple rounded text-xs font-mono">
                      {user.vehicle.plugType}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {user.paymentMethods && user.paymentMethods.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-white/70 mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-neon-blue rounded-full mr-2"></span>
                  PAYMENT_METHODS
                </h3>
                <div className="space-y-2">
                  {user.paymentMethods.map(method => (
                    <div key={method.id} className="neo bg-cyber-dark/60 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-neon-blue mr-2" />
                          <p className="font-mono text-white capitalize">{method.type}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {method.last4 && (
                            <p className="text-sm font-mono text-white/70">•••• {method.last4}</p>
                          )}
                          {method.expiryDate && (
                            <p className="text-xs font-mono text-white/70 px-2 py-1 bg-cyber-light/20 rounded">
                              {method.expiryDate}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bookings section */}
      {showBookings && (
        <div className="glass border border-neon-blue/30 backdrop-blur-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold font-cyberpunk text-neon-purple neon-text-purple mb-4">
              BOOKING_HISTORY
            </h2>
            
            <div className="space-y-4">
              {mockBookings.map(booking => {
                const startDate = new Date(booking.startTime);
                const endDate = new Date(booking.endTime);
                
                return (
                  <div key={booking.id} className="bg-cyber-dark/60 border border-neon-blue/20 rounded-lg p-4 neo">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-mono border ${getStatusStyle(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="flex items-center text-white/70 text-xs font-mono">
                            <Calendar className="h-3 w-3 mr-1 text-neon-purple" />
                            {startDate.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="font-mono text-neon-blue">
                          STATION_ID: <span className="text-white">{booking.stationId}</span>
                        </p>
                        
                        <div className="flex items-center mt-1 text-xs font-mono text-white/70">
                          <Clock className="h-3 w-3 mr-1" />
                          {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center font-cyberpunk">
                          <span className="text-white/70 text-sm mr-1">TOTAL:</span>
                          <span className="text-xl font-bold text-neon-green">${booking.totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="mt-2 text-xs font-mono text-neon-blue hover:text-neon-purple transition-colors">
                          VIEW_DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
