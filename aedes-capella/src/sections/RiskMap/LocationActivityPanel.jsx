import { Database, MapPin } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Mono from '../../components/ui/Mono';
import { formatDashboardTimestamp } from '../../utils/dashboardData';

function ActivityCell({ label, value, tone = C.text }) {
  return (
    <div style={{ minWidth: '110px' }}>
      <Mono size="11px" color={C.textDim}>{label}</Mono>
      <Mono size="15px" color={tone} style={{ display: 'block', marginTop: '4px', fontWeight: 700 }}>{value}</Mono>
    </div>
  );
}

/** Recent location activity with simple labels. */
export default function LocationActivityPanel({ locations = [], loading = false, error = '' }) {
  if (loading) {
    return <EmptyState title="Loading location activity" message="Please wait while the latest area information loads." variant="startup" />;
  }

  if (error) {
    return <EmptyState title="Location information unavailable" message={error} action="Check your connection or ask the system administrator, then try again." variant="warning" />;
  }

  if (!locations.length) {
    return <EmptyState title="No location information yet" message="No recent area information is available right now." action="Ask the system administrator to check the location setup." />;
  }

  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={15} color={C.blue} />
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, color: C.text }}>
            Recent location activity · 24 hours
          </div>
        </div>
        <Mono size="11px" color={C.textDim}>{locations.length} location{locations.length === 1 ? '' : 's'}</Mono>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {locations.map(location => (
          <div key={location.location_id} style={{
            border: `1px solid ${C.border}`,
            background: C.surface,
            borderRadius: '8px',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
              <MapPin size={13} color={C.blue} />
              <Mono size="14px" color={C.text} style={{ fontWeight: 700 }}>{location.location_name}</Mono>
              <Mono size="11px" color={C.textDim}>{location.barangay_name}</Mono>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <ActivityCell label="Mosquito reports" value={location.detections_last_24h ?? 0} tone={location.detections_last_24h ? C.amber : C.textDim} />
              <ActivityCell label="Fogging" value={location.fogging_events_last_24h ?? 0} tone={location.fogging_events_last_24h ? C.amber : C.textDim} />
              <ActivityCell label="Sensors working" value={`${location.devices_online ?? 0} / ${location.devices_total ?? 0}`} tone={location.devices_online ? C.green : C.textDim} />
              <ActivityCell label="Last report" value={location.latest_detection_at ? formatDashboardTimestamp(location.latest_detection_at) : '—'} />
              <ActivityCell label="Last fogging" value={location.latest_fogging_at ? formatDashboardTimestamp(location.latest_fogging_at) : '—'} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
