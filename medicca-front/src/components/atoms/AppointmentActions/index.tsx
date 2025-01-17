import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import './style.scss';

interface AppointmentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

function AppointmentActions({ onEdit, onDelete }: AppointmentActionsProps) {
  return (
    <Box className="appointment-actions">
      <IconButton onClick={onEdit} color="primary">
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default AppointmentActions;
