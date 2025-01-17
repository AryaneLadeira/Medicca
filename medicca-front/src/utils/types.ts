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