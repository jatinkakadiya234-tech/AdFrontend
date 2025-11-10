import { BarChart, LineChart, PieChart } from '../components/Charts';

const AnalyticsPage = () => {
  // Sample data for charts
  const trafficData = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 190 },
    { label: 'Wed', value: 300 },
    { label: 'Thu', value: 500 },
    { label: 'Fri', value: 200 },
    { label: 'Sat', value: 300 },
    { label: 'Sun', value: 450 }
  ];

  const revenueData = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 5000 },
    { label: 'Apr', value: 4500 },
    { label: 'May', value: 6000 },
    { label: 'Jun', value: 5500 }
  ];

  const adTypeData = [
    { label: 'Banner Ads', value: 45 },
    { label: 'Video Ads', value: 30 },
    { label: 'Text Ads', value: 15 },
    { label: 'Native Ads', value: 10 }
  ];

  const performanceData = [
    { label: 'Impressions', value: 12500 },
    { label: 'Clicks', value: 1250 },
    { label: 'Conversions', value: 125 },
    { label: 'Revenue', value: 2500 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Data
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold text-gray-900">24,567</p>
          <span className="text-sm text-green-600">+12.5%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
          <p className="text-2xl font-bold text-gray-900">3,456</p>
          <span className="text-sm text-green-600">+8.2%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">CTR</h3>
          <p className="text-2xl font-bold text-gray-900">14.1%</p>
          <span className="text-sm text-red-600">-2.1%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">$12,345</p>
          <span className="text-sm text-green-600">+15.3%</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <LineChart data={trafficData} title="Weekly Traffic" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <LineChart data={revenueData} title="Monthly Revenue" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BarChart data={performanceData} title="Performance Metrics" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <PieChart data={adTypeData} title="Ad Types Distribution" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;