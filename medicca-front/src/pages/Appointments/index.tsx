import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { AppointmentService } from '../../api/services/AppointmentService';
import AppointmentCard from '../../components/atoms/AppointmentCard';
import Toast from '../../components/atoms/Toast';
import AppointmentFilters from '../../components/molecules/AppointmentsFilters';
import LoadingScreen from '../../components/organisms/LoadingScreen';
import { useAuthContext } from '../../context/AuthContext';
import { Appointment, UserType } from '../../utils/types';
import './style.scss';

function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuthContext();

  const [filters, setFilters] = useState({
    dateRange: [null, null] as [Dayjs | null, Dayjs | null],
    name: '',
    specialty: '',
    crm: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const showToast = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast({ ...toast, open: false });
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      AppointmentService.getAppointments(user.id)
        .then((appointmentsData) => {
          setAppointments(appointmentsData);
        })
        .catch((error) => {
          setError(`Erro ao carregar os agendamentos: ${error}`);
          console.error('Erro ao carregar agendamentos:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const updateAppointments = () => {
    if (user) {
      setLoading(true);
      AppointmentService.getAppointments(user.id)
        .then((appointmentsData) => {
          setAppointments(appointmentsData);
        })
        .catch((error) => {
          setError(`Erro ao carregar os agendamentos: ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const { dateRange, name, specialty } = filters;
    const patientOrDoctorName =
      user?.type === UserType.Doctor
        ? appointment.patient.name
        : appointment.doctor.name;

    const appointmentDate = dayjs(appointment.consultation_date);

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
        ? `${appointment.doctor.specialty.id}`
            .toLowerCase()
            .includes(`${specialty}`.toLowerCase())
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
      crm: '',
    });
  };

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <Box className="appointments">
      <Typography variant="h3" className="subtitle">
        Seus agendamentos
      </Typography>

      <AppointmentFilters
        userType={user.type}
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
              userType={user.type}
              hasActions={user.type === UserType.Patient}
              onUpdateAppointments={updateAppointments}
              showToast={showToast}
            />
          ))
        ) : (
          <Typography className="empty">
            {error ? error : 'Não há agendamentos para mostrar.'}
          </Typography>
        )}
      </Box>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
    </Box>
  );
}

export default Appointments;
