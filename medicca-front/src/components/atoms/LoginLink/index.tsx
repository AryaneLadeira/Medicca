import { Box, Link, Typography } from '@mui/material';
import './style.scss';

function LoginLink() {
  return (
    <Box>
      <Typography variant="body1">
        Já tem uma conta?ﾠ
        <Link href="/login" variant="body2">
          Entre agora
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginLink;
