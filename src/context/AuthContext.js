/**
 * AuthContext.js
 * ─────────────────────────────────────────────
 * Provides the logged-in user's session to the entire app.
 * Wrap the app in <AuthProvider> and access auth state anywhere
 * with the useAuth() hook.
 *
 * Usage:
 *   const { user, session, isLoading } = useAuth();
 * ─────────────────────────────────────────────
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, onAuthStateChange } from '../services/authService';

// ─── Create Context ───────────────────────────
const AuthContext = createContext({
  user: null,
  session: null,
  isLoading: true,
});

// ─── Provider Component ───────────────────────
/**
 * AuthProvider
 * Wrap this around your app root (in App.js).
 * It checks for an existing session on mount, then listens for changes.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true while checking session

  useEffect(() => {
    // ── On mount: check for existing session ──
    getSession().then((existingSession) => {
      setSession(existingSession);
      setUser(existingSession?.user || null);
      setIsLoading(false);
    });

    // ── Subscribe to auth changes (login/logout) ──
    const unsubscribe = onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);

      // If loading is still true after first auth event, clear it
      setIsLoading(false);
    });

    // Cleanup subscription when component unmounts
    return unsubscribe;
  }, []);

  // ── Dummy Login for UI Testing ──
  const dummyLogin = () => {
    setUser({ email: 'dummy@example.com' });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, dummyLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────
/**
 * useAuth
 * Returns the current auth state from anywhere in the component tree.
 *
 * @returns {{ user: User|null, session: Session|null, isLoading: boolean }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}
