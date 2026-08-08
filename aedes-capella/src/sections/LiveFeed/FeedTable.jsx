import { useEffect, useRef } from 'react';
import { C } from '../../constants/colors';
import EmptyState from '../../components/ui/EmptyState';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import {
  formatDashboardTimestamp,
  formatShortDashboardTimestamp,
  getEventPresentation,
} from '../../utils/dashboardData';

const HEADERS = ['WHEN', 'SENSOR', 'ACTIVITY', 'TIME CHECK', 'NOTE'];

function deviceLabel(deviceId, deviceLabels) {
  return deviceLabels[deviceId] || (deviceId ? deviceId.slice(0, 8) : 'Unknown device');
}

/** Recent sensor activity table with plain-language labels. */
export default function FeedTable({ events = [], deviceLabels = {}, loading = false, error = '' }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [events]);

  if (loading) {
    return (
      <EmptyState
        title="Loading recent activity"
        message="Please wait while the latest sensor updates load."
        variant="startup"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Recent activity unavailable"
        message={error}
        action="Check your connection or ask the system administrator, then try again."
        variant="warning"
      />
    );
  }

  if (!events.length) {
    return (
      <EmptyState
        title="No recent activity"
        message="No sensor updates are showing right now. This does not prove that everything is okay."
        action="Open Sensor Status and check whether the sensors are reporting."
      />
    );
  }

  return (
    <div
      ref={feedRef}
      style={{
        maxHeight:      '430px',
        overflowY:      'auto',
        marginBottom:   '24px',
        scrollbarWidth: 'thin',
        scrollbarColor: `${C.border} transparent`,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <tr style={{ background: C.surface2 }}>
            {HEADERS.map(header => (
              <th key={header} style={{
                padding:       '10px 14px',
                textAlign:     'left',
                fontFamily:    'IBM Plex Mono, monospace',
                fontSize:      '12px',
                color:         C.textDim,
                fontWeight:    600,
                letterSpacing: '0.08em',
                borderBottom:  `1px solid ${C.border}`,
                whiteSpace:    'nowrap',
              }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            const presentation = getEventPresentation(event.event_kind);
            const timeLabel = formatShortDashboardTimestamp(event.display_time);

            return (
              <tr
                key={event.runtime_event_id || `${event.device_id}-${event.c3_boot}-${event.ordinal}`}
                style={{
                  background: index % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                  borderBottom: `1px solid ${C.border}22`,
                  animation: index === 0 ? 'fadeIn 0.5s ease' : 'none',
                }}
              >
                <td style={{ padding: '10px 14px' }}>
                  <Mono size="12px" color={C.textDim} style={{ fontWeight: 700 }} title={formatDashboardTimestamp(event.display_time)}>
                    {timeLabel}
                  </Mono>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <Mono size="12px" color={C.text} style={{ fontWeight: 700 }}>
                    {deviceLabel(event.device_id, deviceLabels)}
                  </Mono>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <Tag color={presentation.color}>{presentation.label}</Tag>
                  {event.temporal_candidate && (
                    <Mono size="11px" color={C.textDim} style={{ display: 'block', marginTop: '5px' }}>
                      possible match — please review
                    </Mono>
                  )}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <Mono size="12px" color={event.time_quality === 'unresolved' ? C.amber : C.green} style={{ fontWeight: 700 }}>
                    {event.time_quality === 'unresolved' ? 'Time not confirmed' : 'Time confirmed'}
                  </Mono>
                </td>
                <td style={{ padding: '10px 14px', maxWidth: '280px' }}>
                  <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>
                    {event.temporal_candidate ? 'Please review this possible mosquito match.' : 'Sensor update recorded.'}
                  </Mono>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
