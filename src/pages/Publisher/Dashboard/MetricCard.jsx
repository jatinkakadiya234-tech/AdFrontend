import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Line, Bar } from 'recharts';
import { LineChart, BarChart, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, change, icon: Icon, trend, subValue, chartData, chartType }) => {
  const chartDataFormatted = chartData?.map((value, index) => ({ value, index })) || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {change && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change}%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}

      {subValue && (
        <p className="text-xs text-gray-600 font-medium">{subValue}</p>
      )}

      {chartData && chartType === 'line' && (
        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartDataFormatted}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData && chartType === 'bar' && (
        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataFormatted}>
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
