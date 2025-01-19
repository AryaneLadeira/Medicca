import { createContext, useContext } from 'react';
import { Doctor, DoctorData, DoctorSignup, DoctorSignupData } from '../utils/types';

interface DoctorsContextProps {
  createNewDoctor: (data: DoctorSignup) => Promise<DoctorSignupData | void>;
  getDoctors: () => Promise<DoctorData[]>;
  getDoctorById: (id: number) => Promise<Doctor>;
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
