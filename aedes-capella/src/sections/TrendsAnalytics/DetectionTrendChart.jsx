import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { C } from '../../constants/colors';
import { TREND_HOURLY, TREND_WEEKLY, TREND_MONTHLY } from '../../constants/MockData';
import Card from '../../components/ui/Card';

const VIEWS = [
  { key: 'today', label: 'TODAY', data: TREND_HOURLY },
  { key: 'week',  label: 'WEEK',  data: TREND_WEEKLY  },
  { key: 'month', label: 'MONTH', data: TREND_MONTHLY },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:   C.surface,
      border:       `1px solid ${C.border}`,
      borderRadius: '8px',
      padding:      '10px 14px',
    }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: C.textDim }}>
        {label}
      </div>
      <div style={{
        fontFamily:  'IBM Plex Mono, monospace',
        fontSize:    '13px',
        color:       C.amber,
        marginTop:   '4px',
      }}>
        {payload[0].value} detections
      </div>
    </div>
  );
};

/** Line chart of Aedes detections over time with Today / Week / Month toggle. */
export default function DetectionTrendChart() {
  const [view, setView] = useState('today');
  const activeData = VIEWS.find(v => v.key === view).data;

  return (
    <Card style={{ marginBottom: '20px', background: C.surface2 }}>
      {/* Header + toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{
          fontFamily:    'Syne, sans-serif',
          fontSize:      '13px',
          fontWeight:    600,
          color:         C.textDim,
          letterSpacing: '0.08em',
        }}>
          AEDES DETECTIONS OVER TIME
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {VIEWS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              style={{
                padding:       '4px 12px',
                borderRadius:  '6px',
                border:        `1px solid ${view === key ? C.amber : C.border}`,
                background:    view === key ? `${C.amber}22` : 'transparent',
                color:         view === key ? C.amber : C.textDim,
                fontFamily:    'IBM Plex Mono, monospace',
                fontSize:      '10px',
                cursor:        'pointer',
                fontWeight:    600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={activeData} margin={{ top: 5, right: 20, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}cc`} vertical={false} />
          <XAxis
            dataKey="t"
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fill: C.textDim }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="v"
            stroke={C.amber}
            strokeWidth={2}
            dot={{ fill: C.amber, r: 3 }}
            activeDot={{ r: 5, fill: C.amber }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}