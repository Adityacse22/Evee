
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

// Create loading fallback component
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-charcoal-950 dark:via-charcoal-900 dark:to-charcoal-950">
    <div className="animate-pulse-slow flex flex-col items-center">
      <Zap className="h-12 w-12 text-electric-500 mb-3" />
      <div className="bg-gradient-to-r from-electric-400 via-electric-500 to-blue-600 bg-clip-text text-transparent text-lg font-medium">
        Loading EVEE...
      </div>
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
          <Sonner closeButton position="bottom-right" />
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
