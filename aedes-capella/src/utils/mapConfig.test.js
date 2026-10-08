import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addMapTilerKey,
  describeMapError,
  getMapTilerStyleUrl,
  getVectorApiKey,
  getVectorStyleUrl,
  isMapVisuallyComplete,
  MAP_LOAD_TIMEOUT_MS,
  MAP_READY_EVENTS,
  MAP_RESOURCE_ERROR_LIMIT,
  mapTilerKey,
  OPENFREEMAP_STYLE_URL,
  redactMapUrl,
  shouldEscalateMapFailure,
} from './mapConfig.js';

test('MapTiler configuration builds a vector style endpoint instead of a viewer or raster URL', () => {
  assert.equal(
    getMapTilerStyleUrl({
      VITE_MAPTILER_MAP_ID: 'barangay-map',
      VITE_MAPTILER_KEY: 'public key',
    }),
    'https://api.maptiler.com/maps/barangay-map/style.json?key=public%20key',
  );
});

test('missing MapTiler configuration keeps the OpenStreetMap fallback active', () => {
  assert.equal(getMapTilerStyleUrl({ VITE_MAPTILER_MAP_ID: 'barangay-map' }), null);
  assert.equal(getMapTilerStyleUrl({ VITE_MAPTILER_KEY: 'public-key' }), null);
});

test('the MapTiler key is propagated to dependent style resources without replacing existing keys', () => {
  assert.equal(
    addMapTilerKey('https://api.maptiler.com/fonts/Roboto/0-255.pbf', 'public-key'),
    'https://api.maptiler.com/fonts/Roboto/0-255.pbf?key=public-key',
  );
  assert.equal(
    addMapTilerKey('https://api.maptiler.com/tiles/v3/0/0/0.pbf?key=style-key', 'public-key'),
    'https://api.maptiler.com/tiles/v3/0/0/0.pbf?key=style-key',
  );
  assert.equal(
    addMapTilerKey('https://example.com/tile.pbf', 'public-key'),
    'https://example.com/tile.pbf',
  );
  assert.equal(mapTilerKey({ VITE_MAPTILER_KEY: ' public-key ' }), 'public-key');
});

test('the detailed map defaults to keyless OpenFreeMap with no MapTiler credentials in the environment', () => {
  assert.equal(getVectorStyleUrl({}), OPENFREEMAP_STYLE_URL);
  assert.equal(getVectorApiKey({}), null);
});

test('MapTiler credentials alone do not activate MapTiler; an explicit provider opt-in is required', () => {
  const env = { VITE_MAPTILER_MAP_ID: 'barangay-map', VITE_MAPTILER_KEY: 'public-key' };
  assert.equal(getVectorStyleUrl(env), OPENFREEMAP_STYLE_URL);
  assert.equal(getVectorApiKey(env), null);

  const optedIn = { ...env, VITE_MAP_PROVIDER: 'maptiler' };
  assert.equal(
    getVectorStyleUrl(optedIn),
    'https://api.maptiler.com/maps/barangay-map/style.json?key=public-key',
  );
  assert.equal(getVectorApiKey(optedIn), 'public-key');
});

test('opting into MapTiler without both credentials still falls back to OpenFreeMap', () => {
  assert.equal(getVectorStyleUrl({ VITE_MAP_PROVIDER: 'maptiler', VITE_MAPTILER_KEY: 'k' }), OPENFREEMAP_STYLE_URL);
});

test('an explicit style URL always wins, regardless of provider', () => {
  assert.equal(
    getVectorStyleUrl({ VITE_MAP_STYLE_URL: 'https://tiles.openfreemap.org/styles/positron' }),
    'https://tiles.openfreemap.org/styles/positron',
  );
});

test('the vector map load timeout is a few seconds, not the old half-minute wait', () => {
  assert.ok(MAP_LOAD_TIMEOUT_MS <= 10_000);
});

test('a single MapLibre resource error is recoverable but a run of them forces the fallback', () => {
  assert.equal(shouldEscalateMapFailure({ kind: 'resource-error', resourceErrorCount: 1 }), false);
  assert.equal(
    shouldEscalateMapFailure({ kind: 'resource-error', resourceErrorCount: MAP_RESOURCE_ERROR_LIMIT }),
    true,
  );
  assert.equal(shouldEscalateMapFailure({ kind: 'timeout' }), true);
  assert.equal(shouldEscalateMapFailure({ kind: 'initialization' }), true);
  assert.equal(shouldEscalateMapFailure({ kind: 'authorization', resourceErrorCount: 1 }), true);
});

test('readiness waits for a visually complete render instead of style acceptance', () => {
  assert.ok(!MAP_READY_EVENTS.includes('style.load'));
  assert.ok(MAP_READY_EVENTS.includes('load'));
  assert.ok(MAP_READY_EVENTS.includes('idle'));

  assert.equal(isMapVisuallyComplete(null), false);
  assert.equal(isMapVisuallyComplete({ loaded: () => true, areTilesLoaded: () => false }), false);
  assert.equal(isMapVisuallyComplete({ loaded: () => false, areTilesLoaded: () => true }), false);
  assert.equal(isMapVisuallyComplete({ loaded: () => true, areTilesLoaded: () => true }), true);
  assert.equal(isMapVisuallyComplete({ loaded: () => { throw new Error('not ready'); } }), false);
});

test('map diagnostics never expose the public key carried in the query string', () => {
  assert.equal(
    redactMapUrl('https://api.maptiler.com/maps/abc/style.json?key=public-key'),
    'https://api.maptiler.com/maps/abc/style.json',
  );
  assert.equal(redactMapUrl('not a url'), null);

  const authorization = describeMapError({
    error: { status: 403, url: 'https://api.maptiler.com/tiles/v3/16/0/0.pbf?key=public-key', message: 'Forbidden' },
    sourceId: 'maptiler_planet',
  });
  assert.deepEqual(authorization, {
    kind: 'authorization',
    status: 403,
    sourceId: 'maptiler_planet',
    resource: 'https://api.maptiler.com/tiles/v3/16/0/0.pbf',
    message: 'Forbidden',
  });

  const workerFailure = describeMapError({ error: { message: 'Failed to fetch worker script (404)' } });
  assert.equal(workerFailure.kind, 'resource-error');
  assert.equal(workerFailure.status, null);
  assert.equal(workerFailure.resource, null);
});
