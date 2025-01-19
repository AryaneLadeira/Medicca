import { ReactNode } from 'react';
import { PatientsContext } from '../../context/PatientsContext';
import { NewPatient, Patient, PatientData } from '../../utils/types';
import { PatientService } from '../services/PatientService';

interface PatientsProviderProps {
  children: ReactNode;
}

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const createNewPatient = async (
    data: Patient
  ): Promise<NewPatient | void> => {
    return await PatientService.createPatient(data);
  };

  const getPatientById = async (id: number): Promise<PatientData> => {
    return await PatientService.getPatientById(id);
  };

  return (
    <PatientsContext.Provider value={{ createNewPatient, getPatientById }}>
      {children}
    </PatientsContext.Provider>
  );
};
