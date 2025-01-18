import { createContext, useContext } from 'react';
import { Patient, PatientData } from '../utils/types';

interface PatientsContextProps {
  createNewPatient: (data: Patient) => Promise<PatientData | void>;
}

export const PatientsContext = createContext<PatientsContextProps | undefined>(
  undefined
);

export const usePatientsContext = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error(
      'usePatientsContext deve ser usado dentro de um PatientsProvider'
    );
  }
  return context;
};
