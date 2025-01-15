import { Box, Typography } from '@mui/material';
import Logo from '../../../assets/images/logo.png';
import './style.scss';

export default function LoginHeader() {
  return (
    <Box className="login-header">
      <img src={Logo} className="login-logo" alt="Logo Medicca" />
      <Typography variant="h2" className="login-title">
        Bem vindo de volta!
      </Typography>
      <Typography variant="body1">Por favor, preencha os seus dados</Typography>
    </Box>
  );
}
