import { Box, Slide } from '@mui/material';
import './style.scss';

interface FormSliderProps {
  booleanTest: boolean;
  containerRef: React.RefObject<HTMLElement>;
  FirstObject: React.ReactNode;
  SecondObject: React.ReactNode;
}

function SlideAnimationSlider({
  booleanTest,
  containerRef,
  FirstObject,
  SecondObject,
}: FormSliderProps) {
  return (
    <>
      <Box className="slide-form-container">
        <Slide
          in={booleanTest}
          direction="left"
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            {booleanTest ? FirstObject : ''}
          </Box>
        </Slide>

        <Slide
          in={!booleanTest}
          direction="right"
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            {!booleanTest ? SecondObject : ''}
          </Box>
        </Slide>
      </Box>
    </>
  );
}

export default SlideAnimationSlider;
