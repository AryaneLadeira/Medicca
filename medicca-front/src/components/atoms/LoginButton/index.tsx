import { Button, Typography } from '@mui/material';
import './style.scss';

function LoginButton() {
  return (
    <Button
      className="large-btn"
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
    >
      <Typography variant="body2">Entrar</Typography>
    </Button>
  );
}

export default LoginButton;
