import { CheckCircle, Clock, Info } from 'lucide-react';
import { C } from '../../constants/colors';
import { getAutoResponseReason } from '../../utils/decisionLabels';
import Mono from '../../components/ui/Mono';

/**
 * Read-only badge showing the current auto-response state of a detection.
 * States: 'fogging' | 'fogged' | 'cooldown'
 */
export default function AutoResponseBadge({ status, confidence }) {
  const reason = getAutoResponseReason(status, confidence);

  if (status === 'fogging') return (
    <div title={reason} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width:        '6px',
        height:       '6px',
        borderRadius: '50%',
        background:   C.amber,
        animation:    'pulse 1s infinite',
      }} />
      <Mono size="11px" color={C.amber}>Fogging now</Mono>
      <Info size={12} color={C.textDim} />
    </div>
  );

  if (status === 'fogged') return (
    <div title={reason} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <CheckCircle size={12} color={C.green} />
      <Mono size="11px" color={C.green}>Fogged</Mono>
      <Info size={12} color={C.textDim} />
    </div>
  );

  if (status === 'cooldown') return (
    <div title={reason} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <Clock size={12} color={C.gray} />
      <Mono size="11px" color={C.gray}>Cooldown</Mono>
      <Info size={12} color={C.textDim} />
    </div>
  );

  return <Mono size="11px" color={C.textDim}>No action</Mono>;
}
