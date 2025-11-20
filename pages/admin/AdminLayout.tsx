
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo';
import { LayoutDashboard, Users, DollarSign, LogOut, Menu, X, ShieldCheck, FileText, Search, Activity } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Candidatos', path: '/admin/candidatos', icon: Users },
    { name: 'Doações', path: '/admin/doacoes', icon: DollarSign },
    { name: 'Saques', path: '/admin/saques', icon: Activity }, // Trocado ícone para diferenciar
    { name: 'Relatórios TSE', path: '/admin/relatorios-tse', icon: FileText },
    { name: 'Auditoria', path: '/admin/auditoria', icon: ShieldCheck },
];

const AdminSidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <aside className={`fixed z-30 inset-y-0 left-0 bg-gray-900 text-white border-r border-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col w-64 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800 bg-gray-900">
                    <Logo />
                    <button onClick={toggle} className="md:hidden text-gray-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex items-center gap-3 p-4 border-b border-gray-800 bg-gray-800/50">
                    <div className="p-2 bg-gray-700 rounded-full">
                         <ShieldCheck size={20} className="text-secondary" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-semibold truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400">Administrador Geral</p>
                    </div>
                </div>
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary text-white font-medium shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800 bg-gray-900">
                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 rounded-md hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <LogOut size={20} />
                        <span>Sair do Sistema</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={toggle}></div>}
        </>
    );
};

const AdminLayout: React.FC = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user || user.type !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
                <ShieldCheck size={64} className="text-red-500 mb-6" />
                <h1 className="text-3xl font-bold text-gray-900">Acesso Restrito</h1>
                <p className="text-gray-600 mt-2">Esta área é exclusiva para administradores da plataforma.</p>
                <Link to="/acessar" className="mt-8 px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-indigo-700 shadow-md">
                    Voltar para Login
                </Link>
            </div>
        );
    }
    
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex md:hidden items-center justify-between bg-white h-16 px-4 border-b shadow-sm z-10">
                     <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-semibold text-gray-800">Painel Admin</span>
                    <div className="w-6"></div> {/* Spacer to center title */}
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
