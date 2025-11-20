
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  toggleMaintenanceMode: () => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export const MaintenanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa lendo do localStorage para persistir entre refreshes
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('maintenance_mode');
    return savedMode === 'true';
  });

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('maintenance_mode', String(newValue));
      return newValue;
    });
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, toggleMaintenanceMode }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};
