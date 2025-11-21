
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Campaign } from '../../types';
import { PlusCircle, Edit, Eye, AlertCircle, Search, Trash2 } from 'lucide-react';

const DashboardHomePage: React.FC = () => {
    const { user } = useAuth();
    
    // Mock Campaigns for the table with state to allow adding new ones
    const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([
        { 
            id: 1, 
            title: `Campanha ${user?.name}`, 
            description: 'Arrecadação oficial para a candidatura.',
            imageUrl: user?.coverUrl || 'https://picsum.photos/seed/campaign/100/100',
            status: 'Ativa',
            startDate: '15/05/2026',
            endDate: '02/10/2026',
            type: 'Majoritária'
        }
    ]);

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'Ativa': return 'bg-green-100 text-green-800 border-green-200';
            case 'Pausada': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Finalizada': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    const handleNewCampaign = () => {
        const newId = myCampaigns.length + 1;
        const newCampaign: Campaign = {
            id: newId,
            title: `Nova Vaquinha #${newId}`,
            description: 'Nova campanha de arrecadação extra.',
            imageUrl: 'https://picsum.photos/seed/new/100/100',
            status: 'Em Análise',
            startDate: '20/08/2026',
            endDate: '02/10/2026',
            type: 'Proporcional'
        };
        setMyCampaigns([...myCampaigns, newCampaign]);
        alert('Nova vaquinha criada com sucesso!');
    };

    const handleEdit = (id: number) => {
        alert(`Editando campanha ID: ${id}. (Funcionalidade simulada)`);
    };

    const handleView = (id: number) => {
        alert(`Visualizando detalhes da campanha ID: ${id}. (Funcionalidade simulada)`);
    };
    
    const handleDelete = (id: number) => {
        if(window.confirm("Tem certeza que deseja excluir esta vaquinha?")) {
             setMyCampaigns(myCampaigns.filter(c => c.id !== id));
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Minhas Vaquinhas</h1>
                    <p className="mt-1 text-gray-600">Gerencie suas campanhas de arrecadação.</p>
                </div>
                <button 
                    onClick={handleNewCampaign}
                    className="mt-4 md:mt-0 flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-md hover:bg-indigo-700 transition-colors font-medium shadow-md"
                >
                    <PlusCircle size={20} /> Nova Vaquinha
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 {/* Filters mock */}
                 <div className="p-4 border-b bg-gray-50 flex items-center justify-end gap-4">
                    <div className="relative">
                        <input type="text" placeholder="Buscar..." className="pl-8 pr-4 py-1.5 border rounded text-sm" />
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                 </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white border-b">
                            <tr className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                <th className="p-6">Imagem</th>
                                <th className="p-6">Descrição</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Início</th>
                                <th className="p-6">Término</th>
                                <th className="p-6">Tipo</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {myCampaigns.map(campaign => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6">
                                        <img src={campaign.imageUrl} alt={campaign.title} className="w-16 h-16 rounded-md object-cover border shadow-sm" />
                                    </td>
                                    <td className="p-6">
                                        <p className="font-bold text-gray-900 mb-1">{campaign.title}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-xs">{campaign.description}</p>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(campaign.status)}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-gray-600 font-medium">{campaign.startDate}</td>
                                    <td className="p-6 text-sm text-gray-600 font-medium">{campaign.endDate}</td>
                                    <td className="p-6 text-sm text-gray-600 font-medium">{campaign.type}</td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => handleView(campaign.id)} title="Ver" className="text-gray-400 hover:text-primary transition-colors"><Eye size={20}/></button>
                                            <button onClick={() => handleEdit(campaign.id)} title="Editar" className="text-gray-400 hover:text-primary transition-colors"><Edit size={20}/></button>
                                            <button onClick={() => handleDelete(campaign.id)} title="Excluir" className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {myCampaigns.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Nenhuma vaquinha cadastrada.</p>
                        <p className="text-sm">Clique em "Nova Vaquinha" para começar.</p>
                    </div>
                )}
            </div>
             <div className="mt-4 flex justify-end text-sm text-gray-500">
                 <div className="flex gap-2 items-center">
                     <span>Itens por página: 10</span>
                     <span>0 van 0</span>
                     <div className="flex gap-1">
                         <button disabled className="p-1 text-gray-300"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                         <button disabled className="p-1 text-gray-300"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default DashboardHomePage;
