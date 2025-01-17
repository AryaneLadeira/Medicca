import { createContext, useContext } from 'react';
import { User, UserLoginResponse } from '../utils/types';

interface AuthContextProps {
  user: User | null;
  loadingToken: boolean;
  login: (email: string, password: string) => Promise<UserLoginResponse>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};