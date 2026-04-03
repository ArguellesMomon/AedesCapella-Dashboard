const COLORS = {
  amber: { bg: 'var(--tag-amber-bg)', border: 'var(--tag-amber-border)', text: 'var(--tag-amber-text)' },
  red:   { bg: 'var(--tag-red-bg)', border: 'var(--tag-red-border)', text: 'var(--tag-red-text)' },
  green: { bg: 'var(--tag-green-bg)', border: 'var(--tag-green-border)', text: 'var(--tag-green-text)' },
  gray:  { bg: 'var(--tag-gray-bg)', border: 'var(--tag-gray-border)', text: 'var(--tag-gray-text)' },
  blue:  { bg: 'var(--tag-blue-bg)', border: 'var(--tag-blue-border)', text: 'var(--tag-blue-text)' },
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
