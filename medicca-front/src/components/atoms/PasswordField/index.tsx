import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';

interface PasswordFieldProps {
  label: string;
  margin: 'normal' | 'none';
}

function PasswordField({ label, margin }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      label={label}
      required
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      margin={margin}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        },
      }}
    />
  );
}

export default PasswordField;
