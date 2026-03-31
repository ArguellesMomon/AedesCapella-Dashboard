/**
 * Info/warning banner strip with icon.
 * @param {string} color - 'blue' | 'amber' | 'red'
 */
export default function Banner({ icon: Icon, text, color = 'blue' }) {
  const COLORS = {
    blue:  { bg: '#1e3a5f', border: '#93c5fd33', text: '#93c5fd' },
    amber: { bg: '#451a03', border: '#fbbf2433', text: '#fbbf24' },
    red:   { bg: '#450a0a', border: '#fca5a533', text: '#fca5a5' },
  };
  const c = COLORS[color] ?? COLORS.blue;

  return (
    <div style={{
      background:    c.bg,
      border:        `1px solid ${c.border}`,
      borderRadius:  '8px',
      padding:       '10px 16px',
      marginBottom:  '20px',
      display:       'flex',
      alignItems:    'center',
      gap:           '10px',
    }}>
      {Icon && <Icon size={14} color={c.text} style={{ flexShrink: 0 }} />}
      <span style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize:   '11px',
        color:      c.text,
      }}>
        {text}
      </span>
    </div>
  );
}