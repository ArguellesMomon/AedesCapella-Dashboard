import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { SITIO_LIST } from '../../constants/MockData';
import { C } from '../../constants/colors';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import MapSVG from './MapSVG';
import SitioDetail from './SitioDetail';
import PriorityList from './PriorityList';

/** Section 2 — Risk Map */
export default function RiskMap({ theme = 'light' }) {
  const [selectedSitioId, setSelectedSitioId] = useState(null);

  const selectedSitio = selectedSitioId
    ? SITIO_LIST.find(s => s.id === selectedSitioId)
    : null;

  return (
    <div>
      <SectionHeader
        icon={MapPin}
        title="Risk Map"
        subtitle="Sitio-level Aedes aegypti activity — Sabang, Lipa City, Batangas"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>

        {/* SVG Map card */}
        <Card style={{ padding: '16px' }}>
          <MapSVG
            theme={theme}
            selectedSitio={selectedSitioId}
            onSelectSitio={setSelectedSitioId}
          />
        </Card>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SitioDetail
            sitio={selectedSitio}
            onClose={() => setSelectedSitioId(null)}
          />
          <PriorityList onSelect={setSelectedSitioId} />
        </div>
      </div>
    </div>
  );
}
