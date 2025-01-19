import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorsContext } from '../../../context/DoctorsContext';
import CepField from '../../atoms/CepField';
import CpfField from '../../atoms/CpfField';
import CrmField from '../../atoms/CrmField';
import PasswordField from '../../atoms/PasswordField';
import PhoneField from '../../atoms/PhoneField';
import Toast from '../../atoms/Toast';
import SpecialityFilter from '../../molecules/SpecialtyFilter';
import './style.scss';

function DoctorSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    crm: '',
    speciality_id: '',
    cpf: '',
    cep: '',
    address: '',
    number: '',
    phone: '',
  });

  const { createNewDoctor } = useDoctorsContext();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      crm: '',
      speciality_id: '',
      cpf: '',
      cep: '',
      address: '',
      number: '',
      phone: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNewDoctor(formData);
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
    }
  };

  const handleAddressFetch = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
  };

  return (
    <Box className="doctor-signup-form-container">
      <form onSubmit={handleSubmit} className="doctor-signup-form">
        <TextField
          label="Nome completo"
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
          label="Email"
          name="email"
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

        <CrmField
          onChange={(crm) => setFormData((prev) => ({ ...prev, crm }))}
          value={formData.crm}
        />

        <SpecialityFilter
          value={formData.speciality_id}
          onChange={(specialty) =>
            setFormData((prev) => ({ ...prev, speciality_id: specialty }))
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          className="large-btn"
        >
          Registrar
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

export default DoctorSignupForm;
