
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, PiggyBank, BarChart, Users } from 'lucide-react';
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
      <section className="relative bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            As Eleições 2026<br />começaram!
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Apoie seu candidato e ajude a construir o futuro. Receba doações de forma simples, segura e transparente.
          </p>
          <Link
            to="/cadastrar"
            className="mt-8 px-8 py-3 bg-secondary font-bold rounded-md hover:bg-emerald-600 transition-transform hover:scale-105"
          >
            Criar Conta de Candidato
          </Link>
        </div>
      </section>

      {/* Bloco 1 */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Arrecade e torne sua eleição uma realidade</h2>
              <p className="mt-4 text-lg text-gray-600">Vale Apoio, seu apoio começa aqui! Nossa plataforma é homologada pelo TSE e garante toda a segurança para sua campanha.</p>
            </div>
            <div className="flex justify-center">
              <img src="https://picsum.photos/500/350?grayscale" alt="Urna Eletrônica" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-100 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Por que escolher o Vale Apoio?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                    <PiggyBank size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">As melhores taxas do Brasil.</h3>
                <p className="mt-2 text-gray-600">Apenas 3,65% por transação! Sem pegadinhas e sem complicação.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                    <Zap size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Saque em até 24 horas!</h3>
                <p className="mt-2 text-gray-600">Receba suas doações e transfira para sua conta de campanha rapidamente.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
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
      <section className="py-16 sm:py-24">
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
