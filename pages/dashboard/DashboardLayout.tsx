
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import Logo from '../../components/Logo';
import { Home, DollarSign, FileText, User, HelpCircle, LogOut, Menu, X, Image as ImageIcon, ArrowLeft, MessageCircle, Bell, Clock, CheckCircle } from 'lucide-react';
import DashboardPaymentModal from '../../components/DashboardPaymentModal';
import VerificationBadges from '../../components/VerificationBadges';

const navItems = [
    { name: 'Início / Minhas Vaquinhas', path: '/painel', icon: Home },
    { name: 'Listagem de Saques', path: '/painel/saques', icon: DollarSign },
    { name: 'Comprovantes TSE', path: '/painel/comprovantes-tse', icon: FileText },
    { name: 'Seu Perfil', path: '/painel/perfil', icon: User },
    { name: 'Biografia / Configurações', path: '/painel/biografia', icon: ImageIcon },
    { name: 'Ajuda', path: '/ajuda', icon: HelpCircle, external: true },
];

// Componente Sidebar (Movido para dentro do arquivo para contexto, mas poderia ser separado)
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
                             <Link 
                                key={item.name} 
                                to={item.path} 
                                onClick={toggle} 
                                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary transition-all group"
                            >
                                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/painel'}
                                onClick={toggle}
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
    const { config } = useConfig();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Notification Logic
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Pagamento de inscrição confirmado!', time: 'Há 5 min', read: false },
        { id: 2, title: 'Nova doação recebida: R$ 50,00', time: 'Há 1 hora', read: false },
        { id: 3, title: 'Seu perfil foi verificado pelo TSE.', time: 'Ontem', read: true },
    ]);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    if (!user || user.type !== 'candidate') {
        return <div className="p-8">Acesso negado. Faça login como candidato. <NavLink to="/acessar" className="text-primary underline">Login</NavLink></div>;
    }
    
    const createdAt = new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    const mockTseStatus = 'Aguardando'; 
    const mockPaymentStatus = user.pendingPayment ? 'Pendente' : 'Ativo';
    const hasBio = !!user.description;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className={`${user.pendingPayment ? 'bg-[#6366F1] text-white' : 'bg-white text-gray-800'} h-20 px-4 sm:px-8 border-b shadow-sm flex items-center justify-between z-20 transition-colors duration-300 relative`}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className={`md:hidden ${user.pendingPayment ? 'text-white' : 'text-gray-600'}`}>
                            <Menu size={24} />
                        </button>
                        <h2 className={`text-xl font-semibold hidden lg:block ${user.pendingPayment ? 'text-white' : 'text-gray-800'}`}>Painel do Candidato</h2>
                    </div>

                    {user.pendingPayment && (
                        <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-full sm:w-auto text-center hidden sm:flex">
                            <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-sm sm:text-base">
                                <Clock size={18} className="animate-pulse text-yellow-300"/>
                                <span>PIX GERADO - PENDENTE</span>
                            </div>
                            <span className="text-xs text-indigo-100">criado em: {createdAt}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-4 sm:gap-6">
                         <Link to="/" className={`text-sm font-medium flex items-center gap-2 ${user.pendingPayment ? 'text-indigo-100 hover:text-white' : 'text-gray-600 hover:text-primary'} hidden sm:flex`}>
                            <ArrowLeft size={16} />
                            <span>Voltar para o Site</span>
                        </Link>

                        {/* Notification System */}
                        <div className="relative">
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`relative p-2 rounded-full hover:bg-white/10 transition-colors ${user.pendingPayment ? 'text-white' : 'text-gray-500 hover:text-primary'}`}
                            >
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white ring-2 ring-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn origin-top-right">
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-gray-800">Notificações</h3>
                                        {unreadCount > 0 && (
                                            <button onClick={handleMarkAllRead} className="text-xs text-primary hover:underline">
                                                Marcar lidas
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? notifications.map(n => (
                                            <div key={n.id} className={`p-4 border-b last:border-0 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-indigo-50/50' : ''}`}>
                                                <div className="flex gap-3">
                                                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!n.read ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                                    <div>
                                                        <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
                                                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-8 text-center text-gray-500 text-sm">Nenhuma notificação.</div>
                                        )}
                                    </div>
                                    <div className="p-2 bg-gray-50 text-center rounded-b-lg">
                                        <button onClick={() => setShowNotifications(false)} className="text-xs text-gray-500 hover:text-gray-800">Fechar</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={`h-8 w-px ${user.pendingPayment ? 'bg-indigo-400' : 'bg-gray-200'}`}></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <div className="flex items-center justify-end gap-1">
                                    <p className={`text-sm font-bold ${user.pendingPayment ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                                    {!user.pendingPayment && (
                                        <VerificationBadges 
                                            paymentStatus={mockPaymentStatus} 
                                            tseStatus={mockTseStatus} 
                                            hasBio={hasBio} 
                                            size={14}
                                        />
                                    )}
                                </div>
                                <p className={`text-xs ${user.pendingPayment ? 'text-indigo-200' : 'text-gray-500'}`}>Candidato</p>
                            </div>
                            <div className={`w-10 h-10 rounded-full border-2 overflow-hidden ${user.pendingPayment ? 'bg-indigo-800 border-indigo-300' : 'bg-primary/10 border-primary/20'}`}>
                                {user.photoUrl ? (
                                    <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${user.pendingPayment ? 'text-white' : 'text-primary'}`}>
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => { logout(); navigate('/'); }} className={`${user.pendingPayment ? 'text-indigo-200 hover:text-white' : 'text-gray-400 hover:text-red-500'} transition-colors sm:hidden`}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8" onClick={() => setShowNotifications(false)}>
                    <Outlet />
                </main>

                <a 
                    href={`https://wa.me/${config.whatsapp}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 bg-[#25D366] text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 z-50 border-2 border-white" 
                    aria-label="Fale conosco no WhatsApp"
                >
                    <MessageCircle size={32} />
                </a>

                <DashboardPaymentModal />
            </div>
        </div>
    );
};

export default DashboardLayout;
