import { useState, useEffect } from "react";
import { Booking } from "../types";
import { bookingsAPI } from "../lib/api";
import { useAuth } from "@/context/AuthContext";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated) {
        setBookings([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await bookingsAPI.getUserBookings();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [isAuthenticated]);

  // Create a new booking
  const createBooking = async (bookingData: {
    stationId: string;
    plugType: string;
    startTime: string;
    endTime: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const newBooking = await bookingsAPI.create(bookingData);
      setBookings((prev) => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedBooking = await bookingsAPI.updateStatus(id, status);
      
      // Update bookings in state
      setBookings((prev) => 
        prev.map((booking) => 
          booking.id === id ? updatedBooking : booking
        )
      );
      
      return updatedBooking;
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a single booking by ID
  const getBookingById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const booking = await bookingsAPI.getById(id);
      return booking;
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Failed to fetch booking");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Admin function: Get all bookings
  const getAllBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allBookings = await bookingsAPI.getAllBookings();
      return allBookings;
    } catch (err) {
      console.error("Error fetching all bookings:", err);
      setError("Failed to fetch all bookings");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
    getBookingById,
    getAllBookings
  };
}; 