import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8f70f5',
    },
    secondary: {
      main: '#240e6a',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.875rem',
      color: '#888',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
