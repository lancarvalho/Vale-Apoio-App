
import React from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Search, Download, FileText } from 'lucide-react';

const AdminDonationsPage: React.FC = () => {
    // Flatten donations list for display
    const allDonations = MOCK_CANDIDATES.flatMap(candidate => 
        candidate.donations.map(donation => ({
            ...donation,
            candidateName: candidate.name,
            candidateParty: candidate.party.acronym
        }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registro de Doações</h1>
                    <p className="mt-1 text-gray-600">Visão geral de todas as doações na plataforma.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 shadow-sm">
                    <Download size={18} /> Exportar CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                     <div className="relative max-w-md w-full">
                        <input
                            type="text"
                            placeholder="Buscar por doador, CPF ou recibo..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                    </div>
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
                            {allDonations.map(donation => (
                                <tr key={donation.id} className="hover:bg-gray-50">
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
                                        <button className="text-primary hover:underline text-xs flex items-center gap-1">
                                            <FileText size={12} /> Ver Recibo
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {allDonations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Nenhuma doação encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDonationsPage;
