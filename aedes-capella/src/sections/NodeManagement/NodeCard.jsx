import { Battery, Wifi, Droplets, Clock, AlertTriangle, Search } from 'lucide-react';
import { C } from '../../constants/colors';
import { getBatteryDecision } from '../../utils/decisionLabels';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import WifiSignal from '../../components/charts/WifiSignal';

/** Single ESP32-S3 sensor node card showing all hardware and status info. */
export default function NodeCard({ node }) {
  const batteryDecision = getBatteryDecision(node.battery);
  const batteryColor = C[batteryDecision.color] ?? C.textDim;

  return (
    <Card
      glow={node.batteryLow && node.online}
      style={{
        opacity:    node.online ? 1 : 0.55,
        border:     node.batteryLow && node.online
          ? `1px solid ${C.amber}`
          : `1px solid ${C.border}`,
        background: node.online ? C.surface : C.surface2,
      }}
    >
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        marginBottom:   '18px',
      }}>
        <div>
          <div style={{
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '16px',
            fontWeight:    700,
            color:         C.text,
            letterSpacing: '0.05em',
          }}>
            {node.id}
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '13px',
            color:      C.textDim,
            marginTop:  '2px',
          }}>
            {node.sitio}
          </div>
        </div>
        <Tag color={node.online ? 'green' : 'gray'}>
          {node.online ? 'ONLINE' : 'OFFLINE'}
        </Tag>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Battery size={12} color={batteryColor} />
              <Mono size="13px" color={C.textDim}>Battery</Mono>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mono size="13px" color={batteryColor} style={{ fontWeight: 700 }}>{node.battery}%</Mono>
              <Tag color={batteryDecision.color}>{batteryDecision.label}</Tag>
            </div>
          </div>
          <div style={{ height: '5px', background: C.border, borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width:        `${node.battery}%`,
              height:       '100%',
              borderRadius: '3px',
              background:   batteryColor,
              transition:   'width 0.4s',
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Wifi size={12} color={C.textDim} />
            <Mono size="13px" color={C.textDim}>Signal</Mono>
          </div>
          <WifiSignal dbm={node.wifi} />
        </div>

        <div style={{ height: '1px', background: C.border }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            padding:      '8px',
            background:   C.surface2,
            borderRadius: '6px',
            textAlign:    'center',
          }}>
            <Mono size="18px" color={C.text} style={{ display: 'block' }}>
              {node.detections}
            </Mono>
            <Mono size="12px" color={C.textDim}>DETECTIONS</Mono>
          </div>
          <div style={{
            padding:      '8px',
            background:   C.surface2,
            borderRadius: '6px',
            textAlign:    'center',
          }}>
            <Mono size="18px" color={C.text} style={{ display: 'block' }}>
              {node.fogEvents}
            </Mono>
            <Mono size="12px" color={C.textDim}>FOG EVENTS</Mono>
          </div>
        </div>

        <div style={{ height: '1px', background: C.border }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Droplets size={12} color={C.textDim} />
            <Mono size="13px" color={C.textDim}>Fogger</Mono>
          </div>
          <Mono size="13px" color={
            node.mistStatus === 'Offline'             ? C.gray  :
            node.mistStatus.includes('Critical')      ? C.amber :
            C.green
          }>
            {node.mistStatus}
          </Mono>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} color={C.textDim} />
            <Mono size="13px" color={C.textDim}>Uptime</Mono>
          </div>
          <Mono size="13px" color={C.textDim}>{node.uptime}</Mono>
        </div>
      </div>

      {node.batteryLow && node.online && (
        <div style={{
          marginTop:    '14px',
          padding:      '8px',
          background:   `${C.amber}11`,
          border:       `1px solid ${C.amber}44`,
          borderRadius: '6px',
          display:      'flex',
          alignItems:   'center',
          gap:          '6px',
        }}>
          <AlertTriangle size={12} color={C.amber} />
          <Mono size="12px" color={C.amber} style={{ fontWeight: 700 }}>Battery low. Review charging schedule.</Mono>
        </div>
      )}

      <button
        title={`Inspect ${node.id}`}
        style={{
          width: '100%',
          marginTop: '14px',
          border: `1px solid ${C.border}`,
          background: C.surface2,
          color: C.text,
          borderRadius: '6px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        <Search size={13} />
        Inspect Node
      </button>
    </Card>
  );
}
