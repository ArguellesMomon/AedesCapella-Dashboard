import { Database, MapPin } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import Banner from '../../components/ui/Banner';
import Card from '../../components/ui/Card';
import MapSVG from './MapSVG';
import LocationActivityPanel from './LocationActivityPanel';

/** Section 2 - Risk Map */
export default function RiskMap({ theme = 'light', dashboardData }) {
  const locations = dashboardData?.locations || [];

  return (
    <div>
      <SectionHeader
        icon={MapPin}
        title="Barangay Map"
        subtitle="Recent activity by location"
      />
      <Banner
        icon={Database}
        text="The list below shows recent reports by location. The drawing is only a guide and is not connected to the live locations yet."
        color="amber"
      />

      <div className="risk-map-layout">
        <Card style={{ padding: '16px' }}>
          <MapSVG
            theme={theme}
            referenceOnly
          />
        </Card>

        <LocationActivityPanel
          locations={locations}
          loading={dashboardData?.loading}
          error={dashboardData?.errors?.locations}
        />
      </div>
    </div>
  );
}
