import { useCallback, useEffect, useState } from 'react';
import { refreshOperatorSession, signInWithPassword, signOut } from '../lib/supabaseApi';

const SESSION_KEY = 'aedes-capella-operator-session-v1';

function loadSession() {
  if (typeof window === 'undefined') return null;

  try {
    const session = JSON.parse(window.sessionStorage.getItem(SESSION_KEY));
    return session?.accessToken && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function useOperatorSession() {
  const [session, setSession] = useState(loadSession);

  useEffect(() => {
    if (!session?.refreshToken) return undefined;

    const refreshIn = Math.max(1_000, session.expiresAt - Date.now() - 60_000);
    const timeout = window.setTimeout(async () => {
      try {
        const nextSession = await refreshOperatorSession(session.refreshToken);
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
      } catch {
        window.sessionStorage.removeItem(SESSION_KEY);
        setSession(null);
      }
    }, refreshIn);

    return () => window.clearTimeout(timeout);
  }, [session]);

  const login = useCallback(async (email, password) => {
    const nextSession = await signInWithPassword(email, password);
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  const logout = useCallback(async () => {
    const accessToken = session?.accessToken;
    window.sessionStorage.removeItem(SESSION_KEY);
    setSession(null);

    if (accessToken) {
      await signOut(accessToken).catch(() => undefined);
    }
  }, [session?.accessToken]);

  return { session, login, logout };
}
