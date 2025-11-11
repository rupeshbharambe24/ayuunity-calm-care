import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';
import type { User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  roles: string[];
  status: 'active' | 'pending' | 'rejected' | null;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'active' | 'pending' | 'rejected' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Bootstrap session on mount
    const initAuth = async () => {
      // Check API health first
      await apiClient.checkHealth();
      
      try {
        const sessionData = await apiClient.get<{ user: User; roles: string[]; status: 'active' | 'pending' | 'rejected' }>('/auth/session');
        setUser(sessionData.user);
        setStatus(sessionData.status);
      } catch (error) {
        // User not authenticated
        setUser(null);
        setStatus(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signOut = async () => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth state regardless of API response
      setUser(null);
      setStatus(null);
      apiClient.setToken(null);
      navigate('/auth/login', { replace: true });
    }
  };

  const roles = user?.roles || [];

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        roles,
        status,
        setUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
