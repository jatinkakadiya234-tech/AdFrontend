import { useState, useEffect } from 'react';
import { Eye, MousePointer, TrendingUp, Users, DollarSign, BarChart3, RefreshCw } from 'lucide-react';
import Apihelper from '../service/Apihelper';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      let data = {};
      
      if (userData?.role === 'admin') {
        const [dashboardRes, impressionRes, joinReqRes] = await Promise.all([
          Apihelper.GetDashboardStats(),
          Apihelper.GetImpressionSummary(),
          Apihelper.GetJoinRequestStats()
        ]);
        data = {
          ...dashboardRes.data,
          ...impressionRes.data.summary,
          ...joinReqRes.data
        };
      } else if (userData?.role === 'advertiser') {
        const [adsRes, impressionRes, analyticsRes] = await Promise.all([
          Apihelper.GetAds(),
          Apihelper.GetImpressionSummary(),
          Apihelper.GetAdvertiserAnalytics()
        ]);
        data = {
          myAds: adsRes.data.count,
          ...impressionRes.data.summary,
          ...analyticsRes.data
        };
      }
      
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const getStatsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          { title: 'Total Users', value: stats.totalUsers || 0, icon: Users, color: 'blue' },
          { title: 'Total Ads', value: stats.totalAds || 0, icon: BarChart3, color: 'green' },
          { title: 'Total Impressions', value: (stats.totalImpressions || 0).toLocaleString(), icon: Eye, color: 'purple' },
          { title: 'Join Requests', value: stats.pendingRequests || 0, icon: TrendingUp, color: 'orange' }
        ];
      case 'advertiser':
        return [
          { title: 'My Ads', value: stats.myAds || 0, icon: BarChart3, color: 'blue' },
          { title: 'Total Impressions', value: (stats.totalImpressions || 0).toLocaleString(), icon: Eye, color: 'green' },
          { title: 'Total Clicks', value: (stats.totalClicks || 0).toLocaleString(), icon: MousePointer, color: 'purple' },
          { title: 'CTR', value: `${stats.overallCTR || 0}%`, icon: TrendingUp, color: 'orange' }
        ];
      default:
        return [
          { title: 'Available Ads', value: stats.totalAds || 0, icon: BarChart3, color: 'blue' },
          { title: 'Total Views', value: (stats.totalImpressions || 0).toLocaleString(), icon: Eye, color: 'green' },
          { title: 'Categories', value: stats.totalCategories || 0, icon: TrendingUp, color: 'purple' },
          { title: 'Active Users', value: stats.totalUsers || 0, icon: Users, color: 'orange' }
        ];
    }
  };

  const dashboardStats = getStatsForRole(user?.role);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Role: <span className="capitalize font-medium text-blue-600">{user?.role}</span>
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-2 sm:p-3 bg-${stat.color}-100 rounded-full`}>
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role-based Content */}
      {getRoleBasedContent()}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Desktop Impressions</span>
              <span className="font-medium">{(stats.webImpressions || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mobile Impressions</span>
              <span className="font-medium">{(stats.mobileImpressions || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average CTR</span>
              <span className="font-medium text-green-600">{stats.overallCTR || 0}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Engagement</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600">+{Math.floor(Math.random() * 20) + 5}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Campaigns</span>
              <span className="font-medium">{user?.role === 'advertiser' ? stats.myAds || 0 : stats.totalAds || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-medium text-blue-600">{Math.floor(Math.random() * 30) + 70}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  user?.role === 'admin' ? 'bg-red-500' : 
                  user?.role === 'advertiser' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {user?.role === 'admin' ? `New user registered` :
                     user?.role === 'advertiser' ? `Ad impression tracked` :
                     `New ad viewed`}
                  </p>
                  <p className="text-xs text-gray-500">{item * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;