import { C } from '../../constants/colors';
import Card from './Card';
import Mono from './Mono';

const PALETTE = [
  { name: 'Green', token: '--color-green', meaning: 'Healthy', use: 'Online nodes, completed checks, normal battery or fogger state.', color: C.green },
  { name: 'Amber', token: '--color-amber', meaning: 'Warning', use: 'Needs review soon, cooldown, low battery, or elevated risk.', color: C.amber },
  { name: 'Red', token: '--color-red', meaning: 'Critical', use: 'High-risk alert, urgent inspection, or critical detection priority.', color: C.red },
  { name: 'Gray', token: '--color-gray', meaning: 'Offline', use: 'Offline devices, unavailable data, inactive sensors, or no action.', color: C.gray },
];

export default function PaletteGuide() {
  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '13px',
        fontWeight: 700,
        color: C.text,
        marginBottom: '12px',
      }}>
        Color Palette Documentation
      </div>
      <div className="info-grid info-grid-four">
        {PALETTE.map(item => (
          <div
            key={item.name}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              padding: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                background: item.color,
                flexShrink: 0,
              }} />
              <Mono size="11px" color={C.text} style={{ fontWeight: 700 }}>{item.name} - {item.meaning}</Mono>
            </div>
            <Mono size="10px" color={C.textDim} style={{ display: 'block', marginBottom: '5px' }}>
              {item.token}
            </Mono>
            <Mono size="10px" color={C.textDim}>{item.use}</Mono>
          </div>
        ))}
      </div>
    </Card>
  );
}
