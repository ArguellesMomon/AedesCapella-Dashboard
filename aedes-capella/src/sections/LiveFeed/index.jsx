import { Activity, Shield } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FeedTable from './FeedTable';
import SystemMetadata from './SystemMetadata';

/** Section 1 — Live Detection Feed */
export default function LiveFeed({ detections }) {
  return (
    <div>
      <SectionHeader
        icon={Activity}
        title="Live Detection Feed"
        subtitle="Real-time Aedes aegypti acoustic classifications — Sabang, Lipa City"
      />
      <Banner
        icon={Shield}
        text="Non-target sounds are filtered at the edge device and never transmitted to the cloud. Only confirmed wingbeat signatures are reported."
        color="blue"
      />
      <FeedTable detections={detections} />
      <SystemMetadata />
    </div>
  );
}