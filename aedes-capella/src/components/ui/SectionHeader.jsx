import { createElement } from 'react';
import { C } from '../../constants/colors';

/**
 * Consistent section heading with icon, title, and optional subtitle.
 */
export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
        <div style={{
          width:          '36px',
          height:         '36px',
          borderRadius:   '8px',
          background:     C.amberDim,
          border:         `1px solid ${C.amber}55`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          {createElement(Icon, { size: 18, color: C.amber })}
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize:   '20px',
          fontWeight: 700,
          color:      C.text,
          margin:     0,
        }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize:   '11px',
          color:      C.textDim,
          marginLeft: '48px',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
