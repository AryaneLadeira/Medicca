import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { AppointmentService } from '../../../api/services/AppointmentService';
import { formatDateToYMD } from '../../../utils/format';
import { Appointment } from '../../../utils/types';
import './style.scss';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
  onUpdateAppointments: () => void;
  showToast: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}

function EditAppointmentDialog({
  open,
  onClose,
  appointment,
  onUpdateAppointments,
  showToast,
}: EditModalProps) {
  const [editedAppointment, setEditedAppointment] =
    useState<Appointment>(appointment);

  useEffect(() => {
    if (appointment && appointment.consultation_date) {
      setEditedAppointment({
        ...appointment,
        consultation_date: formatDateToYMD(appointment.consultation_date),
      });
    }
  }, [appointment]);

  const handleEditChange = (field: string, value: string) => {
    setEditedAppointment({
      ...editedAppointment,
      [field]: value,
    });
  };

  const handleConfirm = async () => {
    try {
      await AppointmentService.updateAppointment(editedAppointment);
      showToast('Consulta atualizada com sucesso!', 'success');
      onUpdateAppointments();
      onClose();
    } catch (error) {
      showToast('Erro ao atualizar consulta ' + error, 'error');
    }
  };

  const formattedDate = editedAppointment.consultation_date || '';

  return (
    <Dialog open={open} onClose={onClose} className="dialog">
      <DialogTitle variant="h3">Editar Agendamento</DialogTitle>
      <DialogContent>
        {appointment && (
          <>
            <TextField
              type="date"
              value={formattedDate}
              onChange={(e) => {
                console.log('Input date change:', e.target.value);
                handleEditChange('consultation_date', e.target.value);
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hora"
              type="time"
              value={editedAppointment.consultation_time}
              onChange={(e) => handleEditChange('consultation_time', e.target.value)}
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
