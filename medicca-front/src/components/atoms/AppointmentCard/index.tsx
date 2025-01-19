import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Appointment, UserType } from '../../../utils/types';
import DeleteAppointmentDialog from '../../molecules/DeleteAppointmentDialog';
import EditAppointmentDialog from '../../molecules/EditAppointmentDialog';
import AppointmentActions from '../AppointmentActions';
import './style.scss';

interface AppointmentCardProps {
  appointment?: Appointment;
  nextAppointment?: boolean;
  userType: UserType;
  hasActions?: boolean;
  onUpdateAppointments: () => void;
  showToast: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}

function AppointmentCard({
  appointment,
  nextAppointment,
  userType,
  hasActions,
  onUpdateAppointments,
  showToast,
}: AppointmentCardProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleDeleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleEditOpen = () => {
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleEditConfirm = (updatedAppointment: Appointment) => {
    console.log('Agendamento editado:', updatedAppointment);
    setOpenEditModal(false);
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
                {userType === UserType.Doctor
                  ? appointment.patient.name
                  : appointment.doctor.name}
              </Typography>
              <Typography>
                {userType === UserType.Doctor
                  ? appointment.appointments_count + 'ª consulta'
                  : appointment.doctor.specialty.name}
              </Typography>
            </Box>

            <Typography>
              {appointment.consultation_date} às {appointment.consultation_time}
            </Typography>
          </CardContent>

          {hasActions ? (
            <AppointmentActions
              onEdit={handleEditOpen}
              onDelete={handleDeleteOpen}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <Typography className="without-appointment">
          Você não tem consultas agendadas.
        </Typography>
      )}
      {appointment ? (
        <>
          <DeleteAppointmentDialog
            open={openDeleteModal}
            onClose={handleDeleteClose}
            appointmentId={appointment.id}
            onUpdateAppointments={onUpdateAppointments}
            showToast={showToast}
          />

          <EditAppointmentDialog
            open={openEditModal}
            onClose={handleEditClose}
            appointment={appointment}
            onEditConfirm={handleEditConfirm}
          />
        </>
      ) : (
        ''
      )}
    </Card>
  );
}

export default AppointmentCard;
