
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const TermsPage: React.FC = () => {
  const { config } = useConfig();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: config.termsContent }}
          />
          <p className="mt-8 text-sm text-gray-500 text-center italic">
            Última atualização: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
