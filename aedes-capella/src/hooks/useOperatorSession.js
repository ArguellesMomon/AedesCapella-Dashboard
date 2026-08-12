import { useCallback, useEffect, useState } from 'react';
import {
  fetchCurrentUserRole,
  refreshOperatorSession,
  signInWithPassword,
  signOut,
} from '../lib/supabaseApi';

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
  /*
   * The resolved role is stored against the token it was fetched for, so the
   * effect never has to null it out synchronously on logout: a token that no
   * longer matches simply reads as unresolved. That also closes the window
   * where a stale role could outlive the session it came from.
   *
   * A failed lookup resolves to null, which the viewer context treats as
   * non-technical, so a lookup problem hides engineering detail rather than
   * exposing it.
   */
  const [resolvedRole, setResolvedRole] = useState({ token: null, role: null });

  useEffect(() => {
    const token = session?.accessToken;
    if (!token) return undefined;

    const controller = new AbortController();
    fetchCurrentUserRole(token, controller.signal)
      .then(role => setResolvedRole({ token, role }))
      .catch(() => setResolvedRole({ token, role: null }));

    return () => controller.abort();
  }, [session?.accessToken]);

  const role = resolvedRole.token && resolvedRole.token === session?.accessToken
    ? resolvedRole.role
    : null;

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

  return { session, role, login, logout };
}
