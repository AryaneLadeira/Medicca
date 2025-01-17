import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SpecialtyFilterProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

function SpecialtyFilter({ value, onChange }: SpecialtyFilterProps) {
  return (
    <FormControl sx={{ flex: 1, minWidth: '250px' }}>
      <InputLabel>Especialidade</InputLabel>
      <Select label="Especialidade" value={value} onChange={onChange}>
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        <MenuItem value="Cardiologia">Cardiologia</MenuItem>
        <MenuItem value="Endocrinologia">Endocrinologia</MenuItem>
        <MenuItem value="Pediatria">Pediatria</MenuItem>
        <MenuItem value="Dermatologia">Dermatologia</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SpecialtyFilter;
