import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import { useAuthContext } from '../../../context/AuthContext';
import { DoctorData } from '../../../utils/types';
import CreateAppointmentDialog from '../../molecules/CreateAppointmentDialog';
import Toast from '../Toast';
import './style.scss';

interface DoctorCardProps {
  doctor: DoctorData;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { createAppointment } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateAppointment = async (appointment: {
    date: string;
    time: string;
  }) => {
    if (!user) {
      console.error('Usuário não autenticado.');
      return;
    }

    try {
      const appointmentData = {
        patient_id: user.specificId,
        doctor_id: doctor.id,
        consultation_date: appointment.date,
        consultation_time: appointment.time,
      };

      await createAppointment(appointmentData);

      setToastMessage('Consulta agendada com sucesso!');
      setToastSeverity('success');
      setToastOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      setToastMessage('Erro ao agendar consulta. Tente novamente.');
      setToastSeverity('error');
      setToastOpen(true);
    }
  };

  return (
    <>
      <Card className="doctor-card">
        <Avatar className="avatar" />
        <CardContent>
          <Typography variant="h5">{doctor.name}</Typography>
          <Typography>{doctor.specialty.name}</Typography>
          <Typography>CRM {doctor.crm}</Typography>
        </CardContent>
        <IconButton
          color="secondary"
          className="new-appointment-btn"
          onClick={handleOpenDialog}
        >
          <CalendarMonthIcon />
        </IconButton>
      </Card>

      <CreateAppointmentDialog
        open={openDialog}
        onClose={handleCloseDialog}
        doctor={doctor}
        onCreateConfirm={handleCreateAppointment}
      />

      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

export default DoctorCard;
