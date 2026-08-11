import { C } from '../../constants/colors';

/**
 * Section heading in the technical-plate language: a tracked accent overline,
 * a heavy display title trailed by an accent lozenge, and a monospace figure
 * number on the right that gives each section a fixed identity.
 *
 * No icon. The overline and the figure number carry the identification, which
 * is how the reference language does it; a glyph in a tinted rounded square
 * beside every title is the generic dashboard tell we are removing.
 *
 * @param {string} overline - tracked uppercase kicker above the title
 * @param {string} fig      - figure number, e.g. "FIG.01"
 */
export default function SectionHeader({ title, subtitle, overline, fig }) {
  return (
    <header style={{
      display:       'flex',
      alignItems:    'flex-start',
      gap:           '16px',
      marginBottom:  '26px',
      paddingBottom: '18px',
      borderBottom:  `1px dashed var(--pd-dash)`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {overline && <span className="pd-overline">{overline}</span>}
        <h2 className="pd-display">
          {title}
          <i className="pd-spark" />
        </h2>
        {subtitle && (
          <p style={{
            marginTop:  '10px',
            maxWidth:   '65ch',
            color:      C.textDim,
            font:       '400 13.5px Outfit, sans-serif',
            lineHeight: 1.55,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {fig && (
        <span style={{
          flexShrink:    0,
          marginTop:     '10px',
          color:         C.gray,
          font:          '500 11px "IBM Plex Mono", monospace',
          letterSpacing: '0.08em',
        }}>
          {fig}
        </span>
      )}
    </header>
  );
}
