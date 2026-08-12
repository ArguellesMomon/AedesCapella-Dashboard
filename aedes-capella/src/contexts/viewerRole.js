import { createContext, useContext } from 'react';

/*
 * Context object and hooks live here, apart from the provider component, so the
 * provider module exports only components and Fast Refresh keeps working.
 */
export const ViewerContext = createContext({ role: null, technical: false });

/** True only for roles that maintain the system. Defaults to false. */
export function useIsTechnical() {
  return useContext(ViewerContext).technical;
}

export function useViewerRole() {
  return useContext(ViewerContext).role;
}
