import { cleanString } from '../../utils/format';
import { Doctor, DoctorData } from '../../utils/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const DoctorService = {
  createDoctor: async (data: Doctor): Promise<DoctorData> => {
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
};
