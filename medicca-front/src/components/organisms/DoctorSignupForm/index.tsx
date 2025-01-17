import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './style.scss';
import PasswordField from '../../atoms/PasswordField';
import CrmField from '../../atoms/CrmField';

function DoctorSignupForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    crm: '',
    especialidade_id: '',
  });

  interface Especialidade {
    id: number;
    nome: string;
  }

  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  useEffect(() => {
    setEspecialidades([
      { id: 1, nome: 'Cardiologia' },
      { id: 2, nome: 'Pediatria' },
      { id: 3, nome: 'Ortopedia' },
    ]);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dados do Médico:', formData);
  };

  return (
    <Box className="doctor-signup-form-container">
      <form onSubmit={handleSubmit} className="doctor-signup-form">
        <TextField
          label="Nome Completo"
          name="nome"
          value={formData.nome}
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

        <PasswordField label='Senha' margin='none' />

        <CrmField
          value={formData.crm}
          onChange={(crm) => setFormData((prev) => ({ ...prev, crm }))}
        />

        <TextField
          label="Especialidade"
          name="especialidade_id"
          value={formData.especialidade_id}
          onChange={handleChange}
          fullWidth
          required
          select
        >
          {especialidades.map((especialidade) => (
            <MenuItem key={especialidade.id} value={especialidade.id}>
              {especialidade.nome}
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
          Cadastrar Médico
        </Button>
      </form>
    </Box>
  );
}

export default DoctorSignupForm;
