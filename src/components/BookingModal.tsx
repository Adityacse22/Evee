
import { useState } from "react";
import { Station, TimeSlot } from "../types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
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
      title: "Booking Confirmed!",
      description: `Your charging slot at ${station?.name} has been reserved.`,
    });
    
    onClose();
  };
  
  if (!station) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Charging Slot</DialogTitle>
          <DialogDescription>
            Reserve your charging slot at {station.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Select Date</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Select Start Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={startTime === time ? "default" : "outline"}
                  onClick={() => setStartTime(time)}
                  className="text-center"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Select Duration (minutes)</h3>
            <div className="grid grid-cols-4 gap-2">
              {durations.map((mins) => (
                <Button
                  key={mins}
                  type="button"
                  variant={duration === mins ? "default" : "outline"}
                  onClick={() => setDuration(mins)}
                  className="text-center"
                >
                  {mins}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Price Summary</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex justify-between">
                <span>Charging ({duration} min)</span>
                <span>${(station.price * duration / 60).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Service Fee</span>
                <span>$1.50</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${((station.price * duration / 60) + 1.5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBooking}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
