import { Box } from '@mui/material';
import LoginImage from '../../../assets/images/login-image.png';
import './style.scss';

export default function LoginAnimatedImage() {
  return (
    <Box className="login-image-container">
      <img
        src={LoginImage}
        alt="Imagem ilustrando a tela inicial"
        className="initial-image"
      />
    </Box>
  );
}
