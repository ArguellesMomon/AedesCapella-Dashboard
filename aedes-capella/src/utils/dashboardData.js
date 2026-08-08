const EVENT_PRESENTATION = {
  BOOT: { label: 'Sensor started', color: 'blue' },
  TEST_ACCEPT: { label: 'Test sound checked', color: 'gray' },
  LIVE_ACCEPT: { label: 'Possible mosquito match', color: 'amber' },
  RELAY_INTENT: { label: 'Fogging check', color: 'amber' },
  RELAY_ON: { label: 'Fogging started', color: 'red' },
  RELAY_OFF: { label: 'Fogging stopped', color: 'green' },
  RELAY_REJECT: { label: 'Fogging not started', color: 'red' },
  COOLDOWN_COMPLETE: { label: 'Waiting time complete', color: 'green' },
};

export function getEventPresentation(eventKind) {
  return EVENT_PRESENTATION[eventKind] || { label: 'Other sensor activity', color: 'gray' };
}

export function formatDashboardTimestamp(value) {
  if (!value) return 'No timestamp';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid timestamp';

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function formatShortDashboardTimestamp(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid';

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function average(values) {
  const numeric = values
    .map(Number)
    .filter(value => Number.isFinite(value));
  if (!numeric.length) return null;
  return numeric.reduce((sum, value) => sum + value, 0) / numeric.length;
}

export function countSince(rows, timestampKey, since) {
  return rows.filter(row => {
    const value = row?.[timestampKey];
    return value && new Date(value).getTime() >= since;
  }).length;
}

export function buildRuntimeSummary(events, now = Date.now()) {
  const since24h = now - (24 * 60 * 60 * 1000);
  const candidateCount = events.filter(event => event.temporal_candidate).length;
  const relayCount = events.filter(event => event.relay_energized).length;
  const unresolvedCount = events.filter(event => event.time_quality === 'unresolved').length;

  return {
    total: events.length,
    last24h: countSince(events, 'display_time', since24h),
    candidateCount,
    relayCount,
    unresolvedCount,
    latestAt: events[0]?.display_time || null,
  };
}

function bucketKey(date, view) {
  if (view === 'today') {
    const parts = new Intl.DateTimeFormat('en-PH', {
      hour: '2-digit', hour12: false, timeZone: 'Asia/Manila',
    }).formatToParts(date);
    const hour = parts.find(part => part.type === 'hour')?.value || '—';
    return `${hour}:00`;
  }
  if (view === 'week') {
    return new Intl.DateTimeFormat('en-PH', { weekday: 'short', timeZone: 'Asia/Manila' }).format(date);
  }
  return new Intl.DateTimeFormat('en-PH', { month: 'short', day: '2-digit', timeZone: 'Asia/Manila' }).format(date);
}

export function buildActivitySeries(events, view, now = Date.now()) {
  const windows = {
    today: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  };
  const since = now - windows[view];
  const counts = new Map();

  events.forEach(event => {
    const timestamp = new Date(event.display_time).getTime();
    if (!Number.isFinite(timestamp) || timestamp < since) return;
    const key = bucketKey(new Date(timestamp), view);
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts, ([t, v]) => ({ t, v }))
    .sort((a, b) => a.t.localeCompare(b.t, 'en', { numeric: true }));
}

export function buildHourlyFogSeries(events, now = Date.now()) {
  const since = now - (12 * 60 * 60 * 1000);
  const counts = new Map();

  events.forEach(event => {
    const timestamp = new Date(event.triggered_at).getTime();
    if (!Number.isFinite(timestamp) || timestamp < since) return;
    const date = new Date(timestamp);
    const parts = new Intl.DateTimeFormat('en-PH', {
      hour: '2-digit', hour12: false, timeZone: 'Asia/Manila',
    }).formatToParts(date);
    const hour = parts.find(part => part.type === 'hour')?.value || '—';
    const key = `${hour}:00`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts, ([hour, fogs]) => ({ hour, fogs }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
}

export function buildConfidenceDistribution(records) {
  const buckets = [
    { range: '0–59%', min: 0, max: 59 },
    { range: '60–79%', min: 60, max: 79 },
    { range: '80–89%', min: 80, max: 89 },
    { range: '90–100%', min: 90, max: 100 },
  ];

  return buckets.map(bucket => ({
    range: bucket.range,
    count: records.filter(record => {
      const score = Number(record.confidence_score);
      return Number.isFinite(score) && score >= bucket.min && score <= bucket.max;
    }).length,
  }));
}

export function buildNodeActivity(events, deviceLabels = {}) {
  const counts = new Map();
  events.forEach(event => {
    const key = event.device_id || 'unknown';
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts, ([deviceId, count]) => ({
    node: deviceLabels[deviceId] || deviceId.slice(0, 8),
    count,
  })).sort((a, b) => b.count - a.count);
}
