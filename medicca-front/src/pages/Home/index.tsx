import { Box, Button, Typography } from '@mui/material';
import WelcomeSection from '../../components/atoms/WelcomeSection';
import CardCarousel from '../../components/molecules/CardCarousel';
import LoadingScreen from '../../components/organisms/LoadingScreen';
import NextAppointmentSection from '../../components/organisms/NextAppointmentSection';
import { useAuthContext } from '../../context/AuthContext';
import './style.scss';

function Home() {
  const { user } = useAuthContext();
  const userAppointments = {
    nextAppointment: {
      date: '2025-01-20',
      time: '14:00',
      doctor: 'Dra. Maria Clara',
      specialty: 'Cardiologia',
      patient: 'John Doe',
      countAppointments: 1,
    },
    pastAppointments: [
      {
        date: '2024-12-15',
        time: '14:00',
        doctor: 'Dra. Maria Clara da Silva Pereira de Oliveira Marçal',
        specialty: 'Cardiologia',
        patient: 'Joana Doe',
        countAppointments: 2,
      },
      {
        date: '2024-11-10',
        time: '14:00',
        doctor: 'Dr. Roberto Silva',
        specialty: 'Endocrinologia',
        patient: 'Richard Tomas',
        countAppointments: 1,
      },
    ],
  };

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <WelcomeSection name={user.name} />

      <NextAppointmentSection
        nextAppointment={userAppointments.nextAppointment}
        userType={user.type}
      />

      <Box
        className="view-appointments mobile-center"
        sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}
      >
        <Button variant="contained" color="primary">
          Ver minhas consultas
        </Button>
      </Box>

      <Box className="appointments-history">
        <Typography variant="h3" className="subtitle">
          Histórico de consultas
        </Typography>
        <Box className="mobile-center">
          {userAppointments.pastAppointments.length >= 0 ? (
            <CardCarousel
              appointments={userAppointments.pastAppointments}
              userType={'doctor'}
            />
          ) : (
            <Typography className="without-appointment">
              Você não realizou nenhuma consulta.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
