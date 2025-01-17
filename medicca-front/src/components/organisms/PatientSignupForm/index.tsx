import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientsContext } from '../../../context/PatientsContext';
import { Patient } from '../../../utils/types';
import CepField from '../../atoms/CepField';
import CpfField from '../../atoms/CpfField';
import PasswordField from '../../atoms/PasswordField';
import PhoneField from '../../atoms/PhoneField';
import Toast from '../../atoms/Toast';
import './style.scss';

function PatientSignupForm() {
  const { createNewPatient } = usePatientsContext();

  const [formData, setFormData] = useState<Patient>({
    name: '',
    cpf: '',
    cep: '',
    email: '',
    password: '',
    address: '',
    number: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressFetch = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      cpf: '',
      cep: '',
      email: '',
      password: '',
      address: '',
      number: '',
      phone: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createNewPatient(formData);
      setToastMessage(
        'Sua conta foi cadastrada com sucesso! Redirecionando para o login...'
      );
      setToastSeverity('success');
      setToastOpen(true);
      clearForm();
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      const err = error as { message: string };

      if (err.message) {
        setToastMessage(`Ocorreu um erro ao criar a conta: ${err.message}`);
      } else {
        setToastMessage('Ocorreu um erro desconhecido.');
      }
      setToastSeverity('error');
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
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

        <PasswordField
          label="Senha"
          margin="none"
          value={formData.password}
          onChange={(password) =>
            setFormData((prev) => ({ ...prev, password }))
          }
        />

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

        <PhoneField
          value={formData.phone}
          onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          className="large-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>

      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
}

export default PatientSignupForm;