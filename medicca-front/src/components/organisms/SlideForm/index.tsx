import { Box } from '@mui/material';
import { useRef } from 'react';
import SlideFormButtons from '../../atoms/SlideFormButtons';
import SlideAnimationSlider from '../../molecules/SlideAnimationSlider';
import DoctorSignupForm from '../DoctorSignupForm';
import PatientSignupForm from '../PatientSignupForm';
import './style.scss';

interface SlideFormProps {
  isPatient: boolean;
  setIsPatient: (value: boolean) => void;
}

export default function SlideForm({ isPatient, setIsPatient }: SlideFormProps) {
  const containerRef = useRef(null);

  return (
    <Box className="slide-form-container">
      <SlideFormButtons isPatient={isPatient} setIsPatient={setIsPatient} />
      <SlideAnimationSlider
        booleanTest={isPatient}
        FirstObject={<PatientSignupForm />}
        SecondObject={<DoctorSignupForm />}
        containerRef={containerRef}
      />
    </Box>
  );
}
