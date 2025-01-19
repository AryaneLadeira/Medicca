import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSection from '../../components/atoms/WelcomeSection';
import CardCarousel from '../../components/molecules/CardCarousel';
import LoadingScreen from '../../components/organisms/LoadingScreen';
import NextAppointmentSection from '../../components/organisms/NextAppointmentSection';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import { useAuthContext } from '../../context/AuthContext';
import { Appointment } from '../../utils/types';
import './style.scss';

function Home() {
  const { user } = useAuthContext();
  const { getAppointmentsSummary } = useAppointmentsContext();

  const [appointmentsSummary, setAppointmentsSummary] = useState<{
    nextAppointment: Appointment;
    pastAppointments: Appointment[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getAppointmentsSummary(user.id)
        .then((summary) => {
          setAppointmentsSummary(summary);
        })
        .catch((error) => {
          setError(`Erro ao carregar resumo de consultas:', ${error}`);
          console.error('Erro ao carregar resumo de consultas:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading || !user || appointmentsSummary === null) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <WelcomeSection name={user.name} />

      {appointmentsSummary.nextAppointment && (
        <NextAppointmentSection
          nextAppointment={appointmentsSummary.nextAppointment}
          userType={user.type}
        />
      )}

      <Box
        className="view-appointments mobile-center"
        sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/agendamentos');
          }}
        >
          Ver meus agendamentos
        </Button>
      </Box>

      <Box className="appointments-history">
        <Typography variant="h3" className="subtitle">
          Histórico de consultas
        </Typography>
        <Box className="mobile-center">
          {Array.isArray(appointmentsSummary.pastAppointments) &&
          appointmentsSummary.pastAppointments.length > 0 ? (
            <CardCarousel
              appointments={appointmentsSummary.pastAppointments}
              userType={user.type}
            />
          ) : (
            <Typography className="without-appointment">
              {error ? error : 'Você ainda não realizou nenhuma consulta.'}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
