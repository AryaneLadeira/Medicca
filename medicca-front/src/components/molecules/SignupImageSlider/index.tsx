import { Box } from '@mui/material';
import { useRef } from 'react';
import DoctorImage from '../../../assets/images/doctor-signup.png';
import PatientImage from '../../../assets/images/patient-signup.png';
import FloatingAnimatedImage from '../../atoms/FloatingAnimatedImage';
import SlideAnimationSlider from '../SlideAnimationSlider';
import './style.scss';

interface SignupImageSliderProps {
  isPatient: boolean;
}

function SignupImageSlider({ isPatient }: SignupImageSliderProps) {
  const containerImageRef = useRef(null);
  return (
    <Box className="slide-image-container">
      <SlideAnimationSlider
        booleanTest={isPatient}
        FirstObject={
          <FloatingAnimatedImage
            src={PatientImage}
            alt="Imagem animada ilustrando um paciente"
          />
        }
        SecondObject={
          <FloatingAnimatedImage
            src={DoctorImage}
            alt="Imagem animada ilustrando um médico"
          />
        }
        containerRef={containerImageRef}
      />
    </Box>
  );
}

export default SignupImageSlider;
