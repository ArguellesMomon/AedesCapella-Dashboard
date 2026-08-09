import { createElement } from 'react';
import { Activity, Clock3, Droplets, Radio } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import { buildRuntimeSummary, formatDashboardTimestamp } from '../../utils/dashboardData';

function Metric({ icon, label, value, tone = C.text, note }) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: '8px',
      padding: '14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
        {createElement(icon, { size: 14, color: tone })}
        <Mono size="11px" color={C.textDim}>{label}</Mono>
      </div>
      <Mono size="22px" color={tone} style={{ fontWeight: 700 }}>{value}</Mono>
      {note && <Mono size="11px" color={C.textDim} style={{ display: 'block', marginTop: '5px' }}>{note}</Mono>}
    </div>
  );
}

export default function ActivitySummary({ events }) {
  const summary = buildRuntimeSummary(events);

  return (
    <Card style={{ marginBottom: '20px', background: C.surface2 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={15} color={C.blue} />
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 700, color: C.text }}>
            Quick summary
          </div>
        </div>
        <Tag color="blue">device-originated rows</Tag>
      </div>

      <div className="info-grid info-grid-four">
        <Metric icon={Activity} label="Activities listed" value={summary.total} tone={C.blue} note={`${summary.last24h} in the last 24 hours`} />
        <Metric icon={Radio} label="Possible matches" value={summary.candidateCount} tone={C.amber} note="Please review before action" />
        <Metric icon={Droplets} label="Relay activations" value={summary.relayCount} tone={C.red} note="Recorded event; delivery not proven" />
        <Metric icon={Clock3} label="Time not confirmed" value={summary.unresolvedCount} tone={summary.unresolvedCount ? C.amber : C.green} note={summary.latestAt ? `latest ${formatDashboardTimestamp(summary.latestAt)}` : 'no recent activity'} />
      </div>
    </Card>
  );
}
