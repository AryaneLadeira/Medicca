import { Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import SidebarHeader from '../../atoms/SidebarHeader';
import MenuComponent from '../../molecules/MenuComponent';
import MobileTopBar from '../../molecules/MobileTopBar';
import './style.scss';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isSmallScreen && !isOpen && (
        <MobileTopBar
          onMenuClick={toggleDrawer}
          avatar={'https://www.w3schools.com/howto/img_avatar.png'}
        />
      )}

      <Drawer
        anchor="left"
        open={isSmallScreen ? isOpen : true}
        onClose={toggleDrawer}
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        className={isSmallScreen ? 'sidebar-drawer-mobile' : 'sidebar-drawer'}
      >
        {isSmallScreen && isOpen && <SidebarHeader onClose={toggleDrawer} />}

        <MenuComponent />
      </Drawer>
    </>
  );
}

export default Sidebar;
