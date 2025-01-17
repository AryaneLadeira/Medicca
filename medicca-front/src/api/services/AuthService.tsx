import { UserLoginResponse } from '../../utils/types';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  login: async (
    email: string,
    password: string
  ): Promise<UserLoginResponse> => {
    const payload = { email, password };

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao realizar login.');
    }

    const { token, user } = await response.json();
    return { token, user };
  },

  logout: async (): Promise<void> => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw {
        message: 'Usuário não autenticado',
      };
    }

    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Falha no logout.');
    }
  },
};
