
import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { generateTSEFile } from '../../utils/tseFileGenerator';
import { MOCK_CANDIDATES } from '../../constants';

const AdminTSEReportsPage: React.FC = () => {
    
    const handleGenerate = () => {
        // Gera para o primeiro candidato como demo, ou faria um loop/seleção
        if(MOCK_CANDIDATES.length > 0) {
            generateTSEFile(MOCK_CANDIDATES[0]);
        } else {
            alert('Sem dados para gerar relatório.');
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gerador de Relatórios TSE</h1>
                <p className="mt-1 text-gray-600">Exporte os dados no formato exigido pelo TSE (.FCC).</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={48} className="text-gray-500" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Novo Relatório de Arrecadação</h2>
                <p className="text-gray-500 mb-8">Selecione o período para gerar o arquivo de importação para o SPCE.</p>

                <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                    <div>
                        <label className="block text-left text-xs font-medium text-gray-500 mb-1">Data Inicial</label>
                        <div className="relative">
                            <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-left text-xs font-medium text-gray-500 mb-1">Data Final</label>
                        <div className="relative">
                            <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    className="bg-secondary text-white px-8 py-3 rounded-md font-bold hover:bg-emerald-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
                >
                    <Download size={20} />
                    Gerar Arquivo .FCC
                </button>
                
                <p className="mt-4 text-xs text-gray-400">
                    Compatível com a versão v3.0 do layout SPCE - Financiamento Coletivo
                </p>
            </div>
        </div>
    );
};

export default AdminTSEReportsPage;
