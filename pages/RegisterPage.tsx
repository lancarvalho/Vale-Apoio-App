
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';
import Logo from '../components/Logo';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [urnName, setUrnName] = useState(''); 
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { config } = useConfig();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        if (!agreed) {
            setError('Você precisa concordar com os termos de uso.');
            return;
        }
        
        const slug = urnName
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            .replace(/[^a-z0-9 ]/g, "") 
            .replace(/\s+/g, "-"); 

        const mockUser = { 
            id: Date.now(), 
            name, 
            slug, 
            email, 
            cpf, 
            type: 'candidate' as const,
            pendingPayment: true, 
            photoUrl: 'https://ui-avatars.com/api/?name=' + urnName.replace(' ', '+') + '&background=6366F1&color=fff'
        };
        
        login(mockUser);
        navigate('/painel');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 p-8 bg-primary text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">Comece a arrecadar para sua campanha!</h2>
                    <p className="text-indigo-200">
                        No Vale Apoio, a transparência vem em primeiro lugar. Sem taxas escondidas.
                    </p>
                    <ul className="mt-6 space-y-4">
                        <li className="flex items-start">
                            <span className="bg-secondary rounded-full text-white text-xs font-bold w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                            <span><strong>Taxa de {config.transactionFee}%</strong> em cada doação recebida.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-secondary rounded-full text-white text-xs font-bold w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                            <span>Taxa única de inscrição de <strong>R$ {config.registrationFee}</strong>.</span>
                        </li>
                        <li className="flex items-start">
                           <span className="bg-secondary rounded-full text-white text-xs font-bold w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                            <span>Receba por <strong>Cartão de Crédito, Boleto ou PIX</strong> em nosso sistema homologado pelo TSE.</span>
                        </li>
                    </ul>
                </div>
                <div className="md:w-1/2 p-8">
                    <div className="mb-6 text-center">
                        <Logo />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Nome Completo (Civil)</label>
                            <input type="text" placeholder="Ex: José Carlos Rodrigues" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Nome de Urna (Como aparecerá na URL)</label>
                            <input type="text" placeholder="Ex: Zé da Padaria" value={urnName} onChange={e => setUrnName(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                            {urnName && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Sua URL será: valeapoio.com.br/candidatos/<strong>{urnName.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "")}</strong>
                                </p>
                            )}
                        </div>

                        <input type="text" placeholder="CPF (apenas números)" value={cpf} onChange={e => setCpf(e.target.value.replace(/\D/g, ''))} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                            <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                Eu concordo com os <Link to="/termos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">termos de uso</Link>.
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        
                        <div className="w-full h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                            reCAPTCHA (Simulado)
                        </div>

                        <button type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors">
                            Avançar
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Já possui uma conta? <Link to="/acessar" className="text-primary font-medium hover:underline">Acessar</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
