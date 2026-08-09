import { createElement } from 'react';
import { Activity, AlertTriangle, Droplets, Eye, Radio, Server } from 'lucide-react';
import { C } from '../../constants/colors';
import { usePHTime } from '../../hooks/usePHTime';
import Tag from '../ui/Tag';

const METRICS = [
  { key: 'candidates', label: 'Candidates / 24h', icon: Activity },
  { key: 'relays', label: 'Relay activations / 24h', icon: Droplets },
  { key: 'nodes', label: 'Sensors online', icon: Server },
  { key: 'score', label: 'Average candidate score', icon: Eye },
];

const CONNECTION = {
  live: { label: 'Live', color: 'green' },
  reconnecting: { label: 'Reconnecting', color: 'amber' },
  polling_fallback: { label: 'Polling fallback', color: 'red' },
};

export default function Topbar({ metrics, connectionState, reconciledAt }) {
  const { clock, date } = usePHTime();
  const connection = CONNECTION[connectionState] || CONNECTION.polling_fallback;
  const values = {
    candidates: metrics.loading ? 'Loading…' : metrics.candidateUnavailable ? 'Unavailable' : String(metrics.candidates ?? 0),
    relays: metrics.loading ? 'Loading…' : metrics.relayUnavailable ? 'Unavailable' : String(metrics.relays ?? 0),
    nodes: metrics.loading ? 'Loading…' : metrics.deviceUnavailable ? 'Unavailable' : `${metrics.onlineNodes ?? 0} / ${metrics.totalNodes ?? 0}`,
    score: metrics.loading ? 'Loading…' : metrics.candidateUnavailable ? 'Unavailable'
      : metrics.avgCandidateScore === null ? '—' : `${metrics.avgCandidateScore.toFixed(1)}%`,
  };

  return (
    <header className="dashboard-topbar" aria-label="Live dashboard summary">
      {METRICS.map(({ key, label, icon: Icon }) => (
        <div key={key} className="topbar-metric">
          {createElement(Icon, { size: 15, color: C.text })}
          <div>
            <div className="topbar-label">{label}</div>
            <div className="topbar-value">{values[key]}</div>
          </div>
        </div>
      ))}

      <div className="topbar-metric">
        <AlertTriangle size={15} color={metrics.attentionNodes ? C.red : C.green} />
        <div>
          <div className="topbar-label">Needs attention</div>
          <Tag color={metrics.deviceUnavailable ? 'red' : metrics.totalNodes === 0 ? 'gray' : metrics.attentionNodes ? 'red' : 'green'}>
            {metrics.deviceUnavailable ? 'Unavailable' : metrics.totalNodes === 0 ? 'No device data' : String(metrics.attentionNodes)}
          </Tag>
        </div>
      </div>

      <div className="topbar-connection" role="status" aria-live="polite">
        <div className="topbar-label"><Radio size={12} /> Dashboard connection</div>
        <Tag color={connection.color}>{connection.label}</Tag>
        <div className="topbar-reconciled">
          {reconciledAt
            ? `Reconciled ${reconciledAt.toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila' })}`
            : 'Awaiting first reconciliation'}
        </div>
      </div>

      <div className="topbar-clock">
        <div>{clock}</div>
        <span>{date} PHT</span>
      </div>
    </header>
  );
}
