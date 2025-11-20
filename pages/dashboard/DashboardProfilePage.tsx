
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save } from 'lucide-react';

const DashboardProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        cpf: user?.cpf || '',
        email: user?.email || '',
        cnpj: user?.cnpj || '',
        companyName: user?.companyName || '',
        zipCode: user?.address?.zipCode || '',
        street: user?.address?.street || '',
        number: user?.address?.number || '',
        complement: user?.address?.complement || '',
        district: user?.address?.district || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Seu Perfil</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700">
                    <Save size={18} /> Salvar Alterações
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                {/* Section 1: Billing Address */}
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">1. Endereço de Cobrança</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                        <input name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Logradouro</label>
                        <input name="street" value={formData.street} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nº</label>
                        <input name="number" value={formData.number} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                        <input name="complement" value={formData.complement} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                        <input name="district" value={formData.district} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                        <input name="city" value={formData.city} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">UF</label>
                        <input name="state" value={formData.state} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-1">
                         <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                         <input value="Brasil" disabled className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm border p-2 text-gray-500" />
                    </div>
                </div>

                {/* Section 2: Personal/Legal Data */}
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">2. Dados Pessoais e Jurídicos</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CPF <span className="text-xs text-gray-500">(Edição Bloqueada)</span></label>
                        <input name="cpf" value={formData.cpf} disabled className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm border p-2 cursor-not-allowed text-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                        <input name="cnpj" value={formData.cnpj} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                 </div>

                 {/* Password Change */}
                 <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Segurança</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                         <input type="password" className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                         <input type="password" className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                         <input type="password" className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
