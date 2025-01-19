import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import Toast from '../../atoms/Toast';
import './style.scss';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  appointmentId: number;
  onUpdateAppointments: () => void;
  showToast: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}

function DeleteAppointmentDialog({
  open,
  onClose,
  appointmentId,
  onUpdateAppointments,
  showToast,
}: DeleteModalProps) {
  const { deleteAppointment } = useAppointmentsContext();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleToastClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await deleteAppointment(appointmentId);
      showToast('Agendamento cancelado com sucesso!', 'success');
      onUpdateAppointments();
      onClose();
    } catch (error) {
      showToast('Erro ao cancelar agendamento.' + error, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="dialog">
        <DialogTitle variant="h3">
          Deseja desmarcar este agendamento?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Se confirmar, você terá que realizar um novo agendamento.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="error"
            variant="contained"
            className="dialog-btn"
            disabled={loading}
          >
            Não
          </Button>
          <Button
            onClick={handleConfirm}
            color="secondary"
            variant="contained"
            className="dialog-btn"
            disabled={loading}
          >
            {loading ? 'Aguarde...' : 'Sim'}
          </Button>
        </DialogActions>
      </Dialog>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </>
  );
}

export default DeleteAppointmentDialog;
