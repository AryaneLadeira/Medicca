import { TextField } from '@mui/material';

interface NameFilterProps {
  userType: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NameFilter({ userType, value, onChange }: NameFilterProps) {
  return (
    <TextField
      label={userType === 'doctor' ? 'Paciente' : 'Médico'}
      value={value}
      onChange={onChange}
      sx={{ flex: 1, minWidth: '250px' }}
    />
  );
}

export default NameFilter;
