import { Box, Link, Typography } from '@mui/material';

export default function SignupLink() {
  return (
    <Box>
      <Typography variant="body1">
        Não tem uma conta?ﾠ
        <Link href="#" variant="body2">
          Crie uma agora
        </Link>
      </Typography>
    </Box>
  );
}
