
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useConfig } from '../contexts/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 items-center md:items-start">
            <Logo />
            <p className="text-sm text-gray-500">{config.companyName} | CNPJ {config.cnpj}</p>
            <p className="text-xs text-gray-400">{config.address}</p>
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="/termos" className="hover:underline">Termos e Condições</Link>
            <a href="#" className="hover:underline">Dados Anteriores</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
