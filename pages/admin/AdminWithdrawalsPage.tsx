
import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { Clock, CheckCircle, XCircle, FileText, Send, Upload, Paperclip } from 'lucide-react';

const mockWithdrawals = [
    { id: 1, candidate: MOCK_CANDIDATES[0], date: '25/07/2026', amount: 3500.00, status: 'Pendente' },
    { id: 2, candidate: MOCK_CANDIDATES[2], date: '24/07/2026', amount: 1250.50, status: 'Concluído' },
    { id: 3, candidate: MOCK_CANDIDATES[1], date: '23/07/2026', amount: 800.00, status: 'Concluído' },
    { id: 4, candidate: MOCK_CANDIDATES[3], date: '22/07/2026', amount: 550.75, status: 'Rejeitado' },
    { id: 5, candidate: MOCK_CANDIDATES[4], date: '21/07/2026', amount: 4200.00, status: 'Pendente' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Concluído': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Rejeitado': 'bg-red-100 text-red-800',
    };
    const icons = {
        'Concluído': <CheckCircle size={16} />,
        'Pendente': <Clock size={16} />,
        'Rejeitado': <XCircle size={16} />,
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {icons[status]}
            {status}
        </span>
    );
};

const AdminWithdrawalsPage: React.FC = () => {
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const openApprovalModal = (withdrawal: any) => {
        setSelectedWithdrawal(withdrawal);
        setIsModalOpen(true);
    };

    const closeApprovalModal = () => {
        setSelectedWithdrawal(null);
        setIsModalOpen(false);
        setUploadedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleConfirmApproval = () => {
        if (!uploadedFile) {
            alert("Por favor, anexe o comprovante de transferência (PDF).");
            return;
        }
        alert(`Saque aprovado! E-mail enviado para ${selectedWithdrawal.candidate.name} com o comprovante.`);
        closeApprovalModal();
        // Here you would update the status in the backend
    };

    const emailText = `Sua solicitação de saque do Quero Apoiar foi autorizada e a transferência já foi realizada, em até 3 dias úteis o valor deverá cair na sua conta, obrigado por usar nossa plataforma! 

Clique aqui para baixar o comprovante da transferência. 

Desejamos sucesso na sua caminhada e estaremos a disposição no contato@querodoar.com.br`;

    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Saques</h1>
            <p className="mt-1 text-gray-600">Confirmação de saques, depósitos e transferências de saldo aos candidatos.</p>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4">Candidato</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockWithdrawals.map(w => (
                                <tr key={w.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{w.candidate.name}</td>
                                    <td className="p-4">{w.date}</td>
                                    <td className="p-4 font-semibold">{w.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className="p-4"><StatusBadge status={w.status} /></td>
                                    <td className="p-4">
                                        {w.status === 'Pendente' ? (
                                            <div className="flex justify-center items-center gap-2">
                                                <button 
                                                    onClick={() => openApprovalModal(w)}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors shadow-sm"
                                                >
                                                    <CheckCircle size={14}/> Aprovar/Transferir
                                                </button>
                                                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors shadow-sm">
                                                    <XCircle size={14}/> Rejeitar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center text-gray-400 text-sm">
                                                <button className="hover:text-primary flex items-center justify-center gap-1 mx-auto">
                                                    <FileText size={14}/> Detalhes
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Approval Modal */}
            {isModalOpen && selectedWithdrawal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn">
                        <div className="bg-primary p-4 text-white flex justify-between items-center">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Send size={20} /> Autorizar Transferência
                            </h2>
                            <button onClick={closeApprovalModal} className="text-white/80 hover:text-white"><XCircle size={24}/></button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="bg-gray-50 p-4 rounded border">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Dados da Transação</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p><span className="font-semibold">Candidato:</span> {selectedWithdrawal.candidate.name}</p>
                                    <p><span className="font-semibold">Valor:</span> {selectedWithdrawal.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    <p><span className="font-semibold">Banco:</span> Banco do Brasil (Mock)</p>
                                    <p><span className="font-semibold">Ag/Conta:</span> 1234-5 / 102030-X</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    1. Anexar Comprovante de Transferência (PDF)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                        {uploadedFile ? (
                                            <div className="text-green-600 flex items-center gap-2 font-medium">
                                                <Paperclip size={20} /> {uploadedFile.name}
                                            </div>
                                        ) : (
                                            <>
                                                <Upload size={32} className="text-gray-400 mb-2" />
                                                <span className="text-primary font-medium hover:underline">Clique para enviar</span>
                                                <span className="text-xs text-gray-500 block mt-1">ou arraste o arquivo PDF aqui</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    2. Pré-visualização do E-mail Automático
                                </label>
                                <div className="bg-gray-100 p-4 rounded-md border text-sm text-gray-600 whitespace-pre-line font-mono leading-relaxed">
                                    {emailText}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-right">* O PDF anexado será enviado junto com esta mensagem.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                            <button onClick={closeApprovalModal} className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                                Cancelar
                            </button>
                            <button 
                                onClick={handleConfirmApproval}
                                className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
                            >
                                <Send size={16} /> Confirmar e Enviar E-mail
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminWithdrawalsPage;
