import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import { useAuthContext } from '../../../context/AuthContext';
import { DoctorData } from '../../../utils/types';
import Toast from '../../atoms/Toast';
import './style.scss';

interface CreateAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  doctor: DoctorData;
}

function CreateAppointmentDialog({
  open,
  onClose,
  doctor,
}: CreateAppointmentDialogProps) {
  const [loading, setLoading] = useState(false);
  const { createAppointment } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleChange = (field: string, value: string) => {
    setAppointmentData({
      ...appointmentData,
      [field]: value,
    });
  };

  const handleCreateAppointment = async () => {
    if (!user) {
      setToastMessage('Erro: usuário não autenticado.');
      setToastSeverity('error');
      setToastOpen(true);
      return;
    }

    try {
      setLoading(true);

      const appointmentPayload = {
        patient_id: user.specificId,
        doctor_id: doctor.id,
        consultation_date: appointmentData.date,
        consultation_time: appointmentData.time,
      };

      await createAppointment(appointmentPayload);

      setToastMessage('Consulta agendada com sucesso!');
      setToastSeverity('success');
      setToastOpen(true);
      setAppointmentData({ date: '', time: '' });
      onClose();
    } catch (error) {
      setToastMessage('Erro ao agendar consulta. Tente novamente.' + error);
      setToastSeverity('error');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="dialog center">
        <DialogTitle variant="h3">Agendar Consulta</DialogTitle>
        <DialogContent>
          <Box className="center">
            <Typography variant="body2">Consulta com {doctor.name}</Typography>
            <Typography variant="body1">
              Especialidade {doctor.specialty.name}
            </Typography>
          </Box>

          <TextField
            type="date"
            value={appointmentData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="time"
            value={appointmentData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="error"
            className="dialog-btn"
            disabled={loading}
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateAppointment}
            color="secondary"
            disabled={loading}
            className="dialog-btn"
            variant="contained"
          >
            {loading ? 'Aguarde...' : 'Agendar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

export default CreateAppointmentDialog;
