import { TextField } from '@mui/material';
import { UserType } from '../../../utils/types';

interface NameFilterProps {
  userType: UserType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NameFilter({ userType, value, onChange }: NameFilterProps) {
  return (
    <TextField
      label={userType === UserType.Doctor ? 'Paciente' : 'Médico'}
      value={value}
      onChange={onChange}
      sx={{ flex: 1, minWidth: '250px' }}
    />
  );
}

export default NameFilter;
