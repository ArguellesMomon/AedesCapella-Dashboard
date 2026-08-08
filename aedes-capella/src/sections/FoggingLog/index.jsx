import { Database, Droplets, Zap } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FogSummaryCards from './FogSummaryCards';
import HourlyFogChart from './HourlyFogChart';
import FogTable from './FogTable';
import { buildHourlyFogSeries } from '../../utils/dashboardData';

/** Section 3 - Fogging Log */
export default function FoggingLog({ dashboardData, deviceStatus }) {
  const fogging = dashboardData?.fogging || [];
  const deviceLabels = (deviceStatus?.devices || []).reduce((lookup, device) => ({
    ...lookup,
    [device.device_id]: device.device_label,
  }), {});

  return (
    <div>
      <SectionHeader
        icon={Droplets}
        title="Fogging History"
        subtitle="Recorded fogging actions from the sensors"
      />
      <Banner
        icon={Zap}
        text="This page lists fogging actions saved by the system. An empty list means no action was saved here; it does not prove what happened outside the system."
        color="amber"
      />
      <Banner
        icon={Database}
        text={dashboardData?.refreshedAt
          ? `Last checked: ${dashboardData.refreshedAt.toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}.`
          : 'Waiting for the first fogging update.'}
        color="blue"
      />
      <FogSummaryCards fogging={fogging} deviceLabels={deviceLabels} asOf={dashboardData?.refreshedAt?.getTime()} />
      <HourlyFogChart data={buildHourlyFogSeries(fogging)} />
      <FogTable
        fogs={fogging}
        deviceLabels={deviceLabels}
        loading={dashboardData?.loading}
        error={dashboardData?.errors?.fogging}
      />
    </div>
  );
}
