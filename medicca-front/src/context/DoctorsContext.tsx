import { createContext, useContext } from 'react';
import { DoctorSignup, DoctorSignupData, DoctorData } from '../utils/types';

interface DoctorsContextProps {
  createNewDoctor: (data: DoctorSignup) => Promise<DoctorSignupData | void>;
  getDoctors: () => Promise<DoctorData[]>; // Função para buscar médicos
}

export const DoctorsContext = createContext<DoctorsContextProps | undefined>(
  undefined
);

export const useDoctorsContext = () => {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error(
      'useDoctorsContext deve ser usado dentro de um DoctorsProvider'
    );
  }
  return context;
};
