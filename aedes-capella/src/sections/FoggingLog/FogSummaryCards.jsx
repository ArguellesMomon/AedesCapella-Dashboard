import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';

const SUMMARY = [
  { label: 'Auto-Fogs Today', value: '13', status: 'Active', color: 'amber' },
  { label: 'Fluid Remaining', value: '68%', status: 'Enough', color: 'green' },
  { label: 'Avg. Trigger Confidence', value: '90.2%', status: 'High', color: 'amber' },
  { label: 'Last Fog Event', value: 'NODE-01 - Purok Uno', status: 'Review', color: 'blue' },
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
      {SUMMARY.map(({ label, value, status, color }) => (
        <Card key={label} style={{ background: C.surface2, padding: '16px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Tag color={color}>{status}</Tag>
          </div>
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
            color:      C.text,
            fontWeight: 600,
          }}>
            {value}
          </div>
        </Card>
      ))}
    </div>
  );
}
