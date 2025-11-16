
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardProfilePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Seu Perfil</h1>
            <p className="mt-1 text-gray-600">Gerencie suas informações pessoais e de segurança.</p>

            <div className="mt-8 max-w-2xl">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-6 border-b pb-4">Editar Dados</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                            <input type="text" id="name" defaultValue={user?.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary"/>
                        </div>
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                            <input type="text" id="cpf" defaultValue={user?.cpf} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100 cursor-not-allowed"/>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                            <input type="email" id="email" defaultValue={user?.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary"/>
                        </div>
                        <div className="pt-4">
                             <h3 className="text-lg font-medium">Alterar Senha</h3>
                             <div className="space-y-4 mt-2">
                                <input type="password" placeholder="Senha Atual" className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary"/>
                                <input type="password" placeholder="Nova Senha" className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary"/>
                                <input type="password" placeholder="Confirmar Nova Senha" className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-primary"/>
                             </div>
                        </div>
                         <div className="pt-6">
                            <button type="submit" className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-indigo-700">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
