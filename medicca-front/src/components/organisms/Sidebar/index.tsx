import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import './style.scss';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
  ];

  return (
    <>
      {isSmallScreen && (
        <IconButton onClick={toggleDrawer} className="menu-icon-button">
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="left"
        open={isSmallScreen ? isOpen : true}
        onClose={toggleDrawer}
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        className={isSmallScreen ? 'sidebar-drawer-mobile' : 'sidebar-drawer'}
      >
        <Box className="sidebar-container">
          {isSmallScreen && (
            <Box className="sidebar-header">
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={toggleDrawer} className="close-icon-button">
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          <Box className="sidebar-list">
            <List>
              {menuItems.map((item) => (
                <ListItem
                  disablePadding
                  key={item.text}
                  className="sidebar-list-item"
                >
                  <ListItemButton
                    onClick={() => (window.location.href = item.path)}
                    className="sidebar-list-button"
                  >
                    <ListItemIcon className="sidebar-list-icon">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
