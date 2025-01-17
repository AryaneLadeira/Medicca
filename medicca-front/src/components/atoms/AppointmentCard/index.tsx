import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Appointment } from '../../../utils/types';
import DeleteAppointmentDialog from '../../molecules/DeleteAppointmentDialog';
import EditAppointmentDialog from '../../molecules/EditAppointmentDialog';
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleDeleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Agendamento desmarcado');
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

      <DeleteAppointmentDialog
        open={openDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />

      <EditAppointmentDialog
        open={openEditModal}
        onClose={handleEditClose}
        appointment={appointment}
        onEditConfirm={handleEditConfirm}
      />
    </Card>
  );
}

export default AppointmentCard;
