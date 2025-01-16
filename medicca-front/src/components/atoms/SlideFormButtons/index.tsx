import { Box, Button } from '@mui/material';

interface FormButtonsProps {
  isPatient: boolean;
  setIsPatient: (value: boolean) => void;
}

export default function SlideFormButtons({
  isPatient,
  setIsPatient,
}: FormButtonsProps) {
  return (
    <Box className="toggle-buttons">
      <Button
        variant={isPatient ? 'contained' : 'outlined'}
        onClick={() => setIsPatient(true)}
      >
        Paciente
      </Button>
      <Button
        variant={!isPatient ? 'contained' : 'outlined'}
        onClick={() => setIsPatient(false)}
      >
        Médico
      </Button>
    </Box>
  );
}
