import { ReactNode } from 'react';
import { DoctorsContext } from '../../context/DoctorsContext';
import { DoctorSignup, DoctorSignupData, DoctorData, Doctor } from '../../utils/types';
import { DoctorService } from '../services/DoctorService';

interface DoctorsProviderProps {
  children: ReactNode;
}

export const DoctorsProvider = ({ children }: DoctorsProviderProps) => {
  const createNewDoctor = async (data: DoctorSignup): Promise<DoctorSignupData | void> => {
    return await DoctorService.createDoctor(data);
  };

  const getDoctors = async (): Promise<DoctorData[]> => {
    try {
      const doctorsList = await DoctorService.getDoctors();
      return doctorsList;
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      return [];
    }
  };

  const getDoctorById = async (id: number): Promise<Doctor> => {
    return await DoctorService.getDoctorById(id);
  };

  return (
    <DoctorsContext.Provider value={{ createNewDoctor, getDoctors, getDoctorById }}>
      {children}
    </DoctorsContext.Provider>
  );
};
