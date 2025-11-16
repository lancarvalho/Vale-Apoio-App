
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_CANDIDATES } from '../../constants';
import { DollarSign, Users, TrendingUp, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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


const DashboardHomePage: React.FC = () => {
    const { user } = useAuth();
    // Assuming the logged-in candidate is Kleyton Cruz for this demo
    const candidate = MOCK_CANDIDATES.find(c => c.id === 3);

    if (!candidate) return <div>Candidato não encontrado.</div>;

    const totalRaised = candidate.donations.reduce((sum, d) => sum + d.amount, 0);
    const platformFee = totalRaised * 0.0365;
    const netAmount = totalRaised - platformFee;
    const donorCount = new Set(candidate.donations.map(d => d.donorCpf)).size;
    
    const chartData = [
        { name: '19/Jul', Doações: 400 },
        { name: '20/Jul', Doações: 300 },
        { name: '21/Jul', Doações: 200 },
        { name: '22/Jul', Doações: 278 },
        { name: '23/Jul', Doações: 189 },
        { name: '24/Jul', Doações: 239 },
        { name: 'Hoje', Doações: 349 },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo(a), {user?.name.split(' ')[0]}!</h1>
            <p className="mt-1 text-gray-600">Acompanhe em tempo real o andamento da sua campanha.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Valor Bruto Arrecadado" value={totalRaised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={DollarSign} />
                <StatCard title="Total de Apoiadores" value={donorCount.toString()} icon={Users} />
                <StatCard title="Taxa da Plataforma" value={platformFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={BarChart} />
                <StatCard title="Saldo Disponível" value={netAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={TrendingUp} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Donations Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-bold mb-4">Doações nos últimos 7 dias</h2>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <RechartsBarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value}`} />
                                <Tooltip cursor={{fill: 'rgba(99, 102, 241, 0.1)'}} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                                <Bar dataKey="Doações" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-bold mb-4">Últimas Doações</h2>
                     <div className="space-y-4">
                        {candidate.donations.slice(0, 5).map(donation => (
                            <div key={donation.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{donation.donorName}</p>
                                    <p className="text-sm text-gray-500">{donation.paymentMethod}</p>
                                </div>
                                <p className="font-bold text-secondary">
                                    {donation.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomePage;
