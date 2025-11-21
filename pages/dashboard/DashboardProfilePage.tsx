
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, Loader, CheckCircle } from 'lucide-react';

const DashboardProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        cpf: user?.cpf || '',
        email: user?.email || '',
        password: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveSuccess(false);
        
        // Simula API call
        setTimeout(() => {
            // Atualiza o contexto global para refletir a mudança no Header imediatamente
            updateUser({
                name: formData.name,
                email: formData.email
            });
            
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Editar Dados</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                 <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">CPF</label>
                        <div className="relative">
                            <input name="cpf" value={formData.cpf} disabled className="w-full bg-gray-50 border-gray-200 text-gray-500 rounded-md shadow-sm border p-3 cursor-not-allowed" />
                            <p className="text-xs text-gray-400 mt-1">Este campo não pode ser alterado por segurança.</p>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary" />
                    </div>

                    <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                         <div className="space-y-3">
                             <input type="password" placeholder="Alterar Senha" className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary" />
                             <input type="password" placeholder="Confirme sua senha" className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary" />
                         </div>
                    </div>
                 </div>

                 <div className="mt-8 flex items-center justify-end gap-4">
                    {saveSuccess && (
                        <span className="text-green-600 flex items-center gap-1 text-sm font-medium animate-fadeIn">
                            <CheckCircle size={16} /> Dados salvos com sucesso!
                        </span>
                    )}
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                         {isSaving ? <Loader size={20} className="animate-spin"/> : <Save size={20} />} 
                         {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
