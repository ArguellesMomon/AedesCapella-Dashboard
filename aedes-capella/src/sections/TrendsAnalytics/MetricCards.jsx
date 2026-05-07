import { AlertTriangle } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';

const METRICS = [
  {
    label: 'Highest Risk Sitio',
    value: 'Purok Uno',
    sub: '47 detections today',
    color: C.red,
    priority: true,
    status: 'Critical',
    statusColor: 'red',
    note: 'Inspect now',
  },
  {
    label: 'Weekly Detections',
    value: '385',
    sub: '+18% vs last week',
    color: C.text,
    status: 'Rising',
    statusColor: 'amber',
  },
  {
    label: 'Peak Detection Hour',
    value: '10:00-11:00',
    sub: '22 detections',
    color: C.text,
    status: 'Review',
    statusColor: 'blue',
  },
  {
    label: 'Model Confidence',
    value: '93.2%',
    sub: 'High - edge classifier',
    color: C.text,
    status: 'High',
    statusColor: 'amber',
  },
];

/** Analytics summary cards with the intervention-critical metric emphasized. */
export default function MetricCards() {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: '1.35fr repeat(3, 1fr)',
      gap:                 '14px',
      marginBottom:        '24px',
    }}>
      {METRICS.map(({ label, value, sub, color, priority, note, status, statusColor }) => (
        <Card
          key={label}
          style={{
            background: priority
              ? `linear-gradient(135deg, ${C.redDim}, ${C.surface2} 72%)`
              : C.surface2,
            border: priority ? `1px solid ${C.red}66` : `1px solid ${C.border}`,
            padding: priority ? '18px' : '16px',
            boxShadow: priority ? `0 18px 34px ${C.redDim}66` : C.shadow,
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <Tag color={statusColor}>{status}</Tag>
            {priority && <AlertTriangle size={18} color={C.red} />}
          </div>

          <div style={{
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '10px',
            color:         C.textDim,
            marginBottom:  '10px',
            letterSpacing: '0.05em',
          }}>
            {label}
          </div>

          <div style={{
            fontFamily:   'IBM Plex Mono, monospace',
            fontSize:     priority ? '28px' : '18px',
            color,
            fontWeight:   700,
            marginBottom: '4px',
            lineHeight:   1,
          }}>
            {value}
          </div>

          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '10px',
            color:      C.textDim,
          }}>
            {sub}
          </div>

          {priority && (
            <div style={{ marginTop: '12px' }}>
              <Tag color="red">{note}</Tag>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
