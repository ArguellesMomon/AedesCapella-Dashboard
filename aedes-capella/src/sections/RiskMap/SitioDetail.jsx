import { Search, X } from 'lucide-react';
import { C, RISK_COLORS } from '../../constants/colors';
import { getRiskAction } from '../../utils/decisionLabels';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import EmptyState from '../../components/ui/EmptyState';

/** Click-to-open detail panel for a selected sitio zone. */
export default function SitioDetail({ sitio, onClose }) {
  if (!sitio) {
    return (
      <EmptyState
        title="No sitio selected"
        message="Click a zone on the map or choose an item from the high-risk list."
        action="Suggested action: start with Critical and High sitios."
      />
    );
  }

  const rc = RISK_COLORS[sitio.risk];
  const action = getRiskAction(sitio.risk);

  return (
    <Card style={{ background: C.surface2, position: 'relative' }}>
      <button
        onClick={onClose}
        aria-label="Close sitio details"
        title="Close sitio details"
        style={{
          position:   'absolute',
          top:        '12px',
          right:      '12px',
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          color:      C.textDim,
        }}
      >
        <X size={14} />
      </button>

      <div style={{
        fontFamily:   'Syne, sans-serif',
        fontSize:     '13px',
        fontWeight:   700,
        color:        C.text,
        marginBottom: '12px',
      }}>
        {sitio.name}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Mono size="11px" color={C.textDim}>Risk Level</Mono>
          <span
            title={`${sitio.risk}: ${action}`}
            style={{
              background:    rc.bg,
              border:        `1px solid ${rc.border}`,
              color:         rc.text,
              padding:       '2px 8px',
              borderRadius:  '4px',
              fontFamily:    'IBM Plex Mono, monospace',
              fontSize:      '10px',
              fontWeight:    700,
            }}
          >
            {sitio.risk.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono size="11px" color={C.textDim}>Detections Today</Mono>
          <Mono size="11px" color={C.text}>{sitio.detections}</Mono>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono size="11px" color={C.textDim}>Assigned Node</Mono>
          <Mono size="11px" color={sitio.node ? C.green : C.gray}>
            {sitio.node ?? 'None'}
          </Mono>
        </div>

        {sitio.node ? (
          <div style={{
            marginTop:    '8px',
            padding:      '8px',
            background:   `${C.green}11`,
            border:       `1px solid ${C.green}33`,
            borderRadius: '6px',
          }}>
            <Mono size="10px" color={C.green}>
              Auto-fog armed: triggers when confidence is at least 80% and cooldown is clear.
            </Mono>
          </div>
        ) : (
          <div style={{
            marginTop:    '8px',
            padding:      '8px',
            background:   C.surface,
            border:       `1px solid ${C.border}`,
            borderRadius: '6px',
          }}>
            <Mono size="10px" color={C.textDim}>
              No node assigned. Manual inspection is needed before auto-response is available.
            </Mono>
          </div>
        )}

        <button
          title={`Recommended next step: ${action}`}
          style={{
            marginTop: '8px',
            border: `1px solid ${rc.border}`,
            background: rc.bg,
            color: rc.text,
            borderRadius: '6px',
            padding: '8px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          <Search size={13} />
          {action}
        </button>
      </div>
    </Card>
  );
}
