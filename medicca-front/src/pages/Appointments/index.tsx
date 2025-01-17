import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import AppointmentCard from '../../components/atoms/AppointmentCard';
import AppointmentFilters from '../../components/molecules/AppointmentsFilters';
import './style.scss';

function Appointments() {
  const appointments = [
    {
      date: '2025-01-20',
      time: '14:00',
      doctor: 'Dra. Maria Clara',
      specialty: 'Cardiologia',
      patient: 'John Doe',
      countAppointments: 1,
    },
    {
      date: '2024-12-15',
      time: '16:00',
      doctor: 'Dr. Roberto Silva',
      specialty: 'Endocrinologia',
      patient: 'Richard Tomas',
      countAppointments: 3,
    },
  ];

  const [filters, setFilters] = useState({
    dateRange: [null, null] as [Dayjs | null, Dayjs | null],
    name: '',
    specialty: '',
  });

  const userType = 'patient';

  const filteredAppointments = appointments.filter((appointment) => {
    const { dateRange, name, specialty } = filters;
    const patientOrDoctorName =
      userType === 'doctor' ? appointment.patient : appointment.doctor;

    const appointmentDate = dayjs(appointment.date);

    const startDate = dateRange[0]?.startOf('day');
    const endDate = dateRange[1]?.endOf('day');

    return (
      (!startDate ||
        !endDate ||
        ((appointmentDate.isAfter(startDate, 'day') ||
          appointmentDate.isSame(startDate, 'day')) &&
          (appointmentDate.isBefore(endDate, 'day') ||
            appointmentDate.isSame(endDate, 'day')))) &&
      (name
        ? patientOrDoctorName.toLowerCase().includes(name.toLowerCase())
        : true) &&
      (specialty
        ? appointment.specialty.toLowerCase().includes(specialty.toLowerCase())
        : true)
    );
  });

  const handleFilterChange = (field: string, value: unknown) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: [null, null],
      name: '',
      specialty: '',
    });
  };

  return (
    <Box>
      <Typography variant="h3" className="subtitle">
        Seus agendamentos
      </Typography>

      <AppointmentFilters
        userType={userType}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <Box className="appointments-container">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment}
              userType={userType}
              hasActions={userType == 'patient'}
            />
          ))
        ) : (
          <Typography className="empty">
            Não há agendamentos para mostrar.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Appointments;
