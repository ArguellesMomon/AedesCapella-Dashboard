import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildActivitySeries,
  buildConfidenceDistribution,
  buildRuntimeSummary,
  getEventPresentation,
} from './dashboardData.js';

test('runtime summary separates candidates, relay events, and unresolved time', () => {
  const now = Date.parse('2026-08-08T12:00:00Z');
  const events = [
    { display_time: '2026-08-08T11:00:00Z', temporal_candidate: true, relay_energized: false, time_quality: 'boot_anchor' },
    { display_time: '2026-08-08T10:00:00Z', temporal_candidate: false, relay_energized: true, time_quality: 'unresolved' },
    { display_time: '2026-07-01T10:00:00Z', temporal_candidate: true, relay_energized: false, time_quality: 'boot_anchor' },
  ];

  assert.deepEqual(buildRuntimeSummary(events, now), {
    total: 3,
    last24h: 2,
    candidateCount: 2,
    relayCount: 1,
    unresolvedCount: 1,
    latestAt: '2026-08-08T11:00:00Z',
  });
});

test('activity series counts only rows inside the selected window', () => {
  const now = Date.parse('2026-08-08T12:00:00Z');
  const events = [
    { display_time: '2026-08-08T11:00:00Z' },
    { display_time: '2026-08-08T11:30:00Z' },
    { display_time: '2026-08-07T10:00:00Z' },
  ];

  const expectedHour = new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit', hour12: false, timeZone: 'Asia/Manila',
  }).format(new Date('2026-08-08T11:00:00Z'));
  assert.deepEqual(buildActivitySeries(events, 'today', now), [{ t: `${expectedHour}:00`, v: 2 }]);
});

test('confidence distribution preserves empty buckets and event labels stay cautious', () => {
  assert.deepEqual(buildConfidenceDistribution([
    { confidence_score: 95 },
    { confidence_score: 82 },
    { confidence_score: 61 },
  ]), [
    { range: '0–59%', count: 0 },
    { range: '60–79%', count: 1 },
    { range: '80–89%', count: 1 },
    { range: '90–100%', count: 1 },
  ]);
  assert.equal(getEventPresentation('LIVE_ACCEPT').label, 'Possible mosquito match');
  assert.equal(getEventPresentation('UNKNOWN').color, 'gray');
});
