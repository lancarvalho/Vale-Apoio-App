
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HelpPage from './pages/HelpPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import DashboardWithdrawalsPage from './pages/dashboard/DashboardWithdrawalsPage';
import DashboardReportsPage from './pages/dashboard/DashboardReportsPage';
import DashboardProfilePage from './pages/dashboard/DashboardProfilePage';
import DonorDashboardPage from './pages/DonorDashboardPage';
import PublicLayout from './components/PublicLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidatos" element={<CandidatesPage />} />
            <Route path="/candidatos/:slug" element={<CandidateProfilePage />} />
            <Route path="/cadastrar" element={<RegisterPage />} />
            <Route path="/acessar" element={<LoginPage />} />
            <Route path="/ajuda" element={<HelpPage />} />
          </Route>
          
          <Route path="/painel" element={<DashboardLayout />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="saques" element={<DashboardWithdrawalsPage />} />
            <Route path="comprovantes-tse" element={<DashboardReportsPage />} />
            <Route path="perfil" element={<DashboardProfilePage />} />
          </Route>

          <Route path="/doador" element={<DonorDashboardPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
