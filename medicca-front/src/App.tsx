import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/routes';
import './styles/style.scss';

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
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.875rem',
      color: '#888',
    },
    h6: {
      fontSize: '1.6rem',
      fontFamily: '"Poetsen One", serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
