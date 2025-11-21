
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa o estado lendo do localStorage (se existir)
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('vale_apoio_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Erro ao ler usuário do storage:', e);
      return null;
    }
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('vale_apoio_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vale_apoio_user');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...updates };
      // Salva a versão atualizada no storage imediatamente
      localStorage.setItem('vale_apoio_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
