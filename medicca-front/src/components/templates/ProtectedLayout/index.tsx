import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar';
import TopBar from '../../organisms/TopBar';
import './style.scss';

function ProtectedLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {!isSmallScreen && <TopBar />}

      <div className="protected-container">
        <Sidebar />

        <main
          className="main"
          style={{
            marginLeft: isSmallScreen ? 0 : '240px',
            marginTop: isSmallScreen ? '55px': '',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProtectedLayout;
