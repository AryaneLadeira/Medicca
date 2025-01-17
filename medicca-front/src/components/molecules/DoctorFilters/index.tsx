import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Doctor } from '../../../utils/types';
import ClearFiltersButton from '../ClearFiltersButton';
import NameFilter from '../NameFilter';
import SpecialtyFilter from '../SpecialtyFilter';

interface DoctorFiltersProps {
  doctors: Doctor[];
  setFilteredDoctors: (doctors: Doctor[]) => void;
}

function DoctorFilters({ doctors, setFilteredDoctors }: DoctorFiltersProps) {
  const [filters, setFilters] = useState({
    name: '',
    specialty: '',
  });

  const { name, specialty } = filters;

  const applyFilters = () => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const matchesSpecialty = doctor.specialty
        .toLowerCase()
        .includes(specialty.toLowerCase());

      return matchesName && matchesSpecialty;
    });

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, doctors]);

  const handleFilterChange = (field: string, value: unknown) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      specialty: '',
    });
  };

  const hasFiltersApplied = () => name !== '' || specialty !== '';

  return (
    <Box
      className="filters-container"
      display="flex"
      gap={2}
      width="100%"
      alignItems="center"
    >
      <NameFilter
        userType={'patient'}
        value={name}
        onChange={(e) => handleFilterChange('name', e.target.value)}
      />
      <SpecialtyFilter
        value={specialty}
        onChange={(e) => handleFilterChange('specialty', e.target.value)}
      />
      <ClearFiltersButton
        onClick={handleClearFilters}
        disabled={!hasFiltersApplied()}
      />
    </Box>
  );
}

export default DoctorFilters;
