import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { Appointment } from '../../../utils/types';
import AppointmentActions from '../AppointmentActions';
import './style.scss';

interface AppointmentCardProps {
  appointment?: Appointment;
  nextAppointment?: boolean;
  userType: 'doctor' | 'patient';
  hasActions?: boolean;
}

function AppointmentCard({
  appointment,
  nextAppointment,
  userType,
  hasActions,
}: AppointmentCardProps) {
  const handleEdit = () => {
    console.log('Editar agendamento');
  };

  const handleDelete = () => {
    console.log('Excluir agendamento');
  };

  return (
    <Card
      className={`appointment-card ${
        nextAppointment ? 'next-appointment-card' : ''
      }`}
    >
      {appointment ? (
        <>
          <Avatar className="avatar" />
          <CardContent>
            <Box className="card-name-container">
              <Typography variant="h5" className="card-name">
                {userType === 'doctor'
                  ? appointment.patient
                  : appointment.doctor}
              </Typography>
              <Typography>
                {userType === 'doctor'
                  ? appointment.countAppointments + 'ª consulta'
                  : appointment.specialty}
              </Typography>
            </Box>

            <Typography>
              {appointment.date} às {appointment.time}
            </Typography>
          </CardContent>

          {hasActions ? (
            <AppointmentActions onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            ''
          )}
        </>
      ) : (
        <Typography className="without-appointment">
          Você não tem consultas agendadas.
        </Typography>
      )}
    </Card>
  );
}

export default AppointmentCard;
