
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo';
import { Home, DollarSign, FileText, User, HelpCircle, LogOut, Menu, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import DashboardPaymentModal from '../../components/DashboardPaymentModal';

const navItems = [
    { name: 'Início / Minhas Vaquinhas', path: '/painel', icon: Home },
    { name: 'Listagem de Saques', path: '/painel/saques', icon: DollarSign },
    { name: 'Comprovantes TSE', path: '/painel/comprovantes-tse', icon: FileText },
    { name: 'Seu Perfil', path: '/painel/perfil', icon: User },
    { name: 'Biografia / Configurações', path: '/painel/biografia', icon: ImageIcon },
    { name: 'Ajuda', path: '/ajuda', icon: HelpCircle, external: true },
];

const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <aside className={`fixed z-40 inset-y-0 left-0 bg-white border-r transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col w-72 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none`}>
                <div className="flex items-center justify-between h-20 px-6 border-b">
                    <Logo />
                    <button onClick={toggle} className="md:hidden text-gray-500 hover:text-primary">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map(item =>
                        item.external ? (
                             <Link key={item.name} to={item.path} className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary transition-all group">
                                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/painel'}
                                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                            >
                                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        )
                    )}
                </nav>
                <div className="p-4 border-t bg-gray-50">
                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-white hover:text-red-600 transition-colors hover:shadow-sm border border-transparent hover:border-gray-200">
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggle}></div>}
        </>
    );
};


const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user || user.type !== 'candidate') {
        return <div className="p-8">Acesso negado. Faça login como candidato. <NavLink to="/acessar" className="text-primary underline">Login</NavLink></div>;
    }
    
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header Candidato */}
                <header className="bg-white h-16 px-4 sm:px-8 border-b shadow-sm flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Painel do Candidato</h2>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                         <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary flex items-center gap-2">
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">Voltar para o Site</span>
                        </Link>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">Candidato</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden">
                                {user.photoUrl ? (
                                    <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => { logout(); navigate('/'); }} className="text-gray-400 hover:text-red-500 transition-colors sm:hidden">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

                {/* Modal de Pagamento Bloqueante */}
                <DashboardPaymentModal />
            </div>
        </div>
    );
};

export default DashboardLayout;
