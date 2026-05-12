import { C } from '../../constants/colors';
import { getConfidenceDecision } from '../../utils/decisionLabels';
import Mono from '../ui/Mono';
import Tag from '../ui/Tag';

/** Inline confidence score progress bar with a decision label. */
export default function ConfidenceBar({ confidence, width = '160px', showLabel = true }) {
  const decision = getConfidenceDecision(confidence);
  const barColor = C[decision.color] ?? C.textDim;

  return (
    <div
      title={decision.meaning}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: width }}
    >
      <div style={{
        flex:         1,
        height:       '6px',
        background:   C.border,
        borderRadius: '3px',
        overflow:     'hidden',
      }}>
        <div style={{
          width:        `${confidence}%`,
          height:       '100%',
          borderRadius: '3px',
          background:   barColor,
          transition:   'width 0.3s ease',
        }} />
      </div>
      <Mono size="13px" color={barColor} style={{ fontWeight: 700 }}>{confidence}%</Mono>
      {showLabel && <Tag color={decision.color}>{decision.label}</Tag>}
    </div>
  );
}
