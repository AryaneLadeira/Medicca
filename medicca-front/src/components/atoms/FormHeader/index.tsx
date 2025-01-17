import { Box, Typography } from '@mui/material';

import Logo from '../Logo';
import './style.scss';

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <Box className="login-header">
      <Logo withText={false} />
      <Typography variant="h2" className="login-title">
        {title}
      </Typography>
      <Typography variant="body1">{subtitle}</Typography>
    </Box>
  );
}

export default FormHeader;
