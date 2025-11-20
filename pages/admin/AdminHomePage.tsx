
import React from 'react';
import { MOCK_CANDIDATES } from '../../constants';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { DollarSign, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color?: string }> = ({ title, value, icon: Icon, color = "text-primary" }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-transparent hover:border-primary transition-all">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-')}/10 ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminHomePage: React.FC = () => {
    const { isMaintenanceMode, toggleMaintenanceMode } = useMaintenance();

    const totalRaised = MOCK_CANDIDATES.reduce((total, candidate) => 
        total + candidate.donations.reduce((sum, d) => sum + d.amount, 0), 0);

    // Mock outflow (saídas) for demonstration
    const totalOutflow = totalRaised * 0.4; 

    const totalCandidates = MOCK_CANDIDATES.length;
    
    const financialData = [
      { name: 'Jan', Entradas: 4000, Saidas: 2400 },
      { name: 'Fev', Entradas: 3000, Saidas: 1398 },
      { name: 'Mar', Entradas: 2000, Saidas: 9800 },
      { name: 'Abr', Entradas: 2780, Saidas: 3908 },
      { name: 'Mai', Entradas: 1890, Saidas: 4800 },
      { name: 'Jun', Entradas: 2390, Saidas: 3800 },
      { name: 'Jul', Entradas: 3490, Saidas: 4300 },
    ];

    const candidatesByParty = MOCK_CANDIDATES.reduce((acc, candidate) => {
        const party = candidate.party.acronym;
        acc[party] = (acc[party] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(candidatesByParty).map(([name, value]) => ({ name, value }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
                    <p className="mt-1 text-gray-600">Visão financeira e operacional completa.</p>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${isMaintenanceMode ? 'bg-yellow-50 border-yellow-200 shadow-md' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            {isMaintenanceMode ? <AlertTriangle size={16} className="text-yellow-600"/> : <CheckCircle size={16} className="text-green-500"/>}
                            Status do Site: {isMaintenanceMode ? 'EM MANUTENÇÃO' : 'NO AR'}
                        </span>
                    </div>
                    <button 
                        onClick={toggleMaintenanceMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isMaintenanceMode ? 'bg-yellow-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMaintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Arrecadação Total" value={totalRaised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={ArrowUpCircle} color="text-green-600" />
                <StatCard title="Saídas Totais" value={totalOutflow.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={ArrowDownCircle} color="text-red-500" />
                <StatCard title="Candidatos Ativos" value={totalCandidates.toString()} icon={Users} />
                <StatCard title="Saldo na Plataforma" value={(totalRaised - totalOutflow).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={DollarSign} color="text-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Financial Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-gray-500"/> Entradas vs Saídas (2026)
                    </h2>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <RechartsBarChart data={financialData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                                    formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="Entradas" fill="#10B981" radius={[4, 4, 0, 0]} name="Arrecadação" />
                                <Bar dataKey="Saidas" fill="#EF4444" radius={[4, 4, 0, 0]} name="Saques/Custos" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Distribuição Partidária</h2>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                             <PieChart>
                                <Pie 
                                    data={pieChartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60}
                                    outerRadius={100} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                >
                                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Candidatos`} />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
