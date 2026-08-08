import { useCallback, useEffect, useState } from 'react';
import { fetchDeviceStatus } from '../lib/supabaseApi';
import { getFriendlyError } from '../utils/userMessages';

const REFRESH_INTERVAL_MS = 30_000;

export function useDeviceStatus(accessToken) {
  const [state, setState] = useState({ devices: [], error: '', loading: true, refreshedAt: null });

  const refresh = useCallback(async (signal) => {
    if (!accessToken) return;

    try {
      const devices = await fetchDeviceStatus(accessToken, signal);
      setState({ devices, error: '', loading: false, refreshedAt: new Date() });
    } catch (error) {
      if (error.name === 'AbortError') return;
      setState(current => ({
        ...current,
        error: getFriendlyError(error, 'Sensor information is unavailable right now.'),
        loading: false,
      }));
    }
  }, [accessToken]);

  useEffect(() => {
    const controller = new AbortController();
    refresh(controller.signal);
    const interval = window.setInterval(() => refresh(controller.signal), REFRESH_INTERVAL_MS);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [refresh]);

  return { ...state, refresh: () => refresh() };
}
