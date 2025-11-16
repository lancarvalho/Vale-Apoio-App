
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 items-center md:items-start">
            <Logo />
            <p className="text-sm text-gray-500">ValeApoio.com.br | CNPJ 00.000.000/0001-00</p>
          </div>
          <div className="text-sm text-gray-500">
            <a href="#" className="hover:underline">Dados Anteriores</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
