
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import { CreditCard, QrCode, Barcode, CheckCircle, Lock } from 'lucide-react';

const CandidatePaymentPage: React.FC = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
    
    // Form States
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');

    // Mock auto-fill logic for CEP
    const handleZipBlur = () => {
        if (zipCode.length >= 8) {
            // Simulate API call
            setStreet('Avenida Paulista');
            setDistrict('Bela Vista');
            setCity('São Paulo');
            setState('SP');
        }
    };

    const handleFinish = () => {
        if (user) {
            // Remove pending flag and update user data
            login({ 
                ...user, 
                pendingPayment: false,
                cnpj,
                companyName,
                address: { zipCode, street, number, complement, district, city, state, country: 'Brasil' }
            });
            alert('Pagamento confirmado com sucesso! Bem-vindo ao Vale Apoio.');
            navigate('/painel');
        }
    };

    if (!user) {
        navigate('/cadastrar');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <Logo />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Finalize sua Inscrição</h2>
                    <p className="mt-2 text-gray-600">Taxa única de adesão: <span className="font-bold text-secondary text-lg">R$ 199,00</span></p>
                </div>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Steps Header */}
                    <div className="flex bg-gray-50 border-b">
                        <button onClick={() => setStep(1)} className={`flex-1 py-4 text-center font-semibold text-sm ${step === 1 ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>1. Dados & Endereço</button>
                        <button onClick={() => step > 1 && setStep(2)} className={`flex-1 py-4 text-center font-semibold text-sm ${step === 2 ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>2. Pagamento</button>
                    </div>

                    <div className="p-8">
                        {step === 1 ? (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Dados Pessoais e Jurídicos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" value={user.name} disabled className="bg-gray-100 border rounded p-3 w-full text-gray-500 cursor-not-allowed" />
                                    <input type="text" value={user.email} disabled className="bg-gray-100 border rounded p-3 w-full text-gray-500 cursor-not-allowed" />
                                    <input type="text" placeholder="CNPJ da Campanha (opcional agora)" value={cnpj} onChange={e => setCnpj(e.target.value)} className="border rounded p-3 w-full" />
                                    <input type="text" placeholder="Razão Social (opcional agora)" value={companyName} onChange={e => setCompanyName(e.target.value)} className="border rounded p-3 w-full" />
                                    <input type="text" placeholder="Celular / WhatsApp" value={phone} onChange={e => setPhone(e.target.value)} className="border rounded p-3 w-full" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8">Endereço de Cobrança</h3>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    <div className="md:col-span-2">
                                        <input type="text" placeholder="CEP" value={zipCode} onChange={e => setZipCode(e.target.value)} onBlur={handleZipBlur} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <input type="text" placeholder="Rua / Logradouro" value={street} onChange={e => setStreet(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <input type="text" placeholder="Nº" value={number} onChange={e => setNumber(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <input type="text" placeholder="Complemento" value={complement} onChange={e => setComplement(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <input type="text" placeholder="Bairro" value={district} onChange={e => setDistrict(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <input type="text" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <input type="text" placeholder="UF" value={state} onChange={e => setState(e.target.value)} className="border rounded p-3 w-full" />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-8">
                                    <button onClick={() => setStep(2)} className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors">
                                        Ir para Pagamento
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Escolha a forma de pagamento</h3>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <button onClick={() => setPaymentMethod('credit')} className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit' ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'hover:border-gray-300'}`}>
                                        <CreditCard size={32} className={paymentMethod === 'credit' ? 'text-primary' : 'text-gray-400'} />
                                        <span className="font-medium">Cartão de Crédito</span>
                                    </button>
                                    <button onClick={() => setPaymentMethod('pix')} className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'pix' ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'hover:border-gray-300'}`}>
                                        <QrCode size={32} className={paymentMethod === 'pix' ? 'text-primary' : 'text-gray-400'} />
                                        <span className="font-medium">PIX</span>
                                    </button>
                                    <button onClick={() => setPaymentMethod('boleto')} className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === 'boleto' ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'hover:border-gray-300'}`}>
                                        <Barcode size={32} className={paymentMethod === 'boleto' ? 'text-primary' : 'text-gray-400'} />
                                        <span className="font-medium">Boleto Bancário</span>
                                    </button>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    {paymentMethod === 'credit' && (
                                        <div className="space-y-4 max-w-md mx-auto">
                                            <input type="text" placeholder="Número do Cartão" className="w-full p-3 border rounded" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="Validade (MM/AA)" className="w-full p-3 border rounded" />
                                                <input type="text" placeholder="CVV" className="w-full p-3 border rounded" />
                                            </div>
                                            <input type="text" placeholder="Nome no Cartão" className="w-full p-3 border rounded" />
                                        </div>
                                    )}
                                    {paymentMethod === 'pix' && (
                                        <div className="text-center py-4">
                                            <QrCode size={120} className="mx-auto text-gray-800 mb-4" />
                                            <p className="text-sm text-gray-600">Escaneie o QR Code ou utilize a chave abaixo:</p>
                                            <code className="block mt-2 p-2 bg-white border rounded text-xs">00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865406199.005802BR5913Vale Apoio6008Brasilia62070503***6304A1B2</code>
                                        </div>
                                    )}
                                    {paymentMethod === 'boleto' && (
                                        <div className="text-center py-8">
                                            <Barcode size={64} className="mx-auto text-gray-800 mb-4" />
                                            <p>Um boleto será gerado e enviado para seu e-mail: <strong>{user.email}</strong></p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 font-medium">
                                        Voltar
                                    </button>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center text-green-600 text-sm gap-1">
                                            <Lock size={14} /> Ambiente Seguro
                                        </div>
                                        <button onClick={handleFinish} className="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                            Pagar R$ 199,00
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatePaymentPage;
