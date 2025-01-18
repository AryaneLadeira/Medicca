import { ReactNode } from 'react';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { AppointmentService } from '../services/AppointmentService';

interface AppointmentsProviderProps {
  children: ReactNode;
}

export const AppointmentsProvider = ({
  children,
}: AppointmentsProviderProps) => {
  const createAppointment = async (data: {
    patient_id: number;
    doctor_id: number;
    consultation_date: string;
    consultation_time: string;
  }): Promise<void> => {
    return await AppointmentService.createAppointment(data);
  };

  const getAppointments = async (userId: number): Promise<any[]> => {
    return await AppointmentService.getAppointments(userId);
  };

  return (
    <AppointmentsContext.Provider
      value={{ createAppointment, getAppointments }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
