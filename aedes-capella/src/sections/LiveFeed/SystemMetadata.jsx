import { Cpu } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';

const METADATA = [
  ['How sound is checked', 'Inside the sensor', 'The sensor checks sound before sending an update.'],
  ['Typical sound range', '400–600 cycles/second', 'The expected sound range for the mosquito being watched.'],
  ['When fogging can start', 'After a strong match', 'Fogging follows the project’s safety rules.'],
  ['Fogging length', 'A few seconds', 'Each automatic fogging action is short.'],
  ['Waiting time', '5 minutes', 'Prevents repeated fogging too close together.'],
  ['Works without internet', 'Yes', 'The sensor can check sound even when the connection is unavailable.'],
];

/** Displays static system configuration metadata below the detection feed. */
export default function SystemMetadata() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '9px' }}>
        <Cpu size={16} color={C.textDim} />
        <span style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '16px',
          fontWeight:    700,
          color:         C.textDim,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          How the system works
        </span>
      </div>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '12px',
      }}>
        {METADATA.map(([key, value, help]) => (
          <div
            key={key}
            title={help}
            style={{
              padding:      '14px',
              background:   C.surface,
              borderRadius: '8px',
              border:       `1px solid ${C.border}`,
              cursor:       'help',
            }}
          >
            <div style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '12px',
              color:         C.textDim,
              marginBottom:  '8px',
              letterSpacing: '0.05em',
            }}>
              {key}
            </div>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize:   '14px',
              color:      C.text,
              fontWeight: 700,
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
