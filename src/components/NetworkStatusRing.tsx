
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
        <div className="progress-ring-container w-40 h-40 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-slate-200 dark:text-slate-700" 
              strokeWidth="5" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="text-teal-500" 
              strokeWidth="5" 
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * chargeProgress) / 100}
              strokeLinecap="round" 
              stroke="url(#gradient)" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{chargeProgress}%</div>
              <div className="text-xs text-muted-foreground">Network Load</div>
            </div>
          </div>
          <div className="orbital" style={{ animationDelay: '0s', backgroundColor: '#14b8a6' }}></div>
          <div className="orbital" style={{ animationDelay: '2s', backgroundColor: '#0891b2' }}></div>
          <div className="orbital" style={{ animationDelay: '4s', backgroundColor: '#06b6d4' }}></div>
        </div>
      </div>
    </div>
  );
};
