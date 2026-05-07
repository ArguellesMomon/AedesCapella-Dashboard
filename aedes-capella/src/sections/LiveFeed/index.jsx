import { Activity, Shield } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FeedTable from './FeedTable';
import SystemMetadata from './SystemMetadata';

/** Section 1 - Live Detection Feed */
export default function LiveFeed({ detections }) {
  return (
    <div>
      <SectionHeader
        icon={Activity}
        title="Live Detection Feed"
        subtitle="Real-time mosquito detection entries, confidence labels, and next steps"
      />
      <Banner
        icon={Shield}
        text="Only confirmed mosquito wingbeat matches appear here. Hover confidence and auto-action labels to see what they mean."
        color="blue"
      />
      <FeedTable detections={detections} />
      <SystemMetadata />
    </div>
  );
}
