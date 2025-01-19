import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSpecialitiesContext } from '../../../context/SpecialitiesContext';
import { Speciality } from '../../../utils/types';
import LoadingScreen from '../../organisms/LoadingScreen';
import './style.scss';

interface SpecialtySelectFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function SpecialtySelectFilter({
  value,
  onChange,
}: SpecialtySelectFilterProps) {
  const { getSpecialities } = useSpecialitiesContext();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  
  const fetchSpecialities = async () => {
    const data = await getSpecialities();
    setSpecialities(data);
  };

  useEffect(() => {
    fetchSpecialities();
  }, [getSpecialities]);

  if (!specialities.length) {
    return <LoadingScreen />;
  }

  return (
    <FormControl sx={{ flex: 1, minWidth: '250px' }}>
      <InputLabel>Especialidade</InputLabel>
      <Select
        label="Especialidade"
        value={value}
        onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
      >
        <MenuItem value="">
          <em>Selecione uma especialidade</em>
        </MenuItem>
        {specialities.map((speciality) => (
          <MenuItem key={speciality.id} value={speciality.id}>
            {speciality.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SpecialtySelectFilter;
