import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { DoctorData } from '../../../utils/types';
import CreateAppointmentDialog from '../../molecules/CreateAppointmentDialog';
import './style.scss';

interface DoctorCardProps {
  doctor: DoctorData;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Card className="doctor-card">
        <Avatar className="avatar" />
        <CardContent>
          <Typography variant="h5">{doctor.name}</Typography>
          <Typography>{doctor.specialty.name}</Typography>
          <Typography>CRM {doctor.crm}</Typography>
        </CardContent>
        <IconButton
          color="secondary"
          className="new-appointment-btn"
          onClick={handleOpenDialog}
        >
          <CalendarMonthIcon />
        </IconButton>
      </Card>

      <CreateAppointmentDialog
        open={openDialog}
        onClose={handleCloseDialog}
        doctor={doctor}
      />
    </>
  );
}

export default DoctorCard;
