
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Zap } from "lucide-react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SuperAdminPanel = lazy(() => import("./pages/SuperAdminPanel"));

// Create futuristic loading fallback component
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-cyber-dark">
    <div className="animate-pulse-slow flex flex-col items-center">
      <div className="text-6xl font-cyberpunk text-neon-blue neon-text-blue animate-neon-flicker mb-6">EVEE</div>
      <Zap className="h-16 w-16 text-neon-blue animate-glow-pulse mb-8" />
      <div className="w-64 h-1.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-white/30 animate-pulse"></div>
      </div>
      <p className="mt-4 font-mono text-neon-green">SYSTEM_INITIALIZING...</p>
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
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/super-admin" element={<SuperAdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
