import { Box, TextField } from '@mui/material';
import ForgotPasswordLink from '../../atoms/ForgotPasswordLink';
import GoogleButton from '../../atoms/GoogleButton';
import LoginButton from '../../atoms/LoginButton';
import PasswordField from '../../atoms/PasswordField';
import './style.scss';

export default function LoginForm() {
  return (
    <Box className="login-form-container">
      <form className="login-form" style={{ width: '80%', maxWidth: 400 }}>
        <TextField
          label="Email"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
        />
        <PasswordField label="Senha" />
        <ForgotPasswordLink />
        <LoginButton />
        <GoogleButton />
      </form>
    </Box>
  );
}
