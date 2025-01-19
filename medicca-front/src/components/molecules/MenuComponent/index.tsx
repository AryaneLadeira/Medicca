import { Home as HomeIcon } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { UserType } from '../../../utils/types';
import Toast from '../../atoms/Toast';
import LoadingScreen from '../../organisms/LoadingScreen';
import './style.scss';

interface MenuItemType {
  text: string;
  icon?: React.ReactNode;
  path?: string;
  action?: () => void;
  style?: React.CSSProperties;
}

function MenuComponent() {
  const navigate = useNavigate();
  const { logout, getToken } = useAuthContext();
  const { user } = useAuthContext();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'error'
  );
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      if (getToken()) await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      setToastMessage('Não foi possível realizar o logout.');
      setToastSeverity('error');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const menuItems: MenuItemType[] = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    {
      text: 'Agendamentos',
      icon: <CalendarMonthIcon />,
      path: '/agendamentos',
    },
    {
      text: 'Sair',
      icon: <LogoutIcon />,
      action: handleLogout,
      style: { color: 'red' },
    },
  ];

  if (user?.type === UserType.Patient) {
    const index = menuItems.findIndex((item) => item.text === 'Sair');
    menuItems.splice(index, 0, {
      text: 'Médicos',
      icon: <MedicalInformationIcon />,
      path: '/medicos',
    });
  }

  return (
    <>
      {loading && <LoadingScreen />}{' '}
      <List className="sidebar-list">
        {menuItems.map((item) => (
          <ListItem
            disablePadding
            key={item.text}
            className="sidebar-list-item"
            style={item.style}
          >
            <ListItemButton
              onClick={() =>
                item.path ? handleNavigate(item.path) : item.action?.()
              }
              className="sidebar-list-button"
            >
              {item.icon && (
                <ListItemIcon className="sidebar-list-icon" style={item.style}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.text}
                className="sidebar-list-text"
                style={item.style}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

export default MenuComponent;
