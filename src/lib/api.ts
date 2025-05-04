import axios from 'axios';
import { Station, Booking, User, Filter } from '@/types';

// Make API URL environment-aware
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 Unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Remove token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Invalid credentials');
        } else if (error.response?.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw new Error('Authentication failed. Please try again.');
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('User already exists');
        } else if (error.response?.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw new Error('Registration failed. Please try again.');
    }
  }
};

// Stations
export const stationsAPI = {
  getAll: async (filter?: Filter, userLocation?: { lat: number, lng: number }) => {
    let queryParams = '';
    
    if (filter) {
      const params = new URLSearchParams();
      
      if (filter.plugTypes && filter.plugTypes.length > 0) {
        params.append('plugTypes', filter.plugTypes.join(','));
      }
      
      if (filter.chargingSpeed && filter.chargingSpeed.length > 0) {
        params.append('chargingSpeed', filter.chargingSpeed.join(','));
      }
      
      if (filter.availability) {
        params.append('availability', 'true');
      }
      
      if (filter.maxPrice) {
        params.append('maxPrice', filter.maxPrice.toString());
      }
      
      if (filter.rating) {
        params.append('rating', filter.rating.toString());
      }
      
      if (userLocation) {
        params.append('lat', userLocation.lat.toString());
        params.append('lng', userLocation.lng.toString());
        params.append('sortByDistance', 'true');
      }
      
      queryParams = `?${params.toString()}`;
    }
    
    const response = await api.get(`/stations${queryParams}`);
    return response.data.data as Station[];
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/stations/${id}`);
    return response.data.data as Station;
  },
  
  create: async (stationData: Partial<Station>) => {
    const response = await api.post('/stations', stationData);
    return response.data.data as Station;
  },
  
  update: async (id: string, stationData: Partial<Station>) => {
    const response = await api.put(`/stations/${id}`, stationData);
    return response.data.data as Station;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/stations/${id}`);
    return response.data;
  }
};

// Bookings
export const bookingsAPI = {
  getUserBookings: async () => {
    const response = await api.get('/bookings');
    return response.data.data as Booking[];
  },
  
  getAllBookings: async () => {
    const response = await api.get('/bookings/all');
    return response.data.data as Booking[];
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data.data as Booking;
  },
  
  create: async (bookingData: {
    stationId: string;
    plugType: string;
    startTime: string;
    endTime: string;
  }) => {
    const response = await api.post('/bookings', bookingData);
    return response.data.data as Booking;
  },
  
  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/bookings/${id}`, { status });
    return response.data.data as Booking;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

// User
export const userAPI = {
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data.data as User;
  },
  
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/users/me', userData);
    return response.data.data as User;
  },
  
  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put('/users/password', { currentPassword, newPassword });
    return response.data;
  },
  
  addFavorite: async (stationId: string) => {
    const response = await api.post(`/users/favorites/${stationId}`);
    return response.data.data as string[];
  },
  
  removeFavorite: async (stationId: string) => {
    const response = await api.delete(`/users/favorites/${stationId}`);
    return response.data.data as string[];
  },
  
  // Admin functions
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data.data as User[];
  },
  
  updateUserRole: async (userId: string, role: string) => {
    const response = await api.put(`/users/${userId}`, { role });
    return response.data.data as User;
  }
}; 