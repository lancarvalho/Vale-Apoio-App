
import { Party, Candidate, AuditLog } from './types';

export const PARTIES: Party[] = [
  { acronym: "MDB", name: "Movimento Democrático Brasileiro" },
  { acronym: "PDT", name: "Partido Democrático Trabalhista" },
  { acronym: "PT", name: "Partido dos Trabalhadores" },
  { acronym: "PCdoB", name: "Partido Comunista do Brasil" },
  { acronym: "PSB", name: "Partido Socialista Brasileiro" },
  { acronym: "PSDB", name: "Partido da Social Democracia Brasileira" },
  { acronym: "AGIR", name: "Agir" },
  { acronym: "MOBILIZA", name: "Mobilização Nacional" },
  { acronym: "CIDADANIA", name: "Cidadania" },
  { acronym: "PV", name: "Partido Verde" },
  { acronym: "AVANTE", name: "Avante" },
  { acronym: "PP", name: "Progressistas" },
  { acronym: "PSTU", name: "Partido Socialista dos Trabalhadores Unificado" },
  { acronym: "PCB", name: "Partido Comunista Brasileiro" },
  { acronym: "PRTB", name: "Partido Renovador Trabalhista Brasileiro" },
  { acronym: "DC", name: "Democracia Cristã" },
  { acronym: "PCO", name: "Partido da Causa Operária" },
  { acronym: "PODE", name: "Podemos" },
  { acronym: "REPUBLICANOS", name: "Republicanos" },
  { acronym: "PSOL", name: "Partido Socialismo e Liberdade" },
  { acronym: "PL", name: "Partido Liberal" },
  { acronym: "PSD", name: "Partido Social Democrático" },
  { acronym: "SOLIDARIEDADE", name: "Solidariedade" },
  { acronym: "NOVO", name: "Partido Novo" },
  { acronym: "REDE", name: "Rede Sustentabilidade" },
  { acronym: "PMB", name: "Partido da Mulher Brasileira" },
  { acronym: "UP", name: "Unidade Popular" },
  { acronym: "UNIÃO", name: "União Brasil" },
  { acronym: "PRD", name: "Partido da Renovação Democrática" },
];

export const MOCK_CANDIDATES: Candidate[] = [
    {
        id: 1,
        slug: 'ana-silva',
        name: 'Ana Silva',
        photoUrl: 'https://picsum.photos/id/237/400/400',
        party: PARTIES[2], // PT
        city: 'São Paulo',
        state: 'SP',
        description: 'Lutando por uma educação de qualidade e mais oportunidades para todos os cidadãos de São Paulo.',
        campaignCnpj: '12.345.678/0001-90',
        paymentStatus: 'Ativo',
        tseStatus: 'Deferida',
        donations: [
            { id: 101, donorName: 'Carlos Pereira', donorCpf: '111.***.***-11', amount: 150, paymentMethod: 'PIX', date: '2024-07-20T10:00:00Z', receiptId: 'REC-2026-101' },
            { id: 102, donorName: 'Mariana Costa', donorCpf: '222.***.***-22', amount: 75, paymentMethod: 'Cartão de Crédito', date: '2024-07-21T14:30:00Z', receiptId: 'REC-2026-102' },
        ],
    },
    {
        id: 2,
        slug: 'bruno-santos',
        name: 'Bruno Santos',
        photoUrl: 'https://picsum.photos/id/238/400/400',
        party: PARTIES[5], // PSDB
        city: 'Rio de Janeiro',
        state: 'RJ',
        description: 'Compromisso com a segurança pública e o desenvolvimento econômico do Rio de Janeiro.',
        campaignCnpj: '23.456.789/0001-80',
        paymentStatus: 'Ativo',
        tseStatus: 'Deferida com Recurso',
        donations: [
            { id: 201, donorName: 'Fernanda Lima', donorCpf: '333.***.***-33', amount: 200, paymentMethod: 'Boleto', date: '2024-07-19T09:00:00Z', receiptId: 'REC-2026-201' },
        ],
    },
    {
        id: 3,
        slug: 'kleyton-cruz',
        name: 'Kleyton Cruz',
        photoUrl: 'https://picsum.photos/id/239/400/400',
        party: PARTIES[20], // PL
        city: 'Belo Horizonte',
        state: 'MG',
        description: 'Foco na saúde e na infraestrutura para melhorar a vida dos mineiros.',
        campaignCnpj: '34.567.890/0001-70',
        paymentStatus: 'Pendente',
        tseStatus: 'Aguardando',
        donations: [
            { id: 301, donorName: 'Ricardo Alves', donorCpf: '444.***.***-44', amount: 50, paymentMethod: 'PIX', date: '2024-07-22T11:20:00Z', receiptId: 'REC-2026-301' },
            { id: 302, donorName: 'Juliana Martins', donorCpf: '555.***.***-55', amount: 300, paymentMethod: 'PIX', date: '2024-07-22T18:00:00Z', receiptId: 'REC-2026-302' },
        ],
    },
    {
        id: 4,
        slug: 'claudia-melo',
        name: 'Cláudia Melo',
        photoUrl: 'https://picsum.photos/id/240/400/400',
        party: PARTIES[19], // PSOL
        city: 'Salvador',
        state: 'BA',
        description: 'Defendendo a cultura, o meio ambiente e os direitos humanos na Bahia.',
        campaignCnpj: '45.678.901/0001-60',
        paymentStatus: 'Ativo',
        tseStatus: 'Indeferida',
        donations: [
             { id: 401, donorName: 'Roberto Dias', donorCpf: '777.***.***-77', amount: 90, paymentMethod: 'Boleto', date: '2024-07-23T15:45:00Z', receiptId: 'REC-2026-401' },
        ],
    },
     {
        id: 5,
        slug: 'rodrigo-neves',
        name: 'Rodrigo Neves',
        photoUrl: 'https://picsum.photos/id/241/400/400',
        party: PARTIES[10], // AVANTE
        city: 'Curitiba',
        state: 'PR',
        description: 'Inovação e tecnologia para um futuro mais próspero para Curitiba.',
        campaignCnpj: '56.789.012/0001-50',
        paymentStatus: 'Rejeitado',
        tseStatus: 'Inapto',
        donations: [],
    },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 1, timestamp: '20/11/2025, 19:20:31', user: 'admin@valeapoio.com', action: 'Pagamento Confirmado', details: 'Candidato: Ana Silva (ID: 1)' },
    { id: 2, timestamp: '20/11/2025, 19:15:31', user: 'admin@valeapoio.com', action: 'Consulta TSE', details: 'Candidato: Bruno Santos, Resultado: Deferida com Recurso' },
    { id: 3, timestamp: '20/11/2025, 18:30:10', user: 'system', action: 'Backup Automático', details: 'Backup diário do banco de dados realizado com sucesso.' },
    { id: 4, timestamp: '20/11/2025, 14:10:05', user: 'candidato@email.com', action: 'Solicitação de Saque', details: 'Valor: R$ 3.500,00 - Protocolo: #998877' },
];
