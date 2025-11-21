
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import { Save, Loader, Lock, Building, MessageCircle, FileText, Camera, CheckCircle, Clock, Edit2, X } from 'lucide-react';

const AdminSettingsPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const { config, updateConfig } = useConfig();
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Estado local para o perfil do Admin
    const [adminProfile, setAdminProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        photoUrl: user?.photoUrl || '',
        password: '',
        confirmPassword: ''
    });

    // Atualiza o estado local se o user mudar externamente
    useEffect(() => {
        if (user) {
            setAdminProfile(prev => ({
                ...prev,
                name: user.name,
                email: user.email,
                photoUrl: user.photoUrl || prev.photoUrl
            }));
        }
    }, [user]);

    // Estado local para Configurações da Empresa (inicializado do Contexto)
    const [companyData, setCompanyData] = useState({
        reason: config.companyName,
        cnpj: config.cnpj,
        address: config.address,
        supportEmail: config.supportEmail
    });

    const [platformConfig, setPlatformConfig] = useState({
        whatsapp: config.whatsapp,
        registrationFee: config.registrationFee,
        transactionFee: config.transactionFee
    });

    const [termsOfUse, setTermsOfUse] = useState(config.termsContent);
    const [lastTermsUpdate, setLastTermsUpdate] = useState(new Date().toLocaleDateString());
    const [isEditingTerms, setIsEditingTerms] = useState(false);

    const handleTriggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Simula upload lendo o arquivo localmente para exibição imediata
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPhotoUrl = reader.result as string;
                setAdminProfile(prev => ({ ...prev, photoUrl: newPhotoUrl }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveSuccess(false);
        
        // Simulação de delay de API
        setTimeout(() => {
            // 1. Atualiza Configurações Globais (Contexto)
            updateConfig({
                companyName: companyData.reason,
                cnpj: companyData.cnpj,
                address: companyData.address,
                supportEmail: companyData.supportEmail,
                whatsapp: platformConfig.whatsapp,
                registrationFee: platformConfig.registrationFee,
                transactionFee: platformConfig.transactionFee,
                termsContent: termsOfUse
            });

            // 2. Atualiza Perfil do Admin (Auth Context)
            updateUser({
                name: adminProfile.name,
                email: adminProfile.email,
                photoUrl: adminProfile.photoUrl
            });

            setLastTermsUpdate(new Date().toLocaleDateString());
            setIsEditingTerms(false);
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    const handleCancelEditTerms = () => {
        setTermsOfUse(config.termsContent); // Reverte para o valor atual do contexto
        setIsEditingTerms(false);
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Configurações Gerais</h1>
                    <p className="mt-1 text-gray-600">Gerencie dados da empresa, perfil administrativo e configurações da plataforma.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary text-white px-6 py-2.5 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors font-medium shadow-sm disabled:opacity-70"
                >
                    {isSaving ? <Loader size={18} className="animate-spin"/> : <Save size={18} />}
                    {isSaving ? 'Salvando...' : 'Salvar Tudo'}
                </button>
            </div>

            {saveSuccess && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center gap-2 animate-fadeIn">
                    <CheckCircle size={20} />
                    <span className="block sm:inline">Configurações e perfil atualizados com sucesso!</span>
                </div>
            )}

            <div className="grid gap-8">
                
                {/* 1. Perfil do Super Admin */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                             <Lock size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Perfil do Super Admin</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative group cursor-pointer" onClick={handleTriggerFileUpload}>
                                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 overflow-hidden border-4 border-white shadow-lg transition-transform group-hover:scale-105">
                                    {adminProfile.photoUrl ? (
                                        <img src={adminProfile.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{adminProfile.name ? adminProfile.name.charAt(0) : 'A'}</span>
                                    )}
                                    
                                    {/* Overlay Hover */}
                                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </div>
                            </div>
                            
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            
                            <button 
                                onClick={handleTriggerFileUpload}
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                Alterar Avatar
                            </button>
                        </div>
                        
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Nome de Exibição</label>
                                <input 
                                    type="text" 
                                    value={adminProfile.name}
                                    onChange={e => setAdminProfile({...adminProfile, name: e.target.value})}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">E-mail de Acesso</label>
                                <input 
                                    type="email" 
                                    value={adminProfile.email}
                                    onChange={e => setAdminProfile({...adminProfile, email: e.target.value})}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                />
                            </div>
                             <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Nova Senha</label>
                                    <input 
                                        type="password" 
                                        placeholder="******" 
                                        value={adminProfile.password}
                                        onChange={e => setAdminProfile({...adminProfile, password: e.target.value})}
                                        className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Confirmar Senha</label>
                                    <input 
                                        type="password" 
                                        placeholder="******" 
                                        value={adminProfile.confirmPassword}
                                        onChange={e => setAdminProfile({...adminProfile, confirmPassword: e.target.value})}
                                        className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Dados da Empresa & Suporte */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                        <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                             <Building size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Dados da Plataforma (Site Público)</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Razão Social</label>
                            <input 
                                type="text" 
                                value={companyData.reason}
                                onChange={e => setCompanyData({...companyData, reason: e.target.value})}
                                className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">CNPJ</label>
                            <input 
                                type="text" 
                                value={companyData.cnpj}
                                onChange={e => setCompanyData({...companyData, cnpj: e.target.value})}
                                className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-700 mb-1">Endereço Oficial</label>
                             <input 
                                type="text" 
                                value={companyData.address}
                                onChange={e => setCompanyData({...companyData, address: e.target.value})}
                                className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                         <div className="flex items-center gap-2 mb-4">
                             <MessageCircle size={18} className="text-green-600" />
                             <h3 className="font-bold text-gray-800 text-sm">Configuração de Suporte e Taxas</h3>
                         </div>
                         <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Suporte (Apenas números)</label>
                                <input 
                                    type="text" 
                                    value={platformConfig.whatsapp}
                                    onChange={e => setPlatformConfig({...platformConfig, whatsapp: e.target.value})}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm font-mono bg-green-50 focus:ring-primary focus:border-primary" 
                                />
                                <p className="text-[10px] text-gray-500 mt-1">Alimenta o botão flutuante do site.</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Taxa de Inscrição (R$)</label>
                                <input 
                                    type="text" 
                                    value={platformConfig.registrationFee}
                                    onChange={e => setPlatformConfig({...platformConfig, registrationFee: e.target.value})}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Taxa por Transação (%)</label>
                                <input 
                                    type="text" 
                                    value={platformConfig.transactionFee}
                                    onChange={e => setPlatformConfig({...platformConfig, transactionFee: e.target.value})}
                                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 text-sm focus:ring-primary focus:border-primary" 
                                />
                            </div>
                         </div>
                    </div>
                </div>

                 {/* 3. Termos de Uso */}
                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-50 rounded-full text-indigo-600">
                                <FileText size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Editor de Termos de Uso</h2>
                        </div>
                        
                        {/* Controles de Edição no Header */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <Clock size={14} />
                                <span>Atualizado em: {lastTermsUpdate}</span>
                            </div>
                            {!isEditingTerms && (
                                <button 
                                    onClick={() => setIsEditingTerms(true)}
                                    className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-indigo-100"
                                >
                                    <Edit2 size={14} /> Editar Texto
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className={`relative rounded-md transition-all ${isEditingTerms ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                        {!isEditingTerms && (
                            <div className="absolute inset-0 bg-gray-50/50 z-10 cursor-not-allowed rounded-md" title="Clique em 'Editar Texto' para modificar"></div>
                        )}
                        <label className="block text-xs font-bold text-gray-700 mb-1">Conteúdo HTML dos Termos</label>
                        <textarea 
                            rows={16}
                            disabled={!isEditingTerms}
                            value={termsOfUse}
                            onChange={e => setTermsOfUse(e.target.value)}
                            className={`w-full border-gray-300 rounded-md shadow-sm border p-3 text-sm font-mono leading-relaxed focus:ring-primary focus:border-primary ${!isEditingTerms ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-800'}`}
                        ></textarea>
                    </div>

                    {/* Footer com Ações de Edição */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                        <p className="text-[10px] text-gray-500">
                             O texto suporta HTML básico para formatação. 
                             As alterações refletem imediatamente na página pública /termos.
                        </p>
                        
                        {isEditingTerms && (
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end animate-fadeIn">
                                <button 
                                    onClick={handleCancelEditTerms}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
                                >
                                    <X size={16} /> Cancelar
                                </button>
                                <button 
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm bg-primary text-white font-bold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-sm"
                                >
                                    <Save size={16} /> Salvar Termos
                                </button>
                            </div>
                        )}
                    </div>
                 </div>

            </div>
        </div>
    );
};

export default AdminSettingsPage;
