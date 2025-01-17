import { Box, Typography } from '@mui/material';
import ErrorImage from '../../assets/images/404-error.png';
import FloatingAnimatedImage from '../../components/atoms/FloatingAnimatedImage';
import Logo from '../../components/atoms/Logo';
import './style.scss';

function NotFound() {
  return (
    <Box className="not-found-container">
      <Box className="not-found-logo">
        <Logo withText />
      </Box>
      <Box>
        <FloatingAnimatedImage src={ErrorImage} alt="Personagens confusos" />
        <Typography variant='h2'>404 - Página Não Encontrada</Typography>
        <Typography variant="body1">A página que você está procurando não existe.</Typography>
      </Box>
    </Box>
  );
}

export default NotFound;
