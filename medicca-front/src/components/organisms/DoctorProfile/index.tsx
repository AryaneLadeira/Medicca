import { Box, Divider, Grid, Typography } from '@mui/material';
import { Doctor } from '../../../utils/types';

interface DoctorProfileProps {
  doctorData: Doctor | null;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctorData }) => {
  return (
    <Box>
      <Typography variant="h5">Informações do Médico</Typography>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Nome:</strong> {doctorData?.name}
          </Typography>
          <Typography>
            <strong>CRM:</strong> {doctorData?.crm}
          </Typography>
          <Typography>
            <strong>Especialidade:</strong> {doctorData?.specialty.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {doctorData?.user.email}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorProfile;
