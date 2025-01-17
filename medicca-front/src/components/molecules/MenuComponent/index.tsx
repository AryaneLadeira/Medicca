import { Home as HomeIcon } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

interface MenuItemType {
  text: string;
  icon?: React.ReactNode;
  path: string;
}

function MenuComponent() {
  const userType = 'patient'; // Substitua conforme o valor real do userType
  const navigate = useNavigate();

  const menuItems: MenuItemType[] = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    {
      text: 'Agendamentos',
      icon: <CalendarMonthIcon />,
      path: '/agendamentos',
    },
  ];

  if (userType === 'patient') {
    menuItems.push({
      text: 'Médicos',
      icon: <MedicalInformationIcon />,
      path: '/medicos',
    });
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <List className="sidebar-list">
      {menuItems.map((item) => (
        <ListItem disablePadding key={item.text} className="sidebar-list-item">
          <ListItemButton
            onClick={() => handleNavigate(item.path)}
            className="sidebar-list-button"
          >
            {item.icon && (
              <ListItemIcon className="sidebar-list-icon">
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.text} className="sidebar-list-text" />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default MenuComponent;
