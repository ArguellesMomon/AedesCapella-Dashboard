import { useRef, useEffect } from 'react';
import { Search, ClipboardCheck } from 'lucide-react';
import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST } from '../../constants/MockData';
import { getRecommendedAction, getRiskAction } from '../../utils/decisionLabels';
import Mono from '../../components/ui/Mono';
import EmptyState from '../../components/ui/EmptyState';
import ConfidenceBar from '../../components/charts/ConfidenceBar';
import AutoResponseBadge from './AutoResponseBadge';
import { offsetTime } from '../../utils/helpers';

const HEADERS = ['TIMESTAMP', 'NODE', 'SITIO', 'WINGBEAT', 'CONFIDENCE', 'AUTO ACTION', 'NEXT STEP'];
const HIGH_RISK_LEVELS = ['Critical', 'High'];
const RISK_BY_SITIO = SITIO_LIST.reduce((lookup, sitio) => ({
  ...lookup,
  [sitio.name]: sitio.risk,
}), {});

/** Scrollable detection table. Scrolls to top whenever new detections arrive. */
export default function FeedTable({ detections }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [detections]);

  if (!detections.length) {
    return (
      <div style={{ marginBottom: '24px' }}>
        <EmptyState
          title="No confirmed detections yet"
          message="The live feed will populate when a node confirms a mosquito wingbeat signature."
          action="Suggested action: keep nodes online and check signal status."
        />
      </div>
    );
  }

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
          {detections.map((d, i) => {
            const risk = RISK_BY_SITIO[d.sitio];
            const isHighRisk = HIGH_RISK_LEVELS.includes(risk);
            const riskColor = risk ? RISK_COLORS[risk] : null;
            const action = getRiskAction(risk);
            const recommendation = getRecommendedAction(d);

            return (
              <tr
                key={d.id}
                style={{
                  background: isHighRisk
                    ? riskColor.bg
                    : i % 2 === 0 ? 'transparent' : `${C.surface2}66`,
                  borderBottom: `1px solid ${isHighRisk ? riskColor.border : `${C.border}22`}`,
                  boxShadow: isHighRisk ? `inset 3px 0 0 ${riskColor.fill}` : 'none',
                  animation: i === 0 ? 'fadeIn 0.5s ease' : 'none',
                }}
              >
                <td style={{ padding: '10px 14px' }}>
                  <Mono size="12px" color={isHighRisk ? riskColor.text : C.textDim}>{offsetTime(d.minsAgo)}</Mono>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <Mono size="12px" color={isHighRisk ? riskColor.text : C.text}>{d.nodeId}</Mono>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mono size="12px" color={isHighRisk ? riskColor.text : undefined}>{d.sitio}</Mono>
                    {isHighRisk && (
                      <span style={{
                        border: `1px solid ${riskColor.border}`,
                        background: C.surface,
                        color: riskColor.text,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}>
                        {risk.toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <Mono
                    size="12px"
                    color={isHighRisk ? riskColor.text : C.textDim}
                    style={{ cursor: 'help' }}
                  >
                    <span title="Wingbeat frequency detected by the acoustic sensor.">{d.freq} Hz</span>
                  </Mono>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <ConfidenceBar confidence={d.confidence} />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <AutoResponseBadge status={d.autoResponse} confidence={d.confidence} />
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button
                    title={`${recommendation.reason} ${recommendation.why}`}
                    style={{
                      border: `1px solid ${isHighRisk ? riskColor.border : C.border}`,
                      background: C.surface,
                      color: isHighRisk ? riskColor.text : C.text,
                      borderRadius: '6px',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {isHighRisk ? <Search size={12} /> : <ClipboardCheck size={12} />}
                    {recommendation.action || action}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
