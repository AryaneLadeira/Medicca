import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSpecialitiesContext } from '../../../context/SpecialitiesContext';
import { Speciality } from '../../../utils/types';
import CrmField from '../../atoms/CrmField';
import PasswordField from '../../atoms/PasswordField';
import './style.scss';

function DoctorSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    crm: '',
    speciality_id: '',
  });

  const { getSpecialities } = useSpecialitiesContext();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

        <CrmField
          value={formData.crm}
          onChange={(crm) => setFormData((prev) => ({ ...prev, crm }))}
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
    </Box>
  );
}

export default DoctorSignupForm;
