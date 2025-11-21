
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, Image, Video, Type, Upload, User } from 'lucide-react';

const DashboardBiographyPage: React.FC = () => {
    const { user } = useAuth();
    const [bio, setBio] = useState(user?.description || '');
    const [videoUrl, setVideoUrl] = useState(user?.videoUrl || '');
    
    // Mock file upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // In a real app, this would upload to a server/storage
        alert('Simulação: Imagem carregada com sucesso!');
    };

    const handleSave = () => {
        alert('Biografia e configurações atualizadas com sucesso!');
        // Here you would call the API to update the user profile
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
                    className="bg-primary text-white px-6 py-2.5 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                >
                    <Save size={18} /> Salvar Alterações
                </button>
            </div>

            <div className="grid gap-8">
                
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
                                    {user?.photoUrl ? (
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
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">JPG ou PNG. Tamanho recom.: 400x400px.</p>
                                </div>
                            </div>
                        </div>

                        {/* Capa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>
                            <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                                <Upload size={24} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Clique para fazer upload da capa</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
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
