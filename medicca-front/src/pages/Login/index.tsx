import { Box, Container, Grid2 } from '@mui/material';
import LoginForm from '../../components/molecules/LoginForm';
import './style.scss';

import LoginImage from '../../assets/images/login-image.png';
import SignupLink from '../../components/atoms/SignupLink';
import LoginHeader from '../../components/molecules/LoginHeader';

export default function Login() {
  return (
    <Box className="login">
      <Container maxWidth="xl">
        <Grid2 container spacing={0}>
          <Grid2 size={{ xs: 0, md: 7 }}>
            <Box className="login-image-container">
              <img src={LoginImage} alt="Imagem ilustrando a tela inicial" className='initial-image'/>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box className="login-container">
              <LoginHeader />
              <LoginForm />
              <SignupLink />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
