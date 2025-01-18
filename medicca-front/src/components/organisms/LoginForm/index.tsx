import { Alert, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import ForgotPasswordLink from '../../atoms/ForgotPasswordLink';
import GoogleButton from '../../atoms/GoogleButton';
import LoginButton from '../../atoms/LoginButton';
import PasswordField from '../../atoms/PasswordField';
import './style.scss';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField
          label="Senha"
          margin="normal"
          value={password}
          onChange={(password) => setPassword(password)}
        />

        {error && (
          <Alert severity="error" style={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}
        <ForgotPasswordLink />
        <LoginButton disabled={isLoading} />
        <GoogleButton />
      </form>
    </Box>
  );
}

export default LoginForm;