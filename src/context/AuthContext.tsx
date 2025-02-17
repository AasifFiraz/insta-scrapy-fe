import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: (shouldRedirect?: boolean) => void;
  refreshTokens: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JwtPayload {
  exp: number;
  sub: string;
  iat: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshTokens = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return null;

      const response = await axiosInstance.post('/refresh-token', {
        refresh_token: refreshToken
      });

      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      return access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout(false);
      return null;
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await axiosInstance.get('/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          setLoading(false);
          return;
        }

        // Check if access token is expired
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        console.log('Decoded token:', decodedToken);
        if (decodedToken.exp < currentTime) {
          console.log('Token is expired, trying to refresh');
          // Token is expired, try to refresh
          const newAccessToken = await refreshTokens();
          if (newAccessToken) {
            await fetchUserData(newAccessToken);
          } else {
            throw new Error('Failed to refresh token');
          }
        } else {
          // Token is still valid
          await fetchUserData(accessToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User, access_token: string, refresh_token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = (shouldRedirect: boolean = true) => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    setUser(null);
    setIsAuthenticated(false);
    
    if (shouldRedirect) {
      navigate('/');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, refreshTokens }}>
      {children}
    </AuthContext.Provider>
  );
}; 