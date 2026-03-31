import { C } from '../../constants/colors';

/**
 * IBM Plex Mono inline text span.
 * Used for all data values, timestamps, node IDs, frequencies, etc.
 */
export default function Mono({ children, size = '13px', color, style = {} }) {
  return (
    <span style={{
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize:   size,
      color:      color ?? C.text,
      ...style,
    }}>
      {children}
    </span>
  );
}