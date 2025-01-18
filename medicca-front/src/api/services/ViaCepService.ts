import { CEPData } from "../../utils/types";


export async function fetchAddressByCep(cep: string): Promise<CEPData> {
  const sanitizedCep = cep.replace(/\D/g, '');
  if (sanitizedCep.length !== 8) {
    throw new Error('CEP inválido');
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${sanitizedCep}/json/`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar o endereço');
  }

  const data = await response.json();
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  
  return data;
}
