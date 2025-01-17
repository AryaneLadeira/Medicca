import { Alert, Snackbar, SnackbarProps } from '@mui/material';

type ToastProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
} & SnackbarProps;

function Toast({ open, message, severity, onClose, ...props }: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...props}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
