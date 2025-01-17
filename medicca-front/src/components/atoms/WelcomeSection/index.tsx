import { Box, Typography } from '@mui/material';
import WelcomeImage from '../../../assets/images/welcome.png';
import './style.scss';

interface WelcomeSectionProps {
  name: string;
}

function WelcomeSection({ name }: WelcomeSectionProps) {
  return (
    <Box className="welcome">
      <Box>
        <Typography variant="h2">Bem-vindo de volta, {name}!</Typography>
        <Typography variant="body1">
          Fique à vontade para conferir seus agendamentos!
        </Typography>
      </Box>
      <img src={WelcomeImage} />
    </Box>
  );
}

export default WelcomeSection;
