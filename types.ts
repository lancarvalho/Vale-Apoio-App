
export interface Party {
  acronym: string;
  name: string;
}

export interface Candidate {
  id: number;
  slug: string;
  name: string;
  photoUrl: string;
  party: Party;
  city: string;
  state: string;
  description: string;
  campaignCnpj: string;
  donations: Donation[];
}

export interface Donation {
  id: number;
  donorName: string;
  donorCpf: string;
  amount: number;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Boleto';
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  type: 'candidate' | 'admin';
}
