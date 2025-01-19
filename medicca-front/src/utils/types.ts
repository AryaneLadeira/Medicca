export interface DoctorSignup {
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

export interface DoctorSignupData {
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

export interface DoctorData {
  id: number;
  user_id: number;
  crm: string;
  name: string;
  specialty: {
    id: number;
    name: string;
  };
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

export interface UserLogin {
  email: number;
  senha: string;
}

export interface UserLoginResponse {
  token: string;
  user: User;
}

export enum UserType {
  Patient = 'paciente',
  Doctor = 'medico',
  Unknown = 'desconhecido',
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
  specificId: number;
}

export interface DecodedToken extends User {
  exp: number;
  iat: number;
  sub: string;
  jti: string;
  iss: string;
  nbf: number;
  prv: string;
}

export interface Appointment {
  id: number;
  consultation_date: string;
  consultation_time: string;
  appointments_count: number;
  doctor: {
    id: number;
    name: string;
    crm: string;
    specialty: {
      id: number;
      name: string;
    };
  };
  patient: {
    id: number;
    name: string;
  };
}
