export interface Appointment {
  doctor: string;
  patient: string;
  specialty: string;
  countAppointments: number;
  time: string;
  date: string;
}

export interface Doctor {
  name: string;
  specialty: string;
}