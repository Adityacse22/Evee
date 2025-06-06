
import { useEffect, useState, useRef } from "react";

export const NetworkStatusRing = () => {
  const [chargeProgress, setChargeProgress] = useState(45);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  // Use requestAnimationFrame for smoother animation
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      // Update progress every 100ms for better performance
      if (deltaTime > 100) {
        setChargeProgress(prevProgress => {
          const newValue = prevProgress + 1;
          return newValue > 100 ? 0 : newValue;
        });
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <div className="flex justify-center items-center">
        <div className="progress-ring-container w-28 h-28 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-200 dark:text-gray-700" 
              strokeWidth="5" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="text-primary" 
              strokeWidth="5" 
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * chargeProgress) / 100}
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{chargeProgress}%</div>
              <div className="text-xs text-muted-foreground">Network Load</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
