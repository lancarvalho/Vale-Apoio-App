
import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const mockWithdrawals = [
    { id: 1, date: '2024-07-20', amount: 1250.50, status: 'Concluído' },
    { id: 2, date: '2024-07-15', amount: 800.00, status: 'Concluído' },
    { id: 3, date: '2024-07-10', amount: 2500.00, status: 'Processando' },
    { id: 4, date: '2024-07-05', amount: 550.75, status: 'Falhou' },
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
            <p className="mt-1 text-gray-600">Acompanhe o histórico de todas as suas solicitações de saque.</p>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Data da Requisição</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Comprovante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockWithdrawals.map(w => (
                                <tr key={w.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{w.date}</td>
                                    <td className="p-4">{w.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className="p-4"><StatusBadge status={w.status} /></td>
                                    <td className="p-4">
                                        {w.status === 'Concluído' && (
                                            <a href="#" className="text-primary hover:underline text-sm font-medium">Baixar</a>
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

export default DashboardWithdrawalsPage;
