import { Server, Cpu } from 'lucide-react';
import { NODES_DATA } from '../../constants/MockData';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import EmptyState from '../../components/ui/EmptyState';
import DeviceStateGuide from './DeviceStateGuide';
import NodeCard from './NodeCard';

/** Section 4 - Node Management */
export default function NodeManagement() {
  return (
    <div>
      <SectionHeader
        icon={Server}
        title="Node Management"
        subtitle="Sensor node health, battery status, and fogger readiness"
      />
      <Banner
        icon={Cpu}
        text="Each node detects mosquito wingbeats locally and controls its fogger without waiting for the cloud."
        color="blue"
      />
      <DeviceStateGuide />

      {NODES_DATA.length ? (
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '20px',
        }}>
          {NODES_DATA.map(node => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No nodes registered"
          message="Node cards will appear after devices are added to the deployment list."
          action="Suggested action: register a sensor node before field testing."
        />
      )}
    </div>
  );
}
