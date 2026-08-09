import { createElement } from 'react';
import { Activity, MapPin, Droplets, Server, TrendingUp, Bug, LogOut, Moon, Settings, Sun } from 'lucide-react';
import { C } from '../../constants/colors';
import { getStatusPresentation } from '../../utils/deviceStatus';
import Mono from '../ui/Mono';

const NAV_ITEMS = [
  { id: 'feed',   icon: Activity,   label: 'Latest Sensor Activity' },
  { id: 'map',    icon: MapPin,      label: 'Barangay Map' },
  { id: 'fog',    icon: Droplets,    label: 'Relay History' },
  { id: 'nodes',  icon: Server,      label: 'Sensor Status' },
  { id: 'trends', icon: TrendingUp,  label: 'Activity Summary' },
];

export default function Sidebar({ activeSection, onNavigate, deviceStatus, theme, onToggleTheme, onLogout }) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <aside className="dashboard-sidebar" style={{
      background:    C.surface,
      borderRight:   `1px solid ${C.border}`,
      display:       'flex',
      flexDirection: 'column',
      overflow:      'hidden',
    }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div style={{
            width:          '32px',
            height:         '32px',
            borderRadius:   '8px',
            background:     `linear-gradient(135deg, ${C.amberDim}, ${C.redDim})`,
            border:         `1px solid ${C.amber}44`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}>
            <Bug size={16} color={C.amber} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily:    'Syne, sans-serif',
              fontWeight:    800,
              fontSize:      '17px',
              color:         C.text,
              letterSpacing: '0.01em',
              lineHeight:    1,
              whiteSpace:    'nowrap',
            }}>
              AedesCapella
            </div>
            <div style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '12px',
              color:         C.amber,
              letterSpacing: '0.1em',
            }}>
              BARANGAY MOSQUITO WATCH
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize:   '12px',
          color:      C.textDim,
          marginTop:  '6px',
        }}>
          Sabang · Lipa City · Batangas
        </div>
      </div>

      {/* Navigation */}
      <nav className="dashboard-nav" style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                width:        '100%',
                display:      'flex',
                alignItems:   'center',
                gap:          '10px',
                padding:      '10px 10px',
                borderRadius: '8px',
                border:       'none',
                borderLeft:   active ? `2px solid ${C.amber}` : '2px solid transparent',
                background:   active ? `${C.amber}18` : 'transparent',
                color:        active ? C.amber : C.textDim,
                cursor:       'pointer',
                textAlign:    'left',
                marginBottom: '2px',
                transition:   'all 0.15s',
              }}
            >
              {createElement(Icon, { size: 15 })}
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontSize:   '14px',
                fontWeight: active ? 700 : 500,
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Node mini status */}
      <div className="sidebar-device-status" style={{ padding: '14px', borderTop: `1px solid ${C.border}` }}>
        <div style={{
          fontFamily:    'IBM Plex Mono, monospace',
          fontSize:      '12px',
          color:         C.textDim,
          letterSpacing: '0.1em',
          marginBottom:  '10px',
        }}>
          SENSOR STATUS
        </div>
        {deviceStatus.loading && (
          <Mono size="12px" color={C.textDim}>Checking sensors…</Mono>
        )}
        {!deviceStatus.loading && deviceStatus.error && (
          <Mono size="12px" color={C.red}>Sensor information unavailable</Mono>
        )}
        {!deviceStatus.loading && !deviceStatus.error && !deviceStatus.devices.length && (
          <Mono size="12px" color={C.textDim}>No sensors listed</Mono>
        )}
        {!deviceStatus.loading && !deviceStatus.error && deviceStatus.devices.map(device => {
          const presentation = getStatusPresentation(device.operational_state);
          const isHealthy = device.operational_state === 'online';

          return (
            <div key={device.device_id} style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '8px',
              marginBottom:'7px',
            }}>
              <div style={{
                width:        '7px',
                height:       '7px',
                borderRadius: '50%',
                background:   isHealthy ? C.green : C.gray,
                boxShadow:    isHealthy ? `0 0 6px ${C.green}` : 'none',
                animation:    isHealthy ? 'pulse 2s infinite' : 'none',
              }} />
              <Mono size="12px" color={isHealthy ? C.text : C.textDim} style={{ flex: 1, fontWeight: 700 }}>
                {device.device_label}
              </Mono>
              <Mono size="12px" color={presentation.color === 'red' ? C.red : C.textDim}>
                {presentation.label}
              </Mono>
            </div>
          );
        })}
      </div>

      <div className="sidebar-settings" style={{ padding: '14px', borderTop: `1px solid ${C.border}` }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '12px',
          color: C.textDim,
          letterSpacing: '0.1em',
          marginBottom: '10px',
        }}>
          <Settings size={12} color={C.textDim} />
          SETTINGS
        </div>

        <button
          onClick={onToggleTheme}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            border: `1px solid ${C.border}`,
            background: C.surface2,
            color: C.text,
            borderRadius: '8px',
            padding: '9px 10px',
            cursor: 'pointer',
            marginBottom: '8px',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeIcon size={14} color={C.text} />
            <Mono size="12px" color={C.text} style={{ fontWeight: 700 }}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Mono>
          </span>
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: `1px solid ${C.border}`,
              background: 'transparent',
              color: C.textDim,
              borderRadius: '8px',
              padding: '9px 10px',
              cursor: 'pointer',
            }}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={14} color={C.textDim} />
            <Mono size="12px" color={C.textDim} style={{ fontWeight: 700 }}>
              Logout
            </Mono>
          </button>
        )}
      </div>
    </aside>
  );
}
