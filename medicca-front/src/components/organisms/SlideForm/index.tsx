// src/components/FormSwitcher.tsx

import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import SlideFormButtons from '../../atoms/SlideFormButtons';
import SlideAnimationSlider from '../../molecules/SlideAnimationSlider';
import PatientSignupForm from '../PatientSignupForm';
import DoctorSignupForm from '../DoctorSignupForm';

interface SlideFormProps {
  defaultIsPatient?: boolean;
}

export default function SlideForm({ defaultIsPatient = true }: SlideFormProps) {
  const [isPatient, setIsPatient] = useState(defaultIsPatient);
  const containerRef = useRef(null);

  return (
    <Box
      className="form-container"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '300px',
      }}
    >
      <SlideFormButtons isPatient={isPatient} setIsPatient={setIsPatient} />
      <SlideAnimationSlider booleanTest={isPatient} FirstObject={PatientSignupForm} SecondObject={DoctorSignupForm}  containerRef={containerRef}/>
    </Box>
  );
}
