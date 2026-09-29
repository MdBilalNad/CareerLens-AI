import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import {
  deleteAllUserData,
  getCurrentSession,
  getUsers,
  initStorage,
  saveUser,
  setSession,
  verifyPassword,
} from '../services/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  deleteAccount: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    initStorage();
    const session = getCurrentSession();
    if (session.user) {
      setUser(session.user);
    } else {
      // Provide default demo user for seamless zero-barrier testing
      const users = getUsers();
      if (users.length > 0) {
        setUser(users[0]);
        setSession(users[0], 'demo-token-alex');
      }
    }

    // System theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('careerlens_theme_mode') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);

    setIsLoading(false);
  }, []);

  const applyTheme = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('careerlens_theme_mode', mode);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return {
        success: false,
        error: 'No account found with this email address. Please sign up or check for typos.',
      };
    }

    const isValid = verifyPassword(cleanEmail, password);
    if (!isValid) {
      return {
        success: false,
        error: 'Incorrect password. Please re-enter your password.',
      };
    }

    setUser(found);
    setSession(found, `token-${Date.now()}`);
    return { success: true };
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    if (cleanName.length < 2) {
      return { success: false, error: 'Please provide your full name.' };
    }

    const existingUsers = getUsers();
    if (existingUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in instead.',
      };
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: cleanEmail,
      fullName: cleanName,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser, password);
    setUser(newUser);
    setSession(newUser, `token-${Date.now()}`);

    return { success: true };
  };

  const logout = () => {
    setSession(null, null);
    setUser(null);
  };

  const deleteAccount = () => {
    if (user) {
      deleteAllUserData(user.id);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        logout,
        deleteAccount,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
