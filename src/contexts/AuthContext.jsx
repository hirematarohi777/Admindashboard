import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const AUTH_KEY = 'auth-session';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user ?? null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      if (!user) localStorage.removeItem(AUTH_KEY);
      else localStorage.setItem(AUTH_KEY, JSON.stringify({ user }));
    } catch {
      // ignore storage failures
    }
  }, [user]);

  const login = ({ email, role = 'admin' } = {}) => {
    const next = {
      id: 'local-user',
      email: email || 'admin@smartcity.gov',
      role,
    };
    setUser(next);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

