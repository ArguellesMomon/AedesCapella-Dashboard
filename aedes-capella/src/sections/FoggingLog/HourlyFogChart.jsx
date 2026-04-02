import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { C } from '../../constants/colors';
import { HOURLY_FOG } from '../../constants/MockData';
import Card from '../../components/ui/Card';

/** Bar chart showing auto-fog activations per hour over the last 12 hours. */
export default function HourlyFogChart() {
  return (
    <Card style={{ marginBottom: '20px', background: C.surface2 }}>
      <div style={{
        fontFamily:    'Syne, sans-serif',
        fontSize:      '13px',
        fontWeight:    600,
        color:         C.textDim,
        marginBottom:  '16px',
        letterSpacing: '0.08em',
      }}>
        AUTO-FOG ACTIVATIONS / HOUR (LAST 12h)
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={HOURLY_FOG} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}cc`} vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background:  '#ffffff',
              border:      `1px solid #e7dfd3`,
              borderRadius:'8px',
              fontFamily:  'IBM Plex Mono, monospace',
              fontSize:    '12px',
              color:       '#1c1917',
            }}
          />
          <Bar dataKey="fogs" fill={C.amber} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}