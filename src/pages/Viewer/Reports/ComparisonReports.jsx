// ComparisonReports.jsx
import React, { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Layers,
  Globe,
  Smartphone
} from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const ComparisonReports = () => {
  const [comparisonType, setComparisonType] = useState('time');
  const [timePeriod1, setTimePeriod1] = useState({ start: '2024-10-01', end: '2024-10-31' });
  const [timePeriod2, setTimePeriod2] = useState({ start: '2024-11-01', end: '2024-11-21' });
  const [selectedAdUnits, setSelectedAdUnits] = useState(['unit1', 'unit2', 'unit3']);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['web', 'mobile']);

  // Mock data for time period comparison
  const timeComparisonData = {
    period1: { impressions: 2100000, clicks: 38500, revenue: 10200, ctr: 1.83, ecpm: 4.86 },
    period2: { impressions: 2547893, clicks: 45678, revenue: 12543.67, ctr: 1.79, ecpm: 4.92 }
  };

  // Ad Unit comparison data
  const adUnitData = [
    { name: 'Header Banner', impressions: 980000, clicks: 18500, revenue: 4850, ctr: 1.89, fillRate: 96.5 },
    { name: 'Sidebar Widget', impressions: 720000, clicks: 13400, revenue: 3520, ctr: 1.86, fillRate: 94.2 },
    { name: 'In-Content Ad', impressions: 550000, clicks: 9200, revenue: 2680, ctr: 1.67, fillRate: 91.8 },
    { name: 'Footer Banner', impressions: 297893, clicks: 4578, revenue: 1493.67, ctr: 1.54, fillRate: 88.3 }
  ];

  // Platform comparison data
  const platformData = [
    { platform: 'Web Desktop', impressions: 1200000, clicks: 22000, revenue: 6100, ctr: 1.83 },
    { platform: 'Mobile Web', impressions: 850000, clicks: 15200, revenue: 4200, ctr: 1.79 },
    { platform: 'iOS App', impressions: 320000, clicks: 5900, revenue: 1580, ctr: 1.84 },
    { platform: 'Android App', impressions: 177893, clicks: 2578, revenue: 663.67, ctr: 1.45 }
  ];

  const calculateChange = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  // Chart configurations
  const adUnitChartData = {
    labels: adUnitData.map(unit => unit.name),
    datasets: [
      {
        label: 'Impressions',
        data: adUnitData.map(unit => unit.impressions),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Clicks',
        data: adUnitData.map(unit => unit.clicks),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }
    ]
  };

  const platformPieData = {
    labels: platformData.map(p => p.platform),
    datasets: [{
      data: platformData.map(p => p.revenue),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 2
    }]
  };

  const timeComparisonChartData = {
    labels: ['Impressions', 'Clicks', 'Revenue', 'CTR', 'eCPM'],
    datasets: [
      {
        label: 'Period 1',
        data: [
          timeComparisonData.period1.impressions / 1000,
          timeComparisonData.period1.clicks,
          timeComparisonData.period1.revenue,
          timeComparisonData.period1.ctr * 100,
          timeComparisonData.period1.ecpm * 100
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1
      },
      {
        label: 'Period 2',
        data: [
          timeComparisonData.period2.impressions / 1000,
          timeComparisonData.period2.clicks,
          timeComparisonData.period2.revenue,
          timeComparisonData.period2.ctr * 100,
          timeComparisonData.period2.ecpm * 100
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { padding: 15, font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: { grid: { display: false } }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { padding: 15, font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context) => `${context.label}: $${context.parsed.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Comparison Reports</h1>
            <p className="text-gray-600 mt-1">Compare performance across time, ad units, and platforms</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            <span className="font-medium">Export Comparison</span>
          </button>
        </div>

        {/* Comparison Type Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setComparisonType('time')}
              className={`p-6 rounded-lg border-2 transition-all ${
                comparisonType === 'time'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Calendar className={`w-8 h-8 mb-3 ${comparisonType === 'time' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-semibold text-gray-900 mb-1">Time Period</h4>
              <p className="text-sm text-gray-600">Compare two date ranges</p>
            </button>

            <button
              onClick={() => setComparisonType('adunit')}
              className={`p-6 rounded-lg border-2 transition-all ${
                comparisonType === 'adunit'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Layers className={`w-8 h-8 mb-3 ${comparisonType === 'adunit' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-semibold text-gray-900 mb-1">Ad Units</h4>
              <p className="text-sm text-gray-600">Compare ad placements</p>
            </button>

            <button
              onClick={() => setComparisonType('platform')}
              className={`p-6 rounded-lg border-2 transition-all ${
                comparisonType === 'platform'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Globe className={`w-8 h-8 mb-3 ${comparisonType === 'platform' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-semibold text-gray-900 mb-1">Platforms</h4>
              <p className="text-sm text-gray-600">Compare across platforms</p>
            </button>
          </div>
        </div>

        {/* Time Period Comparison */}
        {comparisonType === 'time' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time Periods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-3">Period 1</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={timePeriod1.start}
                        onChange={(e) => setTimePeriod1({ ...timePeriod1, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={timePeriod1.end}
                        onChange={(e) => setTimePeriod1({ ...timePeriod1, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Period 2</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={timePeriod2.start}
                        onChange={(e) => setTimePeriod2({ ...timePeriod2, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={timePeriod2.end}
                        onChange={(e) => setTimePeriod2({ ...timePeriod2, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.keys(timeComparisonData.period1).map((metric) => {
                const value1 = timeComparisonData.period1[metric];
                const value2 = timeComparisonData.period2[metric];
                const change = calculateChange(value2, value1);
                const isPositive = parseFloat(change) > 0;

                return (
                  <div key={metric} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-sm font-medium text-gray-600 uppercase mb-2">{metric}</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-indigo-600">Period 1</p>
                        <p className="text-xl font-bold text-gray-900">
                          {metric.includes('revenue') || metric.includes('ecpm') ? '$' : ''}
                          {value1.toLocaleString()}
                          {metric === 'ctr' ? '%' : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600">Period 2</p>
                        <p className="text-xl font-bold text-gray-900">
                          {metric.includes('revenue') || metric.includes('ecpm') ? '$' : ''}
                          {value2.toLocaleString()}
                          {metric === 'ctr' ? '%' : ''}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {change}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>
              <div className="h-96">
                <Bar data={timeComparisonChartData} options={barChartOptions} />
              </div>
            </div>
          </>
        )}

        {/* Ad Unit Comparison */}
        {comparisonType === 'adunit' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Unit Performance</h3>
              <div className="h-96">
                <Bar data={adUnitChartData} options={barChartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Detailed Ad Unit Metrics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ad Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Impressions</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">CTR</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Fill Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {adUnitData.map((unit, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{unit.name}</td>
                        <td className="px-6 py-4 text-gray-700">{unit.impressions.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-700">{unit.clicks.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-700">${unit.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            {unit.ctr}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${unit.fillRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{unit.fillRate}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Platform Comparison */}
        {comparisonType === 'platform' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Platform</h3>
                <div className="h-80">
                  <Doughnut data={platformPieData} options={pieChartOptions} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Metrics</h3>
                <div className="space-y-4">
                  {platformData.map((platform, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {platform.platform.includes('Mobile') ? (
                            <Smartphone className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Globe className="w-5 h-5 text-blue-600" />
                          )}
                          <h4 className="font-semibold text-gray-900">{platform.platform}</h4>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          ${platform.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Impressions</p>
                          <p className="font-semibold text-gray-900">{platform.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Clicks</p>
                          <p className="font-semibold text-gray-900">{platform.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">CTR</p>
                          <p className="font-semibold text-green-600">{platform.ctr}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Impressions</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">CTR</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {platformData.map((platform, idx) => {
                      const totalRevenue = platformData.reduce((sum, p) => sum + p.revenue, 0);
                      const share = ((platform.revenue / totalRevenue) * 100).toFixed(1);
                      
                      return (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {platform.platform.includes('Mobile') ? (
                                <Smartphone className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Globe className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="font-medium text-gray-900">{platform.platform}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{platform.impressions.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-700">{platform.clicks.toLocaleString()}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">${platform.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {platform.ctr}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${share}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{share}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ComparisonReports;
