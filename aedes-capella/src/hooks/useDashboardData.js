import { useCallback, useEffect, useState } from 'react';
import {
  fetchDetectionRecords,
  fetchFoggingEvents,
  fetchLocationActivity,
  fetchRuntimeActivity,
} from '../lib/supabaseApi';
import { getFriendlyError } from '../utils/userMessages';

const REFRESH_INTERVAL_MS = 30_000;

const EMPTY_STATE = {
  activity: [],
  detections: [],
  fogging: [],
  locations: [],
  errors: {},
  loading: true,
  refreshedAt: null,
};

const SOURCES = [
  ['activity', fetchRuntimeActivity],
  ['detections', fetchDetectionRecords],
  ['fogging', fetchFoggingEvents],
  ['locations', fetchLocationActivity],
];

/**
 * Reads independent authenticated dashboard datasets without allowing one
 * unavailable relation to hide the others. Each source has its own error so
 * operators can still use device health while a historical table is empty or
 * temporarily unavailable.
 */
export function useDashboardData(accessToken) {
  const [state, setState] = useState(EMPTY_STATE);

  const refresh = useCallback(async signal => {
    if (!accessToken) return;

    const results = await Promise.allSettled(
      SOURCES.map(([, fetcher]) => fetcher(accessToken, signal)),
    );

    if (signal?.aborted) return;

    setState(current => {
      const next = {
        ...current,
        errors: {},
        loading: false,
        refreshedAt: new Date(),
      };

      results.forEach((result, index) => {
        const [key] = SOURCES[index];
        if (result.status === 'fulfilled') {
          next[key] = Array.isArray(result.value) ? result.value : [];
          return;
        }

        if (result.reason?.name !== 'AbortError') {
          next.errors[key] = getFriendlyError(result.reason, 'This information is unavailable right now.');
        }
      });

      return next;
    });
  }, [accessToken]);

  useEffect(() => {
    const controller = new AbortController();
    const initialFetch = window.setTimeout(() => refresh(controller.signal), 0);
    const interval = window.setInterval(() => refresh(controller.signal), REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearTimeout(initialFetch);
      window.clearInterval(interval);
    };
  }, [refresh]);

  return { ...state, refresh: () => refresh() };
}
