
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { CreditCard, QrCode, Barcode, Lock, Check, MapPin, User, Copy } from 'lucide-react';

const DashboardPaymentModal: React.FC = () => {
  const { user, login } = useAuth();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto' | null>(null);
  
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
          setStreet('Avenida Paulista');
          setDistrict('Bela Vista');
          setCity('São Paulo');
          setState('SP');
      }
  };

  const handleFinishPayment = () => {
      if (user) {
          // Simulate payment processing
          setTimeout(() => {
              login({ 
                  ...user, 
                  pendingPayment: false,
                  cnpj,
                  companyName,
                  address: { zipCode, street, number, complement, district, city, state, country: 'Brasil' }
              });
          }, 2000); // 2 seconds delay to simulate API
      }
  };

  if (!user?.pendingPayment) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header do Modal */}
        <div className="bg-white p-6 border-b border-gray-100 flex flex-col items-center text-center">
           <Logo />
           <h2 className="text-xl font-medium text-gray-600 mt-4">Confirme os dados para taxa de inscrição:</h2>
           <p className="text-4xl font-bold text-gray-900 mt-2">R$ 189,00</p>
        </div>

        {/* Steps Indicator */}
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between max-w-2xl mx-auto text-sm">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary font-bold' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-white'}`}>1</div>
                    <span>Endereço e Dados</span>
                </div>
                <div className={`h-0.5 flex-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary font-bold' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-white'}`}>2</div>
                    <span>Pagamento</span>
                </div>
            </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
            {step === 1 && (
                <div className="space-y-8">
                     {/* Endereço */}
                     <div>
                        <div className="flex items-center gap-2 mb-4 text-primary font-semibold border-b pb-2">
                            <MapPin size={20} />
                            <h3>Endereço de cobrança</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs text-gray-500 mb-1">CEP</label>
                                <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} onBlur={handleZipBlur} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs text-gray-500 mb-1">Rua / Logradouro</label>
                                <input type="text" value={street} onChange={e => setStreet(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-xs text-gray-500 mb-1">Número</label>
                                <input type="text" value={number} onChange={e => setNumber(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-xs text-gray-500 mb-1">Complemento</label>
                                <input type="text" value={complement} onChange={e => setComplement(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Bairro</label>
                                <input type="text" value={district} onChange={e => setDistrict(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Cidade</label>
                                <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div className="md:col-span-1">
                                <label className="block text-xs text-gray-500 mb-1">UF</label>
                                <input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div className="md:col-span-1">
                                <label className="block text-xs text-gray-500 mb-1">País</label>
                                <input type="text" value="Brasil" disabled className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-gray-500" />
                            </div>
                        </div>
                     </div>

                     {/* Dados Pessoais */}
                     <div>
                        <div className="flex items-center gap-2 mb-4 text-primary font-semibold border-b pb-2">
                            <User size={20} />
                            <h3>Dados Pessoais e Jurídicos</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs text-gray-500 mb-1">CNPJ (Opcional)</label>
                                <input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-xs text-gray-500 mb-1">Razão Social (Opcional)</label>
                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">E-mail</label>
                                <input type="text" value={user.email} disabled className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Celular ou Telefone</label>
                                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Cupom</label>
                                <input type="text" placeholder="Código do cupom" className="w-full border border-gray-300 rounded p-2 focus:ring-primary focus:border-primary" />
                            </div>
                             <div className="md:col-span-2 flex items-center gap-2">
                                <input type="checkbox" id="terms_modal" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <label htmlFor="terms_modal" className="text-sm text-gray-600">Estou de acordo com os termos de uso do site.</label>
                            </div>
                        </div>
                     </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Escolha a forma de pagamento</h3>
                    
                    {/* Accordion Style Selection */}
                    <div className="space-y-4">
                        
                        {/* Cartão de Crédito */}
                        <div className={`border rounded-lg overflow-hidden ${paymentMethod === 'credit' ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
                            <button 
                                onClick={() => setPaymentMethod('credit')}
                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <CreditCard className={paymentMethod === 'credit' ? 'text-primary' : 'text-gray-400'} />
                                    <span className="font-medium text-gray-800">Cartão de Crédito</span>
                                </div>
                                {paymentMethod === 'credit' && <Check size={20} className="text-primary" />}
                            </button>
                            
                            {paymentMethod === 'credit' && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100 animate-fadeIn">
                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Número do Cartão</label>
                                            <input type="text" className="w-full border border-gray-300 rounded p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Nome do Titular (como no cartão)</label>
                                            <input type="text" className="w-full border border-gray-300 rounded p-2" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Validade (MM/AAAA)</label>
                                                <input type="text" className="w-full border border-gray-300 rounded p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">CVV</label>
                                                <input type="text" className="w-full border border-gray-300 rounded p-2" />
                                            </div>
                                        </div>
                                         <div className="flex items-center gap-2 bg-white p-3 rounded border mt-2">
                                            <input type="checkbox" checked readOnly className="text-primary" />
                                            <span className="text-xs text-gray-600">Não sou um robô (reCAPTCHA)</span>
                                        </div>
                                        <button onClick={handleFinishPayment} className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-indigo-700 transition-colors">
                                            Enviar Pagamento
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Boleto */}
                        <div className={`border rounded-lg overflow-hidden ${paymentMethod === 'boleto' ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
                            <button 
                                onClick={() => setPaymentMethod('boleto')}
                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Barcode className={paymentMethod === 'boleto' ? 'text-primary' : 'text-gray-400'} />
                                    <span className="font-medium text-gray-800">Boleto Bancário</span>
                                </div>
                                {paymentMethod === 'boleto' && <Check size={20} className="text-primary" />}
                            </button>
                             {paymentMethod === 'boleto' && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100 animate-fadeIn text-center">
                                    <p className="text-sm text-gray-600 mb-4">O boleto será gerado e enviado para seu e-mail. A compensação pode levar até 3 dias úteis.</p>
                                     <div className="flex items-center justify-center gap-2 bg-white p-3 rounded border max-w-xs mx-auto mb-4">
                                        <input type="checkbox" checked readOnly className="text-primary" />
                                        <span className="text-xs text-gray-600">Não sou um robô (reCAPTCHA)</span>
                                    </div>
                                    <button onClick={handleFinishPayment} className="bg-primary text-white font-bold py-2 px-8 rounded hover:bg-indigo-700 transition-colors">
                                        Gerar Boleto
                                    </button>
                                </div>
                             )}
                        </div>

                        {/* PIX */}
                        <div className={`border rounded-lg overflow-hidden ${paymentMethod === 'pix' ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
                            <button 
                                onClick={() => setPaymentMethod('pix')}
                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <QrCode className={paymentMethod === 'pix' ? 'text-primary' : 'text-gray-400'} />
                                    <span className="font-medium text-gray-800">PIX</span>
                                </div>
                                {paymentMethod === 'pix' && <Check size={20} className="text-primary" />}
                            </button>
                             {paymentMethod === 'pix' && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100 animate-fadeIn text-center">
                                     <div className="bg-white p-4 inline-block rounded-lg shadow-sm border mb-4">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865406199.005802BR5913Vale Apoio6008Brasilia62070503***6304A1B2" alt="QR Code Pix" className="mx-auto" />
                                     </div>
                                     <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code com seu aplicativo de banco.</p>
                                     <div className="relative">
                                        <input 
                                            type="text" 
                                            readOnly 
                                            value="00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865406199.005802BR5913Vale Apoio6008Brasilia62070503***6304A1B2"
                                            className="w-full text-xs bg-white border p-2 rounded text-gray-500 pr-10"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                                            <Copy size={14} />
                                        </button>
                                     </div>
                                    <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                                        Pix gerado - pendente. Criado em: {new Date().toLocaleString()}
                                    </div>
                                    <button onClick={handleFinishPayment} className="mt-4 w-full bg-primary text-white font-bold py-2 rounded hover:bg-indigo-700 transition-colors">
                                        Confirmar Pagamento
                                    </button>
                                </div>
                             )}
                        </div>
                    </div>

                    <div className="flex justify-start mt-8 pt-6 border-t">
                        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 font-medium">
                            Voltar
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default DashboardPaymentModal;
