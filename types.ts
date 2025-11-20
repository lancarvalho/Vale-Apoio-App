
export interface Party {
  acronym: string;
  name: string;
}

export interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Ativa' | 'Pausada' | 'Finalizada' | 'Em Análise';
  startDate: string;
  endDate: string;
  type: 'Majoritária' | 'Proporcional';
}

export type TSEStatus = 'Aguardando' | 'Deferida' | 'Deferida com Recurso' | 'Indeferida' | 'Inapto';
export type PaymentStatus = 'Pendente' | 'Ativo' | 'Rejeitado';

export interface Candidate {
  id: number;
  slug: string;
  name: string;
  photoUrl: string;
  party: Party;
  city: string;
  state: string;
  office?: string; // Cargo
  description: string;
  campaignCnpj: string;
  companyName?: string; // Razão Social
  address?: Address;
  paymentStatus: PaymentStatus; // Status da taxa de inscrição (R$ 199)
  tseStatus: TSEStatus; // Status legal da candidatura
  donations: Donation[];
  campaigns?: Campaign[];
}

export interface Donation {
  id: number;
  donorName: string;
  donorCpf: string;
  amount: number;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Boleto';
  date: string;
  receiptId?: string; // ID do recibo gerado
}

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  type: 'candidate' | 'admin' | 'donor';
  pendingPayment?: boolean; // To track registration fee status
  cnpj?: string;
  companyName?: string;
  address?: Address;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}
