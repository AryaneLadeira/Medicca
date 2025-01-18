import { Button, Typography } from '@mui/material';
import './style.scss';

interface LoginButtonProps {
  disabled?: boolean;
}

function LoginButton({ disabled }: LoginButtonProps) {
  return (
    <Button
      className="large-btn"
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      fullWidth
    >
      <Typography variant="body2">Entrar</Typography>
    </Button>
  );
}

export default LoginButton;
