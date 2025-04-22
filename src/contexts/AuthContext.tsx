
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType, AuthState } from '../types';

// Mock initial user for development
const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@mcqueen.com',
  fullName: 'Admin User',
  isAdmin: true,
  lastLogin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Mock login function (will be replaced with actual API calls)
  const login = async (username: string, password: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For development, accept any non-empty credentials
      if (username.trim() && password.trim()) {
        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      setState({ ...state, isLoading: false });
      throw error;
    }
  };

  const logout = () => {
    setState(initialState);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
