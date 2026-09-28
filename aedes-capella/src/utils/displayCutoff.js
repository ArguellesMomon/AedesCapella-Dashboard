/*
 * The dashboard's "display from" cutoff.
 *
 * Every event before the cutoff is test or playback data and must not reach a
 * reader. The events themselves are never touched: this only decides what is
 * shown.
 *
 * The authority is public.dashboard_settings.display_from (migration
 * 202609280001). Once that migration is applied the views already exclude
 * pre-cutoff events and compute every count after the cutoff, so the only
 * work left here is dropping rows an open tab was already holding from before
 * the change (activity and candidates are merged across reconciles, not
 * replaced).
 *
 * Before the migration is applied the settings table does not exist, the
 * views return everything, and this module does the whole job: it filters the
 * lists against the fallback cutoff and recomputes every event-derived count
 * from the filtered lists. Those lists are capped (500 candidates, 500 relay
 * episodes, 100 activity rows), so the recomputed counts are exact only while
 * the post-cutoff volume stays under those caps. That is why the server-side
 * migration is the real fix and this is the stopgap.
 *
 * Heartbeat and online status are never filtered.
 */

export const DEFAULT_DISPLAY_FROM = '2026-09-29T00:00:00+08:00';

const DAY_MS = 24 * 60 * 60 * 1000;

function toMs(value) {
  if (value === null || value === undefined || value === '') return Number.NaN;
  return new Date(value).getTime();
}

function atOrAfter(value, cutoffMs) {
  const ms = toMs(value);
  return Number.isFinite(ms) && ms >= cutoffMs;
}

function maxIso(values) {
  let best = null;
  let bestMs = Number.NEGATIVE_INFINITY;
  values.forEach(value => {
    const ms = toMs(value);
    if (Number.isFinite(ms) && ms > bestMs) {
      best = value;
      bestMs = ms;
    }
  });
  return best;
}

/*
 * What the database said, or null when it could not say. `settings` is the
 * answer from fetchDisplaySettings: { available: true, displayFrom } when the
 * settings table exists, { available: false } when it does not yet.
 */
export function resolveDisplayCutoff(settings, fallbackIso = DEFAULT_DISPLAY_FROM) {
  if (settings?.available) {
    const serverMs = toMs(settings.displayFrom);
    return {
      cutoffMs: Number.isFinite(serverMs) ? serverMs : Number.NEGATIVE_INFINITY,
      serverFiltered: true,
    };
  }
  const fallbackMs = toMs(fallbackIso);
  return {
    cutoffMs: Number.isFinite(fallbackMs) ? fallbackMs : Number.NEGATIVE_INFINITY,
    serverFiltered: false,
  };
}

function filterRows(rows, cutoffMs) {
  if (!Array.isArray(rows)) return rows;
  return rows.filter(row => atOrAfter(row?.display_time, cutoffMs));
}

function countFor(rows, deviceId, timeKey, sinceMs, predicate = () => true) {
  return rows.filter(row => row?.device_id === deviceId
    && predicate(row)
    && atOrAfter(row?.[timeKey], sinceMs)).length;
}

function latestFor(rows, deviceId, timeKey, predicate = () => true) {
  return maxIso(rows
    .filter(row => row?.device_id === deviceId && predicate(row))
    .map(row => row?.[timeKey]));
}

const isActivation = relay => Boolean(relay?.recorded_relay_activation);

/*
 * Event columns on a status or map row, with anything before the cutoff
 * removed. latest_activity_at on the server is GREATEST(heartbeat, latest
 * event), so with the event hidden it falls back to the heartbeat alone, which
 * is what the migration produces too.
 */
function hideStaleEventColumns(row, cutoffMs) {
  const eventTime = row.latest_upload_or_event_at ?? row.latest_event_at;
  const next = { ...row };
  const eventVisible = atOrAfter(eventTime, cutoffMs);
  if (!eventVisible && ('latest_event_kind' in row || 'latest_upload_or_event_at' in row)) {
    if ('latest_event_at' in row) next.latest_event_at = null;
    if ('latest_event_received_at' in row) next.latest_event_received_at = null;
    if ('latest_upload_or_event_at' in row) next.latest_upload_or_event_at = null;
    if ('latest_event_time_quality' in row) next.latest_event_time_quality = null;
    if ('latest_event_kind' in row) next.latest_event_kind = null;
  }
  if ('latest_activity_at' in row && !atOrAfter(row.latest_activity_at, cutoffMs)) {
    next.latest_activity_at = row.last_seen_at ?? null;
  }
  if ('detector_last_confirmed_at' in row && !atOrAfter(row.detector_last_confirmed_at, cutoffMs)) {
    next.detector_last_confirmed_at = null;
  }
  return next;
}

