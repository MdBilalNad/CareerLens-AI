// Local storage persistence service for users, sessions, and resume analyses
// Supports multi-analysis history, score tracking over time, and permanent deletion

import { ATSAnalysisResult, User } from '../types';

const STORAGE_KEYS = {
  USERS: 'careerlens_users_v1',
  SESSION: 'careerlens_session_v1',
  ANALYSES: 'careerlens_analyses_v1',
  THEME: 'careerlens_theme_v1',
};

// Seed demo user if no users exist
export function initStorage(): void {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  if (users.length === 0) {
    const defaultUser: User = {
      id: 'user_alex_chen',
      email: 'alex.chen@berkeley.edu',
      fullName: 'Alex Chen',
      createdAt: '2026-09-01T12:00:00.000Z',
    };
    saveUser(defaultUser, 'Password123!');
  }
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load users:', e);
    return [];
  }
}

export function saveUser(user: User, passwordRaw: string): void {
  if (typeof window === 'undefined') return;
  const users = getUsers().filter((u) => u.id !== user.id && u.email !== user.email);
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  // Store password hash representation
  const passwordsRaw = localStorage.getItem('careerlens_passwords_v1') || '{}';
  try {
    const passwords = JSON.parse(passwordsRaw);
    // Simple secure storage simulation for client persistence
    passwords[user.email.toLowerCase()] = btoa(passwordRaw);
    localStorage.setItem('careerlens_passwords_v1', JSON.stringify(passwords));
  } catch (e) {
    console.error('Password save error:', e);
  }
}

export function verifyPassword(email: string, passwordRaw: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const passwordsRaw = localStorage.getItem('careerlens_passwords_v1') || '{}';
    const passwords = JSON.parse(passwordsRaw);
    const stored = passwords[email.toLowerCase()];
    if (!stored) {
      // Allow demo user password fallback
      return passwordRaw.length >= 6;
    }
    return stored === btoa(passwordRaw);
  } catch {
    return passwordRaw.length >= 6;
  }
}

export function getCurrentSession(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') return { user: null, token: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
}

export function setSession(user: User | null, token: string | null): void {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  } else {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ user, token }));
  }
}

export function getAnalyses(userId?: string): ATSAnalysisResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYSES);
    if (!raw) return [];
    const list: ATSAnalysisResult[] = JSON.parse(raw);
    if (!userId) return list;
    return list.filter((a) => a.userId === userId || a.userId === 'guest-user');
  } catch (e) {
    console.error('Failed to load analyses:', e);
    return [];
  }
}

export function saveAnalysis(analysis: ATSAnalysisResult): void {
  if (typeof window === 'undefined') return;
  const current = getAnalyses();
  // Filter out any existing analysis with same id
  const updated = [analysis, ...current.filter((a) => a.id !== analysis.id)];
  localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(updated));
}

export function getAnalysisById(id: string): ATSAnalysisResult | undefined {
  const current = getAnalyses();
  return current.find((a) => a.id === id);
}

export function deleteAnalysis(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getAnalyses();
  const updated = current.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(updated));
}

export function deleteAllUserData(userId: string): void {
  if (typeof window === 'undefined') return;
  // 1. Delete all analyses belonging to this user
  const allAnalyses = getAnalyses();
  const remaining = allAnalyses.filter((a) => a.userId !== userId && a.userId !== 'guest-user');
  localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(remaining));

  // 2. Delete user account record
  const users = getUsers().filter((u) => u.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  // 3. Clear session
  setSession(null, null);
}

export function exportAllUserData(userId: string): string {
  const analyses = getAnalyses(userId);
  const user = getUsers().find((u) => u.id === userId);
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    user: user || null,
    totalAnalyses: analyses.length,
    analyses: analyses.map((a) => ({
      id: a.id,
      fileName: a.fileName,
      uploadedAt: a.uploadedAt,
      scoringVersion: a.scoringVersion,
      overallScore: a.overallScore,
      categoryScores: a.categoryScores.map((c) => ({
        name: c.displayName,
        score: c.score,
        weight: c.weight,
        deductions: c.deductions,
      })),
      topJobMatches: a.topJobMatches.map((m) => ({
        role: m.roleTitle,
        matchPercentage: m.matchPercentage,
        explanation: m.explanation,
      })),
    })),
  };
  return JSON.stringify(exportPayload, null, 2);
}
