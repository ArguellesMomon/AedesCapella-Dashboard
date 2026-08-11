import { C } from '../../constants/colors';
import EmptyState from '../../components/ui/EmptyState';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import TablePlate from '../../components/ui/TablePlate';
import {
  formatDashboardTimestamp,
  formatShortDashboardTimestamp,
  getEventPresentation,
} from '../../utils/dashboardData';

const HEADERS = ['OCCURRED', 'RECEIVED', 'SENSOR', 'ACTIVITY', 'TIME QUALITY', 'DETAIL'];
const COLUMNS = ['14%', '14%', '16%', '20%', '14%', '22%'];

function deviceLabel(deviceId, deviceLabels) {
  return deviceLabels[deviceId] || (deviceId ? deviceId.slice(0, 8) : 'Unknown device');
}

/** Recent sensor activity table with plain-language labels. */
export default function FeedTable({ events = [], deviceLabels = {}, loading = false, error = '' }) {
  if (loading) {
    return (
      <EmptyState
        title="Loading Recent Activity"
        message="Please wait while the latest sensor updates load."
        variant="startup"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Recent Activity Unavailable"
        message={error}
        action="Check your connection or ask the system administrator, then try again."
        variant="warning"
      />
    );
  }

  if (!events.length) {
    return (
      <EmptyState
        title="No Recent Activity"
        message="No sensor updates are showing right now. This does not prove that everything is okay."
        action="Open Sensor Status and check whether the sensors are reporting."
      />
    );
  }

  const ordinals = events.map(event => event.ordinal).filter(Number.isFinite);
  const ordinalRange = ordinals.length
    ? `ordinal ${Math.min(...ordinals)}–${Math.max(...ordinals)}`
    : null;

  return (
    <TablePlate
      title="Recorded Events"
      note={`${ordinalRange ? `${ordinalRange} · ` : ''}${events.length} rows held`}
      label="Event log"
      fig="FIG.01"
      headers={HEADERS}
      columns={COLUMNS}
      rows={events}
      resetScrollOn={events}
      renderRow={(event, index) => {
        const presentation = getEventPresentation(event.event_kind);
        const isNewCandidate = event.temporal_candidate && Boolean(event.live_arrival_at);

        return (
              <tr
                key={event.runtime_event_id || `${event.device_id}-${event.c3_boot}-${event.ordinal}`}
                style={{
                  boxShadow: isNewCandidate ? `inset 3px 0 var(--pd-accent)` : 'none',
                  animation: index === 0 ? 'fadeIn 0.5s ease' : 'none',
                }}
              >
                <td>
                  <Mono size="12px" color={event.occurred_at ? C.textDim : C.amber} style={{ fontWeight: 700 }} title={formatDashboardTimestamp(event.occurred_at)}>
                    {event.occurred_at ? formatShortDashboardTimestamp(event.occurred_at) : 'Unresolved'}
                  </Mono>
                </td>
                <td>
                  <Mono size="12px" color={C.textDim} title={formatDashboardTimestamp(event.received_at)}>
                    {formatShortDashboardTimestamp(event.received_at)}
                  </Mono>
                </td>
                <td>
                  <Mono size="12px" color={C.text} style={{ fontWeight: 700 }}>
                    {event.device_label || deviceLabel(event.device_id, deviceLabels)}
                  </Mono>
                </td>
                <td>
                  <Tag color={presentation.color}>{presentation.label}</Tag>
                  {event.temporal_candidate && (
                    <Mono size="11px" color={C.textDim} style={{ display: 'block', marginTop: '5px' }}>
                      {isNewCandidate ? 'newly committed candidate' : 'candidate — please review'}
                    </Mono>
                  )}
                </td>
                <td>
                  <Mono size="12px" color={event.time_quality === 'unresolved' ? C.amber : C.green} style={{ fontWeight: 700 }}>
                    {event.time_quality === 'unresolved'
                      ? 'Occurrence unresolved'
                      : event.time_quality === 'ntp' ? 'NTP time' : 'Boot-anchored time'}
                  </Mono>
                </td>
                <td style={{ maxWidth: '280px' }}>
                  <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>
                    {event.temporal_candidate
                      ? 'Validated model/temporal candidate; not a confirmed biological detection.'
                      : event.reason || 'Device-originated event recorded.'}
                  </Mono>
                </td>
              </tr>
            );
      }}
    />
  );
}
