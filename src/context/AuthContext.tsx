import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { authAPI, userAPI } from "../lib/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // Check for token and load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const userData = await userAPI.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { token, user: userData } = await authAPI.login(email, password);
      
      // Save token
      localStorage.setItem('token', token);
      
      // Set user
      setUser(userData);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Sign up
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { token, user: userData } = await authAPI.register(name, email, password);
      
      // Save token
      localStorage.setItem('token', token);
      
      // Set user
      setUser(userData);
    } catch (error) {
      console.error('Sign up failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await userAPI.updateProfile(userData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Profile update failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        loading,
        login, 
        logout, 
        signUp,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
