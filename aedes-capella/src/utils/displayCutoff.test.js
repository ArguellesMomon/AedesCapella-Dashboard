import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDisplayCutoff, DEFAULT_DISPLAY_FROM, resolveDisplayCutoff } from './displayCutoff.js';

const CUTOFF = Date.parse('2026-09-29T00:00:00+08:00');
const NOW = Date.parse('2026-09-29T10:00:00+08:00');
const BEFORE = '2026-09-28T18:00:00+08:00';
const AFTER = '2026-09-29T09:00:00+08:00';

function state() {
  return {
    activity: [
      { runtime_event_id: 1, device_id: 'a', display_time: BEFORE },
      { runtime_event_id: 2, device_id: 'a', display_time: AFTER },
    ],
    candidates: [
      { candidate_event_id: 1, device_id: 'a', display_time: BEFORE },
      { candidate_event_id: 2, device_id: 'a', display_time: AFTER },
    ],
    relays: [
      { relay_episode_key: 'x', device_id: 'a', display_time: BEFORE, started_at: BEFORE, recorded_relay_activation: true },
      { relay_episode_key: 'y', device_id: 'a', display_time: AFTER, started_at: AFTER, recorded_relay_activation: true },
    ],
    devices: [{
      device_id: 'a', operational_state: 'online', last_seen_at: AFTER,
      candidates_last_7d: 250, mist_events_last_7d: 86,
      latest_event_at: BEFORE, latest_upload_or_event_at: BEFORE, latest_event_kind: 'RELAY_OFF',
      latest_activity_at: BEFORE, detector_last_confirmed_at: BEFORE,
    }],
    mapDevices: [{
      device_id: 'a', operational_state: 'online', last_seen_at: AFTER,
      candidates_last_24h: 24, relay_activations_last_24h: 12, candidates_last_7d: 250,
      latest_activity_at: BEFORE, latest_event_kind: 'RELAY_OFF',
    }],
    activitySummary: {
      window_start: '2026-09-28T10:00:00+08:00', candidates_in_window: 37,
      relay_activations_in_window: 25, candidates_all_time: 646, latest_activity_at: BEFORE,
    },
  };
}

test('the database cutoff wins once the settings table exists', () => {
  const cutoff = resolveDisplayCutoff({ available: true, displayFrom: '2026-10-01T00:00:00+08:00' });
  assert.equal(cutoff.serverFiltered, true);
  assert.equal(cutoff.cutoffMs, Date.parse('2026-10-01T00:00:00+08:00'));
});

test('before the migration the built-in cutoff applies and counts are recomputed', () => {
  const cutoff = resolveDisplayCutoff({ available: false });
  assert.equal(cutoff.serverFiltered, false);
  assert.equal(cutoff.cutoffMs, Date.parse(DEFAULT_DISPLAY_FROM));
  assert.equal(cutoff.cutoffMs, CUTOFF);
});

test('lists never show an event from before the cutoff', () => {
  for (const serverFiltered of [true, false]) {
    const next = applyDisplayCutoff(state(), { cutoffMs: CUTOFF, serverFiltered }, NOW);
    assert.deepEqual(next.activity.map(row => row.runtime_event_id), [2]);
    assert.deepEqual(next.candidates.map(row => row.candidate_event_id), [2]);
    assert.deepEqual(next.relays.map(row => row.relay_episode_key), ['y']);
  }
});

test('client-side fallback recomputes every event count and keeps online status', () => {
  const next = applyDisplayCutoff(state(), { cutoffMs: CUTOFF, serverFiltered: false }, NOW);
  const [device] = next.devices;
  assert.equal(device.operational_state, 'online');
  assert.equal(device.last_seen_at, AFTER);
  assert.equal(device.candidates_last_7d, 1);
  assert.equal(device.mist_events_last_7d, 1);
  assert.equal(device.latest_event_kind, null);
  assert.equal(device.latest_event_at, null);
  assert.equal(device.latest_activity_at, AFTER);
  assert.equal(device.detector_last_confirmed_at, null);

  const [mapDevice] = next.mapDevices;
  assert.equal(mapDevice.candidates_last_24h, 1);
  assert.equal(mapDevice.relay_activations_last_24h, 1);
  assert.equal(mapDevice.candidates_last_7d, 1);
  assert.equal(mapDevice.latest_event_kind, null);

  assert.equal(next.activitySummary.candidates_in_window, 1);
  assert.equal(next.activitySummary.relay_activations_in_window, 1);
  assert.equal(next.activitySummary.candidates_all_time, 1);
  assert.equal(next.activitySummary.latest_activity_at, AFTER);
});

test('a summary window opening after the cutoff keeps the database count', () => {
  const s = state();
  s.activitySummary.window_start = '2026-09-29T00:00:00+08:00';
  s.activitySummary.candidates_in_window = 7;
  const next = applyDisplayCutoff(s, { cutoffMs: CUTOFF, serverFiltered: false }, NOW);
  assert.equal(next.activitySummary.candidates_in_window, 7);
});

test('server-filtered counts are left as the database computed them', () => {
  const next = applyDisplayCutoff(state(), { cutoffMs: CUTOFF, serverFiltered: true }, NOW);
  assert.equal(next.devices[0].candidates_last_7d, 250);
  assert.equal(next.mapDevices[0].candidates_last_24h, 24);
});
