const COLORS = {
  amber: { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' },
  red:   { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' },
  green: { bg: '#dcfce7', border: '#86efac', text: '#166534' },
  gray:  { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b' },
  blue:  { bg: '#dbeafe', border: '#93c5fd', text: '#1d4ed8' },
};

/**
 * Small colored badge tag.
 * @param {string} color - 'amber' | 'red' | 'green' | 'gray' | 'blue'
 */
export default function Tag({ children, color = 'gray' }) {
  const c = COLORS[color] ?? COLORS.gray;
  return (
    <span style={{
      background:    c.bg,
      border:        `1px solid ${c.border}`,
      color:         c.text,
      fontSize:      '10px',
      padding:       '2px 8px',
      borderRadius:  '4px',
      fontFamily:    'IBM Plex Mono, monospace',
      fontWeight:    600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      whiteSpace:    'nowrap',
    }}>
      {children}
    </span>
  );
}