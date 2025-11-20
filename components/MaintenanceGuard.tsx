
import React from 'react';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { useAuth } from '../contexts/AuthContext';
import ComingSoonPage from '../pages/ComingSoonPage';
import { Outlet } from 'react-router-dom';

const MaintenanceGuard: React.FC = () => {
  const { isMaintenanceMode } = useMaintenance();
  const { user } = useAuth();

  // Se o modo manutenção estiver ativo E o usuário NÃO for um admin logado
  if (isMaintenanceMode && user?.type !== 'admin') {
    return <ComingSoonPage />;
  }

  // Caso contrário, renderiza o conteúdo normal (Outlet)
  return <Outlet />;
};

export default MaintenanceGuard;
