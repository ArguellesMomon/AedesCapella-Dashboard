import { Battery, Wifi, Droplets, Clock, AlertTriangle } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import WifiSignal from '../../components/charts/WifiSignal';

/** Single ESP32-S3 sensor node card showing all hardware and status info. */
export default function NodeCard({ node }) {
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
      {/* Header: Node ID + online badge */}
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
            color:         C.amber,
            letterSpacing: '0.05em',
          }}>
            {node.id}
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize:   '11px',
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

        {/* Battery */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Battery size={12} color={node.battery < 40 ? C.amber : C.textDim} />
              <Mono size="10px" color={C.textDim}>Battery</Mono>
            </div>
            <Mono size="11px" color={node.battery < 40 ? C.amber : C.green}>
              {node.battery}%
            </Mono>
          </div>
          <div style={{ height: '5px', background: C.border, borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width:        `${node.battery}%`,
              height:       '100%',
              borderRadius: '3px',
              background:   node.battery < 40 ? C.amber : C.green,
              transition:   'width 0.4s',
            }} />
          </div>
        </div>

        {/* WiFi */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Wifi size={12} color={C.textDim} />
            <Mono size="10px" color={C.textDim}>WiFi Signal</Mono>
          </div>
          <WifiSignal dbm={node.wifi} />
        </div>

        <div style={{ height: '1px', background: C.border }} />

        {/* Detection & fog counts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            padding:      '8px',
            background:   C.surface2,
            borderRadius: '6px',
            textAlign:    'center',
          }}>
            <Mono size="18px" color={C.amber} style={{ display: 'block' }}>
              {node.detections}
            </Mono>
            <Mono size="9px" color={C.textDim}>DETECTIONS</Mono>
          </div>
          <div style={{
            padding:      '8px',
            background:   C.surface2,
            borderRadius: '6px',
            textAlign:    'center',
          }}>
            <Mono size="18px" color={C.blue} style={{ display: 'block' }}>
              {node.fogEvents}
            </Mono>
            <Mono size="9px" color={C.textDim}>FOG EVENTS</Mono>
          </div>
        </div>

        <div style={{ height: '1px', background: C.border }} />

        {/* Mist maker status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Droplets size={12} color={C.textDim} />
            <Mono size="10px" color={C.textDim}>Mist Maker</Mono>
          </div>
          <Mono size="10px" color={
            node.mistStatus === 'Offline'             ? C.gray  :
            node.mistStatus.includes('Critical')      ? C.amber :
            C.green
          }>
            {node.mistStatus}
          </Mono>
        </div>

        {/* Uptime */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} color={C.textDim} />
            <Mono size="10px" color={C.textDim}>Uptime</Mono>
          </div>
          <Mono size="10px" color={C.textDim}>{node.uptime}</Mono>
        </div>
      </div>

      {/* Battery critical warning */}
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
          <Mono size="10px" color={C.amber}>Battery critical — charge soon</Mono>
        </div>
      )}
    </Card>
  );
}