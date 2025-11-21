
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  };

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
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/candidatos" className="text-gray-600 hover:text-primary transition-colors">Candidatos</Link>
            <Link to="/ajuda" className="text-gray-600 hover:text-primary transition-colors">Ajuda</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                    {user.photoUrl ? <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" /> : <User size={18} />}
                  </div>
                  <span className="hidden sm:block">Minha Conta</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleDashboardAccess}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard size={16} />
                      {user.type === 'admin' ? 'Painel Administrativo' : 'Painel de Controle'}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                        navigate('/');
                      }}
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
                <Link to="/cadastrar" className="hidden sm:block px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors">
                  Cadastrar
                </Link>
                <Link to="/acessar" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-indigo-700 transition-colors">
                  Acessar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
