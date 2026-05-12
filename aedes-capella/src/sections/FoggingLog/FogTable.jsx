import { Search } from 'lucide-react';
import { C } from '../../constants/colors';
import { FOG_LOG } from '../../constants/MockData';
import { getAutoResponseReason } from '../../utils/decisionLabels';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import ConfidenceBar from '../../components/charts/ConfidenceBar';

const HEADERS = ['TIMESTAMP', 'NODE / SITIO', 'TRIGGER CONFIDENCE', 'STATUS', 'WHY IT TRIGGERED', 'NEXT STEP'];

/** Full timestamped log table of every automatic fog event. */
export default function FogTable({ fogs = FOG_LOG }) {
  if (!fogs.length) {
    return (
      <EmptyState
        title="No fogging events logged"
        message="Automatic fog events will appear after a detection meets the trigger rule."
        action="Suggested action: review live feed confidence and node cooldown status."
      />
    );
  }

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: C.surface2 }}>
            {HEADERS.map(h => (
              <th key={h} style={{
                padding:       '12px 16px',
                textAlign:     'left',
                fontFamily:    'IBM Plex Mono, monospace',
                fontSize:      '12px',
                color:         C.textDim,
                fontWeight:    600,
                letterSpacing: '0.08em',
                borderBottom:  `1px solid ${C.border}`,
                whiteSpace:    'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fogs.map((f, i) => (
            <tr
              key={f.id}
              style={{
                background:   i % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <td style={{ padding: '11px 16px' }}>
                <Mono size="13px" color={C.textDim} style={{ fontWeight: 700 }}>{f.ts}</Mono>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <div><Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>{f.nodeId}</Mono></div>
                <Mono size="12px" color={C.textDim}>{f.sitio}</Mono>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <ConfidenceBar confidence={f.confidence} width="190px" />
              </td>
              <td style={{ padding: '11px 16px' }}>
                <Tag color="green">Completed</Tag>
              </td>
              <td style={{ padding: '11px 16px', maxWidth: '260px' }}>
                <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>
                  {getAutoResponseReason('fogged', f.confidence)}
                </Mono>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <button
                  title="Review this fogging event"
                  style={{
                    border: `1px solid ${C.border}`,
                    background: C.surface2,
                    color: C.text,
                    borderRadius: '6px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  <Search size={12} />
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
