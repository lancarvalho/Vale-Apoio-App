
import React from 'react';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { PaymentStatus, TSEStatus } from '../types';

interface VerificationBadgesProps {
  paymentStatus: PaymentStatus;
  tseStatus: TSEStatus;
  hasBio: boolean;
  showLabels?: boolean; // Se true, mostra o texto ao lado do ícone. Se false, apenas tooltip.
  size?: number;
}

const VerificationBadges: React.FC<VerificationBadgesProps> = ({ 
  paymentStatus, 
  tseStatus, 
  hasBio, 
  showLabels = false,
  size = 20 
}) => {
  
  // Regra: Candidato Cadastrado + Pago + Bio Configurada
  const isPlatformVerified = paymentStatus === 'Ativo' && hasBio;

  // Regra: Candidatura Deferida pelo TSE
  const isTSEVerified = tseStatus === 'Deferida' || tseStatus === 'Deferida com Recurso';

  return (
    <div className="flex items-center gap-2">
      
      {/* 1. Selo Vale Apoio - Exclusivo da Plataforma */}
      {isPlatformVerified && (
        <div className="group relative flex items-center">
          <div className="text-emerald-500 bg-emerald-50 rounded-full p-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-help">
            <ShieldCheck size={size} fill="currentColor" className="text-emerald-100 stroke-emerald-600" strokeWidth={2.5} />
          </div>
          
          {showLabels && (
            <span className="ml-1.5 text-xs font-bold text-emerald-700 hidden sm:block">Verificado Vale Apoio</span>
          )}

          {/* Tooltip Personalizado */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Conta Verificada Vale Apoio
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* 2. Selo Oficial TSE - Azul (Twitter style) */}
      {isTSEVerified && (
        <div className="group relative flex items-center">
          <div className="text-blue-500 bg-blue-50 rounded-full p-0.5 border border-blue-200 hover:bg-blue-100 transition-colors cursor-help">
            <BadgeCheck size={size} fill="currentColor" className="text-blue-500 stroke-white" />
          </div>

          {showLabels && (
            <span className="ml-1.5 text-xs font-bold text-blue-700 hidden sm:block">Oficial TSE</span>
          )}

          {/* Tooltip Personalizado */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Candidatura Homologada TSE
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationBadges;
