import { useRef, useEffect } from 'react';
import { C } from '../../constants/colors';
import Mono from '../../components/ui/Mono';
import ConfidenceBar from '../../components/charts/ConfidenceBar';
import AutoResponseBadge from './AutoResponseBadge';
import { offsetTime } from '../../utils/helpers';

const HEADERS = ['TIMESTAMP', 'NODE', 'SITIO', 'FREQ (Hz)', 'CONFIDENCE', 'AUTO-RESPONSE'];

/** Scrollable detection table. Scrolls to top whenever new detections arrive. */
export default function FeedTable({ detections }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [detections]);

  return (
    <div
      ref={feedRef}
      style={{
        maxHeight:     '380px',
        overflowY:     'auto',
        marginBottom:  '24px',
        scrollbarWidth:'thin',
        scrollbarColor:`${C.border} transparent`,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <tr style={{ background: C.surface2 }}>
            {HEADERS.map(h => (
              <th key={h} style={{
                padding:       '10px 14px',
                textAlign:     'left',
                fontFamily:    'IBM Plex Mono, monospace',
                fontSize:      '10px',
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
          {detections.map((d, i) => (
            <tr
              key={d.id}
              style={{
                background:   i % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                borderBottom: `1px solid ${C.border}22`,
                animation:    i === 0 ? 'fadeIn 0.5s ease' : 'none',
              }}
            >
              <td style={{ padding: '10px 14px' }}>
                <Mono size="12px" color={C.textDim}>{offsetTime(d.minsAgo)}</Mono>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <Mono size="12px" color={C.amber}>{d.nodeId}</Mono>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <Mono size="12px">{d.sitio}</Mono>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <Mono size="12px" color={C.blue}>{d.freq} Hz</Mono>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <ConfidenceBar confidence={d.confidence} />
              </td>
              <td style={{ padding: '10px 14px' }}>
                <AutoResponseBadge status={d.autoResponse} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}