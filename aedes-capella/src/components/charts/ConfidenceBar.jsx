import { C } from '../../constants/colors';
import Mono from '../ui/Mono';

/**
 * Inline confidence score progress bar with percentage label.
 * Color shifts from green → amber → red as confidence increases.
 */
export default function ConfidenceBar({ confidence, width = '140px' }) {
  const barColor =
    confidence >= 95 ? C.red :
    confidence >= 88 ? C.amber :
    C.green;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: width }}>
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
      <Mono size="11px" color={barColor}>{confidence}%</Mono>
    </div>
  );
}