import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';

export default function FogSummaryCards({ relays = [] }) {
  const activations = relays.filter(relay => relay.recorded_relay_activation).length;
  const stopped = relays.filter(relay => relay.relay_status === 'stopped').length;
  const rejected = relays.filter(relay => relay.relay_status === 'rejected').length;
  const unresolved = relays.filter(relay => relay.relay_status === 'started').length;
  const summary = [
    { label: 'Recorded activations', value: activations, note: 'Saved RELAY_ON evidence', color: activations ? 'amber' : 'gray' },
    { label: 'Stops recorded', value: stopped, note: 'Paired RELAY_OFF evidence', color: stopped ? 'green' : 'gray' },
    { label: 'Rejected requests', value: rejected, note: 'Relay did not start', color: rejected ? 'red' : 'gray' },
    { label: 'Started, no stop row', value: unresolved, note: 'Needs record review', color: unresolved ? 'red' : 'gray' },
  ];

  return (
    <div className="metric-card-grid">
      {summary.map(item => (
        <Card key={item.label} style={{ background: C.surface2, padding: '16px' }}>
          <Tag color={item.color}>{item.value ? 'Recorded' : 'No rows'}</Tag>
          <div className="metric-card-label">{item.label}</div>
          <div className="metric-card-value">{item.value}</div>
          <div className="metric-card-note">{item.note}</div>
        </Card>
      ))}
    </div>
  );
}
