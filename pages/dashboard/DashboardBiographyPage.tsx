
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, Image, Video, Type, Upload, User, Link as LinkIcon, Copy, Check, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardBiographyPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [bio, setBio] = useState(user?.description || '');
    const [videoUrl, setVideoUrl] = useState(user?.videoUrl || '');
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    
    // Gerar a URL pública baseada no slug do usuário
    const publicUrl = `${window.location.origin}/#/candidatos/${user?.slug || 'seu-nome'}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Mock file upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'cover') => {
        if(e.target.files && e.target.files[0]) {
            const setLoader = type === 'photo' ? setIsUploadingPhoto : setIsUploadingCover;
            setLoader(true);
            
            // Simula delay de upload
            setTimeout(() => {
                setLoader(false);
                
                if (type === 'photo') {
                    // Atualiza a foto no contexto global para refletir no Header
                    // Usando uma imagem aleatória para simular o "novo arquivo"
                    const newPhoto = `https://ui-avatars.com/api/?name=${user?.name?.replace(' ', '+')}&background=random&size=200&timestamp=${Date.now()}`;
                    updateUser({ photoUrl: newPhoto });
                } else {
                    updateUser({ coverUrl: 'https://picsum.photos/seed/newcover/1200/400' });
                }

                alert(`${type === 'photo' ? 'Foto de perfil' : 'Imagem de capa'} atualizada com sucesso!`);
            }, 1500);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simula API update
        setTimeout(() => {
            // Atualiza Bio e Video no contexto global
            updateUser({
                description: bio,
                videoUrl: videoUrl
            });
            setIsSaving(false);
            alert('Biografia e configurações atualizadas com sucesso!');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Biografia e Configurações</h1>
                    <p className="mt-1 text-gray-600">Personalize a aparência da sua página de campanha.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary text-white px-6 py-2.5 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors font-medium shadow-sm disabled:opacity-70"
                >
                    {isSaving ? <Loader size={18} className="animate-spin"/> : <Save size={18} />}
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

            <div className="grid gap-8">
                
                {/* Link de Compartilhamento */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 bg-gradient-to-r from-indigo-50 to-white">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <LinkIcon size={20} className="text-primary" /> Seu Link de Campanha
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Este é o link que você deve compartilhar nas suas redes sociais e WhatsApp para receber doações.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <div className="w-full flex-1 bg-white border border-gray-300 rounded-md p-3 text-gray-600 font-mono text-sm truncate select-all">
                            {publicUrl}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button 
                                onClick={handleCopyLink}
                                className={`flex-1 sm:flex-none px-4 py-3 rounded-md font-bold text-white transition-colors flex justify-center items-center gap-2 ${copied ? 'bg-green-500' : 'bg-gray-800 hover:bg-black'}`}
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                            <Link 
                                to={`/candidatos/${user?.slug || 'exemplo'}`} 
                                target="_blank"
                                className="flex-1 sm:flex-none text-center px-4 py-3 rounded-md border border-gray-300 font-bold text-gray-700 hover:bg-gray-50"
                            >
                                Testar Link
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Imagens */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                        <Image size={20} className="text-primary" /> Imagens da Campanha
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Foto de Perfil */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Foto do Candidato</label>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                                    {isUploadingPhoto ? (
                                        <Loader size={24} className="animate-spin text-primary" />
                                    ) : user?.photoUrl ? (
                                        <img src={user.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} className="text-gray-400" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-xs">
                                        Alterar
                                    </div>
                                </div>
                                <div>
                                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 inline-block">
                                        Carregar Nova Foto
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo')} />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">JPG ou PNG. Tamanho recom.: 400x400px.</p>
                                </div>
                            </div>
                        </div>

                        {/* Capa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>
                            <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors relative">
                                {isUploadingCover ? (
                                    <Loader size={24} className="animate-spin text-primary" />
                                ) : (
                                    <>
                                        <Upload size={24} className="text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-600">Clique para fazer upload da capa</span>
                                    </>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">JPG ou PNG. Tamanho recom.: 1200x400px.</p>
                        </div>
                    </div>
                </div>

                {/* Texto e Vídeo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                        <Type size={20} className="text-primary" /> Conteúdo da Campanha
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">História / Biografia</label>
                            <textarea 
                                rows={8} 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Conte aos seus eleitores quem você é e quais são seus planos..."
                                className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary"
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1 text-right">Caracteres restantes: {2000 - bio.length}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Video size={16} /> Vídeo de Apresentação (YouTube)
                            </label>
                            <input 
                                type="text" 
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="Cole o link do seu vídeo do YouTube aqui (ex: https://youtu.be/...)"
                                className="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-primary focus:border-primary" 
                            />
                            {videoUrl && (
                                <div className="mt-4 aspect-video bg-black rounded-lg overflow-hidden">
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        src={`https://www.youtube.com/embed/${videoUrl.split('/').pop()}`} 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBiographyPage;
