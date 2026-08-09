# AedesCapella operator dashboard

React/Vite dashboard for authenticated AedesCapella operations. One shared live
store reads the safe `dashboard_*` views and listens for authorized changes to
the RLS-protected C3 event, heartbeat, device, and location tables. A 30-second
REST reconciliation, focus refresh, and network-recovery refresh remain active
when websocket notifications are missed. The publishable key alone cannot read
operational tables or views.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project's
   publishable configuration. Never use a service-role key in a Vite app.
3. Install and run:

   ```sh
   npm install
   npm run dev
   ```

4. Sign in with an existing Supabase Auth operator account.

On Windows PowerShell, if the `npm` script shim is misconfigured, use the same
npm CLI through `npm.cmd` (for example, `npm.cmd ci` and `npm.cmd run dev`).

The app stores the active access token in session storage, removes it at logout,
and does not ship demo credentials. A valid authenticated account is required to
read the status view.

## Verification

```sh
npm test
npm run lint
npm run build
```

The Sensor Status screen distinguishes `never_seen`, `online`, `stale`,
`offline`, and `logging_fault`; shows the canonical UUID, heartbeat, logging
health, latest upload/event and time quality; and labels candidate counts as
model outputs rather than biological detections.

The operational sections use only device-originated data:

- Latest Sensor Activity reads `dashboard_runtime_activity`; `LIVE_ACCEPT` is a
  validated temporal/model candidate, never a confirmed biological detection.
- Recorded Relay History pairs C3 relay evidence from
  `dashboard_relay_activity`. A saved relay command/event does not prove fluid
  delivery.
- Activity Summary uses candidate and runtime rows with explicit chronological
  zero-filled buckets in `Asia/Manila`.
- Live Device Map plots only valid coordinates from `dashboard_device_map`.
  Null or invalid coordinates remain in an explicit unmapped list.
- The top bar shows `Live`, `Reconnecting`, or `Polling fallback` separately
  from device health, plus the last complete reconciliation.

Empty, stale or unavailable reads remain visible; the UI does not substitute the
old demo datasets for authenticated backend data.

The database contract is defined by
`supabase/migrations/202608090001_dashboard_live_integration.sql` in the shared
project root. It creates the authenticated security-invoker views and adds only
`edge_c3_runtime_events`, `device_health_heartbeat`, `devices`, and `locations`
to `supabase_realtime`.

## Git workflow

The recommended local remotes are:

- `origin`: your writable fork, `bmsj23/AedesCapella-Dashboard`
- `upstream`: `ArguellesMomon/AedesCapella-Dashboard`

Develop on a `codex/…` feature branch, periodically fetch and rebase or merge
from `upstream`, and push only to `origin` before opening a pull request back to
the original repository.
