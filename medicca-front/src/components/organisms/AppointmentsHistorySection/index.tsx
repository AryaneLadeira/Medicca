import { Box, Typography } from '@mui/material';
import { Appointment } from '../../../utils/types';
import CardCarousel from '../../molecules/CardCarousel';
import './style.scss';

interface AppointmentsHistorySectionProps {
  pastAppointments: Appointment[];
  userType: 'doctor' | 'patient';
}

function AppointmentsHistorySection({
  pastAppointments,
  userType,
}: AppointmentsHistorySectionProps) {
  return (
    <Box className="appointments-history">
      <Typography variant="h3" className="subtitle">
        Histórico de consultas
      </Typography>
      <Box className="mobile-center">
        {pastAppointments.length > 0 ? (
          <CardCarousel appointments={pastAppointments} userType={userType} />
        ) : (
          <Typography className="without-appointment">
            Você não realizou nenhuma consulta.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AppointmentsHistorySection;
