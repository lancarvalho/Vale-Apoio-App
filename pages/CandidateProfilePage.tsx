
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CANDIDATES } from '../constants';
import { Share2, Heart, Users, DollarSign, Check } from 'lucide-react';
import VerificationBadges from '../components/VerificationBadges';

const DonationWidget: React.FC<{ onDonate: (amount: number, method: string) => void }> = ({ onDonate }) => {
    const [amount, setAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const amounts = [20, 50, 100, 250];

    const handleDonate = () => {
        const finalAmount = customAmount ? parseFloat(customAmount) : amount;
        if (!isNaN(finalAmount) && finalAmount > 0) {
            onDonate(finalAmount, paymentMethod);
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-center text-gray-800">Faça sua doação</h3>
            <div className="mt-6">
                <p className="font-semibold text-gray-700">Selecione um valor:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {amounts.map(val => (
                        <button key={val} onClick={() => { setAmount(val); setCustomAmount('') }} className={`p-3 border rounded-md font-bold transition-colors ${amount === val && !customAmount ? 'bg-primary text-white border-primary' : 'bg-gray-100 hover:bg-gray-200'}`}>
                           {val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </button>
                    ))}
                </div>
                <input 
                    type="number"
                    placeholder="Outro valor"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(0) }}
                    className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="mt-6">
                 <p className="font-semibold text-gray-700">Forma de Pagamento:</p>
                 <div className="flex justify-around mt-2 bg-gray-100 p-1 rounded-lg">
                    {['PIX', 'Cartão', 'Boleto'].map(method => (
                        <button key={method} onClick={() => setPaymentMethod(method)} className={`w-full py-2 rounded-md font-semibold text-sm transition-colors ${paymentMethod === method ? 'bg-white shadow' : 'text-gray-600'}`}>
                            {method}
                        </button>
                    ))}
                 </div>
            </div>
            <button onClick={handleDonate} className="mt-8 w-full bg-secondary text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-emerald-600 transition-transform hover:scale-105">
                Apoiar com {customAmount ? parseFloat(customAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </button>
        </div>
    );
};


const CandidateProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  const candidate = MOCK_CANDIDATES.find(c => c.slug === slug);

  if (!candidate) {
    return <div className="text-center py-20">Candidato não encontrado. <Link to="/candidatos" className="text-primary underline">Voltar para a lista</Link></div>;
  }
  
  const totalRaised = candidate.donations.reduce((acc, donation) => acc + donation.amount, 0);
  const goal = 50000; // Mock goal
  const progress = Math.min((totalRaised / goal) * 100, 100);

  const handleDonate = (amount: number, method: string) => {
    console.log(`Donating ${amount} via ${method}`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleShare = async () => {
    const shareData = {
        title: `Apoie ${candidate.name}`,
        text: `Estou apoiando ${candidate.name} nas eleições de 2026. Venha apoiar também!`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error('Error sharing:', err);
        }
    } else {
        // Fallback for browsers without native share (copy to clipboard)
        navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
    }
  };


  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <img src={candidate.photoUrl} alt={candidate.name} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-primary shadow-lg" />
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{candidate.name}</h1>
                                {/* Selos de Verificação - Tamanho Grande */}
                                <VerificationBadges 
                                    paymentStatus={candidate.paymentStatus} 
                                    tseStatus={candidate.tseStatus} 
                                    hasBio={!!candidate.description} 
                                    size={28}
                                    showLabels={true}
                                />
                            </div>
                            <p className="text-xl font-semibold text-primary mt-1">{candidate.party.acronym} - {candidate.city}/{candidate.state}</p>
                            <button 
                                onClick={handleShare}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border rounded-full hover:bg-gray-100 transition-colors"
                            >
                                {shareSuccess ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />} 
                                {shareSuccess ? 'Link Copiado!' : 'Compartilhar Campanha'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-8">
                         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Sobre a Candidatura</h2>
                         <p className="text-gray-700 leading-relaxed whitespace-pre-line">{candidate.description}</p>
                    </div>

                    {showSuccess && (
                        <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md animate-fadeIn">
                            <h4 className="font-bold">Obrigado pelo seu apoio!</h4>
                            <p>Sua doação foi registrada. O recibo foi enviado para seu e-mail e está disponível no seu painel de doador.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                         <h3 className="font-bold text-lg mb-4">Meta de Arrecadação</h3>
                         <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-secondary h-4 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                         </div>
                         <div className="flex justify-between mt-2 text-sm font-medium">
                            <span className="text-secondary">{totalRaised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            <span className="text-gray-500">{goal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                         </div>
                        <div className="mt-4 pt-4 border-t flex justify-around">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{progress.toFixed(0)}%</p>
                                <p className="text-sm text-gray-500">Alcançado</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{candidate.donations.length}</p>
                                <p className="text-sm text-gray-500">Apoiadores</p>
                            </div>
                        </div>
                    </div>
                    <DonationWidget onDonate={handleDonate} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default CandidateProfilePage;
