// PerformanceReports.jsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Eye, 
  MousePointerClick, 
  Download, 
  Calendar,
  Mail,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformanceReports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-11-01',
    endDate: '2024-11-21'
  });
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedSDK, setSelectedSDK] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'weekly',
    email: '',
    format: 'pdf'
  });
  const [loading, setLoading] = useState(false);

  // Mock data
  const performanceMetrics = {
    impressions: 2547893,
    impressionsChange: 12.5,
    clicks: 45678,
    clicksChange: -3.2,
    ctr: 1.79,
    ctrChange: 8.4,
    revenue: 12543.67,
    revenueChange: 15.7,
    ecpm: 4.92,
    ecpmChange: 5.3
  };

  const chartData = {
    labels: ['Nov 1', 'Nov 4', 'Nov 7', 'Nov 10', 'Nov 13', 'Nov 16', 'Nov 19', 'Nov 21'],
    datasets: [
      {
        label: 'Impressions',
        data: [320000, 335000, 328000, 342000, 355000, 348000, 362000, 370000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Clicks',
        data: [5200, 5450, 5380, 5680, 5920, 5750, 6100, 6200],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const revenueData = {
    labels: ['Nov 1', 'Nov 4', 'Nov 7', 'Nov 10', 'Nov 13', 'Nov 16', 'Nov 19', 'Nov 21'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1450, 1520, 1480, 1590, 1650, 1610, 1720, 1780],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
        borderRadius: 6
      }
    ]
  };

  const sdkPerformance = [
    { sdk: 'JavaScript', impressions: 850000, revenue: 4200, ctr: 1.82, fillRate: 94.5 },
    { sdk: 'React Native', impressions: 620000, revenue: 3100, ctr: 1.75, fillRate: 92.1 },
    { sdk: 'Flutter', impressions: 480000, revenue: 2450, ctr: 1.68, fillRate: 90.8 },
    { sdk: 'Swift (iOS)', impressions: 390000, revenue: 1980, ctr: 1.91, fillRate: 95.2 },
    { sdk: 'Java (Android)', impressions: 207893, revenue: 813.67, ctr: 1.54, fillRate: 88.9 }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        usePointStyle: true
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { callback: value => value.toLocaleString() }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { callback: value => value.toLocaleString() }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: context => `Revenue: $${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { callback: value => `$${value}` }
      },
      x: { grid: { display: false } }
    }
  };

  const handleScheduleReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowScheduleModal(false);
      alert(`Report scheduled! You'll receive ${scheduleConfig.frequency} reports at ${scheduleConfig.email}`);
    }, 1500);
  };

  const exportReport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
            <p className="text-gray-600 mt-1">Track your ad performance metrics and revenue</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium">Schedule Email</span>
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                <span className="font-medium">Export</span>
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button onClick={() => exportReport('pdf')} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg">Export as PDF</button>
                <button onClick={() => exportReport('csv')} className="w-full text-left px-4 py-2 hover:bg-gray-50">Export as CSV</button>
                <button onClick={() => exportReport('xlsx')} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg">Export as Excel</button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Platforms</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SDK</label>
              <select
                value={selectedSDK}
                onChange={(e) => setSelectedSDK(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All SDKs</option>
                <option value="javascript">JavaScript</option>
                <option value="react-native">React Native</option>
                <option value="flutter">Flutter</option>
                <option value="swift">Swift</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${performanceMetrics.impressionsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performanceMetrics.impressionsChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(performanceMetrics.impressionsChange)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Impressions</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{performanceMetrics.impressions.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-green-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${performanceMetrics.clicksChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performanceMetrics.clicksChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(performanceMetrics.clicksChange)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Clicks</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{performanceMetrics.clicks.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${performanceMetrics.ctrChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performanceMetrics.ctrChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(performanceMetrics.ctrChange)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">CTR</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{performanceMetrics.ctr}%</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${performanceMetrics.revenueChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performanceMetrics.revenueChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(performanceMetrics.revenueChange)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">${performanceMetrics.revenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-pink-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-semibold ${performanceMetrics.ecpmChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performanceMetrics.ecpmChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(performanceMetrics.ecpmChange)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">eCPM</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">${performanceMetrics.ecpm}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Impressions & Clicks Trend</h3>
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Performance</h3>
            <div className="h-80">
              <Bar data={revenueData} options={barChartOptions} />
            </div>
          </div>
        </div>

        {/* SDK Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">SDK Performance Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SDK</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Impressions</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CTR</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fill Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sdkPerformance.map((sdk, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                          {sdk.sdk.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{sdk.sdk}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sdk.impressions.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">${sdk.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {sdk.ctr}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${sdk.fillRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{sdk.fillRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Schedule Email Report</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={scheduleConfig.email}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={scheduleConfig.frequency}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={scheduleConfig.format}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, format: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleReport}
                disabled={!scheduleConfig.email || loading}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceReports;
