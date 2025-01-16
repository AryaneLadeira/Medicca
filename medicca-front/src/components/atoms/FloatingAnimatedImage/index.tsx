import { Box } from '@mui/material';
import './style.scss';

interface FloatingAnimatedImageProps {
  src: string;
  alt?: string;
}

export default function FloatingAnimatedImage({ src, alt = 'Imagem animada' }: FloatingAnimatedImageProps) {
  return (
    <Box className="login-image-container">
      <img
        src={src}
        alt={alt}
        className="initial-image"
      />
    </Box>
  );
}
