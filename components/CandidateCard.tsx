
import React from 'react';
import { Link } from 'react-router-dom';
import { Candidate } from '../types';
import { Coins, MapPin } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const totalRaised = candidate.donations.reduce((acc, donation) => acc + donation.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
        <p className="text-sm font-medium text-primary">{candidate.party.acronym}</p>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <MapPin size={16} className="mr-1" />
          <span>{candidate.city} / {candidate.state}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex-grow">
          <div className="flex items-center text-gray-600">
            <Coins size={18} className="mr-2 text-secondary" />
            <div>
              <p className="text-sm">Total Arrecadado</p>
              <p className="font-bold text-lg text-secondary">
                {totalRaised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
        </div>
        <Link 
          to={`/candidatos/${candidate.slug}`}
          className="mt-4 w-full text-center bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-300"
        >
          Apoiar
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
