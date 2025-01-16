import { Box, Slide } from '@mui/material';
import './style.scss';

interface FormSliderProps {
  booleanTest: boolean;
  containerRef: React.RefObject<HTMLElement>;
  FirstObject: React.ReactNode;
  SecondObject: React.ReactNode;
}

export default function SlideAnimationSlider({
  booleanTest,
  containerRef,
  FirstObject,
  SecondObject,
}: FormSliderProps) {
  return (
    <>
      <Box>
        <Slide
          in={booleanTest}
          direction="left"
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
            {FirstObject}
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
            {SecondObject}
          </Box>
        </Slide>
      </Box>
    </>
  );
}
