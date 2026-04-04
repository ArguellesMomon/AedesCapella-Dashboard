import { Activity, Droplets, Server, Eye, AlertTriangle, LogOut, Moon, Sun } from 'lucide-react';
import { C } from '../../constants/colors';
import { usePHTime } from '../../hooks/usePHTime';

const METRICS = [
  { key: 'detections', label: 'Detections Today', icon: Activity,   color: C.amber },
  { key: 'fogs',       label: 'Fog Events Today',  icon: Droplets,   color: C.blue  },
  { key: 'nodes',      label: 'Active Nodes',       icon: Server,     color: C.green },
  { key: 'confidence', label: 'Avg. Confidence',    icon: Eye,        color: C.text  },
];

/**
 * Persistent top bar with summary metrics, Sabang risk badge, and live PHT clock.
 * @param {object} metrics - { detections, fogs, nodes, confidence }
 */
export default function Topbar({ metrics, theme, onToggleTheme, onLogout }) {
  const { clock, date } = usePHTime();
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  const values = {
    detections: String(metrics.detections),
    fogs:       '13',
    nodes:      '2 / 3',
    confidence: '90.2%',
  };

  return (
    <div style={{
      background:    C.surface,
      borderBottom:  `1px solid ${C.border}`,
      padding:       '0 24px',
      height:        '64px',
      display:       'flex',
      alignItems:    'center',
      gap:           '20px',
      flexShrink:    0,
      overflowX:     'auto',
    }}>

      {/* Metric cells */}
      {METRICS.map(({ key, label, icon: Icon, color }) => (
        <div key={key} style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          paddingRight: '20px',
          borderRight:  `1px solid ${C.border}`,
          flexShrink:   0,
        }}>
          <Icon size={13} color={color} />
          <div>
            <div style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '9px',
              color:         C.textDim,
              letterSpacing: '0.06em',
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize:   '15px',
              fontWeight: 700,
              color,
            }}>
              {values[key]}
            </div>
          </div>
        </div>
      ))}

      {/* Sabang risk alert */}
      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '8px',
        paddingRight: '20px',
        borderRight:  `1px solid ${C.border}`,
        flexShrink:   0,
      }}>
        <AlertTriangle size={13} color={C.red} />
        <div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '9px',
            color:      C.textDim,
          }}>
            Sabang Alert
          </div>
          <div style={{
            background:    `${C.red}22`,
            border:        `1px solid ${C.red}55`,
            color:         C.red,
            borderRadius:  '4px',
            padding:       '1px 8px',
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '10px',
            fontWeight:    700,
            letterSpacing: '0.08em',
          }}>
            ⬤ CRITICAL
          </div>
        </div>
      </div>

      <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={onToggleTheme}
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '8px',
            border:         `1px solid ${C.border}`,
            background:     C.surface2,
            color:          C.text,
            borderRadius:   '999px',
            padding:        '8px 12px',
            cursor:         'pointer',
            transition:     'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <ThemeIcon size={14} color={C.amber} />
          <span style={{
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '10px',
            fontWeight:    700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              display:        'flex',
              alignItems:     'center',
              gap:            '8px',
              border:         `1px solid ${C.border}`,
              background:     'transparent',
              color:          C.textDim,
              borderRadius:   '999px',
              padding:        '8px 12px',
              cursor:         'pointer',
              transition:     'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={14} color={C.textDim} />
            <span style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Logout
            </span>
          </button>
        )}
      </div>

      {/* Live PHT clock */}
      <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          fontFamily:    'IBM Plex Mono, monospace',
          fontSize:      '20px',
          fontWeight:    700,
          color:         C.text,
          letterSpacing: '0.05em',
        }}>
          {clock}
        </div>
        <div style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize:   '9px',
          color:      C.textDim,
        }}>
          {date} PHT
        </div>
      </div>
    </div>
  );
}
