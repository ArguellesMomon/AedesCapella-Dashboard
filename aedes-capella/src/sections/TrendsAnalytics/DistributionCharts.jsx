import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { C } from '../../constants/colors';
import { NODE_DETECTIONS, CONFIDENCE_DIST } from '../../constants/MockData';
import Card from '../../components/ui/Card';

const tooltipStyle = {
  background:   C.surface,
  border:       `1px solid ${C.border}`,
  borderRadius: '8px',
  fontFamily:   'IBM Plex Mono, monospace',
  fontSize:     '12px',
};

const NODE_COLORS  = [C.red, C.amber, C.gray];
const CONF_COLORS  = [C.green, C.blue, C.amber, C.red];

/** Two side-by-side bar charts: detections per node and confidence score distribution. */
export default function DistributionCharts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

      {/* Detections per node */}
      <Card style={{ background: C.surface2 }}>
        <div style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '13px',
          fontWeight:    600,
          color:         C.textDim,
          marginBottom:  '16px',
          letterSpacing: '0.08em',
        }}>
          DETECTIONS PER NODE
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={NODE_DETECTIONS} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}66`} vertical={false} />
            <XAxis
              dataKey="node"
              tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {NODE_DETECTIONS.map((_, i) => (
                <Cell key={i} fill={NODE_COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Confidence score distribution */}
      <Card style={{ background: C.surface2 }}>
        <div style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '13px',
          fontWeight:    600,
          color:         C.textDim,
          marginBottom:  '16px',
          letterSpacing: '0.08em',
        }}>
          CONFIDENCE SCORE DISTRIBUTION
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={CONFIDENCE_DIST} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}66`} vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, fill: C.textDim }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {CONFIDENCE_DIST.map((_, i) => (
                <Cell key={i} fill={CONF_COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}