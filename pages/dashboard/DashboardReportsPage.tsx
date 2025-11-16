import React from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

const mockReports = [
    { title: 'Relatório Parcial Julho', version: 1, transfers: 15, date: '2024-07-15', value: 1250.50 },
    { title: 'Relatório Parcial Junho', version: 2, transfers: 32, date: '2024-06-30', value: 3850.00 },
];

const DashboardReportsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Comprovantes TSE</h1>
            <p className="mt-1 text-gray-600">Gere e exporte os relatórios para a prestação de contas no formato exigido pelo TSE.</p>
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gerar Novo Relatório</h2>
                <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Data Inicial</label>
                        <input type="date" id="start-date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"/>
                    </div>
                     <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Data Final</label>
                        <input type="date" id="end-date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"/>
                    </div>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700">
                    <Download size={16}/> Gerar Relatório
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Histórico de Comprovantes TSE</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr className="text-sm text-gray-600">
                                    <th className="p-4">Título</th>
                                    <th className="p-4">Data Exportação</th>
                                    <th className="p-4">Valor Comprovado</th>
                                    <th className="p-4">Exportar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockReports.map(r => (
                                    <tr key={r.title} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{r.title}</td>
                                        <td className="p-4">{r.date}</td>
                                        <td className="p-4">{r.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <button title="Exportar como CSV" className="hover:text-primary"><FileSpreadsheet size={20}/></button>
                                                <button title="Exportar como Excel" className="hover:text-primary"><FileSpreadsheet size={20}/></button>
                                                <button title="Exportar como PDF" className="hover:text-primary"><FileText size={20}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardReportsPage;