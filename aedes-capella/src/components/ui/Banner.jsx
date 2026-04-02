/**
 * Info/warning banner strip with icon.
 * @param {string} color - 'blue' | 'amber' | 'red'
 */
export default function Banner({ icon: Icon, text, color = 'blue' }) {
  const COLORS = {
    blue:  { bg: '#dbeafe', border: '#93c5fd66', text: '#1d4ed8' },
    amber: { bg: '#fef3c7', border: '#fcd34d66', text: '#92400e' },
    red:   { bg: '#fee2e2', border: '#fca5a566', text: '#991b1b' },
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