function recomputeDevice(device, lists, cutoffMs, nowMs) {
  const since7d = Math.max(cutoffMs, nowMs - 7 * DAY_MS);
  return {
    ...hideStaleEventColumns(device, cutoffMs),
    candidates_last_7d: countFor(lists.candidates, device.device_id, 'display_time', since7d),
    mist_events_last_7d: countFor(lists.relays, device.device_id, 'started_at', since7d, isActivation),
  };
}

function recomputeMapDevice(device, lists, statusById, cutoffMs, nowMs) {
  const since24h = Math.max(cutoffMs, nowMs - DAY_MS);
  const since7d = Math.max(cutoffMs, nowMs - 7 * DAY_MS);
  const status = statusById.get(device.device_id);
  const next = {
    ...hideStaleEventColumns(device, cutoffMs),
    candidates_last_24h: countFor(lists.candidates, device.device_id, 'display_time', since24h),
    relay_activations_last_24h: countFor(lists.relays, device.device_id, 'started_at', since24h, isActivation),
    candidates_last_7d: countFor(lists.candidates, device.device_id, 'display_time', since7d),
  };
  if ('latest_candidate_at' in device) {
    next.latest_candidate_at = latestFor(lists.candidates, device.device_id, 'display_time');
  }
  if ('latest_relay_at' in device) {
    next.latest_relay_at = latestFor(lists.relays, device.device_id, 'started_at', isActivation);
  }
  // The map row mirrors the status row's event columns; keep them in step.
  if (status) {
    if ('latest_event_kind' in device) next.latest_event_kind = status.latest_event_kind;
    if ('latest_activity_at' in device) next.latest_activity_at = status.latest_activity_at;
  }
  return next;
}

function recomputeSummary(summary, lists, cutoffMs) {
  if (!summary) return summary;
  const windowStartMs = toMs(summary.window_start);
  const next = {
    ...summary,
    candidates_all_time: lists.candidates.length,
    relay_activations_all_time: lists.relays.filter(isActivation).length,
    latest_activity_at: maxIso(lists.activity.map(row => row.display_time)),
  };
  // A window that opens at or after the cutoff was already counted correctly
  // by the database, and its count is not capped the way the lists are.
  if (!Number.isFinite(windowStartMs) || windowStartMs < cutoffMs) {
    const since = Number.isFinite(windowStartMs) ? Math.max(windowStartMs, cutoffMs) : cutoffMs;
    next.candidates_in_window = lists.candidates
      .filter(row => atOrAfter(row.display_time, since)).length;
    next.relay_activations_in_window = lists.relays
      .filter(row => isActivation(row) && atOrAfter(row.started_at, since)).length;
    next.events_in_window = lists.activity
      .filter(row => atOrAfter(row.display_time, since)).length;
  }
  return next;
}

/*
 * The dashboard state as a reader may see it. Pure: the same state, cutoff
 * and clock always give the same answer.
 */
export function applyDisplayCutoff(state, { cutoffMs, serverFiltered }, nowMs = Date.now()) {
  if (!Number.isFinite(cutoffMs)) return state;

  const lists = {
    activity: filterRows(state.activity || [], cutoffMs),
    candidates: filterRows(state.candidates || [], cutoffMs),
    relays: filterRows(state.relays || [], cutoffMs),
  };
  const filtered = { ...state, ...lists };
  if (serverFiltered) return filtered;

  const devices = (state.devices || []).map(device => recomputeDevice(device, lists, cutoffMs, nowMs));
  const statusById = new Map(devices.map(device => [device.device_id, device]));
  return {
    ...filtered,
    devices,
    mapDevices: (state.mapDevices || [])
      .map(device => recomputeMapDevice(device, lists, statusById, cutoffMs, nowMs)),
    activitySummary: recomputeSummary(state.activitySummary, lists, cutoffMs),
  };
}
