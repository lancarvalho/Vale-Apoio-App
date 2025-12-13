
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { User, LogOut, LayoutDashboard, Menu, X, HelpCircle, Users } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDashboardAccess = () => {
    if (user?.type === 'candidate') {
      navigate('/painel');
    } else if (user?.type === 'admin') {
      navigate('/admin');
    } else if (user?.type === 'donor') {
      navigate('/painel-doador');
    }
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
      logout();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/');
  }

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
                <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
                <Link to="/candidatos" className="text-gray-600 hover:text-primary transition-colors font-medium">Candidatos</Link>
                <Link to="/ajuda" className="text-gray-600 hover:text-primary transition-colors font-medium">Ajuda</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
                {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden border border-gray-200">
                        {user.photoUrl ? <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" /> : <User size={18} />}
                    </div>
                    <span>Minha Conta</span>
                    </button>

                    {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button
                        onClick={handleDashboardAccess}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                        <LayoutDashboard size={16} />
                        {user.type === 'admin' ? 'Painel Admin' : user.type === 'donor' ? 'Meus Recibos' : 'Painel de Controle'}
                        </button>
                        <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                        <LogOut size={16} />
                        Sair
                        </button>
                    </div>
                    )}
                </div>
                ) : (
                <>
                    <Link to="/cadastrar" className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-colors">
                    Cadastrar
                    </Link>
                    <Link to="/acessar" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-indigo-700 transition-colors">
                    Acessar
                    </Link>
                </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-gray-600 hover:text-primary p-2"
                >
                    <Menu size={24} />
                </button>
            </div>
            </div>
        </div>
        </header>

        {/* Mobile Sidebar/Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[60] flex justify-end md:hidden">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                {/* Sidebar */}
                <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
                    <div className="p-4 border-b flex justify-between items-center">
                        <Logo />
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="px-4 space-y-1">
                            <Link to="/candidatos" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                                <Users size={20} /> Candidatos
                            </Link>
                            <Link to="/ajuda" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                                <HelpCircle size={20} /> Ajuda & Suporte
                            </Link>
                        </div>
                        
                        <div className="border-t my-4 pt-4 px-4">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="px-4 py-2 mb-2 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <button 
                                        onClick={handleDashboardAccess}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-primary font-medium hover:bg-indigo-50 rounded-lg"
                                    >
                                        <LayoutDashboard size={20} /> 
                                        {user.type === 'admin' ? 'Painel Administrativo' : 'Acessar Painel'}
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg"
                                    >
                                        <LogOut size={20} /> Sair da conta
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Link to="/acessar" className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">
                                        Acessar Conta
                                    </Link>
                                    <Link to="/cadastrar" className="block w-full text-center px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-indigo-700">
                                        Criar Conta
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default Header;
