import { C } from '../../constants/colors';
import Mono from '../ui/Mono';
import { getWifiBars } from '../../utils/helpers';

/**
 * Plain-language signal indicator showing 1–4 bars.
 */
export default function WifiSignal({ dbm }) {
  if (!dbm) return <Mono size="11px" color={C.gray}>No Signal</Mono>;

  const bars = getWifiBars(dbm);
  const signalLabel = bars >= 4 ? 'Strong' : bars === 3 ? 'Good' : bars === 2 ? 'Fair' : 'Weak';

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
      {[1, 2, 3, 4].map(b => (
        <div
          key={b}
          style={{
            width:        '4px',
            height:       `${b * 4 + 4}px`,
            borderRadius: '1px',
            background:   b <= bars ? C.green : C.border,
          }}
        />
      ))}
      <Mono size="10px" color={C.textDim} style={{ marginLeft: '4px' }}>
        {signalLabel}
      </Mono>
    </div>
  );
}
