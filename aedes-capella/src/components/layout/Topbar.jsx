import { createElement } from 'react';
import { Activity, Droplets, Server, Eye, AlertTriangle } from 'lucide-react';
import { C } from '../../constants/colors';
import { usePHTime } from '../../hooks/usePHTime';
import Tag from '../ui/Tag';

const METRICS = [
  { key: 'detections', label: 'Mosquito Reports Saved / 24h', icon: Activity },
  { key: 'fogs', label: 'Fogging / 24h', icon: Droplets },
  { key: 'nodes', label: 'Sensors Working', icon: Server },
  { key: 'confidence', label: 'Match Strength', icon: Eye },
];

/**
 * Persistent top bar with backend-derived summary metrics and live PHT clock.
 * @param {object} metrics - { detections, fogs, onlineNodes, totalNodes, avgConfidence, attentionNodes }
 */
export default function Topbar({ metrics }) {
  const { clock, date } = usePHTime();

  const values = {
    detections: String(metrics.detections ?? 0),
    fogs:       String(metrics.fogs ?? 0),
    nodes:      `${metrics.onlineNodes ?? 0} / ${metrics.totalNodes ?? 0}`,
    confidence: metrics.avgConfidence === null || metrics.avgConfidence === undefined
      ? '—'
      : `${Number(metrics.avgConfidence).toFixed(1)}%`,
  };

  const statuses = {
    detections: metrics.detections ? 'Available' : 'No reports',
    fogs: metrics.fogs ? 'Recorded' : 'No records',
    nodes: metrics.totalNodes === 0 ? 'No sensor data' : `${metrics.onlineNodes} working`,
    confidence: metrics.avgConfidence === null || metrics.avgConfidence === undefined ? 'No reports' : 'Available',
  };

  const statusColors = {
    detections: metrics.detections ? 'blue' : 'gray',
    fogs: metrics.fogs ? 'amber' : 'gray',
    nodes: metrics.attentionNodes ? 'amber' : metrics.onlineNodes ? 'green' : 'gray',
    confidence: metrics.avgConfidence === null || metrics.avgConfidence === undefined ? 'gray' : 'blue',
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
      {METRICS.map(({ key, label, icon: Icon }) => (
        <div key={key} style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          paddingRight: '20px',
          borderRight:  `1px solid ${C.border}`,
          flexShrink:   0,
        }}>
          {createElement(Icon, { size: 15, color: C.text })}
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
                color: C.text,
              }}>
                {values[key]}
              </span>
              <Tag color={statusColors[key]}>{statuses[key]}</Tag>
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
        <AlertTriangle size={15} color={metrics.attentionNodes ? C.red : C.green} />
        <div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '12px',
            color:      C.textDim,
          }}>
            Needs Attention
          </div>
          <Tag color={metrics.totalNodes === 0 ? 'gray' : metrics.attentionNodes ? 'red' : 'green'}>
            {metrics.totalNodes === 0
              ? 'Waiting for sensor information'
              : metrics.attentionNodes
                ? `${metrics.attentionNodes} sensor${metrics.attentionNodes === 1 ? '' : 's'} need checking`
                : 'All sensors okay'}
          </Tag>
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
