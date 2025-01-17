import { TextField } from '@mui/material';
import { useState } from 'react';
import InputMask from 'react-input-mask';

interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function PhoneField({ value, onChange }: PhoneFieldProps) {
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (error) setError('');
  };

  const validatePhone = () => {
    if (value.length !== 15) {
      setError('Telefone inválido.');
    } else {
      setError('');
    }
  };

  return (
    <InputMask
      mask="(99) 9 9999-9999"
      value={value}
      onChange={handlePhoneChange}
      maskChar=" "
      onBlur={validatePhone}
    >
      {() => (
        <TextField
          label="Telefone"
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

export default PhoneField;
