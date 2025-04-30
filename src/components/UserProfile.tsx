
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBookings } from "@/data/mockData";
import { BookingStatus } from "@/types";

interface UserProfileProps {
  showBookings?: boolean;
}

export function UserProfile({ showBookings = true }: UserProfileProps) {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case BookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case BookingStatus.COMPLETED:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case BookingStatus.CANCELLED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        
        <CardContent>
          {user.vehicle && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Vehicle</h3>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.vehicle.make} {user.vehicle.model}</p>
                    <p className="text-sm text-muted-foreground">{user.vehicle.year}</p>
                  </div>
                  <Badge variant="outline">{user.vehicle.plugType}</Badge>
                </div>
              </div>
            </div>
          )}
          
          {user.paymentMethods && user.paymentMethods.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Methods</h3>
              {user.paymentMethods.map(method => (
                <div key={method.id} className="rounded-lg border p-3 mb-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium capitalize">{method.type}</p>
                    {method.last4 && (
                      <p className="text-sm">•••• {method.last4}</p>
                    )}
                    {method.expiryDate && (
                      <p className="text-sm text-muted-foreground">Exp: {method.expiryDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showBookings && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.map(booking => {
                const startDate = new Date(booking.startTime);
                const endDate = new Date(booking.endTime);
                
                return (
                  <div key={booking.id} className="rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm">{startDate.toLocaleDateString()}</p>
                        </div>
                        <p className="font-medium mt-1">Station ID: {booking.stationId}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold">${booking.totalPrice.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
