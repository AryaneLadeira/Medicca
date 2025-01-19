import { Appointment } from '../../utils/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const AppointmentService = {
  createAppointment: async (data: {
    patient_id: number;
    doctor_id: number;
    consultation_date: string;
    consultation_time: string;
  }): Promise<void> => {
    const consultationDateTime = `${data.consultation_date} ${data.consultation_time}`;

    const payload = {
      paciente_id: data.patient_id,
      medico_id: data.doctor_id,
      consultation_date: consultationDateTime,
      appointment_date: new Date().toISOString().split('T')[0],
    };

    const response = await fetch(`${API_URL}/consultas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar consulta');
    }

    return await response.json();
  },

  getAppointments: async (userId: number): Promise<Appointment[]> => {
    const response = await fetch(`${API_URL}/consultas?user_id=${userId}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar consultas');
    }
    return await response.json();
  },

  getAppointmentsSummary: async (
    userId: number
  ): Promise<{
    nextAppointment: Appointment;
    pastAppointments: Appointment[];
  }> => {
    const response = await fetch(
      `${API_URL}/consultas/detalhes?user_id=${userId}`
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar resumo de consultas');
    }
    const data = await response.json();

    return {
      nextAppointment: data.next_appointment,
      pastAppointments: data.past_appointments,
    };
  },

  deleteAppointment: async (appointmentId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/consultas/${appointmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir consulta');
    }
  },
};
