import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { DoctorData } from '../../../utils/types';
import './style.scss';

interface DoctorCardProps {
  doctor: DoctorData;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="doctor-card">
      <Avatar className="avatar" />
      <CardContent>
        <Typography variant="h5">{doctor.name}</Typography>
        <Typography>{doctor.specialty.name}</Typography>
      </CardContent>
      <IconButton color="secondary" className="new-appointment-btn">
        <CalendarMonthIcon />
      </IconButton>
    </Card>
  );
}

export default DoctorCard;
