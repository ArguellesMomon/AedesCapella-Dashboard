import { Droplets, Zap } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FogSummaryCards from './FogSummaryCards';
import HourlyFogChart from './HourlyFogChart';
import FogTable from './FogTable';

/** Section 3 — Fogging Log */
export default function FoggingLog() {
  return (
    <div>
      <SectionHeader
        icon={Droplets}
        title="Fogging Log"
        subtitle="Complete auto-fog event history — Sabang deployment"
      />
      <Banner
        icon={Zap}
        text="All fog events are fully automatic — triggered on-device by the ESP32-S3 via 5V relay at ≥80% confidence. No manual activation is possible."
        color="amber"
      />
      <FogSummaryCards />
      <HourlyFogChart />
      <FogTable />
    </div>
  );
}