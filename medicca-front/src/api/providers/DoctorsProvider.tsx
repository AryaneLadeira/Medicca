import { ReactNode } from 'react';

import { Doctor, DoctorData } from '../../utils/types';
import { DoctorService } from '../services/DoctorService';
import { DoctorsContext } from '../../context/DoctorsProvider';

interface DoctorsProviderProps {
  children: ReactNode;
}

export const DoctorsProvider = ({ children }: DoctorsProviderProps) => {
  const createNewDoctor = async (data: Doctor): Promise<DoctorData | void> => {
    return await DoctorService.createDoctor(data);
  };

  return (
    <DoctorsContext.Provider value={{ createNewDoctor }}>
      {children}
    </DoctorsContext.Provider>
  );
};
