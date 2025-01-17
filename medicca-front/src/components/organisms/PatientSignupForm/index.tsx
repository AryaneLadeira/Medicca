import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import CepField from '../../atoms/CepField';
import CpfField from '../../atoms/CpfField';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressFetch = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
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

        <CpfField
          value={formData.cpf}
          onChange={(cpf) => setFormData((prev) => ({ ...prev, cpf }))}
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

        <CepField
          value={formData.cep}
          onChange={(cep) => setFormData((prev) => ({ ...prev, cep }))}
          onAddressFetch={handleAddressFetch}
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