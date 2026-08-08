import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { C } from '../../constants/colors';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

/** Bar chart showing auto-fog activations per hour over the last 12 hours. */
export default function HourlyFogChart({ data = [] }) {
  if (!data.length) {
    return (
      <EmptyState
        title="No fogging in the last 12 hours"
        message="The chart only shows fogging actions that were saved by the system."
        compact
      />
    );
  }

  return (
    <Card style={{ marginBottom: '20px', background: C.surface2 }}>
      <div style={{
        fontFamily:    'Syne, sans-serif',
        fontSize:      '16px',
        fontWeight:    700,
        color:         C.textDim,
        marginBottom:  '16px',
        letterSpacing: '0.08em',
      }}>
        FOGGING BY HOUR (LAST 12 HOURS)
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}cc`} vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background:  C.surface,
              border:      `1px solid ${C.border}`,
              borderRadius:'8px',
              fontFamily:  'IBM Plex Mono, monospace',
              fontSize:    '13px',
              color:       C.text,
            }}
          />
          <Bar dataKey="fogs" fill={C.amber} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
