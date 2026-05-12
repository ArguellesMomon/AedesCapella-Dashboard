import { BookOpen } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from './Card';
import Mono from './Mono';

const TERMS = [
  ['Confidence', 'How sure the node is that the sound matches a mosquito wingbeat.'],
  ['Wingbeat', 'The sound frequency made by mosquito wings, measured in hertz.'],
  ['Cooldown', 'A waiting period that prevents repeated fogging from the same node.'],
  ['Edge mode', 'Detection happens on the device, even without cloud access.'],
  ['Auto-fog', 'A short fogging burst started automatically after the trigger rules are met.'],
  ['Node', 'A field device with sensors and a connected fogger.'],
];

export default function Glossary() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '9px' }}>
        <BookOpen size={16} color={C.textDim} />
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '16px',
          fontWeight: 700,
          color: C.text,
        }}>
          Technical Term Glossary
        </span>
      </div>
      <div className="info-grid info-grid-three">
        {TERMS.map(([term, explanation]) => (
          <div
            key={term}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              padding: '14px',
            }}
          >
            <Mono size="14px" color={C.text} style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>
              {term}
            </Mono>
            <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>{explanation}</Mono>
          </div>
        ))}
      </div>
    </Card>
  );
}
