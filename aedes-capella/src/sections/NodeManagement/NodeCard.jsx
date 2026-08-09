import {
  Activity, AlertTriangle, CheckCircle2, Clock, Database,
  Hash, MemoryStick, Radio, ShieldCheck, Upload, Wifi,
} from 'lucide-react';
import { createElement } from 'react';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';
import WifiSignal from '../../components/charts/WifiSignal';
import {
  describeDeviceState,
  formatDuration,
  formatTimestamp,
  getStatusPresentation,
} from '../../utils/deviceStatus';
import { getEventPresentation } from '../../utils/dashboardData';

function Metric({ icon: Icon, label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
        {createElement(Icon, { size: 13, color: C.textDim })}
        <Mono size="12px" color={C.textDim}>{label}</Mono>
      </div>
      <div style={{ textAlign: 'right', minWidth: 0 }}>{children}</div>
    </div>
  );
}

export default function NodeCard({ device }) {
  const status = getStatusPresentation(device.operational_state);
  const isFault = device.operational_state === 'logging_fault';
  const isOffline = ['offline', 'never_seen'].includes(device.operational_state);
  const latestEvent = getEventPresentation(device.latest_event_kind);

  return (
    <Card style={{
      opacity: isOffline ? 0.82 : 1,
      border: `1px solid ${isFault ? C.red : device.needs_attention ? C.amber : C.border}`,
      background: C.surface,
      boxShadow: isFault ? `0 16px 34px ${C.red}18` : undefined,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: C.text }}>
            {device.device_label || 'Unnamed device'}
          </div>
          <Mono size="11px" color={C.textDim} style={{ display: 'block', marginTop: '5px', wordBreak: 'break-all' }}>
            {device.device_id}
          </Mono>
        </div>
        <Tag color={status.color}>{status.label}</Tag>
      </div>

      <div style={{
        padding: '12px',
        borderRadius: '8px',
        border: `1px solid ${isFault ? C.red : C.border}`,
        background: isFault ? C.redDim : C.surface2,
        color: isFault ? C.red : C.textDim,
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '12px',
        lineHeight: 1.5,
        marginBottom: '16px',
      }}>
        {describeDeviceState(device)}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Metric icon={Clock} label="Last update">
          <Mono size="12px" color={C.text}>{formatTimestamp(device.last_seen_at)}</Mono>
        </Metric>

        <Metric icon={Database} label="Records saved">
          <Tag color={device.log_healthy ? 'green' : device.has_ever_reported ? 'red' : 'gray'}>
            {device.has_ever_reported ? device.log_healthy ? 'Okay' : 'Problem' : 'No update yet'}
          </Tag>
        </Metric>

        <Metric icon={ShieldCheck} label="Relay-safe state">
          <Tag color={device.relay_safe_high ? 'green' : 'red'}>
            {device.relay_safe_high ? 'Safe-high reported' : 'Unsafe — check device'}
          </Tag>
        </Metric>

        <Metric icon={Wifi} label="Signal strength">
          {device.wifi_rssi_dbm === null ? <Mono size="12px" color={C.textDim}>Not available</Mono> : <WifiSignal dbm={device.wifi_rssi_dbm} />}
        </Metric>

        <Metric icon={Activity} label="Time running">
          <Mono size="12px" color={C.text}>{formatDuration(device.uptime_ms)}</Mono>
        </Metric>

        <Metric icon={Clock} label="Heartbeat age">
          <Mono size="12px" color={device.needs_attention ? C.amber : C.text}>
            {device.heartbeat_age_seconds === null ? 'Never reported' : formatDuration(Number(device.heartbeat_age_seconds) * 1000)}
          </Mono>
        </Metric>

        <Metric icon={Hash} label="C3 boot / ordinal">
          <Mono size="12px" color={C.text}>{device.c3_boot ?? '—'} / {device.last_ordinal ?? '—'}</Mono>
        </Metric>

        <Metric icon={MemoryStick} label="Free heap">
          <Mono size="12px" color={C.text}>
            {device.free_heap_bytes === null ? 'Not available' : `${Math.round(device.free_heap_bytes / 1024)} KiB`}
          </Mono>
        </Metric>

        <div style={{ height: 1, background: C.border }} />

        <Metric icon={Upload} label="Latest update">
          <Mono size="12px" color={C.text}>{formatTimestamp(device.latest_upload_or_event_at)}</Mono>
        </Metric>

        <Metric icon={Radio} label="Latest activity">
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Mono size="12px" color={C.text}>{device.latest_event_kind ? latestEvent.label : 'No activity yet'}</Mono>
            {device.latest_event_time_quality && <Tag color="blue">{device.latest_event_time_quality === 'unresolved' ? 'Time not confirmed' : 'Time confirmed'}</Tag>}
          </div>
        </Metric>

        <div className="info-grid info-grid-two">
          <div style={{ padding: '10px', background: C.surface2, borderRadius: '7px', textAlign: 'center' }}>
            <Mono size="20px" color={C.text} style={{ display: 'block' }}>{device.candidates_last_7d ?? 0}</Mono>
            <Mono size="10px" color={C.textDim}>POSSIBLE MATCHES · 7 DAYS</Mono>
          </div>
          <div style={{ padding: '10px', background: C.surface2, borderRadius: '7px', textAlign: 'center' }}>
            <Mono size="20px" color={C.text} style={{ display: 'block' }}>{device.mist_events_last_7d ?? 0}</Mono>
            <Mono size="10px" color={C.textDim}>RELAY ACTIVATIONS · 7 DAYS</Mono>
          </div>
        </div>
      </div>

      {isFault ? (
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'flex-start', color: C.red }}>
          <AlertTriangle size={15} style={{ marginTop: 2, flexShrink: 0 }} />
          <Mono size="11px" color={C.red} style={{ lineHeight: 1.5 }}>
            A later healthy update is needed. The earlier problem remains in the records.
          </Mono>
        </div>
      ) : device.log_healthy ? (
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center', color: C.green }}>
          <CheckCircle2 size={14} />
          <Mono size="11px" color={C.green}>The latest update says records are being saved.</Mono>
        </div>
      ) : null}
    </Card>
  );
}
