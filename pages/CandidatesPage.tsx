
import React, { useState, useMemo } from 'react';
import { MOCK_CANDIDATES } from '../constants';
import CandidateCard from '../components/CandidateCard';
import { Search } from 'lucide-react';

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Encontre seu Candidato</h1>
          <p className="mt-2 text-lg text-gray-600">Pesquise, conheça e apoie os candidatos que representam suas ideias.</p>
        </div>
        
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por nome, partido, cidade ou estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCandidates.slice(0, visibleCount).map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
             <p className="text-xl text-gray-500">Nenhum candidato encontrado com os critérios de busca.</p>
          </div>
        )}

        {visibleCount < filteredCandidates.length && (
          <div className="text-center mt-12">
            <button
              onClick={showMore}
              className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-indigo-700 transition-colors"
            >
              Ver Mais
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesPage;
