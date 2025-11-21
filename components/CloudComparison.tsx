import React from 'react';
import { CheckCircle, XCircle, Cloud, Server } from 'lucide-react';
import Logo from './Logo';

const CloudComparison: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 text-gray-800 font-sans print:p-0 print:text-black">
      <div className="max-w-4xl mx-auto border border-gray-200 shadow-lg p-10 bg-white print:shadow-none print:border-none print:p-0 print:max-w-none">
        
        {/* Header do Documento */}
        <div className="flex justify-between items-center mb-10 border-b pb-6">
          <div>
            <Logo />
            <h1 className="text-2xl font-bold mt-2 text-gray-900">Estudo de Viabilidade de Infraestrutura</h1>
            <p className="text-gray-500 text-sm">Vale Apoio - Plataforma de Financiamento Coletivo</p>
          </div>
          <div className="text-right print:hidden">
            <button 
              onClick={handlePrint}
              className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>

        {/* Resumo Executivo */}
        <section className="mb-10 break-inside-avoid">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">1. Resumo Executivo</h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            Este documento analisa a migração da infraestrutura de hospedagem do Frontend da Vercel para o <strong>Google Cloud Platform (Firebase Hosting)</strong>. 
            Considerando que a aplicação já utiliza serviços do ecossistema Google (Firebase Auth e Firestore Database), a centralização no Google Cloud apresenta vantagens 
            significativas em termos de latência, gerenciamento centralizado e custos em escala.
          </p>
        </section>

        {/* Comparativo Lado a Lado */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wide">2. Comparativo Técnico e Financeiro</h2>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Coluna Vercel */}
            <div className="border rounded-lg p-6 bg-gray-50 break-inside-avoid">
              <div className="flex items-center gap-2 mb-4">
                <Server size={24} className="text-gray-600" />
                <h3 className="text-lg font-bold">Vercel (Atual)</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Deploy:</strong> Extremamente simples (Git Push).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Performance:</strong> Edge Network global excelente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 mt-0.5" />
                  <span><strong>Custo Pro:</strong> $20/mês por membro da equipe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 mt-0.5" />
                  <span><strong>Limites:</strong> Bandwidth e execuções Serverless podem ficar caros rapidamente em escala.</span>
                </li>
                 <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 mt-0.5" />
                  <span><strong>Integração:</strong> Externa ao banco de dados (latência extra).</span>
                </li>
              </ul>
            </div>

            {/* Coluna Google Cloud */}
            <div className="border-2 border-primary/20 rounded-lg p-6 bg-indigo-50/50 break-inside-avoid">
               <div className="flex items-center gap-2 mb-4">
                <Cloud size={24} className="text-primary" />
                <h3 className="text-lg font-bold text-primary">Google Cloud / Firebase</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Ecossistema:</strong> Nativo com Firestore e Auth (mesmo projeto).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Custo:</strong> Plano "Blaze" (Pay-as-you-go). Generoso Free Tier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Latência:</strong> Mínima (Frontend e Backend na mesma rede do Google).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>Escalabilidade:</strong> Suporta picos eleitorais massivos sem configuração extra.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span><strong>SSL/CDN:</strong> Incluído automaticamente (Fastly).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tabela de Custos Estimados */}
        <section className="mb-10 break-inside-avoid">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">3. Projeção de Custos (Cenário Eleitoral)</h2>
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vercel (Pro)</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Google Cloud (Blaze)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="px-6 py-4 font-medium">Hospedagem Frontend</td>
                  <td className="px-6 py-4 text-red-600">$20.00 / mês (fixo)</td>
                  <td className="px-6 py-4 text-green-600">Gratuito (até 10GB transf.)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Cloud Functions (Backend)</td>
                  <td className="px-6 py-4 text-gray-500">N/A (Usa AWS Lambda)</td>
                  <td className="px-6 py-4 text-green-600">Gratuito (2M invocações/mês)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Banco de Dados</td>
                  <td className="px-6 py-4 text-gray-500">Externo (Custo à parte)</td>
                  <td className="px-6 py-4 text-green-600">Gratuito (até 50k leituras/dia)</td>
                </tr>
                <tr className="bg-gray-50 font-bold">
                  <td className="px-6 py-4">Total Estimado (Inicial)</td>
                  <td className="px-6 py-4 text-red-600">R$ 120,00+ / mês</td>
                  <td className="px-6 py-4 text-green-600">R$ 0,00 / mês</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Conclusão */}
        <section className="bg-green-50 border border-green-200 p-6 rounded-lg break-inside-avoid">
          <h2 className="text-lg font-bold text-green-800 mb-2">4. Conclusão e Recomendação</h2>
          <p className="text-green-700 text-sm leading-relaxed">
            Recomenda-se a <strong>migração total para o Google Cloud (Firebase)</strong>. Além da redução drástica de custos fixos mensais (ideal para o fluxo de caixa inicial), 
            a centralização simplifica a gestão de segurança, logs e backups. O Google Cloud oferece a robustez necessária para lidar com picos de tráfego durante a campanha eleitoral 
            sem necessidade de upgrades manuais de plano.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t text-center text-gray-400 text-xs">
          <p>Documento gerado automaticamente pelo sistema Vale Apoio em {new Date().toLocaleDateString()}.</p>
        </div>

      </div>
    </div>
  );
};

export default CloudComparison;