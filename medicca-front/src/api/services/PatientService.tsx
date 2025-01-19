import { cleanString } from '../../utils/format';
import { Patient, PatientData } from '../../utils/types';

const API_URL = import.meta.env.VITE_API_URL;

export const PatientService = {
  createPatient: async (data: Patient): Promise<PatientData> => {
    const currentDate = new Date().toISOString().split('T')[0];

    const payload = {
      name: data.name,
      cpf: cleanString(data.cpf),
      cep: cleanString(data.cep),
      email: data.email,
      password: data.password,
      address: `${data.address} ${data.number}`,
      phone: data.phone,
      registration_date: currentDate,
      birth_date: data.birth_date,
    };

    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status != 201) {
      const errorData = await response.json();

      throw {
        message: errorData.message,
      };
    }

    const patientData = await response.json();
    return patientData;
  },
};
