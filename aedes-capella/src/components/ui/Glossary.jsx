import { BookOpen } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from './Card';
import Mono from './Mono';

const TERMS = [
  ['Match strength', 'How closely the sound matches the mosquito sound being watched.'],
  ['Wing sound', 'The sound made by mosquito wings.'],
  ['Waiting time', 'A short pause that prevents repeated fogging too close together.'],
  ['Works offline', 'The sensor can check sound even without an internet connection.'],
  ['Automatic fogging', 'A short fogging action started when the safety rules are met.'],
  ['Sensor', 'A field device that listens for mosquito sounds and can control fogging.'],
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
          Helpful Words
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
