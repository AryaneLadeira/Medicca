import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DoctorData } from '../../../utils/types';
import ClearFiltersButton from '../ClearFiltersButton';
import CrmFilter from '../CrmFilter';
import NameFilter from '../NameFilter';
import SpecialtyFilter from '../SpecialtyFilter';

interface DoctorFiltersProps {
  doctors: DoctorData[];
  setFilteredDoctors: (doctors: DoctorData[]) => void;
}

function DoctorFilters({ doctors, setFilteredDoctors }: DoctorFiltersProps) {
  const [filters, setFilters] = useState({
    name: '',
    specialty: '',
    crm: '',
  });

  const { name, specialty, crm } = filters;

  const applyFilters = () => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const matchesSpecialty = doctor.specialty.name
        .toLowerCase()
        .includes(specialty.toLowerCase());
      const matchesCrm = doctor.crm.includes(crm);

      return matchesName && matchesSpecialty && matchesCrm;
    });

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (field: string, value: unknown) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      specialty: '',
      crm: '',
    });
  };

  const hasFiltersApplied = () => name !== '' || specialty !== '' || crm !== '';

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
      <CrmFilter
        value={crm}
        onChange={(e) => handleFilterChange('crm', e.target.value)}
      />
      <ClearFiltersButton
        onClick={handleClearFilters}
        disabled={!hasFiltersApplied()}
      />
    </Box>
  );
}

export default DoctorFilters;
