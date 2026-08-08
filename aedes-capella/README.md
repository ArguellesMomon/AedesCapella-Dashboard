# AedesCapella operator dashboard

React/Vite dashboard for authenticated AedesCapella operations. Device health is
read from the Supabase `dashboard_device_status` view, while runtime activity,
stored classifier records, fogging history and 24-hour location summaries are
read from their authenticated views/tables. The publishable key alone cannot
read operational tables or views.

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

The Node Management screen distinguishes `never_seen`, `online`, `stale`,
`offline`, and `logging_fault`; shows the canonical UUID, heartbeat, logging
health, latest upload/event and time quality; and labels candidate counts as
model outputs rather than biological detections.

The remaining sections now preserve the same boundary:

- Live Backend Activity reads `dashboard_c3_activity` and excludes raw payloads.
  Temporal candidates are explicitly not confirmed biological detections.
- Fogging Log reads `fogging_events`; an empty table means no stored actuator
  record, not proof that no physical pulse occurred.
- Runtime Analytics uses engineering-event rows and stored classifier rows in
  separate metrics and charts.
- Risk Map shows `v_location_activity_24h` as the live location summary. The
  polygon drawing is reference geometry until live locations are mapped to it.

Empty, stale or unavailable reads remain visible; the UI does not substitute the
old demo datasets for authenticated backend data.

## Git workflow

The recommended local remotes are:

- `origin`: your writable fork, `bmsj23/AedesCapella-Dashboard`
- `upstream`: `ArguellesMomon/AedesCapella-Dashboard`

Develop on a `codex/…` feature branch, periodically fetch and rebase or merge
from `upstream`, and push only to `origin` before opening a pull request back to
the original repository.
