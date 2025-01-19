import { TextField } from '@mui/material';

interface CrmFilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CrmFilter({ value, onChange }: CrmFilterProps) {
  return <TextField label="CRM" value={value} onChange={onChange} />;
}

export default CrmFilter;
