
import { Candidate, Donation } from '../types';

/**
 * VALE APOIO - TSE FILE GENERATOR (.FCC)
 * Baseado na especificação SPCE - Financiamento Coletivo v3.0 (04/07/2022)
 * Encoding: ISO-8859-1
 * Line Endings: CRLF
 */

// Constantes da Plataforma
const PLATFORM_CNPJ = "02345678000190"; // CNPJ Vale Apoio (apenas números)
const PLATFORM_NAME = "VALEAPOIO.COM.BR LTDA";

// Helpers de Formatação Posicional
const formatText = (text: string, length: number): string => {
    // Remove acentos para compatibilidade básica, uppercase, remove caracteres especiais
    const cleanText = text
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9 ]/g, " ");
    
    // Corta se for maior, preenche com espaços à direita se for menor
    return cleanText.substring(0, length).padEnd(length, ' ');
};

const formatNumber = (num: string | number, length: number): string => {
    const cleanNum = String(num).replace(/\D/g, '');
    return cleanNum.substring(0, length).padStart(length, '0');
};

const formatCurrency = (value: number, length: number): string => {
    // Multiplica por 100 para remover decimais (ex: 100.50 -> 10050)
    const cleanValue = Math.round(value * 100).toString();
    return cleanValue.padStart(length, '0');
};

const formatDate = (dateString: string): string => {
    // Recebe YYYY-MM-DD e retorna DDMMAAAA
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}${month}${year}`;
};

// Mapeamento de Métodos de Pagamento para códigos TSE
const getPaymentMethodCode = (method: string): string => {
    // 00-Cheque, 01-Transf, 04-Depósito, 06-Boleto, 07-Cartão, 08-Débito, 19-PIX
    const normalized = method.toLowerCase();
    if (normalized.includes('pix')) return '19';
    if (normalized.includes('cartão') || normalized.includes('credito')) return '07';
    if (normalized.includes('boleto')) return '06';
    if (normalized.includes('debito')) return '08';
    return '01'; // Default Transferência
};

/**
 * REGISTRO HEADER (Tipo 1)
 * Identificação da empresa arrecadadora
 */
const buildHeader = (): string => {
    let line = "";
    line += "1"; // 1: Tipo de Registro
    line += formatNumber(PLATFORM_CNPJ, 14); // 2: CNPJ Empresa
    line += formatText(PLATFORM_NAME, 100); // 3: Nome Fantasia
    line += "100"; // 4: Versão Layout
    line += "ATSEFCC"; // 5: Nome Layout
    line += formatText("", 250); // 6: Espaço em branco (filler)
    return line;
};

/**
 * REGISTRO DETALHE 1 (Tipo 2)
 * Identificação da doação repassada ao candidato (o Saque/Lote)
 */
const buildDetail1 = (candidate: Candidate, totalAmount: number, adminFee: number): string => {
    // Simulação de dados bancários e URL (em produção viriam do objeto Candidate)
    const candidateUrl = `https://valeapoio.com.br/candidatos/${candidate.slug}`;
    const bankCode = "001"; // Mock Banco do Brasil
    const agency = "1234";
    const agencyDv = "5";
    const account = "102030";
    const accountDv = "X";
    const creditDate = new Date().toISOString(); // Data do repasse (hoje)

    let line = "";
    line += "2"; // 1: Tipo
    line += formatNumber(candidate.campaignCnpj, 14); // 2: CNPJ Candidato
    line += formatText(candidateUrl, 255); // 3: Página Web
    line += formatDate(creditDate); // 4: Data do Crédito
    line += "01"; // 5: Espécie Recurso (01 - TED/DOC para o repasse)
    line += formatText("", 23); // 6: Nº Doc Bancário (Opcional/Branco)
    line += formatText(bankCode, 3); // 7: Banco Destino
    line += formatNumber(agency, 8); // 8: Agência
    line += formatText(agencyDv, 2); // 9: DV Agência
    line += formatNumber(account, 18); // 10: Conta Bancária
    line += formatText(accountDv, 2); // 11: DV Conta
    line += formatCurrency(totalAmount, 10); // 12: Valor Total Arrecadado
    line += formatCurrency(adminFee, 10); // 13: Valor Taxa Adm
    line += formatCurrency(totalAmount - adminFee, 10); // 14: Valor Líquido Creditado
    line += formatNumber(candidate.donations.length, 9); // 15: Qtd de doações neste lote
    
    // Completar linha até 375 chars se necessário (a soma acima dá 375 exatos pela spec?)
    // Spec: 1+14+255+8+2+23+3+8+2+18+2+10+10+10+9 = 375. Perfeito.
    
    return line;
};

/**
 * REGISTRO DETALHE 2 (Tipo 3)
 * Doações individuais contidas no repasse
 */
const buildDetail2 = (donation: Donation): string => {
    let line = "";
    line += "3"; // 1: Tipo
    line += formatNumber(donation.donorCpf, 11); // 2: CPF Doador
    line += formatText(donation.donorName, 150); // 3: Nome Doador
    line += formatDate(donation.date); // 4: Data Doação
    line += formatCurrency(donation.amount, 10); // 5: Valor Doação
    line += formatNumber(getPaymentMethodCode(donation.paymentMethod), 2); // 6: Meio Pagamento
    line += formatText("", 193); // 7: Espaço em branco (filler)
    return line;
};

/**
 * REGISTRO TRAILER (Tipo 9)
 * Totais do arquivo
 */
const buildTrailer = (totalDonations: number): string => {
    let line = "";
    line += "9"; // 1: Tipo
    line += formatNumber(totalDonations, 9); // 2: Total de doações (registros tipo 3)
    line += formatText("", 365); // 3: Espaço em branco
    return line;
};

/**
 * Função Principal Geradora
 */
export const generateTSEFile = (candidate: Candidate) => {
    const lines: string[] = [];
    
    // 1. Header
    lines.push(buildHeader());

    // Cálculos do Lote (Simulando que todas as doações do candidato estão neste lote de saque)
    const totalAmount = candidate.donations.reduce((acc, d) => acc + d.amount, 0);
    const adminFee = totalAmount * 0.0365; // 3.65%

    // 2. Detalhe 1 (O Repasse/Saque)
    lines.push(buildDetail1(candidate, totalAmount, adminFee));

    // 3. Detalhe 2 (As Doações Individuais)
    candidate.donations.forEach(donation => {
        lines.push(buildDetail2(donation));
    });

    // 4. Trailer
    lines.push(buildTrailer(candidate.donations.length));

    // Unir linhas com CRLF (Windows Style, padrão bancário/gov)
    const fileContent = lines.join('\r\n');

    // Gerar Nome do Arquivo: ATSEFCCNNNAAAAMMDDSSSSSS.FCC
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const sequence = "000001"; // Mock sequence
    const fileName = `ATSEFCC001${yyyy}${mm}${dd}${sequence}.FCC`;

    // Criar Blob e Download
    const blob = new Blob([fileContent], { type: 'text/plain;charset=ISO-8859-1' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};
