import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST } from '../../constants/MockData';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';

/** Sorted list of sitios by detection count, shown in the risk map side panel. */
export default function PriorityList({ onSelect }) {
  const sorted = [...SITIO_LIST].sort((a, b) => b.detections - a.detections);

  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{
        fontFamily:    'Syne, sans-serif',
        fontSize:      '12px',
        fontWeight:    600,
        color:         C.textDim,
        marginBottom:  '12px',
        letterSpacing: '0.08em',
      }}>
        PRIORITY SITIOS
      </div>

      {sorted.map((s, i) => (
        <div
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'center',
            padding:       '8px 0',
            borderBottom:  i < sorted.length - 1 ? `1px solid ${C.border}` : 'none',
            cursor:        'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   RISK_COLORS[s.risk].fill,
            }} />
            <Mono size="11px">{s.name}</Mono>
          </div>
          <Mono size="11px" color={C.amber}>{s.detections}</Mono>
        </div>
      ))}
    </Card>
  );
}