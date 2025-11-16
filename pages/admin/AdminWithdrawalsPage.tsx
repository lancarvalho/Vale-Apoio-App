
import React from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const mockWithdrawals = [
    { id: 1, candidate: MOCK_CANDIDATES[0], date: '2024-07-25', amount: 3500.00, status: 'Pendente' },
    { id: 2, candidate: MOCK_CANDIDATES[2], date: '2024-07-24', amount: 1250.50, status: 'Concluído' },
    { id: 3, candidate: MOCK_CANDIDATES[1], date: '2024-07-23', amount: 800.00, status: 'Concluído' },
    { id: 4, candidate: MOCK_CANDIDATES[3], date: '2024-07-22', amount: 550.75, status: 'Rejeitado' },
    { id: 5, candidate: MOCK_CANDIDATES[4], date: '2024-07-21', amount: 4200.00, status: 'Pendente' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Concluído': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Rejeitado': 'bg-red-100 text-red-800',
    };
    const icons = {
        'Concluído': <CheckCircle size={16} />,
        'Pendente': <Clock size={16} />,
        'Rejeitado': <XCircle size={16} />,
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {icons[status]}
            {status}
        </span>
    );
};

const AdminWithdrawalsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Saques</h1>
            <p className="mt-1 text-gray-600">Aprove ou rejeite as solicitações de saque dos candidatos.</p>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Candidato</th>
                                <th className="p-4">Data da Requisição</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockWithdrawals.map(w => (
                                <tr key={w.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{w.candidate.name}</td>
                                    <td className="p-4">{w.date}</td>
                                    <td className="p-4 font-semibold">{w.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className="p-4"><StatusBadge status={w.status} /></td>
                                    <td className="p-4">
                                        {w.status === 'Pendente' && (
                                            <div className="flex justify-center items-center gap-2">
                                                <button className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600">Aprovar</button>
                                                <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600">Rejeitar</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminWithdrawalsPage;