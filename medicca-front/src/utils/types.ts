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
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  number: string;
  phone: string;
  crm: string;
  speciality_id: string;
}

export interface DoctorData {
  name: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  registration_date: string;
  crm: string;
  speciality_id: string;
}

export interface Patient {
  name: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  number: string;
  phone: string;
}

export interface PatientData {
  name: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  registration_date: string;
}

export interface CEPData {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  estado: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  siafi: string;
  uf: string;
  unidade: string;
}

export interface RequestError {
  error: string;
  message: string;
}

export interface Speciality {
  id: number;
  name: string;
}
