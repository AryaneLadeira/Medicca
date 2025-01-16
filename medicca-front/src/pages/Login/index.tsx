import { Box, Container, Grid2 } from '@mui/material';
import LoginImage from '../../assets/images/login-image.png';
import FloatingAnimatedImage from '../../components/atoms/FloatingAnimatedImage';
import FormHeader from '../../components/atoms/FormHeader';
import SignupLink from '../../components/atoms/SignupLink';
import LoginForm from '../../components/organisms/LoginForm';
import './style.scss';

export default function Login() {
  return (
    <Box className="login">
      <Container maxWidth="xl">
        <Grid2 container spacing={0}>
          <Grid2 size={{ xs: 0, md: 7 }}>
            <FloatingAnimatedImage
              src={LoginImage}
              alt="Imagem animada ilustrando a tela inicial"
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box className="login-container">
              <FormHeader
                title="Bem vindo de volta!"
                subtitle="Por favor, preencha os seus dados"
              />
              <LoginForm />
              <SignupLink />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
