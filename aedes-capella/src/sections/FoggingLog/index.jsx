import { Database, Zap } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import FogSummaryCards from './FogSummaryCards';
import HourlyFogChart from './HourlyFogChart';
import FogTable from './FogTable';
import { buildHourlyRelaySeries } from '../../utils/dashboardData';

export default function FoggingLog({ dashboardData }) {
  const relays = dashboardData?.relays || [];

  return (
    <div>
      <SectionHeader
        fig="FIG.03"
        title="Recorded Relay History"
        subtitle="Requested, started, stopped, and rejected device relay episodes"
      />
      <Banner
        icon={Zap}
        text="These are saved relay command/events from the C3. They do not by themselves prove that physical fluid was delivered."
        color="amber"
      />
      <Banner
        icon={Database}
        text={dashboardData?.reconciledAt
          ? `Last full reconciliation: ${dashboardData.reconciledAt.toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}.`
          : 'Waiting for the first complete relay-history reconciliation.'}
        color="blue"
      />
      {!dashboardData?.loading && !dashboardData?.errors?.relays && (
        <>
          <FogSummaryCards relays={relays} />
          <HourlyFogChart data={buildHourlyRelaySeries(relays)} />
        </>
      )}
      <FogTable
        relays={relays}
        loading={dashboardData?.loading}
        error={dashboardData?.errors?.relays}
      />
    </div>
  );
}
