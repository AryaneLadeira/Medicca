import { cleanString } from '../../utils/format';
import { DoctorSignup, DoctorSignupData, DoctorData, Doctor } from '../../utils/types';

const API_URL = import.meta.env.VITE_API_URL;

export const DoctorService = {
  createDoctor: async (data: DoctorSignup): Promise<DoctorSignupData> => {
    const currentDate = new Date().toISOString().split('T')[0]; // Data no formato YYYY-MM-DD

    const payload = {
      name: data.name,
      cpf: cleanString(data.cpf),
      cep: cleanString(data.cep),
      email: data.email,
      password: data.password,
      address: `${data.address} ${data.number}`,
      phone: data.phone,
      crm: data.crm,
      especialidade_id: data.speciality_id,
      registration_date: currentDate,
    };

    const response = await fetch(`${API_URL}/medicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      throw {
        message: errorData.message,
      };
    }

    const doctorData = await response.json();
    return doctorData;
  },

  getDoctors: async (): Promise<DoctorData[]> => {
    const response = await fetch(`${API_URL}/medicos`);

    if (!response.ok) {
      throw new Error('Erro ao buscar médicos');
    }

    const doctorsData = await response.json();
    return doctorsData;
  },
  getDoctorById: async (id: number): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/medicos/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar médico');
    }

    const doctorData = await response.json();
    return doctorData;
  },
};
