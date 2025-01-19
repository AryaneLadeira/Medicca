import { ReactNode } from 'react';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { Appointment } from '../../utils/types';
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

  const getAppointments = async (userId: number): Promise<Appointment[]> => {
    return await AppointmentService.getAppointments(userId);
  };

  const getAppointmentsSummary = async (
    userId: number
  ): Promise<{
    nextAppointment: Appointment;
    pastAppointments: Appointment[];
  }> => {
    return await AppointmentService.getAppointmentsSummary(userId);
  };

  const deleteAppointment = async (appointmentId: number): Promise<void> => {
    return await AppointmentService.deleteAppointment(appointmentId);
  };

  return (
    <AppointmentsContext.Provider
      value={{
        createAppointment,
        getAppointments,
        getAppointmentsSummary,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
