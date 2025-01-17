import { Box, Typography } from '@mui/material';
import { Appointment } from '../../../utils/types';
import AppointmentCard from '../../atoms/AppointmentCard';
import './style.scss';

interface NextAppointmentSectionProps {
  nextAppointment: Appointment | null;
  userType: 'doctor' | 'patient';
}

function NextAppointmentSection({
  nextAppointment,
  userType,
}: NextAppointmentSectionProps) {
  return (
    <Box className="next-appointment">
      <Typography variant="h3" className="subtitle">
        Sua próxima consulta
      </Typography>
      <Box className="mobile-center">
        {nextAppointment ? (
          <AppointmentCard appointment={nextAppointment} userType={userType} />
        ) : (
          <Typography className="without-appointment">
            Você não tem consultas agendadas.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default NextAppointmentSection;
