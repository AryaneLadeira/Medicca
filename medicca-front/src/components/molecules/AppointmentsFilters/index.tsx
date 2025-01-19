import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { UserType } from '../../../utils/types';
import ClearFiltersButton from '../ClearFiltersButton';
import CrmFilter from '../CrmFilter';
import DateRangeFilter from '../DateRangeFilter';
import NameFilter from '../NameFilter';
import SpecialtyFilter from '../SpecialtyFilter';
import './style.scss';

interface AppointmentFiltersProps {
  userType: UserType;
  filters: {
    dateRange: [Dayjs | null, Dayjs | null];
    name: string;
    specialty: string;
    crm: string;
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
  const { name, specialty, crm, dateRange } = filters;

  const hasFiltersApplied = () => {
    return (
      name !== '' ||
      crm !== '' ||
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

      {userType === UserType.Patient && (
        <>
          <SpecialtyFilter
            value={specialty}
            onChange={(e) => onFilterChange('specialty', e.target.value)}
          />
          <CrmFilter
            value={crm}
            onChange={(e) => onFilterChange('crm', e.target.value)}
          />
        </>
      )}

      <ClearFiltersButton
        onClick={onClearFilters}
        disabled={!hasFiltersApplied()}
      />
    </Box>
  );
}

export default AppointmentFilters;
