import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DecodedToken, User, UserLoginResponse } from '../../utils/types';
import { AuthService } from '../services/AuthService';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);


  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const decodedUser = jwtDecode<DecodedToken>(storedToken);
      const currentTime = Date.now() / 1000;

      if (decodedUser.exp < currentTime) {
        logout();
      } else {
        setToken(storedToken);
        setUser(decodedUser);
      }
    }
    setLoadingToken(false);
  }, []);

  const isAuthenticated = () => {
    if (!token) return false;
  
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
  
    if (decodedToken.exp < currentTime) {
      logout();
      return false;
    }
  
    return true;
  };
  
  const login = async (
    email: string,
    password: string
  ): Promise<UserLoginResponse> => {
    try {
      const { token, user } = await AuthService.login(email, password);
      setToken(token);
      sessionStorage.setItem("token", token);
  
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      return { token, user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setToken(null);
      setUser(null);
      sessionStorage.removeItem("token");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loadingToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
