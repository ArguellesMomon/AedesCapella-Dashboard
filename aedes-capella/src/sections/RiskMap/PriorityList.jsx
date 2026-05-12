import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST } from '../../constants/MockData';
import { getRiskAction } from '../../utils/decisionLabels';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Mono from '../../components/ui/Mono';

/** Sorted list of sitios by detection count, shown in the risk map side panel. */
export default function PriorityList({ onSelect }) {
  const sorted = [...SITIO_LIST].sort((a, b) => b.detections - a.detections);

  if (!sorted.length) {
    return (
      <EmptyState
        title="No sitios to rank"
        message="Priority ranking will appear when sitio data becomes available."
      />
    );
  }

  return (
    <Card style={{ background: C.surface2 }}>
      <div style={{
        fontFamily:    'Syne, sans-serif',
        fontSize:      '15px',
        fontWeight:    700,
        color:         C.textDim,
        marginBottom:  '12px',
        letterSpacing: '0.08em',
      }}>
        ALL SITIOS BY PRIORITY
      </div>

      {sorted.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          title={`${getRiskAction(s.risk)}: ${s.name}`}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 0',
            border: 'none',
            borderBottom: i < sorted.length - 1 ? `1px solid ${C.border}` : 'none',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   RISK_COLORS[s.risk].fill,
              flexShrink: 0,
            }} />
            <Mono size="13px" style={{ fontWeight: 700 }}>{s.name}</Mono>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>{s.detections}</Mono>
            <Mono size="12px" color={RISK_COLORS[s.risk].text} style={{ fontWeight: 700 }}>{getRiskAction(s.risk)}</Mono>
          </div>
        </button>
      ))}
    </Card>
  );
}
