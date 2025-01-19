import { Box, Divider, Grid, Typography } from '@mui/material';
import { PatientData, Phone } from '../../../utils/types';

interface PatientProfileProps {
  patientData: PatientData | null;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patientData }) => {
  return (
    <Box>
      <Typography variant="h5">Informações</Typography>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Nome:</strong> {patientData?.name}
          </Typography>
          <Typography>
            <strong>CPF:</strong> {patientData?.cpf}
          </Typography>
          <Typography>
            <strong>CEP:</strong> {patientData?.cep}
          </Typography>
          <Typography>
            <strong>Email:</strong> {patientData?.email}
          </Typography>
          <Typography>
            <strong>Data de Nascimento:</strong> {patientData?.birth_date}
          </Typography>
          <Typography>
            <strong>Endereço:</strong> {patientData?.address}
          </Typography>
          <Typography>
            <strong>Telefone:</strong> {patientData?.phone}
          </Typography>
          {patientData?.telefones && patientData.telefones.length > 0 && (
            <div>
              <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                Telefones Adicionais:
              </Typography>
              <ul>
                {patientData.telefones.map((telefone: Phone) => (
                  <li key={telefone.id}>{telefone.telefone}</li>
                ))}
              </ul>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientProfile;
