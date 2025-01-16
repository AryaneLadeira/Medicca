import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar';
import TopBar from '../../organisms/TopBar';

function ProtectedLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {!isSmallScreen && <TopBar />}

      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <Sidebar />

        <main
          style={{
            flexGrow: 1,
            padding: '20px',
            marginTop: isSmallScreen ? 0 : '64px',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProtectedLayout;
