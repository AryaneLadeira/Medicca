import { TextField } from '@mui/material';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { fetchAddressByCep } from '../../../services/ViaCepService';

interface CepFieldProps {
  value: string;
  onChange: (value: string) => void;
  onAddressFetch: (address: string) => void;
}

function CepField({ value, onChange, onAddressFetch }: CepFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (error) setError('');
    onChange(newValue);
  };

  const handleBlur = async () => {
    if (!value) {
      setError('O CEP é obrigatório.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const addressData = await fetchAddressByCep(value);
      const fullAddress = `${addressData.logradouro}, ${addressData.bairro} - ${addressData.localidade}, ${addressData.estado}`;
      onAddressFetch(fullAddress);
    } catch (err) {
      if (err instanceof Error) {
        setError('Não foi possível buscar o endereço. Verifique o CEP e tente novamente.');
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <InputMask
      mask="99999-999"
      value={value}
      onChange={handleCepChange}
      maskChar=" "
      onBlur={handleBlur}
    >
      {() => (
        <TextField
          label="CEP"
          value={value}
          fullWidth
          required
          error={!!error}
          helperText={error || (loading ? 'Buscando endereço...' : '')}
        />
      )}
    </InputMask>
  );
}

export default CepField;
