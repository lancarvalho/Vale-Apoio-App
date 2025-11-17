
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Heart } from 'lucide-react';

const RegisterChoicePage: React.FC = () => {
    return (
        <div className="min-h-[calc(100vh-128px)] bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900">Junte-se a nós!</h1>
                <p className="mt-2 text-lg text-gray-600">Escolha como você quer participar da mudança.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Card Candidato */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <User size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sou Candidato(a)</h2>
                    <p className="mt-2 text-gray-600 flex-grow">
                        Crie sua página de arrecadação, receba doações e impulsione sua campanha.
                    </p>
                    <Link
                        to="/cadastrar-candidato"
                        className="mt-6 w-full text-center bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Iniciar Cadastro <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* Card Doador */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                     <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                        <Heart size={32} className="text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sou Doador(a)</h2>
                    <p className="mt-2 text-gray-600 flex-grow">
                        Encontre candidatos, doe com segurança e faça parte da democracia.
                    </p>
                    <Link
                        to="/candidatos"
                        className="mt-6 w-full text-center bg-accent text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Quero Apoiar <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-600">
                Já tem uma conta? <Link to="/acessar" className="text-primary font-medium hover:underline">Faça login</Link>
            </p>
        </div>
    );
};

export default RegisterChoicePage;
