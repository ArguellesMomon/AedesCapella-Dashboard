import { C } from '../../constants/colors';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import EmptyState from '../../components/ui/EmptyState';
import TablePlate from '../../components/ui/TablePlate';
import {
  candidateScorePercent,
  formatDashboardTimestamp,
  formatRelayStatus,
} from '../../utils/dashboardData';

const HEADERS = ['LATEST EVENT', 'SENSOR', 'STATUS', 'DURATION', 'CANDIDATE SCORE', 'SOURCE', 'EVIDENCE NOTE'];
const COLUMNS = ['14%', '12%', '14%', '10%', '14%', '14%', '22%'];

export default function FogTable({ relays = [], loading = false, error = '' }) {
  if (loading) return <EmptyState title="Loading Relay History" message="Reading saved C3 relay events." variant="startup" />;
  if (error) return <EmptyState title="Relay History Unavailable" message={error} action="Polling will retry in 30 seconds." variant="warning" />;
  if (!relays.length) {
    return <EmptyState title="No Relay Episodes Recorded" message="No relay command/event is visible in the backend. This does not prove that no physical event occurred." />;
  }

  const episodes = relays.length;
  const started = relays.filter(relay => relay.recorded_relay_activation).length;

  return (
    <TablePlate
      title="Relay Episodes"
      note={`${episodes} episodes held · ${started} with a recorded activation`}
      label="Relay log"
      fig="FIG.03"
      headers={HEADERS}
      columns={COLUMNS}
      rows={relays}
      resetScrollOn={relays}
      renderRow={relay => {
        const score = candidateScorePercent(relay);

        return (
          <tr key={relay.relay_episode_key}>
            <td><Mono size="12px" color={C.textDim}>{formatDashboardTimestamp(relay.display_time)}</Mono></td>
            <td><Mono size="12px" color={C.text} style={{ fontWeight: 700 }}>{relay.device_label}</Mono></td>
            <td><Tag color={relay.relay_status === 'rejected' ? 'red' : relay.relay_status === 'stopped' ? 'green' : 'amber'}>{formatRelayStatus(relay.relay_status)}</Tag></td>
            <td><Mono size="12px">{relay.duration_seconds === null ? 'Not established' : `${Number(relay.duration_seconds).toFixed(1)} s`}</Mono></td>
            <td><Mono size="12px">{score === null ? 'Not available' : `${score.toFixed(1)}%`}</Mono></td>
            <td><Mono size="11px" color={C.textDim}>boot {relay.source_boot} · seq {relay.source_sequence}</Mono></td>
            <td><Mono size="11px" color={C.textDim}>{relay.rejection_reason || 'Saved relay evidence; physical delivery not confirmed.'}</Mono></td>
          </tr>
        );
      }}
    />
  );
}
