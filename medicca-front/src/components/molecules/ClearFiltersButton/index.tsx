import ClearIcon from '@mui/icons-material/FilterListOff';
import { IconButton } from '@mui/material';
import './style.scss';

interface ClearFiltersButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function ClearFiltersButton({ onClick, disabled }: ClearFiltersButtonProps) {
  return (
    <IconButton
      color="secondary"
      onClick={onClick}
      className="clear-filters-btn"
      sx={{ minWidth: 'auto' }}
      disabled={disabled}
    >
      <ClearIcon />
    </IconButton>
  );
}

export default ClearFiltersButton;
