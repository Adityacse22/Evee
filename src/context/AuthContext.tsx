
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUser } from "../data/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with mockUser for demo
  const [user, setUser] = useState<User | null>(mockUser);
  const isAuthenticated = !!user;

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    console.log("Login attempt:", email, password);
    
    // Simulate successful login with mock user
    setUser(mockUser);
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
  };

  // Mock sign up function
  const signUp = async (email: string, password: string, name: string) => {
    // In a real app, you would make an API call here
    console.log("Sign up attempt:", email, password, name);
    
    // Create a new user based on input + mock data
    const newUser = {
      ...mockUser,
      id: `u-${Date.now()}`,
      email,
      name,
    };
    
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signUp }}>
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
