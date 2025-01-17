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
  specialty: Speciality
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
  birth_date: string;
}

export interface NewPatient {
  name: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  registration_date: string;
  birth_date: string;
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
  birthDate: string;
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

export interface Phone {
  id: number;
  telefone: string;
  user_id: number;
}

export interface PatientData {
  id: number;
  user_id: number;
  registration_date: string;
  name: string;
  cpf: string;
  cep: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  birth_date: string | null;
  telefones: Phone[];
}

export interface Doctor {
  id: number;
  user_id: number;
  crm: string;
  name: string;
  specialty: Speciality;
  user: User;
}