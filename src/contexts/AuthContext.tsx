
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType, AuthState } from '../types';
import { getWindowsIdentity, getWindowsUsername } from '../utils/windowsAuth';

// Configuração de domínio da aplicação
const APP_DOMAIN = 'mcqueen.com';

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
        console.log('Attempting Windows authentication...');
        
        // Tenta obter identidade completa do Windows (usuário + domínio)
        const windowsIdentity = await getWindowsIdentity();
        
        if (windowsIdentity) {
          console.log('Windows identity found:', windowsIdentity);
          
          // Formata o e-mail baseado no domínio do Windows ou usa o domínio da aplicação
          const emailDomain = windowsIdentity.domain || APP_DOMAIN;
          const email = `${windowsIdentity.username}@${emailDomain.toLowerCase()}`;
          
          // Formatação opcional do nome completo (pode ser personalizado)
          const fullName = windowsIdentity.domain 
            ? `${windowsIdentity.username} (${windowsIdentity.domain})` 
            : windowsIdentity.username;
          
          // Auto login com nome de usuário do Windows
          const user: User = {
            id: '1',
            username: windowsIdentity.username,
            email: email,
            fullName: fullName,
            isAdmin: windowsIdentity.username.toLowerCase().includes('admin'),
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };

          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          
          console.log('Windows authentication successful:', user);
        } else {
          // Fallback para o método anterior (apenas usuário)
          const windowsUsername = await getWindowsUsername();
          
          if (windowsUsername) {
            console.log('Windows username found:', windowsUsername);
            
            // Auto login com nome de usuário do Windows
            const user: User = {
              id: '1',
              username: windowsUsername,
              email: `${windowsUsername}@${APP_DOMAIN}`,
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
            
            console.log('Windows authentication successful:', user);
          } else {
            console.log('Windows authentication failed: No username found');
            setState(prev => ({ ...prev, isLoading: false }));
          }
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
