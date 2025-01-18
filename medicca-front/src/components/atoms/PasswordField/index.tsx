import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import "./style.scss";

interface PasswordFieldProps {
  label: string;
  margin: "normal" | "none";
  value: string;
  onChange: (value: string) => void;
}

function PasswordField({ label, margin, value, onChange }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      label={label}
      required
      variant="outlined"
      type={showPassword ? "text" : "password"}
      fullWidth
      margin={margin}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );
}

export default PasswordField;
