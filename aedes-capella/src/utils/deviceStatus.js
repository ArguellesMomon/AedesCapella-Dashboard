export const STATUS_PRESENTATION = {
  online: { label: 'Working', color: 'green', tone: 'healthy' },
  stale: { label: 'Check soon', color: 'amber', tone: 'warning' },
  offline: { label: 'Not reporting', color: 'gray', tone: 'offline' },
  never_seen: { label: 'Not connected yet', color: 'blue', tone: 'startup' },
  logging_fault: { label: 'Records may be missing', color: 'red', tone: 'critical' },
};

export function getStatusPresentation(state) {
  return STATUS_PRESENTATION[state] || STATUS_PRESENTATION.never_seen;
}

export function formatDuration(milliseconds) {
  if (milliseconds === null || milliseconds === undefined) return '—';
  const totalMinutes = Math.floor(Number(milliseconds) / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return days ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
}

export function formatTimestamp(value) {
  if (!value) return 'Never';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(new Date(value));
}

export function describeDeviceState(device) {
  if (device.operational_state === 'logging_fault') {
    return 'The sensor is sending a signal, but some records may not be saved. Treat its information as incomplete until a later healthy update.';
  }
  if (device.operational_state === 'never_seen') {
    return 'This sensor is listed but has never sent an update.';
  }
  if (device.operational_state === 'stale') {
    return `No update received within the ${device.stale_after_minutes}-minute check period.`;
  }
  if (device.operational_state === 'offline') {
    return `No update received within the ${device.offline_after_minutes}-minute offline period.`;
  }
  return `This sensor is sending updates normally (about every ${device.expected_heartbeat_cadence_minutes} minutes).`;
}
