
import React, { useState, useMemo } from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Aprovado': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Rejeitado': 'bg-red-100 text-red-800',
    };
    const icons = {
        'Aprovado': <CheckCircle size={16} />,
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


const AdminCandidatesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Add mock status to candidates
    const candidatesWithStatus = useMemo(() => MOCK_CANDIDATES.map((c, i) => ({
        ...c,
        status: i % 3 === 0 ? 'Aprovado' : i % 3 === 1 ? 'Pendente' : 'Rejeitado'
    })), []);


    const filteredCandidates = useMemo(() => {
        return candidatesWithStatus.filter(candidate =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.party.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.campaignCnpj.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, candidatesWithStatus]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Candidatos</h1>
            <p className="mt-1 text-gray-600">Visualize e gerencie todos os candidatos cadastrados na plataforma.</p>
            
            <div className="my-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar por nome, partido, CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-lg pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Candidato</th>
                                <th className="p-4">Partido</th>
                                <th className="p-4">CNPJ Campanha</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.map(c => (
                                <tr key={c.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <img src={c.photoUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover"/>
                                            <div>
                                                <p>{c.name}</p>
                                                <p className="text-sm text-gray-500">{c.city}/{c.state}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">{c.party.acronym}</td>
                                    <td className="p-4 text-gray-600 font-mono text-sm">{c.campaignCnpj}</td>
                                    <td className="p-4"><StatusBadge status={c.status} /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/candidatos/${c.slug}`} title="Ver Perfil Público" className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full"><Eye size={18}/></Link>
                                            <button title="Aprovar" className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-full"><CheckCircle size={18}/></button>
                                            <button title="Rejeitar" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><XCircle size={18}/></button>
                                        </div>
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

export default AdminCandidatesPage;