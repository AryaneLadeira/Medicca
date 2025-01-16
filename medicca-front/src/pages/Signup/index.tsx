import { Box, Container, Grid2 } from '@mui/material';
import { useState } from 'react';
import LoginHeader from '../../components/atoms/FormHeader';
import SlideForm from '../../components/organisms/SlideForm';
import './style.scss';
import SignupImageSlider from '../../components/molecules/SignupImageSlider';

function Signup() {
  const [isPatient, setIsPatient] = useState(true);

  return (
    <Box className="signup">
      <Container maxWidth="xl">
        <Grid2 container spacing={0}>
          <Grid2 size={{ xs: 0, md: 7 }} className="grid-slide-image">
            <SignupImageSlider isPatient={isPatient} />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box className="form-container">
              <LoginHeader
                title="Crie sua conta!"
                subtitle="Preencha os campos abaixo"
              />
              <SlideForm isPatient={isPatient} setIsPatient={setIsPatient} />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default Signup;