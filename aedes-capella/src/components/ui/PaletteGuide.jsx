import { C } from '../../constants/colors';
import Card from './Card';
import Mono from './Mono';

const PALETTE = [
  { name: 'Green', token: '--color-green', meaning: 'Okay', use: 'The sensor is working or the check is complete.', color: C.green },
  { name: 'Amber', token: '--color-amber', meaning: 'Check soon', use: 'Something needs attention soon.', color: C.amber },
  { name: 'Red', token: '--color-red', meaning: 'Needs action', use: 'Please inspect this item as soon as possible.', color: C.red },
  { name: 'Gray', token: '--color-gray', meaning: 'No information', use: 'The sensor is not reporting or information is unavailable.', color: C.gray },
];

export default function PaletteGuide() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '16px',
        fontWeight: 700,
        color: C.text,
        marginBottom: '14px',
      }}>
        What the Colors Mean
      </div>
      <div className="info-grid info-grid-four">
        {PALETTE.map(item => (
          <div
            key={item.name}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '9px' }}>
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                background: item.color,
                flexShrink: 0,
              }} />
              <Mono size="14px" color={C.text} style={{ fontWeight: 700 }}>{item.name} - {item.meaning}</Mono>
            </div>
            <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>{item.use}</Mono>
          </div>
        ))}
      </div>
    </Card>
  );
}
