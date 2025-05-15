
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Zap, Shield, Activity, BatteryCharging } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SuperAdminPanel = lazy(() => import("./pages/SuperAdminPanel"));

// Create futuristic loading fallback component
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-cyber-darker relative overflow-hidden">
    {/* Animated background grid */}
    <div className="absolute inset-0 cyber-grid-bg opacity-20"></div>
    
    {/* Animated background scan lines */}
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={`scan-${i}`} 
          className="scanline"
          style={{ 
            top: `${i * 5}%`, 
            animationDelay: `${i * 0.15}s`,
            opacity: 0.1 + (i % 2) * 0.05
          }}
        ></div>
      ))}
    </div>
    
    {/* Radial glow effect */}
    <div className="absolute inset-0 bg-cyber-radial opacity-40"></div>
    
    <div className="relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-cyberpunk text-neon-blue neon-text-blue animate-neon-flicker mb-6"
        >
          SPARK<span className="text-neon-green">SLOT</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
          className="relative mb-8"
        >
          {/* Triple animated icon layers */}
          <div className="relative">
            <BatteryCharging className="h-20 w-20 text-neon-purple animate-pulse-slow" />
            
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="h-full w-full rounded-full border-t-2 border-l-2 border-neon-blue/40"></div>
            </motion.div>
            
            <motion.div 
              className="absolute inset-0"
              initial={{ rotate: 45 }}
              animate={{ rotate: -315 }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="h-full w-full rounded-full border-b-2 border-r-2 border-neon-green/30"></div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="w-64 h-2 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full overflow-hidden relative"
        >
          {/* Animated data stream */}
          <div className="absolute inset-0 data-stream"></div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 font-mono text-neon-green"
        >
          CHARGING SYSTEM ONLINE<span className="animate-pulse">...</span>
        </motion.p>
      </motion.div>
    </div>
  </div>
);

// Configure query client with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            closeButton 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: 'rgba(15, 15, 25, 0.9)',
                color: '#00FFFF',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                fontFamily: "'Share Tech Mono', monospace",
                backdropFilter: 'blur(10px)',
              }
            }}
          />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/super-admin" element={<SuperAdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
