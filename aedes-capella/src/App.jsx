import { useEffect, useState } from 'react';
import { C } from './constants/colors';
import { useLiveDetections } from './hooks/useLiveDetections';

// Layout
import Sidebar from './components/layout/Sidebar';
import Topbar  from './components/layout/Topbar';

// Sections
import LiveFeed       from './sections/LiveFeed';
import RiskMap        from './sections/RiskMap';
import FoggingLog     from './sections/FoggingLog';
import NodeManagement from './sections/NodeManagement';
import TrendsAnalytics from './sections/TrendsAnalytics';

const SECTIONS = {
  feed:   LiveFeed,
  map:    RiskMap,
  fog:    FoggingLog,
  nodes:  NodeManagement,
  trends: TrendsAnalytics,
};

const THEME_STORAGE_KEY = 'aedes-capella-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [activeSection, setActiveSection] = useState('feed');
  const [theme, setTheme] = useState(getInitialTheme);
  const { detections, alertPulse } = useLiveDetections();

  // Derive topbar detection count from live feed
  const detectionCount = detections.length + 89;

  // Render the active section component
  const ActiveSection = SECTIONS[activeSection];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div style={{
      display:    'flex',
      height:     '100vh',
      overflow:   'hidden',
      background: C.bg,
      fontFamily: 'Syne, sans-serif',
    }}>
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        alertPulse={alertPulse}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar
          metrics={{ detections: detectionCount }}
          theme={theme}
          onToggleTheme={() => setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')}
        />

        {/* Scrollable section content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <ActiveSection detections={detections} />
        </div>
      </div>
    </div>
  );
}
