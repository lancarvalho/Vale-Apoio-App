
import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Search, Download, FileText, X, Printer } from 'lucide-react';
import Logo from '../../components/Logo';

// Interface extendida para uso interno
interface FlattenedDonation {
    id: number;
    donorName: string;
    donorCpf: string;
    amount: number;
    paymentMethod: string;
    date: string;
    receiptId?: string;
    candidateName: string;
    candidateParty: string;
    candidateCnpj: string;
}

const AdminDonationsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDonation, setSelectedDonation] = useState<FlattenedDonation | null>(null);

    // Flatten donations list for display
    const allDonations: FlattenedDonation[] = MOCK_CANDIDATES.flatMap(candidate => 
        candidate.donations.map(donation => ({
            ...donation,
            candidateName: candidate.name,
            candidateParty: candidate.party.acronym,
            candidateCnpj: candidate.campaignCnpj
        }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Filter logic
    const filteredDonations = allDonations.filter(d => 
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.donorCpf.includes(searchTerm) ||
        (d.receiptId && d.receiptId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Export CSV Logic
    const handleExportCSV = () => {
        const headers = ['ID', 'Data', 'Doador', 'CPF Doador', 'Candidato', 'Partido', 'CNPJ Campanha', 'Valor', 'Metodo', 'ID Recibo'];
        
        const csvRows = [
            headers.join(','), // header row
            ...filteredDonations.map(row => [
                row.id,
                new Date(row.date).toLocaleDateString('pt-BR'),
                `"${row.donorName}"`, // Quote strings to handle commas
                `"${row.donorCpf}"`,
                `"${row.candidateName}"`,
                row.candidateParty,
                `"${row.candidateCnpj}"`,
                row.amount.toFixed(2).replace('.', ','), // Brazilian currency format for Excel
                row.paymentMethod,
                row.receiptId || ''
            ].join(','))
        ];

        const csvString = "\uFEFF" + csvRows.join('\n'); // Add BOM for Excel utf-8 compatibility
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio_doacoes_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Print Logic (Improved for styling consistency)
    const handlePrintReceipt = () => {
        const printContent = document.getElementById('receipt-content');
        if (printContent) {
            const printWindow = window.open('', '_blank', 'height=800,width=800');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Recibo de Doação - Vale Apoio</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                                @media print {
                                    body { 
                                        -webkit-print-color-adjust: exact !important; 
                                        print-color-adjust: exact !important; 
                                        background-color: white !important;
                                    }
                                    @page { margin: 0; size: A4; }
                                    .no-print { display: none; }
                                }
                                body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
                            </style>
                        </head>
                        <body class="bg-gray-100 flex items-center justify-center min-h-screen p-8">
                            <div class="w-full max-w-2xl bg-white shadow-none print:shadow-none scale-100 transform origin-top">
                                ${printContent.innerHTML}
                            </div>
                            <script>
                                // Delay printing to ensure Tailwind classes are parsed and applied
                                setTimeout(() => {
                                    window.print();
                                    window.close();
                                }, 1000);
                            </script>
                        </body>
                    </html>
                `);
                printWindow.document.close();
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registro de Doações</h1>
                    <p className="mt-1 text-gray-600">Visão geral de todas as doações na plataforma.</p>
                </div>
                <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 shadow-sm transition-colors"
                >
                    <Download size={18} /> Exportar CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                     <div className="relative max-w-md w-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por doador, CPF ou recibo..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">
                        Mostrando {filteredDonations.length} registros
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                            <tr>
                                <th className="p-4">Doador</th>
                                <th className="p-4">Candidato</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Recibo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredDonations.map(donation => (
                                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <p className="font-medium text-gray-900">{donation.donorName}</p>
                                        <p className="text-xs text-gray-500">{donation.donorCpf}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-gray-900">{donation.candidateName}</p>
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{donation.candidateParty}</span>
                                    </td>
                                    <td className="p-4 font-bold text-secondary">
                                        {donation.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {new Date(donation.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs font-mono text-gray-500 block mb-1">{donation.receiptId || 'N/A'}</span>
                                        <button 
                                            onClick={() => setSelectedDonation(donation)}
                                            className="text-primary hover:underline text-xs flex items-center gap-1"
                                        >
                                            <FileText size={12} /> Ver Recibo
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredDonations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Nenhuma doação encontrada com os filtros atuais.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Recibo */}
            {selectedDonation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h3 className="font-bold text-gray-700">Visualização de Recibo</h3>
                            <button onClick={() => setSelectedDonation(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto p-8 bg-white">
                            <div id="receipt-content" className="border-4 border-double border-gray-200 p-8 max-w-xl mx-auto bg-white">
                                <div className="text-center mb-8">
                                    <div className="flex justify-center mb-4 transform scale-125">
                                        <Logo />
                                    </div>
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 mt-4">Recibo Eleitoral</h2>
                                    <p className="text-xs text-gray-500">Financiamento Coletivo de Campanha - Eleições 2026</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Dados do Doador</h4>
                                        <p className="font-bold text-gray-800">{selectedDonation.donorName}</p>
                                        <p className="text-sm text-gray-600">CPF: {selectedDonation.donorCpf}</p>
                                    </div>
                                    <div className="text-right">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Dados do Candidato</h4>
                                        <p className="font-bold text-gray-800">{selectedDonation.candidateName}</p>
                                        <p className="text-sm text-gray-600">{selectedDonation.candidateParty}</p>
                                        <p className="text-xs text-gray-500">CNPJ: {selectedDonation.candidateCnpj}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg text-center mb-8 border border-gray-100 print:bg-gray-50">
                                    <p className="text-sm text-gray-500 mb-1">Valor da Doação</p>
                                    <p className="text-4xl font-bold text-primary">
                                        {selectedDonation.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 uppercase">{selectedDonation.paymentMethod}</p>
                                </div>

                                <div className="text-xs text-gray-500 space-y-2 border-t pt-4">
                                    <div className="flex justify-between">
                                        <span>Data da Transação:</span>
                                        <span className="font-mono">{new Date(selectedDonation.date).toLocaleString('pt-BR')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>ID do Recibo:</span>
                                        <span className="font-mono">{selectedDonation.receiptId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Hash da Transação:</span>
                                        <span className="font-mono">{Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 text-[10px] text-gray-400 text-center leading-tight">
                                    <p>Este recibo é emitido em conformidade com a Resolução TSE nº 23.607/2019.</p>
                                    <p>A doação eleitoral é um ato de cidadania e deve respeitar os limites legais de 10% dos rendimentos brutos do ano anterior.</p>
                                    <p className="mt-2">Vale Apoio - CNPJ 55.302.823/0001-63</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                            <button 
                                onClick={() => setSelectedDonation(null)} 
                                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Fechar
                            </button>
                            <button 
                                onClick={handlePrintReceipt}
                                className="px-4 py-2 bg-primary text-white font-bold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                            >
                                <Printer size={18} /> Imprimir Recibo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDonationsPage;
