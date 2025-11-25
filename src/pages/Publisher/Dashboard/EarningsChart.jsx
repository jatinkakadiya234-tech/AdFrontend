import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const EarningsChart = ({ period }) => {
  const data = useMemo(() => {
    if (period === '7') {
      return [
        { name: 'Mon', earnings: 120 },
        { name: 'Tue', earnings: 190 },
        { name: 'Wed', earnings: 170 },
        { name: 'Thu', earnings: 220 },
        { name: 'Fri', earnings: 210 },
        { name: 'Sat', earnings: 250 },
        { name: 'Sun', earnings: 280 },
      ];
    } else if (period === '30') {
      return [
        { name: 'Week 1', earnings: 980 },
        { name: 'Week 2', earnings: 1200 },
        { name: 'Week 3', earnings: 1150 },
        { name: 'Week 4', earnings: 1380 },
      ];
    } else if (period === '90') {
      return [
        { name: 'Month 1', earnings: 3200 },
        { name: 'Month 2', earnings: 3850 },
        { name: 'Month 3', earnings: 4520 },
      ];
    } else {
      return [
        { name: 'Jan', earnings: 2800 },
        { name: 'Feb', earnings: 3200 },
        { name: 'Mar', earnings: 3100 },
        { name: 'Apr', earnings: 3600 },
        { name: 'May', earnings: 3400 },
        { name: 'Jun', earnings: 3900 },
        { name: 'Jul', earnings: 4100 },
        { name: 'Aug', earnings: 4300 },
        { name: 'Sep', earnings: 4000 },
        { name: 'Oct', earnings: 4400 },
        { name: 'Nov', earnings: 4520 },
        { name: 'Dec', earnings: 4800 },
      ];
    }
  }, [period]);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
          }}
          formatter={(value) => [`$${value}`, 'Earnings']}
        />
        <Line
          type="monotone"
          dataKey="earnings"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: '#8b5cf6', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;
