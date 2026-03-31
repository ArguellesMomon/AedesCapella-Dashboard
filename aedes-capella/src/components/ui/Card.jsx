import { C } from '../../constants/colors';

/**
 * Dark surface card wrapper.
 * @param {boolean} glow - Adds amber glow border when true (used for battery-critical nodes)
 */
export default function Card({ children, style = {}, glow = false }) {
  return (
    <div style={{
      background:   C.surface,
      border:       `1px solid ${glow ? C.amber : C.border}`,
      borderRadius: '12px',
      padding:      '20px',
      boxShadow:    glow
        ? `0 0 20px ${C.amberDim}44`
        : '0 2px 8px rgba(0,0,0,0.4)',
      ...style,
    }}>
      {children}
    </div>
  );
}