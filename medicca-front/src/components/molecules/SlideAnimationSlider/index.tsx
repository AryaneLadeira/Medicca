// src/components/FormSlide.tsx

import { Box, Slide } from '@mui/material';

// Tipagem para as props do componente
interface FormSliderProps {
    booleanTest: boolean;
  containerRef: React.RefObject<HTMLElement>;
  FirstObject: React.ElementType;  // Tipagem para o componente de formulário de paciente
  SecondObject: React.ElementType;   // Tipagem para o componente de formulário de médico
}

export default function SlideAnimationSlider({
  booleanTest,
  containerRef,
  FirstObject,
  SecondObject,
}: FormSliderProps) {
  return (
    <>
      <Slide
        in={booleanTest}
        direction="left"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
          <FirstObject />
        </Box>
      </Slide>

      <Slide
        in={!booleanTest}
        direction="right"
        container={containerRef.current}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
          <SecondObject />
        </Box>
      </Slide>
    </>
  );
}
