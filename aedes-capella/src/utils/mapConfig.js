export function getMapTilerStyleUrl(env = {}) {
  const mapId = env.VITE_MAPTILER_MAP_ID?.trim();
  const apiKey = env.VITE_MAPTILER_KEY?.trim();

  if (!mapId || !apiKey) return null;

  return `https://api.maptiler.com/maps/${encodeURIComponent(mapId)}/style.json?key=${encodeURIComponent(apiKey)}`;
}

// OpenFreeMap (https://openfreemap.org) serves this MapLibre style with no API
// key and no published request quota, so it is the safe default basemap.
// Attribution ("OpenFreeMap (c) OpenMapTiles Data from OpenStreetMap") is
// carried in the style JSON itself and MapLibre's AttributionControl renders
// it automatically; do not strip or override it.
export const OPENFREEMAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// MapTiler previously activated itself just by having a map ID and key present
// in the environment, which is how a quota-exhausted Vercel deployment served a
// broken map with no code change and no one aware MapTiler was even in play.
// It now requires an explicit opt-in on top of those two values, so a stale or
// rate-limited credential sitting in Vercel env vars can never silently become
// the production basemap again.
export function getVectorStyleUrl(env = {}) {
  const explicitStyle = env.VITE_MAP_STYLE_URL?.trim();
  if (explicitStyle) return explicitStyle;

  const wantsMapTiler = env.VITE_MAP_PROVIDER?.trim().toLowerCase() === 'maptiler';
  if (wantsMapTiler) {
    const mapTilerStyle = getMapTilerStyleUrl(env);
    if (mapTilerStyle) return mapTilerStyle;
  }

  return OPENFREEMAP_STYLE_URL;
}

// The transformRequest key only matters for MapTiler URLs (addMapTilerKey is a
// no-op for every other host), but withholding it entirely when MapTiler is
// not the active provider keeps the key out of network requests altogether.
export function getVectorApiKey(env = {}) {
  const wantsMapTiler = env.VITE_MAP_PROVIDER?.trim().toLowerCase() === 'maptiler';
  return wantsMapTiler ? mapTilerKey(env) : null;
}

export function addMapTilerKey(url, apiKey) {
  if (!apiKey) return url;

  try {
    const requestUrl = new URL(url);
    if (requestUrl.protocol !== 'https:' || requestUrl.hostname !== 'api.maptiler.com') return url;
    if (!requestUrl.searchParams.has('key')) requestUrl.searchParams.set('key', apiKey);
    return requestUrl.toString();
  } catch {
    return url;
  }
}

export function mapTilerKey(env = {}) {
  return env.VITE_MAPTILER_KEY?.trim() || null;
}

// The public MapTiler key travels in the query string, so nothing past the path
// may ever reach a log line, an error message, or the rendered UI.
export function redactMapUrl(url) {
  if (typeof url !== 'string' || !url) return null;

  try {
    const requestUrl = new URL(url);
    return `${requestUrl.origin}${requestUrl.pathname}`;
  } catch {
    return null;
  }
}

export function describeMapError(event = {}) {
  const error = event.error || {};
  const status = Number(error.status || error.response?.status || 0) || null;

  return {
    kind: status === 401 || status === 403 ? 'authorization' : 'resource-error',
    status,
    sourceId: event.sourceId || null,
    resource: redactMapUrl(error.url || event.url || error.request?.url),
    message: typeof error.message === 'string' ? error.message : null,
  };
}

// MapLibre reports one-off tile hiccups through the same `error` event as a
// broken worker or a rejected key. A single resource error is recoverable; a
// run of them means the detailed basemap will never paint.
export const MAP_RESOURCE_ERROR_LIMIT = 3;

// A dead vector basemap (429, DNS failure, blocked worker) used to leave the
// map blank for up to 30 s before falling back to Leaflet. An operator in a
// live UAT session reads that as the dashboard being broken, not loading.
// Bound the wait to a few seconds so the fallback is prompt.
export const MAP_LOAD_TIMEOUT_MS = 8_000;

export function shouldEscalateMapFailure({ kind, resourceErrorCount = 0, limit = MAP_RESOURCE_ERROR_LIMIT } = {}) {
  if (kind === 'timeout' || kind === 'initialization' || kind === 'authorization') return true;
  if (kind === 'resource-error') return resourceErrorCount >= limit;
  return false;
}

// `style.load` only proves the Style JSON was accepted. MapLibre defines `load`
// as the first visually complete render, and `idle` as no outstanding tiles.
export const MAP_READY_EVENTS = ['load', 'idle', 'sourcedata'];

export function isMapVisuallyComplete(map) {
  if (!map) return false;

  try {
    return Boolean(map.loaded()) && Boolean(map.areTilesLoaded());
  } catch {
    return false;
  }
}
