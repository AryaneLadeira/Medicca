import { createContext, useContext } from 'react';
import { Appointment } from '../utils/types';

interface AppointmentsContextProps {
  createAppointment: (data: {
    patient_id: number;
    doctor_id: number;
    consultation_date: string;
    consultation_time: string;
  }) => Promise<void>;
  getAppointments: (userId: number) => Promise<Appointment[]>;
  getAppointmentsSummary: (userId: number) => Promise<{
    nextAppointment: Appointment;
    pastAppointments: Appointment[];
  }>;
  deleteAppointment: (appointmentId: number) => Promise<void>;
}

export const AppointmentsContext = createContext<
  AppointmentsContextProps | undefined
>(undefined);

export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      'useAppointmentsContext deve ser usado dentro de um AppointmentsProvider'
    );
  }
  return context;
};
