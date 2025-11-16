
import React from 'react';
import { MOCK_CANDIDATES, PARTIES } from '../../constants';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminHomePage: React.FC = () => {
    const totalRaised = MOCK_CANDIDATES.reduce((total, candidate) => 
        total + candidate.donations.reduce((sum, d) => sum + d.amount, 0), 0);

    const totalCandidates = MOCK_CANDIDATES.length;
    
    // Mock data for withdrawals
    const pendingWithdrawals = 3;
    const completedWithdrawals = 12;

    const candidatesByParty = MOCK_CANDIDATES.reduce((acc, candidate) => {
        const party = candidate.party.acronym;
        acc[party] = (acc[party] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(candidatesByParty).map(([name, value]) => ({ name, value }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const donationHistoryData = [
      { name: 'Jan', Doações: 4000 },
      { name: 'Fev', Doações: 3000 },
      { name: 'Mar', Doações: 2000 },
      { name: 'Abr', Doações: 2780 },
      { name: 'Mai', Doações: 1890 },
      { name: 'Jun', Doações: 2390 },
      { name: 'Jul', Doações: 3490 },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="mt-1 text-gray-600">Visão geral da plataforma Vale Apoio.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Arrecadado" value={totalRaised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={DollarSign} />
                <StatCard title="Candidatos Ativos" value={totalCandidates.toString()} icon={Users} />
                <StatCard title="Saques Pendentes" value={pendingWithdrawals.toString()} icon={Clock} />
                <StatCard title="Saques Concluídos" value={completedWithdrawals.toString()} icon={CheckCircle} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Volume de Doações (Mensal)</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <RechartsBarChart data={donationHistoryData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                                <Tooltip cursor={{fill: 'rgba(99, 102, 241, 0.1)'}} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                <Bar dataKey="Doações" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Candidatos por Partido</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                             <PieChart>
                                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;