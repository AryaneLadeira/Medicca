import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorsContext } from '../../../context/DoctorsProvider';
import { useSpecialitiesContext } from '../../../context/SpecialitiesContext';
import { Speciality } from '../../../utils/types';
import CepField from '../../atoms/CepField';
import CpfField from '../../atoms/CpfField';
import CrmField from '../../atoms/CrmField';
import PasswordField from '../../atoms/PasswordField';
import PhoneField from '../../atoms/PhoneField';
import Toast from '../../atoms/Toast';
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

  const { getSpecialities } = useSpecialitiesContext();
  const { createNewDoctor } = useDoctorsContext();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialities = async () => {
      const data = await getSpecialities();
      setSpecialities(data);
    };
    fetchSpecialities();
  }, [getSpecialities]);

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

        <TextField
          label="Especialidade"
          name="speciality_id"
          value={formData.speciality_id}
          onChange={handleChange}
          fullWidth
          required
          select
        >
          {specialities.map((speciality) => (
            <MenuItem key={speciality.id} value={speciality.id}>
              {speciality.name}
            </MenuItem>
          ))}
        </TextField>

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
