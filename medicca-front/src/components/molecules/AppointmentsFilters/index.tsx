import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import NameFilter from '../NameFilter';
import DateRangeFilter from '../DateRangeFilter';
import SpecialtyFilter from '../SpecialtyFilter';
import ClearFiltersButton from '../ClearFiltersButton';
import './style.scss';

interface AppointmentFiltersProps {
  userType: string;
  filters: {
    dateRange: [Dayjs | null, Dayjs | null];
    name: string;
    specialty: string;
  };
  onFilterChange: (field: string, value: unknown) => void;
  onClearFilters: () => void;
}

function AppointmentFilters({
  userType,
  filters,
  onFilterChange,
  onClearFilters,
}: AppointmentFiltersProps) {
  const { name, specialty, dateRange } = filters;

  const hasFiltersApplied = () => {
    return (
      name !== '' ||
      specialty !== '' ||
      dateRange[0] !== null ||
      dateRange[1] !== null
    );
  };

  return (
    <Box className="filters-container">
      <NameFilter
        userType={userType}
        value={name}
        onChange={(e) => onFilterChange('name', e.target.value)}
      />
      <DateRangeFilter
        value={dateRange}
        onChange={(newValue) => onFilterChange('dateRange', newValue)}
      />
      {userType !== 'patient' ? null : (
        <SpecialtyFilter
          value={specialty}
          onChange={(e) => onFilterChange('specialty', e.target.value)}
        />
      )}
      <ClearFiltersButton
        onClick={onClearFilters}
        disabled={!hasFiltersApplied()}
      />
    </Box>
  );
}

export default AppointmentFilters;
