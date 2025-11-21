
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';

import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import RegisterChoicePage from './pages/RegisterChoicePage';
import RegisterPage from './pages/RegisterPage';
import CandidatePaymentPage from './pages/CandidatePaymentPage'; 
import LoginPage from './pages/LoginPage';
import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';
import DonorDashboardPage from './pages/DonorDashboardPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import DashboardWithdrawalsPage from './pages/dashboard/DashboardWithdrawalsPage';
import DashboardReportsPage from './pages/dashboard/DashboardReportsPage';
import DashboardProfilePage from './pages/dashboard/DashboardProfilePage';
import DashboardBiographyPage from './pages/dashboard/DashboardBiographyPage';
import PublicLayout from './components/PublicLayout';
import MaintenanceGuard from './components/MaintenanceGuard';

import AdminLayout from './pages/admin/AdminLayout';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminCandidatesPage from './pages/admin/AdminCandidatesPage';
import AdminWithdrawalsPage from './pages/admin/AdminWithdrawalsPage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import AdminTSEReportsPage from './pages/admin/AdminTSEReportsPage';
import AdminAuditPage from './pages/admin/AdminAuditPage';

const App: React.FC = () => {
  return (
    <MaintenanceProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            
            {/* Rotas Públicas - Protegidas pelo Modo Manutenção */}
            <Route element={<MaintenanceGuard />}>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/candidatos" element={<CandidatesPage />} />
                <Route path="/candidatos/:slug" element={<CandidateProfilePage />} />
                <Route path="/cadastrar" element={<RegisterChoicePage />} />
                <Route path="/cadastrar-candidato" element={<RegisterPage />} />
                <Route path="/ajuda" element={<HelpPage />} />
                <Route path="/termos" element={<TermsPage />} />
              </Route>
            </Route>

            {/* Rotas de Acesso (Login) */}
            <Route element={<PublicLayout />}>
               <Route path="/acessar" element={<LoginPage />} />
               <Route path="/pagamento-inscricao" element={<CandidatePaymentPage />} />
            </Route>
            
            {/* Rotas Doador */}
            <Route path="/painel-doador" element={<DonorDashboardPage />} />

            {/* Rotas Privadas (Candidato) */}
            <Route path="/painel" element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="saques" element={<DashboardWithdrawalsPage />} />
              <Route path="comprovantes-tse" element={<DashboardReportsPage />} />
              <Route path="perfil" element={<DashboardProfilePage />} />
              <Route path="biografia" element={<DashboardBiographyPage />} />
            </Route>

            {/* Rotas Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHomePage />} />
              <Route path="candidatos" element={<AdminCandidatesPage />} />
              <Route path="doacoes" element={<AdminDonationsPage />} />
              <Route path="saques" element={<AdminWithdrawalsPage />} />
              <Route path="relatorios-tse" element={<AdminTSEReportsPage />} />
              <Route path="auditoria" element={<AdminAuditPage />} />
            </Route>

          </Routes>
        </HashRouter>
      </AuthProvider>
    </MaintenanceProvider>
  );
};

export default App;
