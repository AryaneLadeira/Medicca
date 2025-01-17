import { ReactNode } from 'react';
import { SpecialitiesContext } from '../../context/SpecialitiesContext';
import { Speciality } from '../../utils/types';
import { SpecialitiesService } from '../services/SpecialitiesService';

interface SpecialitiesProviderProps {
  children: ReactNode;
}

export const SpecialitiesProvider = ({ children }: SpecialitiesProviderProps) => {
  const getSpecialities = async (): Promise<Speciality[]> => {
    return await SpecialitiesService.getSpecialities();
  };

  return (
    <SpecialitiesContext.Provider value={{ getSpecialities }}>
      {children}
    </SpecialitiesContext.Provider>
  );
};
