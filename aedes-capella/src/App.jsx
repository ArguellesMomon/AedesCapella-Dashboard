import { lazy, Suspense, useEffect, useState } from 'react';
import { C } from './constants/colors';
import { useOperatorSession } from './hooks/useOperatorSession';
import { useDeviceStatus } from './hooks/useDeviceStatus';
import { useDashboardData } from './hooks/useDashboardData';
import { average, countSince } from './utils/dashboardData';
import LoginPage from './components/auth/LoginPage';
import LogoutConfirmModal from './components/auth/LogoutConfirmModal';

// Layout
import Sidebar from './components/layout/Sidebar';
import Topbar  from './components/layout/Topbar';

const LiveFeed = lazy(() => import('./sections/LiveFeed'));
const RiskMap = lazy(() => import('./sections/RiskMap'));
const FoggingLog = lazy(() => import('./sections/FoggingLog'));
const NodeManagement = lazy(() => import('./sections/NodeManagement'));
const TrendsAnalytics = lazy(() => import('./sections/TrendsAnalytics'));

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { session, login, logout } = useOperatorSession();
  const deviceStatus = useDeviceStatus(session?.accessToken);
  const dashboardData = useDashboardData(session?.accessToken);

  const asOf = dashboardData.refreshedAt?.getTime();
  const since24h = asOf ? asOf - (24 * 60 * 60 * 1000) : Number.POSITIVE_INFINITY;
  const detectionsToday = countSince(dashboardData.detections, 'detected_at', since24h);
  const foggingToday = countSince(dashboardData.fogging, 'triggered_at', since24h);
  const onlineNodes = deviceStatus.devices.filter(device => device.operational_state === 'online').length;
  const attentionNodes = deviceStatus.devices.filter(device => device.needs_attention).length;
  const avgConfidence = average(dashboardData.detections.map(record => record.confidence_score));

  // Render the active section component
  const ActiveSection = SECTIONS[activeSection];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  if (!session) {
    return (
      <LoginPage
        theme={theme}
        onToggleTheme={() => setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')}
        onLogin={login}
      />
    );
  }

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
        deviceStatus={deviceStatus}
        theme={theme}
        onToggleTheme={() => setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')}
        onLogout={() => setShowLogoutModal(true)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar
          metrics={{
            detections: detectionsToday,
            fogs: foggingToday,
            onlineNodes,
            totalNodes: deviceStatus.devices.length,
            avgConfidence,
            attentionNodes,
          }}
        />

        {/* Scrollable section content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <Suspense fallback={<div style={{ color: C.textDim }}>Loading dashboard section…</div>}>
            <ActiveSection
              theme={theme}
              deviceStatus={deviceStatus}
              dashboardData={dashboardData}
            />
          </Suspense>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            logout();
          }}
        />
      )}
    </div>
  );
}
