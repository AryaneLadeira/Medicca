import { TextField } from '@mui/material';
import { useState } from 'react';
import InputMask from 'react-input-mask';

interface CpfFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function CpfField({ value, onChange }: CpfFieldProps) {
  const [error, setError] = useState('');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (error) setError('');
  };

  const validateCpf = () => {
    const cleanedCpf = value.replace(/\D/g, ''); 
    if (cleanedCpf.length !== 11) {
      setError('CPF inválido. Certifique-se de inserir 11 dígitos.');
    } else {
      setError('');
    }
  };

  return (
    <InputMask
      mask="999.999.999-99"
      value={value}
      onChange={handleCpfChange}
      maskChar=" "
      onBlur={validateCpf}
    >
      {() => (
        <TextField
          label="CPF"
          value={value}
          fullWidth
          required
          error={!!error}
          helperText={error}
        />
      )}
    </InputMask>
  );
}

export default CpfField;
