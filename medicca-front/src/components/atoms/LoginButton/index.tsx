import { Button, Typography } from '@mui/material';
import './style.scss';

export default function LoginButton() {
  return (
    <Button
      className="login-btn"
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
    >
      <Typography variant="body2">Entrar</Typography>
    </Button>
  );
}
