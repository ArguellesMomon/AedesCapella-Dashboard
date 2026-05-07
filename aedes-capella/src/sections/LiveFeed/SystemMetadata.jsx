import { Cpu } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';

const METADATA = [
  ['Detection Model', 'On-device classifier', 'Runs locally on the sensor node.'],
  ['Wingbeat Range', '400-600 Hz', 'Expected sound frequency for target mosquito wingbeats.'],
  ['Auto-Fog Rule', '80%+ confidence', 'Fogging can trigger only after this threshold is met.'],
  ['Fog Burst', '8 seconds', 'Duration of one automatic fogging action.'],
  ['Cooldown', '5 minutes', 'Prevents repeated fogging from the same node.'],
  ['Processing', 'Offline edge mode', 'Detection works without cloud connectivity.'],
];

/** Displays static system configuration metadata below the detection feed. */
export default function SystemMetadata() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Cpu size={14} color={C.textDim} />
        <span style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '13px',
          fontWeight:    600,
          color:         C.textDim,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          System Guide
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
              padding:      '10px',
              background:   C.surface,
              borderRadius: '8px',
              border:       `1px solid ${C.border}`,
              cursor:       'help',
            }}
          >
            <div style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '10px',
              color:         C.textDim,
              marginBottom:  '4px',
              letterSpacing: '0.05em',
            }}>
              {key}
            </div>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize:   '12px',
              color:      C.text,
              fontWeight: 600,
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
