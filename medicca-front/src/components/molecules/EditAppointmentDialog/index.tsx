import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Appointment } from '../../../utils/types';
import './style.scss';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | undefined;
  onEditConfirm: (updatedAppointment: Appointment) => void;
}

function EditAppointmentDialog({
  open,
  onClose,
  appointment,
  onEditConfirm,
}: EditModalProps) {
  const [editedAppointment, setEditedAppointment] = useState<Appointment>(
    appointment || {
      doctor: '',
      patient: '',
      specialty: '',
      countAppointments: 0,
      time: '',
      date: '',
    }
  );

  const handleEditChange = (field: string, value: string) => {
    setEditedAppointment({
      ...editedAppointment,
      [field]: value,
    });
  };

  const handleConfirm = () => {
    if (editedAppointment) {
      onEditConfirm(editedAppointment);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="dialog">
      <DialogTitle variant="h3">Editar Agendamento</DialogTitle>
      <DialogContent>
        {appointment && (
          <>
            <TextField
              label="Data"
              type="date"
              value={editedAppointment?.date || ''}
              onChange={(e) => handleEditChange('date', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hora"
              type="time"
              value={editedAppointment?.time || ''}
              onChange={(e) => handleEditChange('time', e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}
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
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAppointmentDialog;
