import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material'
import './style.scss';

interface SidebarHeaderProps {
  onClose: () => void;
}

function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <Box className="sidebar-header">
      <Typography variant="h6">Menu</Typography>
      <IconButton onClick={onClose} className="close-icon-button">
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default SidebarHeader;
