import { Server, Cpu } from 'lucide-react';
import { NODES_DATA } from '../../constants/MockData';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import NodeCard from './NodeCard';

/** Section 4 — Node Management */
export default function NodeManagement() {
  return (
    <div>
      <SectionHeader
        icon={Server}
        title="Node Management"
        subtitle="ESP32-S3 sensor nodes deployed in Sabang"
      />
      <Banner
        icon={Cpu}
        text="Each node runs the 1D-CNN classification model independently on-device and controls its own ultrasonic mist maker via a 5V relay — no cloud dependency for detection."
        color="blue"
      />

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '20px',
      }}>
        {NODES_DATA.map(node => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}