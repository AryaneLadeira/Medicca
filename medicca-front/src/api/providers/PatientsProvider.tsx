import { ReactNode } from 'react';
import { PatientsContext } from '../../context/PatientsContext';
import { Patient, PatientData } from '../../utils/types';
import { PatientService } from '../services/PatientService';

interface PatientsProviderProps {
  children: ReactNode;
}

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const createNewPatient = async (
    data: Patient
  ): Promise<PatientData | void> => {
    return await PatientService.createPatient(data);
  };

  return (
    <PatientsContext.Provider value={{ createNewPatient }}>
      {children}
    </PatientsContext.Provider>
  );
};
