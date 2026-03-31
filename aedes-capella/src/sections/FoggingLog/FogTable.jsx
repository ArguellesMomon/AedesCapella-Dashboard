import { C } from '../../constants/colors';
import { FOG_LOG } from '../../constants/MockData';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import Card from '../../components/ui/Card';

const HEADERS = ['TIMESTAMP', 'NODE · SITIO', 'TRIGGER CONFIDENCE', 'STATUS', 'TRIGGER'];

/** Full timestamped log table of every automatic fog event. */
export default function FogTable() {
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
                fontSize:      '10px',
                color:         C.textDim,
                fontWeight:    600,
                letterSpacing: '0.08em',
                borderBottom:  `1px solid ${C.border}`,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FOG_LOG.map((f, i) => (
            <tr
              key={f.id}
              style={{
                background:   i % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <td style={{ padding: '11px 16px' }}>
                <Mono size="12px" color={C.textDim}>{f.ts}</Mono>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <div><Mono size="12px" color={C.amber}>{f.nodeId}</Mono></div>
                <Mono size="10px" color={C.textDim}>{f.sitio}</Mono>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width:        '80px',
                    height:       '5px',
                    background:   C.border,
                    borderRadius: '3px',
                    overflow:     'hidden',
                  }}>
                    <div style={{
                      width:        `${f.confidence}%`,
                      height:       '100%',
                      background:   f.confidence >= 95 ? C.red : C.amber,
                      borderRadius: '3px',
                    }} />
                  </div>
                  <Mono size="11px" color={C.amber}>{f.confidence}%</Mono>
                </div>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <Tag color="green">Completed</Tag>
              </td>
              <td style={{ padding: '11px 16px' }}>
                <Mono size="11px" color={C.textDim}>Auto · 8s burst</Mono>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}