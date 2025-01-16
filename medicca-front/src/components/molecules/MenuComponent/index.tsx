// MenuComponent.tsx
import { Home as HomeIcon } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItemType {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

function MenuComponent() {
  const navigate = useNavigate();

  const menuItems: MenuItemType[] = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/') },
  ];

  return (
    <List className="sidebar-list">
      {menuItems.map((item) => (
        <ListItem disablePadding key={item.text} className="sidebar-list-item">
          <ListItemButton
            onClick={item.onClick}
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
