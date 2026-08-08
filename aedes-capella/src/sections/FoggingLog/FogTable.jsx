import { C } from '../../constants/colors';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { formatDashboardTimestamp } from '../../utils/dashboardData';

const HEADERS = ['WHEN', 'SENSOR', 'LENGTH', 'MATCH STRENGTH', 'HOW STARTED', 'WAIT TIME', 'NOTES'];

/** Fogging history with simple labels for barangay workers. */
export default function FogTable({ fogs = [], deviceLabels = {}, loading = false, error = '' }) {
  if (loading) {
    return <EmptyState title="Loading fogging history" message="Please wait while the latest fogging information loads." variant="startup" />;
  }

  if (error) {
    return <EmptyState title="Fogging history unavailable" message={error} action="Check your connection or ask the system administrator, then try again." variant="warning" />;
  }

  if (!fogs.length) {
    return (
      <EmptyState
        title="No fogging recorded"
        message="No fogging action is saved here right now."
        action="This does not prove what happened outside the system. Ask the field team if you need to confirm an action."
      />
    );
  }

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.surface2 }}>
              {HEADERS.map(header => (
                <th key={header} style={{
                  padding:       '12px 16px',
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
            {fogs.map((fog, index) => (
              <tr key={fog.fogging_id} style={{
                background:   index % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                borderBottom: `1px solid ${C.border}22`,
              }}>
                <td style={{ padding: '11px 16px' }}>
                  <Mono size="12px" color={C.textDim} title={formatDashboardTimestamp(fog.triggered_at)}>
                    {formatDashboardTimestamp(fog.triggered_at)}
                  </Mono>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>
                    {deviceLabels[fog.device_id] || fog.device_id?.slice(0, 8) || 'Unknown sensor'}
                  </Mono>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>{fog.duration_seconds ?? '—'} seconds</Mono>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>
                    {fog.trigger_confidence === null || fog.trigger_confidence === undefined ? '—' : `${fog.trigger_confidence}%`}
                  </Mono>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <Tag color={fog.trigger_source === 'automatic' ? 'amber' : 'blue'}>{fog.trigger_source === 'automatic' ? 'Automatic' : 'Manual'}</Tag>
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <Tag color={fog.cooldown_applied ? 'green' : 'gray'}>{fog.cooldown_applied ? 'Applied' : 'Not stated'}</Tag>
                </td>
                <td style={{ padding: '11px 16px', maxWidth: '280px' }}>
                  <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>{fog.notes || 'No notes.'}</Mono>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
