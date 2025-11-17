
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, PiggyBank, BarChart } from 'lucide-react';
import { MOCK_CANDIDATES } from '../constants';
import CandidateCard from '../components/CandidateCard';

const HomePage: React.FC = () => {
  const topCandidates = [...MOCK_CANDIDATES]
    .sort((a, b) => {
      const totalA = a.donations.reduce((sum, d) => sum + d.amount, 0);
      const totalB = b.donations.reduce((sum, d) => sum + d.amount, 0);
      return totalB - totalA;
    })
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center py-20 md:py-28">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  As Eleições 2026<br />
                  <span className="text-primary">começaram!</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                  Receba doações para sua campanha de forma simples, segura e 100% digital.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/cadastrar"
                    className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Criar Conta
                  </Link>
                  <Link
                    to="/candidatos"
                    className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Ver candidatos
                  </Link>
                </div>
              </div>
               {/* Mobile Image */}
              <div className="md:hidden flex items-center justify-center mt-8">
                <img 
                  src="https://horizons-cdn.hostinger.com/ee1fec56-56e3-4bfc-a3ed-03c9f212598d/banner1-kVv0J.jpg" 
                  alt="Candidato cumprimentando eleitora em frente a um posto eleitoral" 
                  className="w-full h-auto max-w-lg rounded-lg shadow-lg" 
                />
              </div>
            </div>
         </div>
         {/* Desktop Background Image with clip-path */}
         <div 
            className="hidden md:block absolute top-0 right-0 h-full w-1/2 lg:w-[55%]" 
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <img
                src="https://horizons-cdn.hostinger.com/ee1fec56-56e3-4bfc-a3ed-03c9f212598d/banner1-kVv0J.jpg"
                alt="Candidato cumprimentando eleitora em frente a um posto eleitoral"
                className="w-full h-full object-cover"
            />
         </div>
      </section>

      {/* Bloco 1 - Arrecade e torne sua eleição uma realidade */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img 
                src="https://horizons-cdn.hostinger.com/ee1fec56-56e3-4bfc-a3ed-03c9f212598d/banner2-k8aOB.jpg" 
                alt="Mãos depositando doações em uma urna de acrílico com o logo do Vale Apoio" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Arrecade e torne sua eleição uma realidade</h2>
              <p className="mt-4 text-lg text-gray-600">
                <Link to="/" className="text-primary font-bold hover:underline">Vale Apoio</Link>, seu apoio começa aqui! Transforme seus apoiadores em doadores e impulsione sua campanha para a vitória.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Por que escolher o Vale Apoio?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                    <PiggyBank size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">As melhores taxas do Brasil.</h3>
                <p className="mt-2 text-gray-600">Apenas 3,65% por transação! Sem pegadinhas e sem complicação.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                    <Zap size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Saque em até 24 horas!</h3>
                <p className="mt-2 text-gray-600">Receba suas doações e transfira para sua conta de campanha rapidamente.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                    <BarChart size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Receba e saque com PIX</h3>
                <p className="mt-2 text-gray-600">Facilidade para seus doadores e agilidade para sua campanha.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Candidates Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Campeões de arrecadação</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
           <div className="text-center mt-12">
            <Link to="/candidatos" className="text-primary font-semibold hover:underline flex items-center justify-center gap-2">
                Ver todos os candidatos <ArrowRight size={18} />
            </Link>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Crie sua conta e comece a arrecadar!</h2>
          <p className="mt-2 text-indigo-200 max-w-xl mx-auto">Junte-se a centenas de candidatos que confiam no Vale Apoio para impulsionar suas campanhas.</p>
          <Link
            to="/cadastrar"
            className="mt-8 inline-block px-10 py-3 bg-secondary text-white font-bold rounded-md hover:bg-emerald-600 transition-transform hover:scale-105"
          >
            CRIAR CONTA
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
