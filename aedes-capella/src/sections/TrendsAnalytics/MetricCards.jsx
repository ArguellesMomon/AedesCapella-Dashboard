import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';

const METRICS = [
  { label: 'Total Detections This Week', value: '385',          sub: '+18% vs last week',  color: C.amber },
  { label: 'Peak Detection Hour',        value: '10:00–11:00',  sub: '22 detections',       color: C.blue  },
  { label: 'Highest Risk Sitio',         value: 'Puting Bato',  sub: '47 detections',       color: C.red   },
  { label: 'Model Accuracy',             value: '93.2%',        sub: '1D-CNN · Edge',       color: C.green },
];

/** Four analytics summary metric cards at the top of the Trends section. */
export default function MetricCards() {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap:                 '14px',
      marginBottom:        '24px',
    }}>
      {METRICS.map(({ label, value, sub, color }) => (
        <Card key={label} style={{ background: C.surface2, padding: '16px' }}>
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
            fontSize:     '18px',
            color,
            fontWeight:   700,
            marginBottom: '4px',
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
        </Card>
      ))}
    </div>
  );
}