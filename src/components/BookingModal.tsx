
import { useState } from "react";
import { Station, TimeSlot } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Zap, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ station, isOpen, onClose }: BookingModalProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("10:00");
  const [duration, setDuration] = useState<number>(60); // minutes
  
  // Mock time slots - in a real app this would come from the backend
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  
  // Mock durations
  const durations = [30, 60, 90, 120];
  
  const handleBooking = () => {
    // This would send the booking request to the backend
    console.log("Booking", {
      stationId: station?.id,
      date: date,
      startTime,
      duration
    });
    
    // Show a success toast
    toast({
      title: "BOOKING CONFIRMED",
      description: `Your charging slot at ${station?.name} has been reserved.`,
      className: "bg-cyber-dark border border-neon-green text-neon-green font-mono",
    });
    
    onClose();
  };
  
  if (!station) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-cyber-dark border border-neon-blue/50 text-white font-cyberpunk backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-neon-blue neon-text-blue text-xl">BOOK CHARGING SLOT</DialogTitle>
          <DialogDescription className="text-white/70 font-mono">
            Reserve your charging connection at {station.name}
          </DialogDescription>
        </DialogHeader>
        
        {/* Accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full my-2"></div>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h3 className="font-mono text-neon-blue flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-neon-purple" />
              SELECT_DATE
            </h3>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full flex items-center justify-between p-3 bg-cyber-light/20 border border-neon-blue/30 rounded font-mono text-white/70 hover:bg-cyber-light/30 hover:border-neon-blue/50 transition-all"
                >
                  {date ? format(date, "PPP") : "CHOOSE_DATE"}
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-cyber-dark border border-neon-blue/50">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="font-cyberpunk bg-cyber-dark text-white"
                  disabled={(date) => date < new Date()}
                  classNames={{
                    day_today: "bg-cyber-accent text-neon-blue",
                    day_selected: "bg-neon-blue !text-cyber-dark",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-mono text-neon-blue flex items-center">
              <Clock className="h-4 w-4 mr-2 text-neon-purple" />
              SELECT_TIME
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-2 font-mono text-sm rounded transition-all ${
                    startTime === time 
                      ? "bg-cyber-accent border border-neon-purple text-neon-purple" 
                      : "bg-cyber-light/20 border border-white/20 text-white/70 hover:border-neon-purple/50 hover:text-neon-purple/50"
                  }`}
                  onClick={() => setStartTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-mono text-neon-blue flex items-center">
              <Zap className="h-4 w-4 mr-2 text-neon-purple" />
              SELECT_DURATION
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {durations.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  className={`p-2 font-mono text-sm rounded transition-all ${
                    duration === mins 
                      ? "bg-cyber-accent border border-neon-green text-neon-green" 
                      : "bg-cyber-light/20 border border-white/20 text-white/70 hover:border-neon-green/50 hover:text-neon-green/50"
                  }`}
                  onClick={() => setDuration(mins)}
                >
                  {mins} MIN
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-mono text-neon-blue flex items-center">
              <Info className="h-4 w-4 mr-2 text-neon-purple" />
              PRICE_SUMMARY
            </h3>
            <div className="neo bg-cyber-light/20 rounded-lg p-4 font-mono">
              <div className="flex justify-between">
                <span className="text-white/70">CHARGING ({duration} MIN)</span>
                <span className="text-neon-green">${(station.price * duration / 60).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white/70">SERVICE_FEE</span>
                <span className="text-neon-green">$1.50</span>
              </div>
              <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold">
                <span className="text-white">TOTAL</span>
                <span className="text-neon-green">${((station.price * duration / 60) + 1.5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 cyber-button border-white/30 text-white/70 hover:text-white"
          >
            CANCEL
          </button>
          <button 
            onClick={handleBooking}
            className="flex-1 cyber-button border-neon-green text-neon-green hover:shadow-neon-green"
          >
            CONFIRM_BOOKING
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
