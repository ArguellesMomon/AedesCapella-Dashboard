const COLORS = {
  amber: { bg: '#451a03', border: '#92400e', text: '#fbbf24' },
  red:   { bg: '#450a0a', border: '#7f1d1d', text: '#fca5a5' },
  green: { bg: '#052e16', border: '#14532d', text: '#4ade80' },
  gray:  { bg: '#1e293b', border: '#334155', text: '#94a3b8' },
  blue:  { bg: '#0f172a', border: '#1e3a5f', text: '#93c5fd' },
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