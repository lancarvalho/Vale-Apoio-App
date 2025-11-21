import React from 'react';
import { Globe, Lock, Users, User, ShieldCheck, Layout, FileText, Share2, DollarSign, Settings, Database, Server } from 'lucide-react';
import Logo from './Logo';

const SitemapNode: React.FC<{ 
  title: string; 
  icon?: React.ElementType; 
  color?: string; 
  description?: string;
  children?: React.ReactNode;
  isLast?: boolean;
}> = ({ title, icon: Icon, color = "border-gray-300", description, children, isLast }) => {
  return (
    <div className="flex flex-col relative pl-8 break-inside-avoid">
      {/* Linha Vertical conectora */}
      <div className={`absolute top-0 bottom-0 left-0 w-px bg-gray-300 ${isLast ? 'h-8' : ''}`}></div>
      
      {/* Linha Horizontal conectora */}
      <div className="absolute top-8 left-0 w-8 h-px bg-gray-300"></div>

      <div className="mb-6 relative">
        <div className={`bg-white p-4 rounded-lg border-l-4 shadow-sm flex items-start gap-3 ${color} print:shadow-none print:border`}>
          {Icon && (
            <div className="mt-1 text-gray-500">
              <Icon size={20} />
            </div>
          )}
          <div>
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{title}</h3>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

const SitemapView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 text-gray-800 font-sans print:p-0 print:text-black">
      <div className="max-w-5xl mx-auto border border-gray-200 shadow-xl p-10 bg-white print:shadow-none print:border-none print:p-0 print:max-w-none">
        
        {/* Header do Documento */}
        <div className="flex justify-between items-center mb-12 border-b pb-6">
          <div>
            <div className="scale-90 origin-left">
               <Logo />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-gray-900">Mapa de Arquitetura do Sistema (Sitemap)</h1>
            <p className="text-gray-500 text-sm">Estrutura funcional e hierarquia de acessos da plataforma Vale Apoio.</p>
          </div>
          <div className="text-right print:hidden">
            <button 
              onClick={handlePrint}
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <FileText size={18} /> Imprimir PDF
            </button>
          </div>
        </div>

        {/* Diagrama */}
        <div className="ml-4">
            {/* NÓ RAIZ */}
            <div className="flex items-center gap-3 mb-8 break-inside-avoid">
                <div className="p-3 bg-gray-800 text-white rounded-lg shadow-md z-10">
                    <Server size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Plataforma Vale Apoio</h2>
                    <p className="text-sm text-gray-500">Root Domain (valeapoio.com.br)</p>
                </div>
            </div>

            <div className="pl-6 border-l border-gray-300 relative">
                
                {/* ÁREA PÚBLICA */}
                <SitemapNode title="Área Pública (Frontend)" icon={Globe} color="border-blue-500" description="Acesso irrestrito para visitantes e eleitores.">
                    <SitemapNode title="Página Inicial (Home)" description="Landing page, conversão e destaques." />
                    <SitemapNode title="Lista de Candidatos" description="Busca e filtragem de candidatos aptos." />
                    <SitemapNode title="Perfil do Candidato (Dinâmico)" icon={User} description="URL: /candidatos/:nome-urna. Doação, Biografia e Transparência." />
                    <SitemapNode title="Transparência & Jurídico" description="Termos de Uso, FAQ e Ajuda." />
                    <SitemapNode title="Fluxos de Entrada" description="Login e Cadastro (Candidato/Doador)." isLast />
                </SitemapNode>

                {/* ÁREA DO CANDIDATO */}
                <SitemapNode title="Painel do Candidato (Restrito)" icon={Lock} color="border-primary" description="Requer Autenticação + 2FA (Email/Senha).">
                    <SitemapNode title="Controle de Acesso (Middleware)" description="Bloqueio lógico se pagamento pendente." />
                    <SitemapNode title="Dashboard / Minhas Vaquinhas" icon={Layout} description="Gestão de campanhas e métricas em tempo real." />
                    <SitemapNode title="Módulo Financeiro" icon={DollarSign} description="Solicitação e histórico de saques.">
                        <SitemapNode title="Listagem de Saques" description="Status e comprovantes de transferência." isLast />
                    </SitemapNode>
                    <SitemapNode title="Compliance Eleitoral" icon={FileText} description="Geração de recibos e arquivos fiscais.">
                         <SitemapNode title="Comprovantes TSE" description="Histórico de arquivos .FCC exportados." isLast />
                    </SitemapNode>
                    <SitemapNode title="Configurações de Campanha" icon={Settings} description="Biografia, Foto, Vídeo e Dados Pessoais." isLast />
                </SitemapNode>

                {/* ÁREA DO ADMIN */}
                <SitemapNode title="Super Admin (Backoffice)" icon={ShieldCheck} color="border-gray-800" description="Gestão total da plataforma. Acesso restrito.">
                    <SitemapNode title="Dashboard Analítico" description="KPIs financeiros e operacionais." />
                    <SitemapNode title="Gestão de Candidaturas" icon={Users} description="Aprovação, Rejeição e Consulta API TSE." />
                    <SitemapNode title="Gestão Financeira" description="Controle de Doações e Aprovação de Saques (Upload de Comprovantes)." />
                    <SitemapNode title="Integração SPCE/TSE" icon={Database} description="Gerador de arquivos de lote para o Tribunal." />
                    <SitemapNode title="Auditoria & Logs" description="Rastreabilidade de ações sensíveis." />
                    <SitemapNode title="Configurações Globais" description="Termos de uso, Taxas e Dados da Empresa." isLast />
                </SitemapNode>

                {/* ÁREA DO DOADOR */}
                <SitemapNode title="Painel do Doador" icon={Users} color="border-emerald-500" description="Área para eleitores acompanharem suas doações." isLast>
                    <SitemapNode title="Histórico de Doações" description="Lista de apoios realizados." />
                    <SitemapNode title="Meus Recibos" description="Download de recibos para Imposto de Renda." isLast />
                </SitemapNode>

            </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-gray-400 text-xs">
          <p>Documento técnico gerado automaticamente. Vale Apoio &copy; 2026.</p>
        </div>

      </div>
    </div>
  );
};

export default SitemapView;