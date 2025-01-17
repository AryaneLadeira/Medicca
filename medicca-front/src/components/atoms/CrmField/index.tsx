import { TextField } from '@mui/material';
import { useState } from 'react';
import InputMask from 'react-input-mask';

interface CrmFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function CrmField({ value, onChange }: CrmFieldProps) {
  const [error, setError] = useState('');

  const handleCrmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (error) setError('');
  };

  const validateCrm = () => {
    if (value.length !== 7) {
      setError('CRM inválido. Certifique-se de inserir o número corretamente.');
    } else {
      setError('');
    }
  };

  return (
    <InputMask
      mask="9999999"
      value={value}
      onChange={handleCrmChange}
      maskChar=" "
      onBlur={validateCrm}
    >
      {() => (
        <TextField
          label="CRM"
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

export default CrmField;
