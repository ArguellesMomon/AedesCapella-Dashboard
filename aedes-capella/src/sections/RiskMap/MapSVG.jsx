import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST, NODES_DATA, SITIO_POLYGONS } from '../../constants/MockData';

const getSitioData = (id) => SITIO_LIST.find(s => s.id === id);
const RISK_HELP = {
  Critical: 'Inspect now',
  High: 'Review today',
  Medium: 'Monitor',
  Low: 'Check later',
  None: 'No action',
};
const MAP_THEME = {
  light: {
    bg: '#fbf7f0',
    grid: '#e6dccd',
    label: '#2c241c',
    count: '#5f554b',
    nodeStroke: '#fffaf2',
    nodeLabel: '#ffffff',
    nodeIdOffline: '#64748b',
    textHalo: '#fffaf2',
    nodeTextHalo: '#fbf7f0',
  },
  dark: {
    bg: '#1b2432',
    grid: '#314154',
    label: '#fff4e5',
    count: '#e5d3bf',
    nodeStroke: '#f5e7d4',
    nodeLabel: '#fffdf8',
    nodeIdOffline: '#d8e2ef',
    textHalo: '#0f1724',
    nodeTextHalo: '#111827',
  },
};

/** SVG zone map of Barangay Sabang with clickable sitio polygons and animated node markers. */
export default function MapSVG({ theme = 'light', selectedSitio, onSelectSitio }) {
  const palette = MAP_THEME[theme] ?? MAP_THEME.light;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '14px',
        marginBottom: '12px',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily:    'Syne, sans-serif',
            fontSize:      '12px',
            color:         C.textDim,
            letterSpacing: '0.08em',
          }}>
            BARANGAY SABANG - ZONE MAP
          </div>
          <div style={{
            marginTop: '4px',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            color: C.textDim,
          }}>
            Color shows response priority. Click a sitio to inspect details.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {Object.entries(RISK_COLORS).map(([level, c]) => (
            <div
              key={level}
              title={`${level}: ${RISK_HELP[level]}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: `1px solid ${c.border}`,
                background: c.bg,
                borderRadius: '6px',
                padding: '4px 7px',
              }}
            >
              <div style={{ width: '9px', height: '9px', borderRadius: '2px', background: c.fill }} />
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '10px',
                color: c.text,
                fontWeight: 700,
              }}>
                {level}
              </span>
            </div>
          ))}
          <div
            title="Node: deployed sensor device"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              border: `1px solid ${C.border}`,
              background: C.surface2,
              borderRadius: '6px',
              padding: '4px 7px',
            }}
          >
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: C.blue }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: C.textDim }}>
              Node
            </span>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 500 400" style={{ width: '100%', borderRadius: '8px' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={palette.grid} strokeWidth="0.6" />
          </pattern>
        </defs>

        <rect width="500" height="400" fill={palette.bg} rx="8" />
        <rect width="500" height="400" fill="url(#grid)" rx="8" />

        {SITIO_POLYGONS.map(p => {
          const sitio = getSitioData(p.id);
          const rc = RISK_COLORS[sitio.risk];
          const isSelected = selectedSitio === p.id;

          return (
            <g
              key={p.id}
              onClick={() => onSelectSitio(isSelected ? null : p.id)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={p.points}
                fill={rc.fill}
                fillOpacity={theme === 'dark' ? (isSelected ? 0.22 : 0.12) : (isSelected ? 0.31 : 0.15)}
                stroke={rc.border}
                strokeWidth={isSelected ? 2.5 : 1.5}
                style={{
                  transition: 'all 0.2s',
                  filter: isSelected ? `drop-shadow(0 0 8px ${rc.fill})` : 'none',
                }}
              />
              <polygon
                points={p.points}
                fill={rc.fill}
                fillOpacity={isSelected ? (theme === 'dark' ? 0.08 : 0.12) : 0}
                stroke="none"
              />
              <text
                x={p.label.x} y={p.label.y}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fill={palette.label}
                fontWeight="600"
                style={{ paintOrder: 'stroke', stroke: palette.textHalo, strokeWidth: 1.5 }}
              >
                {sitio.name}
              </text>
              <text
                x={p.label.x} y={p.label.y + 13}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8"
                fill={palette.count}
                style={{ paintOrder: 'stroke', stroke: palette.textHalo, strokeWidth: 1.2 }}
              >
                {sitio.detections} det.
              </text>
            </g>
          );
        })}

        {NODES_DATA.map(node => {
          const polygon = SITIO_POLYGONS.find(p => getSitioData(p.id)?.node === node.id);
          if (!polygon) return null;

          const coords = polygon.points.split(' ').map(pt => pt.split(',').map(Number));
          const cx = coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length;
          const cy = coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length;

          return (
            <g key={node.id}>
              {node.online && (
                <circle cx={cx} cy={cy} r="12" fill="none" stroke={C.blue} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={cx} cy={cy} r="7"
                fill={node.online ? C.blue : C.gray}
                stroke={palette.nodeStroke}
                strokeWidth="1.5"
              />
              <text
                x={cx} y={cy + 4}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="6"
                fill={palette.nodeLabel}
                fontWeight="bold"
              >
                {node.id.replace('NODE-', '')}
              </text>
              <text
                x={cx} y={cy + 19}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="7.5"
                fill={node.online ? C.blue : palette.nodeIdOffline}
                style={{ paintOrder: 'stroke', stroke: palette.nodeTextHalo, strokeWidth: 1.2 }}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
