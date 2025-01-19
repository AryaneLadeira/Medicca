import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DoctorCard from '../../components/atoms/DoctorCard';
import DoctorFilters from '../../components/molecules/DoctorFilters';
import LoadingScreen from '../../components/organisms/LoadingScreen';
import { useAuthContext } from '../../context/AuthContext';
import { useDoctorsContext } from '../../context/DoctorsContext';
import { DoctorData } from '../../utils/types';
import './style.scss';
import { isUnder18 } from '../../utils/functions';

function Doctors() {
  const { getDoctors } = useDoctorsContext();
  const { user } = useAuthContext();
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      const doctorsData = await getDoctors();
      setDoctors(doctorsData);
      setFilteredDoctors(doctorsData);
    } catch (error) {
      console.error('Erro ao carregar os médicos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDoctors();
  }, [getDoctors]);

  useEffect(() => {
    if (user) {
      const isUserUnder18 = isUnder18(user);
      const filtered = isUserUnder18
        ? doctors.filter((doctor) => doctor.specialty.name === 'Pediatria')
        : doctors;
      setFilteredDoctors(filtered);
    }
  }, [user, doctors]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Box className="doctors-container">
        <Typography variant="h3" className="subtitle">
          Médicos disponíveis
        </Typography>
        <DoctorFilters
          doctors={doctors}
          setFilteredDoctors={setFilteredDoctors}
        />

        {filteredDoctors.length > 0 ? (
          <Box className="doctor-cards-container">
            {filteredDoctors.map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor.crm} />
            ))}
          </Box>
        ) : (
          <Typography className="empty">
            Não há médicos para mostrar.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Doctors;
