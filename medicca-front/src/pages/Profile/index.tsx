import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorProfile from '../../components/organisms/DoctorProfile';
import PatientProfile from '../../components/organisms/PatientProfile';
import { useDoctorsContext } from '../../context/DoctorsContext';
import { usePatientsContext } from '../../context/PatientsContext';
import { Doctor, PatientData } from '../../utils/types';

function Profile() {
  const { id } = useParams();
  const { getPatientById } = usePatientsContext();
  const { getDoctorById } = useDoctorsContext();

  const isDoctorProfile = window.location.pathname.includes('/perfil/medico');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          if (isDoctorProfile) {
            const fetchedDoctor = await getDoctorById(+id);
            setDoctorData(fetchedDoctor);
          } else {
            const fetchedPatient = await getPatientById(+id);
            setPatientData(fetchedPatient);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id, isDoctorProfile, getPatientById, getDoctorById]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Perfil {isDoctorProfile ? 'do Médico' : 'do Paciente'}
      </Typography>

      <Paper sx={{ padding: 3, marginBottom: 2 }}>
        {isDoctorProfile ? (
          <DoctorProfile doctorData={doctorData} />
        ) : (
          <PatientProfile patientData={patientData} />
        )}
      </Paper>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
