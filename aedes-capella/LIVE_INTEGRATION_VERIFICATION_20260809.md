# Live integration verification — 2026-08-09

## Disposition

The dashboard code and live Supabase data contract are integrated. This is not
a physical device-to-screen pass: no new C3-originated event was uploaded and
observed in an authenticated browser during this work.

## Backend deployment

- Confirmed project: `aedescapella-monitoring` (`bmeyddnwnmumjdlzpsny`).
- Applied `supabase/migrations/202608090001_dashboard_live_integration.sql`
  through the existing authenticated SQL workflow after an unchanged
  rollback-only execution succeeded.
- Re-ran the unchanged file rollback-only after deployment; it succeeded again,
  confirming idempotence against its own deployed objects.
- The project still has no Supabase migration ledger; deployment was manual,
  matching the established project workflow.
- No device/event row was inserted, updated, or deleted.

Post-apply catalog/data results:

| Check | Result |
|---|---:|
| `dashboard_runtime_activity` rows | 100 |
| `dashboard_candidate_activity` rows | 11 |
| `dashboard_relay_activity` episodes | 11 |
| `dashboard_device_map` rows | 2 |
| Unmapped device rows | 2 |
| Required `supabase_realtime` tables | 4 / 4 |
| Security-invoker dashboard views | 5 / 5 |
| Authenticated view SELECT grants | 5 / 5 |
| Anon view SELECT grants | 0 |
| Authenticated Realtime-table SELECT grants | 4 / 4 |
| Anon Realtime-table SELECT grants | 0 |

Publishable-key HTTP probes returned 401 for `devices`,
`edge_c3_runtime_events`, `device_health_heartbeat`, and all four new dashboard
views. No key or response body was printed.

## Realtime contract

The authenticated channel subscribes to:

- `INSERT public.edge_c3_runtime_events`
- `INSERT/UPDATE public.device_health_heartbeat`
- `INSERT/UPDATE public.devices`
- `INSERT/UPDATE public.locations`

Notifications invalidate targeted safe-view rows. Activity is deduplicated by
`runtime_event_id`, candidates by `candidate_event_id`, relay episodes by
`relay_episode_key`, and devices/map entries by `device_id`. Full
reconciliation remains active every 30 seconds and on focus/network recovery.
Logout unmounts and removes the authenticated channel.

## Local verification

- `npm.cmd test`: PASS, 13/13.
- `npm.cmd run lint`: PASS, zero findings.
- `npm.cmd run build`: PASS, Vite 8.2.1 production build.
- `git diff --check`: PASS.
- Authenticated browser: PASS, Supabase Realtime showed `Live` with 100 runtime
  rows, 11 candidate rows, and 11 relay activations.
- C3 bench firmware: PASS from the short `tmp/b3live` build path; application
  and bootloader images compiled and linked without flashing hardware.

Deterministic tests cover initial hydration, a Realtime candidate insert,
duplicate notification, heartbeat/logging-fault replacement, socket loss plus
polling reconciliation, relay pairing/duration, chronological zero-filled
Asia/Manila buckets, and mapped/unmapped coordinate filtering.

## Current backend truth and blockers

- `aedescapella-unit-1`: `offline`, logging healthy, relay-safe-high reported,
  11 candidate rows and 11 recorded relay activations.
- Its last heartbeat is `2026-08-09 09:23:33 PHT`. It was initially `stale`
  after 45 minutes and became `offline` after the configured 90-minute limit.
- A read-only COM3 observation reproduced 13 consecutive ESP-IDF reason 201
  (`WIFI_REASON_NO_AP_FOUND`) failures in one 45-second window. The configured
  network is a phone hotspot and was not visible during the check. The device
  is powered and running; the physical blocker is AP availability or replacement
  Wi-Fi credentials, not Supabase or the dashboard.
- `unit-2`: `never_seen`, zero candidate/relay rows. The original `node-001`
  row was renamed in place through the supplied application-admin account;
  its device UUID and audit relationships were preserved. The guarded forward
  migration is recorded at
  `supabase/migrations/202608090002_rename_backup_device_unit2.sql`.
- Both configured locations have null coordinates. The UI therefore shows both
  under **Location not mapped** and plots no fake marker.
- Authenticated live/offline and unmapped screenshots were captured in
  `live_integration_evidence/`. No logging-fault screenshot was fabricated
  because the real device currently reports logging healthy.
- Backend-commit-to-visible-row latency was not measured because no new
  device-originated commit was available. It must not be reported as meeting
  the under-two-second target.
- Physical device-to-screen remains **BLOCKED** until the C3 associates with
  Wi-Fi, commits a new device-originated event, and that exact event is observed
  on screen with occurrence, receipt, and display timestamps.

## Claim boundary and secrets

This result is a locally verified build with a deployed backend contract. It is
not a physical end-to-end or field-readiness claim. Firmware logs whether the
heartbeat RPC committed or failed. The ignored local firmware secrets now
target the newly supplied Wi-Fi network (including its trailing SSID period),
and the application image rebuilt successfully with 64% of the app partition
free. It was not flashed, so the physical C3 is still running the old network
configuration and the serial Wi-Fi checker must remain red until a post-flash
association and backend commit are observed.

No service-role key, password, bearer token, or env value was committed. During
the follow-up diagnosis, one terminal inspection unintentionally emitted the
existing per-device ingest token in local tool output. It is not repeated here,
but it must be rotated through a project-owner SQL operation before field use.
The application `admin` role cannot read or update the protected token table;
that RLS denial was verified. A matching replacement credential and firmware
image are prepared locally, and
`supabase/migrations/202608090003_admin_rotate_device_ingest_token.sql` both
performs the one-time Unit 1 hash rotation and adds a narrow application-admin
RPC for future rotations. COM3 must not be flashed with the replacement image
until that migration succeeds, or ingestion would fail by construction.
