import { TextField } from '@mui/material';
import { useState } from 'react';
import { fetchAddressByCep } from '../../../services/ViaCepService';

interface CepFieldProps {
  value: string;
  onChange: (value: string) => void;
  onAddressFetch: (address: string) => void;
}

function CepField({ value, onChange, onAddressFetch }: CepFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCep = (cep: string) => {
    const numericCep = cep.replace(/\D/g, '');
    if (numericCep.length > 5) {
      return `${numericCep.slice(0, 5)}-${numericCep.slice(5, 8)}`;
    }
    return numericCep;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedValue = formatCep(newValue);
    if (formattedValue.length <= 9) {
      onChange(formattedValue);
    }
    if (error) setError('');
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
    <TextField
      label="CEP"
      value={value}
      onChange={handleCepChange}
      onBlur={handleBlur}
      fullWidth
      required
      error={!!error}
      helperText={error || (loading ? 'Buscando endereço...' : '')}
    />
  );
}

export default CepField;
