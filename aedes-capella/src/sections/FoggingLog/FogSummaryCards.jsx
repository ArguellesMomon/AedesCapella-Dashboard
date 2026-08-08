import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';

/** Four summary metric cards shown at the top of the Fogging Log section. */
export default function FogSummaryCards({ fogging = [], deviceLabels = {}, asOf }) {
  const since24h = asOf ? asOf - (24 * 60 * 60 * 1000) : Number.POSITIVE_INFINITY;
  const recent = fogging.filter(event => new Date(event.triggered_at).getTime() >= since24h);
  const scores = fogging.map(event => Number(event.trigger_confidence)).filter(Number.isFinite);
  const averageScore = scores.length
    ? `${(scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)}%`
    : '—';
  const latest = fogging[0];
  const summary = [
    { label: 'Fogging in last 24 hours', value: String(recent.length), status: recent.length ? 'Recorded' : 'No records', color: recent.length ? 'amber' : 'gray' },
    { label: 'All fogging records', value: String(fogging.length), status: fogging.length ? 'Available' : 'No records', color: fogging.length ? 'blue' : 'gray' },
    { label: 'Average match strength', value: averageScore, status: scores.length ? 'Available' : 'No records', color: scores.length ? 'blue' : 'gray' },
    { label: 'Last sensor to fog', value: latest ? (deviceLabels[latest.device_id] || latest.device_id?.slice(0, 8) || 'Unknown') : '—', status: latest ? 'Review' : 'No records', color: latest ? 'green' : 'gray' },
  ];

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap:                 '14px',
      marginBottom:        '24px',
    }}>
      {summary.map(({ label, value, status, color }) => (
        <Card key={label} style={{ background: C.surface2, padding: '16px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Tag color={color}>{status}</Tag>
          </div>
          <div style={{
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '12px',
            color:         C.textDim,
            marginBottom:  '8px',
            letterSpacing: '0.05em',
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '18px',
            color:      C.text,
            fontWeight: 700,
          }}>
            {value}
          </div>
        </Card>
      ))}
    </div>
  );
}
