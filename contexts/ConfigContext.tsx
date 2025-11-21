
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TERMS_CONTENT } from '../constants';

export interface PlatformConfig {
  companyName: string;
  cnpj: string;
  address: string;
  supportEmail: string;
  whatsapp: string;
  registrationFee: string;
  transactionFee: string;
  termsContent: string;
}

interface ConfigContextType {
  config: PlatformConfig;
  updateConfig: (newConfig: Partial<PlatformConfig>) => void;
}

const defaultSettings: PlatformConfig = {
  companyName: 'VALEAPOIO.COM.BR LTDA',
  cnpj: '55.302.823/0001-63',
  address: 'SQS 302 Bloco A, Asa Sul, Brasília - DF',
  supportEmail: 'contato@valeapoio.com.br',
  whatsapp: '5561999999999',
  registrationFee: '189.00',
  transactionFee: '3.65',
  termsContent: TERMS_CONTENT, // Inicia com o valor do constants.ts
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PlatformConfig>(() => {
    // Tenta carregar do localStorage para persistir alterações entre refreshes (simulando DB)
    const savedConfig = localStorage.getItem('platform_config');
    return savedConfig ? JSON.parse(savedConfig) : defaultSettings;
  });

  const updateConfig = (newConfig: Partial<PlatformConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('platform_config', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
