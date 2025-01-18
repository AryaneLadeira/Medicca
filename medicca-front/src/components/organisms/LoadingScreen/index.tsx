import { Box, CircularProgress } from '@mui/material';
import './style.scss';

function LoadingScreen() {
  return (
    <Box className="loading-screen">
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default LoadingScreen;
