import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildActivitySeries,
  buildConfidenceDistribution,
  buildRuntimeSummary,
  deriveRelayEpisodes,
  getEventPresentation,
} from './dashboardData.js';

test('runtime summary separates candidates, relay activations, and unresolved time', () => {
  const now = Date.parse('2026-08-08T12:00:00Z');
  const events = [
    { display_time: '2026-08-08T11:00:00Z', temporal_candidate: true, relay_energized: false, time_quality: 'boot_anchor' },
    { display_time: '2026-08-08T10:00:00Z', temporal_candidate: false, relay_energized: true, time_quality: 'unresolved' },
    { display_time: '2026-07-01T10:00:00Z', temporal_candidate: true, relay_energized: false, time_quality: 'boot_anchor' },
  ];
  assert.deepEqual(buildRuntimeSummary(events, now), {
    total: 3, last24h: 2, candidateCount: 2, relayCount: 1,
    unresolvedCount: 1, latestAt: '2026-08-08T11:00:00Z',
  });
});

test('candidate series fills chronological Asia/Manila buckets, including zeroes', () => {
  const now = Date.parse('2026-08-08T12:30:00Z');
  const rows = [
    { display_time: '2026-08-08T11:00:00Z' },
    { display_time: '2026-08-08T11:30:00Z' },
  ];
  const series = buildActivitySeries(rows, 'today', now);
  assert.equal(series.length, 24);
  assert.equal(series.reduce((sum, point) => sum + point.v, 0), 2);
  assert.ok(series.some(point => point.v === 0));
  assert.ok(series.every((point, index) => index === 0 || point.start > series[index - 1].start));
});

test('candidate score distribution preserves empty buckets and cautious labels', () => {
  assert.deepEqual(buildConfidenceDistribution([
    { candidate_score: 0.95 }, { candidate_score: 0.82 }, { candidate_score: 0.61 },
  ]), [
    { range: '0–59%', count: 0 },
    { range: '60–79%', count: 1 },
    { range: '80–89%', count: 1 },
    { range: '90–100%', count: 1 },
  ]);
  assert.equal(getEventPresentation('LIVE_ACCEPT').label, 'Possible mosquito match');
  assert.equal(getEventPresentation('UNKNOWN').color, 'gray');
});

test('relay pairing uses device and source packet and derives evidence duration', () => {
  const episodes = deriveRelayEpisodes([
    { device_id: 'd1', source_boot: 7, source_sequence: 4, event_kind: 'RELAY_INTENT', occurred_at: '2026-08-08T10:00:00Z' },
    { device_id: 'd1', source_boot: 7, source_sequence: 4, event_kind: 'RELAY_ON', occurred_at: '2026-08-08T10:00:01Z' },
    { device_id: 'd1', source_boot: 7, source_sequence: 4, event_kind: 'RELAY_OFF', occurred_at: '2026-08-08T10:00:09Z' },
  ]);
  assert.equal(episodes.length, 1);
  assert.equal(episodes[0].relay_status, 'stopped');
  assert.equal(episodes[0].duration_seconds, 8);
  assert.equal(episodes[0].recorded_relay_activation, true);
});
