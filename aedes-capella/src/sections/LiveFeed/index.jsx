import { Activity, Database, Shield } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import Glossary from '../../components/ui/Glossary';
import PaletteGuide from '../../components/ui/PaletteGuide';
import FeedTable from './FeedTable';
import ActivitySummary from './ActivitySummary';

/** Section 1 - Latest sensor activity */
export default function LiveFeed({ dashboardData, deviceStatus }) {
  const events = dashboardData?.activity || [];
  const deviceLabels = (deviceStatus?.devices || []).reduce((lookup, device) => ({
    ...lookup,
    [device.device_id]: device.device_label,
  }), {});

  return (
    <div>
      <SectionHeader
        icon={Activity}
        title="Latest Sensor Activity"
        subtitle="Recent sensor updates and possible mosquito matches"
      />
      <Banner
        icon={Shield}
        text="This list shows what the sensors sent. A possible mosquito match is not proof of mosquitoes. If the list is empty, check Sensor Status."
        color="blue"
      />
      <Banner
        icon={Database}
        text={dashboardData?.reconciledAt
          ? `Last full reconciliation: ${dashboardData.reconciledAt.toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}. Dashboard connection: ${dashboardData.connectionState.replace('_', ' ')}.`
          : 'Waiting for the first complete live-data reconciliation.'}
        color={dashboardData?.connectionState === 'live' ? 'blue' : 'amber'}
      />
      {!dashboardData?.loading && !dashboardData?.errors?.activity && <ActivitySummary events={events} />}
      <FeedTable
        events={events}
        deviceLabels={deviceLabels}
        loading={dashboardData?.loading}
        error={dashboardData?.errors?.activity}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        <PaletteGuide />
        <Glossary />
      </div>
    </div>
  );
}
