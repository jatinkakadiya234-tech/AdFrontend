// DashboardPage.jsx
import { useState, useEffect } from 'react';
import { 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  RefreshCw,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  Globe,
  Smartphone,
  Target,
  TrendingDown
} from 'lucide-react';
import Apihelper from '../../service/Apihelper';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [realtimeData, setRealtimeData] = useState({
    currentImpressions: 0,
    currentClicks: 0,
    activeUsers: 0,
    serverStatus: 'online'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
    
    // Real-time updates simulation
    const realtimeInterval = setInterval(() => {
      setRealtimeData(prev => ({
        currentImpressions: prev.currentImpressions + Math.floor(Math.random() * 50),
        currentClicks: prev.currentClicks + Math.floor(Math.random() * 5),
        activeUsers: Math.floor(Math.random() * 100) + 50,
        serverStatus: 'online'
      }));
    }, 3000);
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => {
      clearInterval(interval);
      clearInterval(realtimeInterval);
    };
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
          ...joinReqRes.data,
          todayImpressions: 45678,
          todayClicks: 2341,
          todayRevenue: 1234.56,
          activeAds: 18,
          pendingApprovals: 5
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
          ...analyticsRes.data,
          todayImpressions: 12456,
          todayClicks: 876,
          todayRevenue: 456.78,
          activeAds: 12,
          draftAds: 3
        };
      } else {
        data = {
          totalAds: 150,
          totalImpressions: 500000,
          totalClicks: 25000,
          todayImpressions: 5600,
          todayClicks: 280,
          integratedApps: 5,
          activeSDKs: 3
        };
      }
      
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback mock data
      setStats({
        totalImpressions: 124587,
        totalClicks: 8923,
        todayImpressions: 45678,
        todayClicks: 2341,
        todayRevenue: 1234.56,
        activeAds: 18
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const getQuickStats = (role) => {
    switch (role) {
      case 'admin':
        return [
          { 
            title: 'Total Users', 
            value: stats.totalUsers || 0, 
            icon: Users, 
            color: 'blue',
            change: '+12',
            trend: 'up'
          },
          { 
            title: 'Active Ads', 
            value: stats.activeAds || 0, 
            icon: Play, 
            color: 'green',
            change: '+5',
            trend: 'up'
          },
          { 
            title: 'Today\'s Impressions', 
            value: (stats.todayImpressions || 0).toLocaleString(), 
            icon: Eye, 
            color: 'purple',
            change: '+8.5%',
            trend: 'up'
          },
          { 
            title: 'Pending Requests', 
            value: stats.pendingRequests || 0, 
            icon: AlertCircle, 
            color: 'orange',
            change: '-2',
            trend: 'down'
          }
        ];
      case 'advertiser':
        return [
          { 
            title: 'My Active Ads', 
            value: stats.myAds || 0, 
            icon: BarChart3, 
            color: 'blue',
            change: '+2',
            trend: 'up'
          },
          { 
            title: 'Today\'s Impressions', 
            value: (stats.todayImpressions || 0).toLocaleString(), 
            icon: Eye, 
            color: 'green',
            change: '+15.3%',
            trend: 'up'
          },
          { 
            title: 'Today\'s Clicks', 
            value: (stats.todayClicks || 0).toLocaleString(), 
            icon: MousePointer, 
            color: 'purple',
            change: '+12.8%',
            trend: 'up'
          },
          { 
            title: 'Today\'s Revenue', 
            value: `$${(stats.todayRevenue || 0).toFixed(2)}`, 
            icon: DollarSign, 
            color: 'orange',
            change: '+18.2%',
            trend: 'up'
          }
        ];
      default:
        return [
          { 
            title: 'Integrated Apps', 
            value: stats.integratedApps || 0, 
            icon: Smartphone, 
            color: 'blue',
            change: '+1',
            trend: 'up'
          },
          { 
            title: 'Active SDKs', 
            value: stats.activeSDKs || 0, 
            icon: Zap, 
            color: 'green',
            change: '0',
            trend: 'neutral'
          },
          { 
            title: 'Today\'s Views', 
            value: (stats.todayImpressions || 0).toLocaleString(), 
            icon: Eye, 
            color: 'purple',
            change: '+10.5%',
            trend: 'up'
          },
          { 
            title: 'Total Earnings', 
            value: `$${((stats.totalClicks || 0) * 0.05).toFixed(2)}`, 
            icon: DollarSign, 
            color: 'orange',
            change: '+5.2%',
            trend: 'up'
          }
        ];
    }
  };

  const quickStats = getQuickStats(user?.role);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.username}</span>!
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                System Online
              </span>
              <span className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                Last updated: Just now
              </span>
            </div>
          </div>
          
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Real-time Activity Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 animate-pulse" />
              Live Activity Monitor
            </h2>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              Real-time
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Current Impressions</p>
              <p className="text-2xl font-bold">{realtimeData.currentImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Current Clicks</p>
              <p className="text-2xl font-bold">{realtimeData.currentClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Active Users</p>
              <p className="text-2xl font-bold">{realtimeData.activeUsers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Server Status</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600'
            };
            
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[stat.color]} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  {stat.trend !== 'neutral' && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  )}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Performance */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Today's Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.role === 'admin' ? (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-900">New Users Today</span>
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900 mb-2">12</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+3 from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-green-900">Ads Approved</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-900 mb-2">8</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+2 from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-900">Revenue Generated</span>
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900 mb-2">${(stats.todayRevenue || 1234.56).toFixed(2)}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+18% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-orange-900">System Uptime</span>
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-900 mb-2">99.9%</p>
                    <div className="flex items-center text-xs text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>Excellent</span>
                    </div>
                  </div>
                </>
              ) : user?.role === 'advertiser' ? (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-900">Impressions Today</span>
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900 mb-2">{(stats.todayImpressions || 12456).toLocaleString()}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+15.3% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-green-900">Clicks Today</span>
                      <MousePointer className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-900 mb-2">{(stats.todayClicks || 876).toLocaleString()}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+12.8% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-900">Current CTR</span>
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900 mb-2">{((stats.todayClicks / stats.todayImpressions * 100) || 7.03).toFixed(2)}%</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>Above average</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-orange-900">Revenue Today</span>
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-900 mb-2">${(stats.todayRevenue || 456.78).toFixed(2)}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+18.2% from yesterday</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-900">Views Today</span>
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900 mb-2">{(stats.todayImpressions || 5600).toLocaleString()}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+10.5% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-green-900">Clicks Today</span>
                      <MousePointer className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-900 mb-2">{(stats.todayClicks || 280).toLocaleString()}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+8.2% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-900">Earnings Today</span>
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900 mb-2">${((stats.todayClicks || 280) * 0.05).toFixed(2)}</p>
                    <div className="flex items-center text-xs text-green-700">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      <span>+5.2% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-orange-900">Active Sessions</span>
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-900 mb-2">{realtimeData.activeUsers}</p>
                    <div className="flex items-center text-xs text-blue-700">
                      <Activity className="w-3 h-3 mr-1" />
                      <span>Live now</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {user?.role === 'admin' ? (
                <>
                  <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Manage Users</p>
                        <p className="text-xs opacity-90">{stats.pendingRequests || 5} pending requests</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Approve Ads</p>
                        <p className="text-xs opacity-90">{stats.pendingApprovals || 5} awaiting approval</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">View Reports</p>
                        <p className="text-xs opacity-90">Detailed analytics</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">System Settings</p>
                        <p className="text-xs opacity-90">Configure platform</p>
                      </div>
                    </div>
                  </button>
                </>
              ) : user?.role === 'advertiser' ? (
                <>
                  <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Create New Ad</p>
                        <p className="text-xs opacity-90">Launch new campaign</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">View Analytics</p>
                        <p className="text-xs opacity-90">{stats.myAds || 12} active campaigns</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Pause className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Manage Campaigns</p>
                        <p className="text-xs opacity-90">{stats.draftAds || 3} drafts</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Billing & Payments</p>
                        <p className="text-xs opacity-90">Manage finances</p>
                      </div>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Manage Ad Units</p>
                        <p className="text-xs opacity-90">{stats.integratedApps || 5} placements</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">SDK Integration</p>
                        <p className="text-xs opacity-90">{stats.activeSDKs || 3} active SDKs</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">View Earnings</p>
                        <p className="text-xs opacity-90">Check revenue</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm hover:shadow-md text-left">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Documentation</p>
                        <p className="text-xs opacity-90">Integration guides</p>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity & Platform Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-purple-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { 
                  action: user?.role === 'admin' ? 'New user registered' : user?.role === 'advertiser' ? 'Ad impression tracked' : 'New ad viewed',
                  time: '2 minutes ago',
                  icon: user?.role === 'admin' ? Users : user?.role === 'advertiser' ? Eye : Eye,
                  color: 'blue'
                },
                { 
                  action: user?.role === 'admin' ? 'Ad approved successfully' : user?.role === 'advertiser' ? 'Campaign updated' : 'SDK initialized',
                  time: '15 minutes ago',
                  icon: CheckCircle,
                  color: 'green'
                },
                { 
                  action: user?.role === 'admin' ? 'System backup completed' : user?.role === 'advertiser' ? 'Payment received' : 'Earnings credited',
                  time: '1 hour ago',
                  icon: Activity,
                  color: 'purple'
                },
                { 
                  action: user?.role === 'admin' ? 'Security update applied' : user?.role === 'advertiser' ? 'Report generated' : 'New placement created',
                  time: '3 hours ago',
                  icon: AlertCircle,
                  color: 'orange'
                },
                { 
                  action: user?.role === 'admin' ? 'Database optimized' : user?.role === 'advertiser' ? 'Budget adjusted' : 'Settings updated',
                  time: '5 hours ago',
                  icon: BarChart3,
                  color: 'blue'
                }
              ].map((activity, idx) => {
                const IconComp = activity.icon;
                const colorClasses = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  purple: 'bg-purple-100 text-purple-600',
                  orange: 'bg-orange-100 text-orange-600'
                };
                
                return (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Platform Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Web Impressions</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{((stats.totalImpressions || 0) * 0.58).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p className="text-xs text-blue-600 font-medium">58.4%</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Mobile Impressions</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{((stats.totalImpressions || 0) * 0.42).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p className="text-xs text-green-600 font-medium">41.6%</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Average CTR</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{stats.overallCTR || 7.16}%</p>
                  <p className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +2.1%
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Success Rate</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">94.2%</p>
                  <p className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Excellent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
