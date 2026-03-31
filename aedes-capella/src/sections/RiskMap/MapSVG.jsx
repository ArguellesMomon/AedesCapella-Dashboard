import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST, NODES_DATA, SITIO_POLYGONS } from '../../constants/MockData';

const getSitioData = (id) => SITIO_LIST.find(s => s.id === id);

/** SVG zone map of Barangay Sabang with clickable sitio polygons and animated node markers. */
export default function MapSVG({ selectedSitio, onSelectSitio }) {
  return (
    <div>
      {/* Zone label */}
      <div style={{
        fontFamily:    'Syne, sans-serif',
        fontSize:      '12px',
        color:         C.textDim,
        marginBottom:  '12px',
        letterSpacing: '0.08em',
      }}>
        BARANGAY SABANG · ZONE MAP
      </div>

      <svg viewBox="0 0 500 400" style={{ width: '100%', borderRadius: '8px' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`${C.border}88`} strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="500" height="400" fill={C.surface2} rx="8" />
        <rect width="500" height="400" fill="url(#grid)" rx="8" />

        {/* Sitio polygons */}
        {SITIO_POLYGONS.map(p => {
          const sitio    = getSitioData(p.id);
          const rc       = RISK_COLORS[sitio.risk];
          const isSelected = selectedSitio === p.id;

          return (
            <g
              key={p.id}
              onClick={() => onSelectSitio(isSelected ? null : p.id)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={p.points}
                fill={`${rc.fill}22`}
                stroke={rc.border}
                strokeWidth={isSelected ? 2.5 : 1.5}
                style={{
                  transition: 'all 0.2s',
                  filter: isSelected ? `drop-shadow(0 0 8px ${rc.fill})` : 'none',
                }}
              />
              {/* Selected overlay */}
              <polygon
                points={p.points}
                fill={isSelected ? `${rc.fill}44` : 'transparent'}
                stroke="none"
              />
              {/* Sitio name */}
              <text
                x={p.label.x} y={p.label.y}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                fill={rc.text}
                fontWeight="600"
              >
                {sitio.name.replace('Sitio ', '')}
              </text>
              {/* Detection count */}
              <text
                x={p.label.x} y={p.label.y + 13}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8"
                fill={`${rc.text}99`}
              >
                {sitio.detections} det.
              </text>
            </g>
          );
        })}

        {/* Node markers */}
        {NODES_DATA.map(node => {
          const polygon = SITIO_POLYGONS.find(p => getSitioData(p.id)?.node === node.id);
          if (!polygon) return null;

          // Compute approximate centroid from polygon points
          const coords = polygon.points.split(' ').map(pt => pt.split(',').map(Number));
          const cx = coords.reduce((s, c) => s + c[0], 0) / coords.length;
          const cy = coords.reduce((s, c) => s + c[1], 0) / coords.length;

          return (
            <g key={node.id}>
              {/* Pulse ring (online only) */}
              {node.online && (
                <circle cx={cx} cy={cy} r="12" fill="none" stroke={C.amber} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r"       values="8;18;8"     dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4"  dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Node dot */}
              <circle
                cx={cx} cy={cy} r="7"
                fill={node.online ? C.amber : C.gray}
                stroke={C.surface}
                strokeWidth="1.5"
              />
              {/* Node number label */}
              <text
                x={cx} y={cy + 4}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="6"
                fill={C.bg}
                fontWeight="bold"
              >
                {node.id.replace('NODE-', '')}
              </text>
              {/* Node ID below dot */}
              <text
                x={cx} y={cy + 19}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="7.5"
                fill={node.online ? C.amber : C.gray}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
        {Object.entries(RISK_COLORS).map(([level, c]) => (
          <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: c.fill, opacity: 0.8 }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: C.textDim }}>{level}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: C.amber }} />
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: C.textDim }}>Node</span>
        </div>
      </div>
    </div>
  );
}