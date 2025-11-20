
import React from 'react';
import { MOCK_AUDIT_LOGS } from '../../constants';
import { Shield } from 'lucide-react';

const AdminAuditPage: React.FC = () => {
    return (
        <div>
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Logs de Auditoria</h1>
                <p className="mt-1 text-gray-600">Registro de ações importantes no sistema.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                            <tr>
                                <th className="p-4">Timestamp</th>
                                <th className="p-4">Usuário</th>
                                <th className="p-4">Ação</th>
                                <th className="p-4">Detalhes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {MOCK_AUDIT_LOGS.map(log => (
                                <tr key={log.id} className="hover:bg-gray-50 text-sm">
                                    <td className="p-4 text-gray-500 font-mono">{log.timestamp}</td>
                                    <td className="p-4 text-primary font-medium">{log.user}</td>
                                    <td className="p-4 font-bold text-gray-800">{log.action}</td>
                                    <td className="p-4 text-gray-600">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAuditPage;
