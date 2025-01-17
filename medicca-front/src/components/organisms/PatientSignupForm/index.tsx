import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { fetchAddressByCep } from '../../../services/ViaCepService';
import PasswordField from '../../atoms/PasswordField';
import './style.scss';

function PatientSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    cep: '',
    address: '',
    phone: '',
    number: '',
  });

  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    if (!formData.cep) {
      setCepError('O CEP é obrigatório.');
      return;
    }

    setLoading(true);
    setCepError('');
    try {
      const addressData = await fetchAddressByCep(formData.cep);
      setFormData((prev) => ({
        ...prev,
        address: `${addressData.logradouro}, ${addressData.bairro} - ${addressData.localidade}, ${addressData.estado}`,
      }));
    } catch (err) {
      if (err instanceof Error) setCepError('Não foi possível buscar o endereço. Verifique o CEP e tente novamente.');
      else setCepError('Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Box className="patient-signup-form-container">
      <form onSubmit={handleSubmit} className="patient-signup-form">
        <TextField
          label="Nome Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 14 }}
        />

        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <PasswordField label="Senha" margin="none" />

        <TextField
          label="CEP"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          fullWidth
          required
          error={!!cepError}
          helperText={cepError || (loading ? 'Buscando endereço...' : '')}
        />

        <Box className="address-container">
          <TextField
            label="Endereço Completo"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Número"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </Box>

        <TextField
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          className="large-btn"
        >
          Cadastrar
        </Button>
      </form>
    </Box>
  );
}

export default PatientSignupForm;
