import { Cpu } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';

const METADATA = [
  ['Model',              '1D-CNN on ESP32-S3'],
  ['Wingbeat Target',    '400–600 Hz'],
  ['Auto-Fog Threshold', '≥ 80% confidence'],
  ['Fog Burst Duration', '8 seconds'],
  ['Cooldown Period',    '5 minutes'],
  ['Processing Mode',    'Edge — fully offline'],
];

/** Displays static system configuration metadata below the detection feed. */
export default function SystemMetadata() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Cpu size={14} color={C.amber} />
        <span style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '13px',
          fontWeight:    600,
          color:         C.textDim,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          System Metadata
        </span>
      </div>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '12px',
      }}>
        {METADATA.map(([key, value]) => (
          <div key={key} style={{
            padding:      '10px',
            background:   C.surface,
            borderRadius: '8px',
            border:       `1px solid ${C.border}`,
          }}>
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