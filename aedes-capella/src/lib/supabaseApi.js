const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && anonKey);

function normalizeSession(payload) {
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Date.now() + payload.expires_in * 1000,
    user: { id: payload.user.id, email: payload.user.email },
  };
}

async function request(path, { accessToken, body, method = 'GET', signal } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured for this dashboard.');
  }

  const response = await fetch(`${supabaseUrl}${path}`, {
    method,
    signal,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.msg || payload?.message || payload?.error_description || payload?.error;
    throw new Error(message || `Supabase request failed (${response.status}).`);
  }

  return payload;
}

export async function signInWithPassword(email, password) {
  const payload = await request('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: { email, password },
  });

  return normalizeSession(payload);
}

export async function refreshOperatorSession(refreshToken) {
  const payload = await request('/auth/v1/token?grant_type=refresh_token', {
    method: 'POST',
    body: { refresh_token: refreshToken },
  });
  return normalizeSession(payload);
}

export async function signOut(accessToken) {
  await request('/auth/v1/logout', { method: 'POST', accessToken });
}

export async function fetchDeviceStatus(accessToken, signal) {
  const columns = [
    'device_id', 'device_label', 'last_seen_at', 'has_ever_reported',
    'heartbeat_state', 'operational_state', 'is_online', 'log_healthy',
    'relay_safe_high', 'wifi_rssi_dbm', 'uptime_ms', 'heartbeat_age_seconds',
    'expected_heartbeat_cadence_minutes', 'stale_after_minutes',
    'offline_after_minutes', 'latest_event_at', 'latest_event_received_at',
    'latest_upload_or_event_at', 'latest_event_time_quality', 'latest_event_kind',
    'latest_activity_at', 'needs_attention', 'mist_events_last_7d',
    'candidates_last_7d',
  ].join(',');

  return request(`/rest/v1/dashboard_device_status?select=${columns}&order=device_label.asc`, {
    accessToken,
    signal,
  });
}

export async function fetchRuntimeActivity(accessToken, signal) {
  const columns = [
    'runtime_event_id', 'device_id', 'display_time', 'time_quality',
    'event_kind', 'source_boot', 'source_sequence', 'bag_index',
    'p_aedes', 'p_other_mosquito', 'p_background_noise',
    'temporal_candidate', 'relay_energized', 'reason', 'c3_boot', 'ordinal',
  ].join(',');

  return request(`/rest/v1/dashboard_c3_activity?select=${columns}&order=display_time.desc&limit=500`, {
    accessToken,
    signal,
  });
}

export async function fetchDetectionRecords(accessToken, signal) {
  const columns = [
    'detection_id', 'device_id', 'detected_at', 'classification_label',
    'confidence_score', 'detection_count', 'audio_window_ms',
    'inference_latency_ms', 'model_version',
  ].join(',');

  return request(`/rest/v1/detection_records?select=${columns}&order=detected_at.desc&limit=500`, {
    accessToken,
    signal,
  });
}

export async function fetchFoggingEvents(accessToken, signal) {
  const columns = [
    'fogging_id', 'device_id', 'triggered_at', 'duration_seconds',
    'trigger_confidence', 'cooldown_applied', 'trigger_source', 'notes',
    'created_at',
  ].join(',');

  return request(`/rest/v1/fogging_events?select=${columns}&order=triggered_at.desc&limit=500`, {
    accessToken,
    signal,
  });
}

export async function fetchLocationActivity(accessToken, signal) {
  const columns = [
    'location_id', 'location_name', 'barangay_name', 'area_type',
    'devices_total', 'devices_online', 'detections_last_24h',
    'fogging_events_last_24h', 'latest_detection_at', 'latest_fogging_at',
    'latest_device_seen_at',
  ].join(',');

  return request(`/rest/v1/v_location_activity_24h?select=${columns}&order=location_name.asc`, {
    accessToken,
    signal,
  });
}
