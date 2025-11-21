
import React, { useState } from 'react';
import { Download, Filter, Loader } from 'lucide-react';

const mockReportsInitial = [
    { id: 1, title: 'Relatório Financeiro - 1ª Quinzena', version: 'v1.0', transfers: 15, dateExport: '2026-07-15', value: 1250.50 },
    { id: 2, title: 'Relatório Financeiro - Junho', version: 'v1.2', transfers: 32, dateExport: '2026-06-30', value: 3850.00 },
    { id: 3, title: 'Relatório Financeiro - 2ª Quinzena', version: 'v1.0', transfers: 20, dateExport: '2026-07-30', value: 2100.00 },
];

const DashboardReportsPage: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState(mockReportsInitial);
    const [isFiltering, setIsFiltering] = useState(false);

    const handleFilter = () => {
        setIsFiltering(true);
        // Simula delay de rede
        setTimeout(() => {
            let filtered = mockReportsInitial;
            if (startDate && endDate) {
                filtered = mockReportsInitial.filter(r => r.dateExport >= startDate && r.dateExport <= endDate);
            }
            setReports(filtered);
            setIsFiltering(false);
        }, 800);
    };

    const handleDownload = (title: string) => {
        // Cria um arquivo de texto simples para download
        const element = document.createElement("a");
        const file = new Blob(["Conteúdo do relatório simulado para: " + title], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Comprovantes TSE</h1>
            <p className="mt-1 text-gray-600">Histórico de arquivos gerados para prestação de contas.</p>
            
            {/* Filters */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold">
                    <Filter size={20} />
                    <h2>Filtrar por Período</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <button 
                        onClick={handleFilter}
                        disabled={isFiltering}
                        className="w-full md:w-auto bg-gray-800 text-white px-6 py-2.5 rounded-md hover:bg-gray-900 transition-colors font-medium flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {isFiltering ? <Loader size={18} className="animate-spin"/> : 'Filtrar Histórico'}
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Histórico de Comprovantes</h2>
                    <span className="text-sm text-gray-500">{reports.length} encontrados</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Título</th>
                                <th className="p-4">Versão</th>
                                <th className="p-4">Nº de Transferências</th>
                                <th className="p-4">Data Exportação</th>
                                <th className="p-4">Valor Comprovado</th>
                                <th className="p-4">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? (
                                reports.map(r => (
                                    <tr key={r.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium text-primary">{r.title}</td>
                                        <td className="p-4 text-gray-600">{r.version}</td>
                                        <td className="p-4 text-center">{r.transfers}</td>
                                        <td className="p-4">{new Date(r.dateExport).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-4 font-semibold">{r.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => handleDownload(r.title)}
                                                className="flex items-center gap-1 text-secondary hover:text-emerald-700 font-medium transition-colors"
                                            >
                                                <Download size={16} /> Baixar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        Nenhum comprovante encontrado neste período.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardReportsPage;
