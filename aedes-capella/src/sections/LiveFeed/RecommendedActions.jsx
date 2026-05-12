import { ClipboardCheck, Droplets, ShieldCheck } from 'lucide-react';
import { C } from '../../constants/colors';
import { getRecommendedAction } from '../../utils/decisionLabels';
import Card from '../../components/ui/Card';
import Mono from '../../components/ui/Mono';
import Tag from '../../components/ui/Tag';

export default function RecommendedActions({ detections }) {
  const items = detections.slice(0, 3).map(detection => ({
    ...detection,
    recommendation: getRecommendedAction(detection),
  }));

  if (!items.length) return null;

  return (
    <Card style={{ marginBottom: '20px', background: C.surface2 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={15} color={C.green} />
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: C.text,
          }}>
            Recommended Prevention Actions
          </div>
        </div>
        <Tag color="green">field guidance</Tag>
      </div>

      <div className="info-grid info-grid-three">
        {items.map(item => (
          <div
            key={item.id}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
              <Mono size="14px" color={C.text} style={{ fontWeight: 700 }}>{item.sitio}</Mono>
              <Tag color={item.recommendation.color}>{item.confidence}%</Tag>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
              {item.autoResponse === 'fogged' ? <Droplets size={15} color={C.green} /> : <ClipboardCheck size={15} color={C.amber} />}
              <Mono size="13px" color={C.text} style={{ fontWeight: 700 }}>{item.recommendation.action}</Mono>
            </div>
            <Mono size="12px" color={C.textDim} style={{ display: 'block', marginBottom: '7px', lineHeight: 1.45 }}>
              {item.recommendation.reason}
            </Mono>
            <Mono size="12px" color={C.textDim} style={{ lineHeight: 1.45 }}>{item.recommendation.why}</Mono>
          </div>
        ))}
      </div>
    </Card>
  );
}
