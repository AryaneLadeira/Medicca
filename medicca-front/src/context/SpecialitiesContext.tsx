import { createContext, useContext } from 'react';
import { Speciality } from '../utils/types';

interface SpecialitiesContextProps {
  getSpecialities: () => Promise<Speciality[]>;
}

export const SpecialitiesContext = createContext<SpecialitiesContextProps | undefined>(
  undefined
);

export const useSpecialitiesContext = () => {
  const context = useContext(SpecialitiesContext);
  if (!context) {
    throw new Error('useSpecialitiesContext must be used within a SpecialitiesProvider');
  }
  return context;
};
