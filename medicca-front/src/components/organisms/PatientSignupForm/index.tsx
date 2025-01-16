import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

        {/* E-mail */}
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
          fullWidth
          required
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
            name="address"
            value={formData.address}
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
