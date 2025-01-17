import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import DoctorCard from '../../components/atoms/DoctorCard';
import DoctorFilters from '../../components/molecules/DoctorFilters';
import { Doctor } from '../../utils/types';
import './style.scss';

function Doctors() {
  const doctors: Doctor[] = [
    { name: 'Dr. João Silva', specialty: 'Cardiologia' },
    { name: 'Dra. Maria Oliveira', specialty: 'Dermatologia' },
    { name: 'Dr. Pedro Souza', specialty: 'Ortopedia' },
  ];

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  return (
    <Box className="doctors-container">
      <DoctorFilters
        doctors={doctors}
        setFilteredDoctors={setFilteredDoctors}
      />

      {filteredDoctors.length > 0 ? (
        <Box className="doctor-cards-container">
          {filteredDoctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.name} />
          ))}
        </Box>
      ) : (
        <Typography className="empty">Não há médicos para mostrar.</Typography>
      )}
    </Box>
  );
}

export default Doctors;
