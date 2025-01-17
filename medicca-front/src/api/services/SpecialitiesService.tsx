import { Speciality } from '../../utils/types';

const API_URL = import.meta.env.VITE_API_URL;

export const SpecialitiesService = {
  getSpecialities: async (): Promise<Speciality[]> => {
    const response = await fetch(`${API_URL}/especialidades`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message,
      };
    }

    const specialities: Speciality[] = await response.json();
    return specialities;
  },
};
