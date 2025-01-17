import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import './style.scss';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteAppointmentDialog({
  open,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="dialog">
      <DialogTitle variant="h3">Deseja desmarcar este agendamento?</DialogTitle>
      <DialogContent>
        <Typography>
          Se confirmar, você terá que realizar um novo agendamento.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant='contained' className='dialog-btn'>
          Não
        </Button>
        <Button onClick={onConfirm} color="secondary" variant='contained' className='dialog-btn'>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAppointmentDialog;
