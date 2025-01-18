import { cleanString } from '../../utils/format';
import { Patient, PatientData } from '../../utils/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const PatientService = {
  createPatient: async (data: Patient): Promise<PatientData> => {
    const currentDate = new Date().toISOString().split('T')[0]; // Data no formato YYYY-MM-DD

    const payload = {
      name: data.name,
      cpf: cleanString(data.cpf),
      cep: cleanString(data.cep),
      email: data.email,
      password: data.password,
      address: `${data.address} ${data.number}`,
      phone: data.phone,
      registration_date: currentDate,
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
