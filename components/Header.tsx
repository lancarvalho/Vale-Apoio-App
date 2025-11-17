
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardAccess = () => {
    if (user?.type === 'candidate') {
      navigate('/painel');
    }
  };

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
              <>
                <button onClick={handleDashboardAccess} className="text-sm font-medium text-primary hover:underline">
                  Olá, {user.name.split(' ')[0]}
                </button>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                  Sair
                </button>
              </>
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
