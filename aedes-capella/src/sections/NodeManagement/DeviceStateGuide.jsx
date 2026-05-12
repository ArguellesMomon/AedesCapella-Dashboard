import { BatteryWarning, Droplets, Power, WifiOff } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

const STATES = [
  {
    title: 'No data',
    message: 'This panel appears before a node has sent its first reading.',
    action: 'Suggested action: wait for telemetry or check device pairing.',
    icon: Power,
    variant: 'startup',
  },
  {
    title: 'Offline device',
    message: 'The node is registered but not currently sending updates.',
    action: 'Suggested action: check power, Wi-Fi, and enclosure placement.',
    icon: WifiOff,
    variant: 'offline',
  },
  {
    title: 'Low fluid',
    message: 'The fogger can detect mosquitoes, but response capacity is limited.',
    action: 'Suggested action: refill before the next high-activity window.',
    icon: Droplets,
    variant: 'warning',
  },
  {
    title: 'Startup',
    message: 'The node is booting and calibrating sensors.',
    action: 'Suggested action: keep it powered until status changes to online.',
    icon: BatteryWarning,
    variant: 'startup',
  },
];

export default function DeviceStateGuide() {
  return (
    <div className="info-grid info-grid-four" style={{ marginBottom: '20px' }}>
      {STATES.map(state => (
        <EmptyState
          key={state.title}
          title={state.title}
          message={state.message}
          action={state.action}
          icon={state.icon}
          variant={state.variant}
          compact
        />
      ))}
    </div>
  );
}
