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
import { DoctorData } from '../../../utils/types';
import './style.scss';

interface CreateAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  doctor: DoctorData;
  onCreateConfirm: (appointment: { date: string; time: string }) => void;
}

function CreateAppointmentDialog({
  open,
  onClose,
  doctor,
  onCreateConfirm,
}: CreateAppointmentDialogProps) {
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
  });

  const handleChange = (field: string, value: string) => {
    setAppointmentData({
      ...appointmentData,
      [field]: value,
    });
  };

  const handleConfirm = () => {
    onCreateConfirm(appointmentData);
  };

  return (
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
          variant="contained"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="secondary"
          className="dialog-btn"
          variant="contained"
        >
          Agendar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateAppointmentDialog;
