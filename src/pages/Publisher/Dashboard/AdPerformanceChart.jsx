import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AdPerformanceChart = () => {
  const data = [
    { name: 'Banner Ads', value: 45, color: '#8b5cf6' },
    { name: 'Rewarded Ads', value: 25, color: '#10b981' },
    { name: 'Interstitial Ads', value: 20, color: '#3b82f6' },
    { name: 'URL Shortener', value: 10, color: '#f59e0b' },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
          }}
          formatter={(value) => `${value}%`}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry) => (
            <span className="text-sm text-gray-700">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AdPerformanceChart;
