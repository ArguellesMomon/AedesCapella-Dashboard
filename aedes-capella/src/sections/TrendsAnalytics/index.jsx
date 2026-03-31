import { TrendingUp } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import MetricCards from './MetricCards';
import DetectionTrendChart from './DetectionTrendChart';
import DistributionCharts from './DistributionCharts';

/** Section 5 — Trends & Analytics */
export default function TrendsAnalytics() {
  return (
    <div>
      <SectionHeader
        icon={TrendingUp}
        title="Trends & Analytics"
        subtitle="Weekly and historical Aedes aegypti detection analysis"
      />
      <MetricCards />
      <DetectionTrendChart />
      <DistributionCharts />
    </div>
  );
}