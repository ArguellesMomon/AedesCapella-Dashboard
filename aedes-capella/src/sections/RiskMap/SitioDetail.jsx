import { X } from 'lucide-react';
import { C, RISK_COLORS } from '../../constants/colors';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';

/** Click-to-open detail panel for a selected sitio zone. */
export default function SitioDetail({ sitio, onClose }) {
  if (!sitio) {
    return (
      <Card style={{ background: C.surface2 }}>
        <Mono size="11px" color={C.textDim}>
          Click a sitio zone on the map to view details.
        </Mono>
      </Card>
    );
  }

  const rc = RISK_COLORS[sitio.risk];

  return (
    <Card style={{ background: C.surface2, position: 'relative' }}>
      <button
        onClick={onClose}
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
          <span style={{
            background:    rc.bg,
            border:        `1px solid ${rc.border}`,
            color:         rc.text,
            padding:       '2px 8px',
            borderRadius:  '4px',
            fontFamily:    'IBM Plex Mono, monospace',
            fontSize:      '10px',
            fontWeight:    700,
          }}>
            {sitio.risk.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono size="11px" color={C.textDim}>Detections Today</Mono>
          <Mono size="11px" color={C.amber}>{sitio.detections}</Mono>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono size="11px" color={C.textDim}>Assigned Node</Mono>
          <Mono size="11px" color={sitio.node ? C.green : C.gray}>
            {sitio.node ?? 'None'}
          </Mono>
        </div>

        {sitio.node && (
          <div style={{
            marginTop:    '8px',
            padding:      '8px',
            background:   `${C.green}11`,
            border:       `1px solid ${C.green}33`,
            borderRadius: '6px',
          }}>
            <Mono size="10px" color={C.green}>✓ Auto-fog armed at this site</Mono>
          </div>
        )}
      </div>
    </Card>
  );
}