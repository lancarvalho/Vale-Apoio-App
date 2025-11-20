
import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Candidate, PaymentStatus, TSEStatus } from '../../types';
import { Search, Eye, Edit, AlertTriangle, CheckCircle, XCircle, RefreshCw, Search as SearchIcon, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente de Badge para Status de Pagamento
const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    const styles = {
        'Ativo': 'bg-green-100 text-green-700 border-green-200',
        'Pendente': 'bg-teal-100 text-teal-700 border-teal-200',
        'Rejeitado': 'bg-red-100 text-red-700 border-red-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            {status}
        </span>
    );
};

// Componente de Badge para Status do TSE
const TSEStatusBadge: React.FC<{ status: TSEStatus }> = ({ status }) => {
    const styles = {
        'Deferida': 'bg-blue-100 text-blue-700 border-blue-200',
        'Deferida com Recurso': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Aguardando': 'bg-gray-100 text-gray-700 border-gray-200',
        'Indeferida': 'bg-red-500 text-white border-red-600 shadow-sm',
        'Inapto': 'bg-red-100 text-red-700 border-red-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            {status}
        </span>
    );
};

const AdminCandidatesPage: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleConsultTSE = (id: number) => {
        setLoadingId(id);
        // Simula chamada à API do TSE
        setTimeout(() => {
            setCandidates(prev => prev.map(c => {
                if (c.id === id) {
                    // Sorteia um status para demonstração se for "Aguardando", senão mantém ou alterna
                    const statuses: TSEStatus[] = ['Deferida', 'Deferida com Recurso', 'Indeferida'];
                    const newStatus = c.tseStatus === 'Aguardando' 
                        ? statuses[Math.floor(Math.random() * statuses.length)] 
                        : c.tseStatus; // Mantém se já tiver status final para não ficar mudando na demo
                    
                    // Demo override: Se clicar em Deferida, vira Indeferida para testar a devolução, e vice-versa
                    const toggleStatus = c.tseStatus === 'Deferida' ? 'Indeferida' : 'Deferida';
                    
                    return { ...c, tseStatus: c.tseStatus === 'Aguardando' ? newStatus : toggleStatus };
                }
                return c;
            }));
            setLoadingId(null);
        }, 1500);
    };

    const handleActivate = (id: number) => {
        if(window.confirm('Confirmar pagamento e ativar conta manualmente?')) {
            setCandidates(prev => prev.map(c => c.id === id ? { ...c, paymentStatus: 'Ativo' } : c));
        }
    };

    const handleReject = (id: number) => {
        if(window.confirm('Tem certeza que deseja rejeitar este cadastro?')) {
            setCandidates(prev => prev.map(c => c.id === id ? { ...c, paymentStatus: 'Rejeitado' } : c));
        }
    };

    // Calcula total a devolver para candidatos indeferidos
    const calculateRefund = (candidate: Candidate) => {
        const total = candidate.donations.reduce((acc, d) => acc + d.amount, 0);
        // Supondo que taxas já foram descontadas ou serão descontadas na devolução
        return total;
    };

    const filteredCandidates = candidates.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.party.acronym.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Candidaturas</h1>
                <p className="mt-1 text-gray-600">Aprove pagamentos e consulte o status no TSE.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div className="relative max-w-md w-full">
                        <input
                            type="text"
                            placeholder="Buscar candidato..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-6 font-semibold">Candidato</th>
                                <th className="p-6 font-semibold">Status Pag.</th>
                                <th className="p-6 font-semibold">Status TSE</th>
                                <th className="p-6 font-semibold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCandidates.map(c => (
                                <React.Fragment key={c.id}>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <img src={c.photoUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"/>
                                                <div>
                                                    <p className="font-bold text-gray-900">{c.name}</p>
                                                    <p className="text-sm text-gray-500">{c.party.acronym} • {c.campaignCnpj}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <PaymentStatusBadge status={c.paymentStatus} />
                                        </td>
                                        <td className="p-6">
                                            <TSEStatusBadge status={c.tseStatus} />
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Botão Consulta TSE */}
                                                <button 
                                                    onClick={() => handleConsultTSE(c.id)}
                                                    disabled={loadingId === c.id}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
                                                >
                                                    {loadingId === c.id ? <RefreshCw size={16} className="animate-spin"/> : <SearchIcon size={16}/>}
                                                    {c.tseStatus === 'Aguardando' ? 'Consultar TSE' : 'Reconsultar'}
                                                </button>

                                                {/* Ações Condicionais baseadas no status de pagamento */}
                                                {c.paymentStatus === 'Pendente' && (
                                                    <>
                                                        <button onClick={() => handleActivate(c.id)} title="Ativar Manualmente" className="p-2 bg-primary text-white rounded-md hover:bg-indigo-700">
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button onClick={() => handleReject(c.id)} title="Rejeitar Cadastro" className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}

                                                <Link to={`/candidatos/${c.slug}`} title="Ver Perfil" className="p-2 text-gray-400 hover:text-gray-600">
                                                    <Eye size={18} />
                                                </Link>
                                                <button title="Editar" className="p-2 text-gray-400 hover:text-gray-600">
                                                    <Edit size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    {/* Alerta de Devolução para Candidaturas Indeferidas */}
                                    {(c.tseStatus === 'Indeferida' || c.tseStatus === 'Inapto') && (
                                        <tr>
                                            <td colSpan={4} className="bg-red-50 p-0 border-b border-red-100">
                                                <div className="px-6 py-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-red-800">
                                                        <AlertTriangle size={20} className="text-red-600"/>
                                                        <div>
                                                            <p className="font-bold text-sm">Processo de Devolução Iniciado</p>
                                                            <p className="text-xs">Candidatura indeferida. Valor a devolver para doadores: <strong>{calculateRefund(c).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></p>
                                                        </div>
                                                    </div>
                                                    <button className="bg-white border border-red-200 text-red-700 px-4 py-2 rounded text-xs font-bold hover:bg-red-100 flex items-center gap-2">
                                                        <RotateCcw size={14} />
                                                        Gerenciar Devoluções
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCandidatesPage;
