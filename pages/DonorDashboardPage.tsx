
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_CANDIDATES } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, UserCircle, LogOut } from 'lucide-react';
import Logo from '../components/Logo';

const DonorDashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Mock data for this donor's donations
    const myDonations = [
        { candidate: MOCK_CANDIDATES[2], amount: 50, date: '2024-07-22', method: 'PIX' },
        { candidate: MOCK_CANDIDATES[0], amount: 75, date: '2024-07-21', method: 'Cartão de Crédito' },
    ];

    if (!user || user.type !== 'donor') {
        return <div className="p-8">Acesso negado. Faça login como doador. <Link to="/acessar" className="text-primary underline">Login</Link></div>;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Olá, {user.name.split(' ')[0]}</span>
                        <button onClick={handleLogout} className="text-gray-600 hover:text-primary"><LogOut size={20}/></button>
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                    <ArrowLeft size={18} /> Voltar para a página inicial
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Painel do Doador</h1>

                <div className="mt-8 grid md:grid-cols-3 gap-8 items-start">
                    {/* Donation History */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Histórico de Doações</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-sm text-gray-600">
                                        <th className="p-3">Candidato</th>
                                        <th className="p-3">Data</th>
                                        <th className="p-3">Valor</th>
                                        <th className="p-3">Recibo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myDonations.map((donation, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{donation.candidate.name}</td>
                                            <td className="p-3 text-gray-600">{donation.date}</td>
                                            <td className="p-3 font-semibold text-secondary">{donation.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td className="p-3">
                                                <button className="text-primary hover:underline flex items-center gap-1 text-sm">
                                                    <Download size={14} /> Baixar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Profile Summary */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Seus Dados</h2>
                        <div className="flex flex-col items-center text-center">
                            <UserCircle size={64} className="text-gray-400 mb-4"/>
                            <p className="font-semibold text-lg">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            <p className="text-gray-500 text-sm">CPF: {user.cpf}</p>
                            <button className="mt-4 text-sm text-primary hover:underline">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboardPage;
