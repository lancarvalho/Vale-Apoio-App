
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock login logic
        if (email.includes('candidato')) {
            const mockUser = { id: 1, name: 'Candidato Exemplo', email, cpf: '123.456.789-00', type: 'candidate' as const };
            login(mockUser);
            navigate('/painel');
        } else if (email.includes('doador')) {
            const mockUser = { id: 2, name: 'Doador Exemplo', email, cpf: '987.654.321-00', type: 'donor' as const };
            login(mockUser);
            navigate('/doador');
        } else {
            setError('Credenciais inválidas. Use "candidato@email.com" ou "doador@email.com" para teste.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-8">
                <div className="text-center">
                    <Logo />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Seja bem-vindo(a) de volta!
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="E-mail"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Senha"
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link to="#" className="font-medium text-primary hover:text-indigo-500">
                        Esqueceu sua senha?
                    </Link>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Ainda não tem conta?{' '}
                    <Link to="/cadastrar" className="font-medium text-primary hover:text-indigo-500">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
