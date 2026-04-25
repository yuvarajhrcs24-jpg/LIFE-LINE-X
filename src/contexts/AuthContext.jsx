import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

const SIM_USERS = [
  { uid: 'sim-citizen-1', name: 'Demo Citizen', email: 'citizen@demo.com', role: 'citizen', trustScore: 72, confirmations: 5, resolvedRequests: 2, fakeFlags: 0, verifiedPhone: true, verifiedId: false },
  { uid: 'sim-volunteer-1', name: 'Demo Volunteer', email: 'volunteer@demo.com', role: 'volunteer', trustScore: 85, confirmations: 12, resolvedRequests: 8, fakeFlags: 0, verifiedPhone: true, verifiedId: true, skills: ['medical', 'rescue'], available: true },
  { uid: 'sim-authority-1', name: 'Demo Authority', email: 'authority@demo.com', role: 'authority', trustScore: 95, confirmations: 30, resolvedRequests: 25, fakeFlags: 0, verifiedPhone: true, verifiedId: true },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('llx_user');
    if (stored) { try { setUser(JSON.parse(stored)); } catch {} }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const sim = SIM_USERS.find(u => u.email === email);
    if (sim && password === 'demo123') {
      setUser(sim);
      localStorage.setItem('llx_user', JSON.stringify(sim));
      return sim;
    }
    const stored = JSON.parse(localStorage.getItem('llx_accounts') || '[]');
    const found = stored.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('llx_user', JSON.stringify(safeUser));
      return safeUser;
    }
    throw new Error('Invalid email or password');
  };

  const register = async (name, email, password, role) => {
    const accounts = JSON.parse(localStorage.getItem('llx_accounts') || '[]');
    if (accounts.find(u => u.email === email)) throw new Error('Email already registered');
    const newUser = { uid: uuidv4(), name, email, role: role || 'citizen', trustScore: 50, confirmations: 0, resolvedRequests: 0, fakeFlags: 0, verifiedPhone: false, verifiedId: false, password };
    accounts.push(newUser);
    localStorage.setItem('llx_accounts', JSON.stringify(accounts));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('llx_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => { setUser(null); localStorage.removeItem('llx_user'); };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('llx_user', JSON.stringify(updated));
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, simUsers: SIM_USERS }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
