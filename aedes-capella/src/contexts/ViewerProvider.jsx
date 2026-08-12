import { isTechnicalRole } from '../utils/viewer';
import { ViewerContext } from './viewerRole';

/*
 * Context rather than props because the technical/plain distinction is needed
 * deep in the tree (node cards, table rows, map popups) and threading a boolean
 * through every section would touch far more code than it explains.
 *
 * The hooks live in ./viewerContext.js so this module exports only a component.
 */
export function ViewerProvider({ role, children }) {
  return (
    <ViewerContext.Provider value={{ role, technical: isTechnicalRole(role) }}>
      {children}
    </ViewerContext.Provider>
  );
}
