
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_CANDIDATES } from '../../constants';
import { Campaign } from '../../types';
import { PlusCircle, Edit, Eye, AlertCircle } from 'lucide-react';

const DashboardHomePage: React.FC = () => {
    const { user } = useAuth();
    
    // Mock Campaigns for the table
    const myCampaigns: Campaign[] = [
        { 
            id: 1, 
            title: 'Campanha para Deputado 2026', 
            description: 'Arrecadação principal para a candidatura.',
            imageUrl: 'https://picsum.photos/id/237/100/100',
            status: 'Ativa',
            startDate: '15/05/2026',
            endDate: '02/10/2026',
            type: 'Proporcional'
        }
    ];

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'Ativa': return 'bg-green-100 text-green-800';
            case 'Pausada': return 'bg-yellow-100 text-yellow-800';
            case 'Finalizada': return 'bg-gray-100 text-gray-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Início</h1>
                    <p className="mt-1 text-gray-600">Gerencie suas campanhas de arrecadação.</p>
                </div>
                <button className="mt-4 md:mt-0 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <PlusCircle size={20} /> Nova Vaquinha
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Minhas Vaquinhas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600 uppercase tracking-wider">
                                <th className="p-4">Imagem</th>
                                <th className="p-4">Descrição</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Início</th>
                                <th className="p-4">Término</th>
                                <th className="p-4">Tipo</th>
                                <th className="p-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {myCampaigns.map(campaign => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <img src={campaign.imageUrl} alt={campaign.title} className="w-12 h-12 rounded object-cover border" />
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium text-gray-900">{campaign.title}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-xs">{campaign.description}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(campaign.status)}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{campaign.startDate}</td>
                                    <td className="p-4 text-sm text-gray-600">{campaign.endDate}</td>
                                    <td className="p-4 text-sm text-gray-600">{campaign.type}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="Ver" className="p-1 text-gray-400 hover:text-primary"><Eye size={18}/></button>
                                            <button title="Editar" className="p-1 text-gray-400 hover:text-primary"><Edit size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {myCampaigns.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <AlertCircle size={48} className="mx-auto mb-2 text-gray-300" />
                        <p>Nenhuma vaquinha cadastrada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHomePage;
