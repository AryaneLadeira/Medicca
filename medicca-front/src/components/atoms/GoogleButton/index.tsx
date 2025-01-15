import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography } from '@mui/material';
import './style.scss';

export default function GoogleButton() {
  return (
    <Button className="google-login-btn" fullWidth>
      <GoogleIcon className="google-icon" />
      <Typography variant="body2">
        Entrar com o Google
      </Typography>
    </Button>
  );
}
