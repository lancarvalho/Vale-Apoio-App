
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo';
import { Home, DollarSign, FileText, User, HelpCircle, LogOut, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Início', path: '/painel', icon: Home },
    { name: 'Meus Saques', path: '/painel/saques', icon: DollarSign },
    { name: 'Comprovantes TSE', path: '/painel/comprovantes-tse', icon: FileText },
    { name: 'Meu Perfil', path: '/painel/perfil', icon: User },
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
            <aside className={`fixed z-30 inset-y-0 left-0 bg-white border-r transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col w-64 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <Logo />
                    <button onClick={toggle} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-1 py-4 px-2 space-y-1">
                    {navItems.map(item =>
                        item.external ? (
                             <a key={item.name} href={`#${item.path}`} className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-primary transition-colors">
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </a>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/painel'}
                                className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    )}
                </nav>
                <div className="p-4 border-t">
                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors">
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggle}></div>}
        </>
    );
};


const DashboardLayout: React.FC = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user || user.type !== 'candidate') {
        return <div className="p-8">Acesso negado. Faça login como candidato. <NavLink to="/acessar" className="text-primary underline">Login</NavLink></div>;
    }
    
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex md:hidden items-center justify-between bg-white h-16 px-4 border-b">
                     <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-medium">Olá, {user.name.split(' ')[0]}</span>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
