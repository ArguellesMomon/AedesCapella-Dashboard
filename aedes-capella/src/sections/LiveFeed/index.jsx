import { Activity, Shield } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import Glossary from '../../components/ui/Glossary';
import PaletteGuide from '../../components/ui/PaletteGuide';
import FeedTable from './FeedTable';
import RecommendedActions from './RecommendedActions';
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
      <RecommendedActions detections={detections} />
      <FeedTable detections={detections} />
      <SystemMetadata />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        <PaletteGuide />
        <Glossary />
      </div>
    </div>
  );
}
