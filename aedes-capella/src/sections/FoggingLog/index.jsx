import { Droplets, Zap } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FogSummaryCards from './FogSummaryCards';
import HourlyFogChart from './HourlyFogChart';
import FogTable from './FogTable';

/** Section 3 - Fogging Log */
export default function FoggingLog() {
  return (
    <div>
      <SectionHeader
        icon={Droplets}
        title="Fogging Log"
        subtitle="Automatic fogging history and trigger reasons - Sabang deployment"
      />
      <Banner
        icon={Zap}
        text="Auto-fogging starts only when confidence is at least 80%, the node is armed, and cooldown is clear. Each burst lasts 8 seconds."
        color="amber"
      />
      <FogSummaryCards />
      <HourlyFogChart />
      <FogTable />
    </div>
  );
}
