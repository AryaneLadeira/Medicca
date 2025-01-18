import { createContext, useContext } from 'react';
import { Doctor, DoctorData } from '../utils/types';

interface DoctorsContextProps {
  createNewDoctor: (data: Doctor) => Promise<DoctorData | void>;
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
