import { createElement } from 'react';
import { Activity, MapPin, Droplets, Server, TrendingUp, Bug } from 'lucide-react';
import { C } from '../../constants/colors';
import { NODES_DATA } from '../../constants/MockData';
import Mono from '../ui/Mono';

const NAV_ITEMS = [
  { id: 'feed',   icon: Activity,   label: 'Live Detection Feed' },
  { id: 'map',    icon: MapPin,      label: 'Risk Map' },
  { id: 'fog',    icon: Droplets,    label: 'Fogging Log' },
  { id: 'nodes',  icon: Server,      label: 'Node Management' },
  { id: 'trends', icon: TrendingUp,  label: 'Trends & Analytics' },
];

export default function Sidebar({ activeSection, onNavigate, alertPulse }) {
  return (
    <div style={{
      width:         '280px',
      flexShrink:    0,
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
              fontSize:      '9px',
              color:         C.amber,
              letterSpacing: '0.1em',
            }}>
              AIoT VECTOR SURVEILLANCE
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize:   '9px',
          color:      C.textDim,
          marginTop:  '6px',
        }}>
          Sabang · Lipa City · Batangas
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
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
                fontSize:   '12px',
                fontWeight: active ? 700 : 500,
              }}>
                {label}
              </span>
              {/* Live alert dot on feed item */}
              {id === 'feed' && alertPulse && (
                <div style={{
                  marginLeft:  'auto',
                  width:       '6px',
                  height:      '6px',
                  borderRadius:'50%',
                  background:  C.red,
                  animation:   'blink 0.5s infinite',
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Node mini status */}
      <div style={{ padding: '14px', borderTop: `1px solid ${C.border}` }}>
        <div style={{
          fontFamily:    'IBM Plex Mono, monospace',
          fontSize:      '9px',
          color:         C.textDim,
          letterSpacing: '0.1em',
          marginBottom:  '10px',
        }}>
          NODE STATUS
        </div>
        {NODES_DATA.map(node => (
          <div key={node.id} style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '8px',
            marginBottom:'7px',
          }}>
            {/* Online indicator dot */}
            <div style={{
              width:        '7px',
              height:       '7px',
              borderRadius: '50%',
              background:   node.online ? C.green : C.gray,
              boxShadow:    node.online ? `0 0 6px ${C.green}` : 'none',
              animation:    node.online ? 'pulse 2s infinite' : 'none',
            }} />
            <Mono size="10px" color={node.online ? C.text : C.textDim} style={{ flex: 1 }}>
              {node.id}
            </Mono>
            <Mono size="9px" color={node.batteryLow ? C.amber : C.textDim}>
              {node.battery}%
            </Mono>
          </div>
        ))}
      </div>
    </div>
  );
}
