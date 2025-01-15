import { Box, Container, Grid2 } from '@mui/material';
import LoginForm from '../../components/molecules/LoginForm';
import './style.scss';

import LoginAnimatedImage from '../../components/atoms/LoginAnimatedImage';
import SignupLink from '../../components/atoms/SignupLink';
import LoginHeader from '../../components/molecules/LoginHeader';

export default function Login() {
  return (
    <Box className="login">
      <Container maxWidth="xl">
        <Grid2 container spacing={0}>
          <Grid2 size={{ xs: 0, md: 7 }}>
            <LoginAnimatedImage />
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
