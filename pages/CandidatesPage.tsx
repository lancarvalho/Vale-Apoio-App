
import React, { useState, useMemo } from 'react';
import { MOCK_CANDIDATES } from '../constants';
import CandidateCard from '../components/CandidateCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        {currentItems.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentItems.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                        aria-label="Página anterior"
                    >
                        <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    
                    <span className="text-sm font-medium text-gray-600">
                        Página <span className="text-gray-900 font-bold">{currentPage}</span> de {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                        aria-label="Próxima página"
                    >
                        <ChevronRight size={20} className="text-gray-700" />
                    </button>
                </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
             <p className="text-xl text-gray-500">Nenhum candidato encontrado com os critérios de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesPage;
