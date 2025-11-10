import { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import { BarChart, LineChart, PieChart } from '../components/Charts';

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          { title: 'Total Users', value: '12,345', change: '+12%' },
          { title: 'Revenue', value: '$45,678', change: '+8%' },
          { title: 'Total Ads', value: '1,234', change: '+15%' },
          { title: 'Growth', value: '23%', change: '+3%' }
        ];
      case 'advertiser':
        return [
          { title: 'My Ads', value: '45', change: '+5%' },
          { title: 'Ad Spend', value: '$2,340', change: '+12%' },
          { title: 'Impressions', value: '125K', change: '+18%' },
          { title: 'CTR', value: '3.2%', change: '+0.5%' }
        ];
      case 'viewer':
      default:
        return [
          { title: 'Ads Viewed', value: '234', change: '+8%' },
          { title: 'Favorites', value: '12', change: '+2%' },
          { title: 'Categories', value: '8', change: '0%' },
          { title: 'Activity', value: '45', change: '+15%' }
        ];
    }
  };

  const stats = getStatsForRole(user?.role);

  const getRoleBasedContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">User Management</h3>
                <p className="text-sm text-blue-700 mt-1">Manage all users and permissions</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900">Ad Management</h3>
                <p className="text-sm text-green-700 mt-1">Review and approve advertisements</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900">System Settings</h3>
                <p className="text-sm text-purple-700 mt-1">Configure platform settings</p>
              </div>
            </div>
          </div>
        );
      case 'advertiser':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Advertiser Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900">Create New Ad</h3>
                <p className="text-sm text-orange-700 mt-1">Design and launch your advertisement</p>
                <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
                  Create Ad
                </button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Campaign Analytics</h3>
                <p className="text-sm text-blue-700 mt-1">Track your ad performance</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        );
      case 'viewer':
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Viewer Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900">Browse Ads</h3>
                <p className="text-sm text-green-700 mt-1">Discover new advertisements</p>
                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  Browse Now
                </button>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900">My Favorites</h3>
                <p className="text-sm text-purple-700 mt-1">View your saved advertisements</p>
                <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700">
                  View Favorites
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600 mt-1">
          Role: <span className="capitalize font-medium">{user?.role}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Role-based Content */}
      {getRoleBasedContent()}

      {/* Slider Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Content</h2>
        <Slider />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <LineChart 
            data={[
              { label: 'Mon', value: 65 },
              { label: 'Tue', value: 78 },
              { label: 'Wed', value: 90 },
              { label: 'Thu', value: 81 },
              { label: 'Fri', value: 95 },
              { label: 'Sat', value: 87 },
              { label: 'Sun', value: 92 }
            ]} 
            title="Weekly Performance" 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BarChart 
            data={[
              { label: 'Views', value: user?.role === 'admin' ? 12500 : user?.role === 'advertiser' ? 3400 : 890 },
              { label: 'Clicks', value: user?.role === 'admin' ? 2300 : user?.role === 'advertiser' ? 560 : 120 },
              { label: 'Conversions', value: user?.role === 'admin' ? 450 : user?.role === 'advertiser' ? 89 : 23 }
            ]} 
            title={`${user?.role === 'admin' ? 'Platform' : user?.role === 'advertiser' ? 'My Ads' : 'My Activity'} Stats`} 
          />
        </div>
      </div>
      
      {/* Additional Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <PieChart 
            data={user?.role === 'admin' ? [
              { label: 'Advertisers', value: 45 },
              { label: 'Viewers', value: 35 },
              { label: 'Inactive', value: 20 }
            ] : user?.role === 'advertiser' ? [
              { label: 'Banner Ads', value: 40 },
              { label: 'Video Ads', value: 35 },
              { label: 'Text Ads', value: 25 }
            ] : [
              { label: 'Favorites', value: 60 },
              { label: 'Viewed', value: 30 },
              { label: 'Saved', value: 10 }
            ]} 
            title={user?.role === 'admin' ? 'User Distribution' : user?.role === 'advertiser' ? 'Ad Types' : 'Activity Breakdown'} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full ${
                  user?.role === 'admin' ? 'bg-red-500' : 
                  user?.role === 'advertiser' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium">
                    {user?.role === 'admin' ? `System Event ${item}` :
                     user?.role === 'advertiser' ? `Campaign ${item}` :
                     `Ad View ${item}`}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;