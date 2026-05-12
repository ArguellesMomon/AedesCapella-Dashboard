import { AlertTriangle, MapPin, Search } from 'lucide-react';
import { C, RISK_COLORS } from '../../constants/colors';
import { SITIO_LIST } from '../../constants/MockData';
import { getRiskAction } from '../../utils/decisionLabels';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';

const HIGH_RISK_LEVELS = ['Critical', 'High'];

/** Dedicated intervention queue for sitios that need the fastest scan. */
export default function HighRiskPanel({ onSelect }) {
  const highRiskSitios = SITIO_LIST
    .filter(s => HIGH_RISK_LEVELS.includes(s.risk))
    .sort((a, b) => b.detections - a.detections);

  const totalDetections = highRiskSitios.reduce((sum, s) => sum + s.detections, 0);

  if (!highRiskSitios.length) {
    return (
      <EmptyState
        title="No high-risk sitios"
        message="No Critical or High zones are active right now."
        action="Suggested action: continue routine monitoring."
      />
    );
  }

  return (
    <Card style={{
      background: `linear-gradient(160deg, ${C.redDim}, ${C.surface2} 76%)`,
      border: `1px solid ${C.red}55`,
      padding: '16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} color={C.red} />
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '0.08em',
          }}>
            HIGH-RISK ITEMS
          </div>
        </div>
        <Tag color="red">{totalDetections} detections</Tag>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {highRiskSitios.map((s, index) => {
          const rc = RISK_COLORS[s.risk];
          const action = getRiskAction(s.risk);

          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              title={`${action}: ${s.name}`}
              style={{
                width: '100%',
                border: `1px solid ${rc.border}`,
                background: rc.bg,
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
                  <MapPin size={13} color={rc.text} />
                  <Mono size="14px" color={rc.text} style={{ fontWeight: 700 }}>
                    {s.name}
                  </Mono>
                </div>
                <Mono size="12px" color={rc.text} style={{ fontWeight: 700 }}>
                  #{index + 1}
                </Mono>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <Mono size="12px" color={rc.text} style={{ fontWeight: 700 }}>{s.risk.toUpperCase()}</Mono>
                <Mono size="14px" color={rc.text} style={{ fontWeight: 700 }}>
                  {s.detections} today
                </Mono>
              </div>

              <div style={{
                marginTop: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: rc.text,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '12px',
                fontWeight: 700,
              }}>
                <Search size={12} />
                {action}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
