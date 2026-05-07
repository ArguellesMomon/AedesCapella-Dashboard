import { Inbox } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from './Card';
import Mono from './Mono';

export default function EmptyState({ title, message, action }) {
  return (
    <Card style={{
      background: C.surface2,
      border: `1px dashed ${C.borderBright}`,
      padding: '22px',
      textAlign: 'center',
    }}>
      <Inbox size={22} color={C.gray} />
      <div style={{
        marginTop: '10px',
        fontFamily: 'Syne, sans-serif',
        fontSize: '14px',
        fontWeight: 700,
        color: C.text,
      }}>
        {title}
      </div>
      <div style={{ marginTop: '6px' }}>
        <Mono size="11px" color={C.textDim}>{message}</Mono>
      </div>
      {action && (
        <div style={{ marginTop: '12px' }}>
          <Mono size="10px" color={C.textDim}>{action}</Mono>
        </div>
      )}
    </Card>
  );
}
