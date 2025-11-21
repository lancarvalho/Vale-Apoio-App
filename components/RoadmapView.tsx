import React from 'react';
import { Calendar, Shield, Rocket, CheckCircle, Server, FileText, Flag } from 'lucide-react';
import Logo from './Logo';

const RoadmapItem: React.FC<{ 
  period: string; 
  title: string; 
  description: string; 
  icon: React.ElementType;
  isLast?: boolean;
  status: 'done' | 'current' | 'future';
}> = ({ period, title, description, icon: Icon, isLast, status }) => {
  
  const statusColors = {
    done: 'bg-green-100 text-green-700 border-green-200',
    current: 'bg-primary/10 text-primary border-primary/30 ring-4 ring-primary/5',
    future: 'bg-gray-50 text-gray-500 border-gray-200 grayscale'
  };

  const lineColors = {
    done: 'bg-green-400',
    current: 'bg-primary',
    future: 'bg-gray-200'
  };

  return (
    <div className="flex gap-6 relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className={`absolute left-6 top-12 bottom-[-24px] w-1 ${status === 'done' ? 'bg-green-200' : 'bg-gray-100'} -z-10`}></div>
      )}

      {/* Icon Bubble */}
      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${status === 'current' ? 'bg-white border-primary shadow-lg scale-110' : 'bg-white border-gray-200'}`}>
        <Icon size={20} className={status === 'done' ? 'text-green-600' : status === 'current' ? 'text-primary' : 'text-gray-400'} />
        {status === 'done' && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                <CheckCircle size={10} className="text-white" />
            </div>
        )}
      </div>

      {/* Content Card */}
      <div className={`flex-1 mb-8 p-6 rounded-xl border transition-all ${status === 'current' ? 'bg-white shadow-md border-primary/40' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <h3 className={`font-bold text-lg ${status === 'future' ? 'text-gray-500' : 'text-gray-900'}`}>{title}</h3>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mt-2 sm:mt-0 ${status === 'current' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                {period}
            </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const RoadmapView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 text-gray-800 font-sans print:p-0">
      <div className="max-w-4xl mx-auto border border-gray-200 shadow-xl p-12 bg-white print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-16 border-b pb-8">
          <div>
            <div className="scale-90 origin-left mb-4">
               <Logo />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Roadmap de Evolução Tecnológica</h1>
            <p className="text-gray-500 mt-2 max-w-xl">Cronograma estratégico de desenvolvimento, segurança e homologação da plataforma Vale Apoio para o ciclo eleitoral de 2026.</p>
          </div>
          <div className="text-right print:hidden">
            <button 
              onClick={handlePrint}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-primary/30 flex items-center gap-2"
            >
              <FileText size={18} /> Imprimir Documento
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="pl-4">
            
            <RoadmapItem 
                status="done"
                period="Q4 2025"
                title="Estruturação da Plataforma"
                description="Desenvolvimento do núcleo do sistema (Frontend e Backend). Implementação dos módulos de cadastro, painel do candidato e integração inicial com gateways de pagamento. Definição dos Termos de Uso e Política de Privacidade."
                icon={Server}
            />

            <RoadmapItem 
                status="current"
                period="Q1 2026"
                title="Segurança e Auditoria"
                description="Realização de testes de intrusão (Pentests) para blindagem de dados. Implementação final dos logs de auditoria imutáveis e criptografia de ponta a ponta no banco de dados Firebase."
                icon={Shield}
            />

            <RoadmapItem 
                status="future"
                period="ABRIL / MAIO 2026"
                title="Homologação TSE"
                description="Apresentação formal da plataforma ao Tribunal Superior Eleitoral. Emissão da Declaração de Adequação Técnica. Testes de conformidade com o layout SPCE v3.0 para geração de arquivos .FCC."
                icon={FileText}
            />

            <RoadmapItem 
                status="future"
                period="15 MAIO 2026"
                title="Lançamento Oficial (Go Live)"
                description="Abertura da plataforma para arrecadação de pré-candidatos. Início do monitoramento de infraestrutura 24/7 e ativação do suporte técnico dedicado via WhatsApp."
                icon={Rocket}
            />

            <RoadmapItem 
                status="future"
                period="AGO / SET 2026"
                title="Escala e Alta Disponibilidade"
                description="Período de pico eleitoral. Escalonamento elástico automático da infraestrutura Google Cloud para suportar milhões de acessos simultâneos sem degradação de performance."
                icon={Calendar}
            />

            <RoadmapItem 
                status="future"
                period="PÓS-ELEIÇÃO 2026"
                title="Arquivamento e Compliance"
                description="Geração de relatórios finais consolidados. Congelamento do banco de dados e arquivamento seguro das informações fiscais pelo prazo legal de 5 anos exigido pela legislação."
                icon={Flag}
                isLast={true}
            />

        </div>

        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Vale Apoio &copy; 2026 • Tecnologia a serviço da democracia</p>
        </div>

      </div>
    </div>
  );
};

export default RoadmapView;