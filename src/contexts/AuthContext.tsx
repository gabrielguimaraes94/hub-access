import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType, AuthState } from '../types';
import { getWindowsUsername } from '../utils/windowsAuth';

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
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Attempt Windows authentication on mount
    const attemptWindowsAuth = async () => {
      try {
        const windowsUsername = await getWindowsUsername();
        
        if (windowsUsername) {
          // Auto login with Windows username
          const user: User = {
            id: '1',
            username: windowsUsername,
            email: `${windowsUsername}@mcqueen.com`,
            fullName: windowsUsername,
            isAdmin: windowsUsername.toLowerCase().includes('admin'),
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };

          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Windows auth error:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    attemptWindowsAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setState({ ...state, isLoading: true });
    
    try {
      // For development, accept any non-empty credentials
      if (username.trim() && password.trim()) {
        const user: User = {
          id: '1',
          username: username,
          email: `${username}@mcqueen.com`,
          fullName: username,
          isAdmin: username.toLowerCase().includes('admin'),
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };

        setState({
          user: user,
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
