import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import ProfileAvatar from '../../atoms/ProfileAvatar';
import './style.scss';

interface MobileTopBarProps {
  onMenuClick: () => void;
  avatar: string;
}

function MobileTopBar({ onMenuClick, avatar }: MobileTopBarProps) {
  return (
    <Box className="topbar-mobile">
      <IconButton onClick={onMenuClick} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
      <ProfileAvatar avatar={avatar} />
    </Box>
  );
}

export default MobileTopBar;
