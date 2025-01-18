import { UserLoginResponse } from '../../utils/types';

const API_URL = 'http://127.0.0.1:8000/api';

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
    sessionStorage.setItem('authToken', token);
    return { token, user };
  },

  logout: async (): Promise<void> => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      throw new Error('Usuário não autenticado.');
    }

    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Falha no logout.');
    }

    sessionStorage.removeItem('authToken');
  },
};
