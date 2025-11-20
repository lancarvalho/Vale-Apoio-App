
import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const mockWithdrawals = [
    { id: 1, date: '20/07/2026', status: 'Concluído', type: 'Total', start: '10/07/2026', end: '19/07/2026' },
    { id: 2, date: '10/07/2026', status: 'Concluído', type: 'Parcial', start: '01/07/2026', end: '09/07/2026' },
    { id: 3, date: '25/07/2026', status: 'Processando', type: 'Parcial', start: '20/07/2026', end: '24/07/2026' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Concluído': 'bg-green-100 text-green-800',
        'Processando': 'bg-yellow-100 text-yellow-800',
        'Falhou': 'bg-red-100 text-red-800',
    };
    const icons = {
        'Concluído': <CheckCircle size={16} />,
        'Processando': <Clock size={16} />,
        'Falhou': <XCircle size={16} />,
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {icons[status]}
            {status}
        </span>
    );
};

const DashboardWithdrawalsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Listagem de Saques</h1>
            <p className="mt-1 text-gray-600">Histórico completo de transferências para sua conta de campanha.</p>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Data de Requisição</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Tipo</th>
                                <th className="p-4">Início (Período)</th>
                                <th className="p-4">Término (Período)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockWithdrawals.map(w => (
                                <tr key={w.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{w.date}</td>
                                    <td className="p-4"><StatusBadge status={w.status} /></td>
                                    <td className="p-4">{w.type}</td>
                                    <td className="p-4 text-gray-600">{w.start}</td>
                                    <td className="p-4 text-gray-600">{w.end}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardWithdrawalsPage;
