import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';

const SUMMARY = [
  { label: 'Total Auto-Fogs Today', value: '13',                      color: C.amber },
  { label: 'Fluid Remaining',        value: '68%',                     color: C.green },
  { label: 'Avg. Trigger Confidence',value: '90.2%',                   color: C.blue  },
  { label: 'Last Fog Event',         value: 'NODE-01 · Puting Bato',   color: C.text  },
];

/** Four summary metric cards shown at the top of the Fogging Log section. */
export default function FogSummaryCards() {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap:                 '14px',
      marginBottom:        '24px',
    }}>
      {SUMMARY.map(({ label, value, color }) => (
        <Card key={label} style={{ background: C.surface2, padding: '16px' }}>
          <div style={{
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '10px',
            color:         C.textDim,
            marginBottom:  '8px',
            letterSpacing: '0.05em',
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '16px',
            color,
            fontWeight: 600,
          }}>
            {value}
          </div>
        </Card>
      ))}
    </div>
  );
}