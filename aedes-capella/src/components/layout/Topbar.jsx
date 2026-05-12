import { createElement } from 'react';
import { Activity, Droplets, Server, Eye, AlertTriangle } from 'lucide-react';
import { C } from '../../constants/colors';
import { usePHTime } from '../../hooks/usePHTime';
import Tag from '../ui/Tag';

const METRICS = [
  { key: 'detections', label: 'Detections Today', icon: Activity, color: C.text, status: 'High', statusColor: 'amber' },
  { key: 'fogs', label: 'Fog Events Today', icon: Droplets, color: C.text, status: 'Active', statusColor: 'amber' },
  { key: 'nodes', label: 'Active Nodes', icon: Server, color: C.text, status: '2 online', statusColor: 'green' },
  { key: 'confidence', label: 'Avg. Confidence', icon: Eye, color: C.text, status: 'High', statusColor: 'amber' },
];

/**
 * Persistent top bar with summary metrics, Sabang risk badge, and live PHT clock.
 * @param {object} metrics - { detections, fogs, nodes, confidence }
 */
export default function Topbar({ metrics }) {
  const { clock, date } = usePHTime();

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
      {METRICS.map(({ key, label, icon: Icon, color, status, statusColor }) => (
        <div key={key} style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          paddingRight: '20px',
          borderRight:  `1px solid ${C.border}`,
          flexShrink:   0,
        }}>
          {createElement(Icon, { size: 15, color })}
          <div>
            <div style={{
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '12px',
              color:         C.textDim,
              letterSpacing: '0.06em',
            }}>
              {label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize:   '17px',
                fontWeight: 700,
                color,
              }}>
                {values[key]}
              </span>
              <Tag color={statusColor}>{status}</Tag>
            </div>
          </div>
        </div>
      ))}

      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '8px',
        paddingRight: '20px',
        borderRight:  `1px solid ${C.border}`,
        flexShrink:   0,
      }}>
        <AlertTriangle size={15} color={C.red} />
        <div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '12px',
            color:      C.textDim,
          }}>
            Barangay Alert
          </div>
          <Tag color="red">Critical - inspect now</Tag>
        </div>
      </div>

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
          fontSize:   '12px',
          color:      C.textDim,
        }}>
          {date} PHT
        </div>
      </div>
    </div>
  );
}
