import { Box, Typography } from '@mui/material';
import LogoImage from '../../../assets/images/logo.png';
import './style.scss';

interface LogoProps {
  withText: boolean;
}

function Logo({ withText }: LogoProps) {
  return (
    <Box className={`logo-container ${withText ? 'pointer' : ''}`}>
      <img src={LogoImage} className={'logo'} alt="Logo Medicca" />
      {withText ? (
        <Typography variant="h6" className="logo-text">
          Medicca
        </Typography>
      ) : (
        ''
      )}
    </Box>
  );
}

export default Logo;
