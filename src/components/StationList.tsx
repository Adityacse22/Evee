
import { useState, useMemo, useEffect } from "react";
import { Station } from "@/types";
import { StationCard } from "@/components/StationCard";
import { Calendar, Zap, ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StationListProps {
  stations: Station[];
  loading: boolean;
  error: string | null;
  onBookStation: (station: Station) => void;
}

export const StationList = ({ stations, loading, error, onBookStation }: StationListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animateDirection, setAnimateDirection] = useState(0);
  const stationsPerPage = 5;
  
  // Memoize paginated stations to avoid recalculation on every render
  const paginatedStations = useMemo(() => {
    const startIdx = (currentPage - 1) * stationsPerPage;
    const endIdx = startIdx + stationsPerPage;
    return stations.slice(startIdx, endIdx);
  }, [stations, currentPage]);
  
  const totalPages = Math.ceil(stations.length / stationsPerPage);

  // Handle direction of animations when changing pages
  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setAnimateDirection(1);
      setCurrentPage(curr => curr + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setAnimateDirection(-1);
      setCurrentPage(curr => curr - 1);
    }
  };

  // Reset animation direction after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateDirection(0);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 scrollbar-cyberpunk"
    >
      <motion.div 
        className="glass-morphism p-3 flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
      >
        <div className="font-mono text-neon-blue">
          <span className="text-white/70">NODES:</span> {stations.length}
        </div>
        <div className="flex items-center text-sm text-neon-purple font-mono">
          <Calendar className="h-4 w-4 mr-1" /> TODAY
        </div>
      </motion.div>
      
      {loading ? (
        <div className="flex items-center justify-center h-60 glass-morphism">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="flex flex-col items-center"
          >
            <Loader className="h-10 w-10 text-neon-blue animate-spin" />
            <p className="font-mono text-neon-blue mt-4 animate-pulse">SCANNING NETWORK...</p>
          </motion.div>
        </div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center h-60 glass-morphism border border-red-500/50"
        >
          <p className="font-mono text-red-500">CONNECTION ERROR: {error}</p>
        </motion.div>
      ) : stations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center h-60 glass-morphism border border-neon-yellow/30"
        >
          <p className="font-mono text-neon-yellow">NO STATIONS MATCH PARAMETERS</p>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {paginatedStations.map(station => (
                <motion.div 
                  key={station.id}
                  initial={{ 
                    x: animateDirection * 50, 
                    opacity: 0 
                  }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  exit={{ 
                    x: -animateDirection * 50, 
                    opacity: 0,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <StationCard 
                    station={station} 
                    onBookClick={onBookStation} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <motion.div 
              className="flex justify-center items-center gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className={`h-10 w-10 rounded-full flex items-center justify-center font-mono ${
                  currentPage === 1 
                    ? "bg-cyber-light/20 text-white/30" 
                    : "neo-button border-neon-blue text-neon-blue"
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              
              <div className="glass-morphism px-4 py-1 rounded-full">
                <span className="text-sm font-mono text-white/90">
                  {currentPage} <span className="text-neon-blue">/</span> {totalPages}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
                className={`h-10 w-10 rounded-full flex items-center justify-center font-mono ${
                  currentPage === totalPages 
                    ? "bg-cyber-light/20 text-white/30" 
                    : "neo-button border-neon-blue text-neon-blue"
                }`}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};
