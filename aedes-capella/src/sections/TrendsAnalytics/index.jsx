import { Database, TrendingUp } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import MetricCards from './MetricCards';
import DetectionTrendChart from './DetectionTrendChart';
import DistributionCharts from './DistributionCharts';

/** Section 5 — Trends & Analytics */
export default function TrendsAnalytics({ dashboardData, deviceStatus }) {
  const events = dashboardData?.activity || [];
  const detections = dashboardData?.detections || [];
  const deviceLabels = (deviceStatus?.devices || []).reduce((lookup, device) => ({
    ...lookup,
    [device.device_id]: device.device_label,
  }), {});

  return (
    <div>
      <SectionHeader
        icon={TrendingUp}
        title="Activity Summary"
        subtitle="A simple summary of sensor and fogging activity"
      />
      <Banner
        icon={Database}
        text="These charts summarize sensor information. A possible mosquito match still needs a person to review it and is not proof of mosquitoes."
        color="blue"
      />
      <MetricCards events={events} detections={detections} />
      <DetectionTrendChart events={events} />
      <DistributionCharts events={events} detections={detections} deviceLabels={deviceLabels} />
    </div>
  );
}
