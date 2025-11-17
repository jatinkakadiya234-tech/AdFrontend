import { useState, useEffect } from 'react';
import { Eye, MousePointer, TrendingUp, DollarSign, RefreshCw, Calendar } from 'lucide-react';
import Apihelper from '../service/Apihelper';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({});
  const [topAds, setTopAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchAnalytics();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      if (user?.role === 'advertiser') {
        const detailedRes = await Apihelper.GetDetailedAnalytics({ days: timeRange });
        setAnalytics(detailedRes.data.analytics);
        setTopAds(detailedRes.data.analytics.topAds);
      } else {
        const [summaryRes, topAdsRes] = await Promise.all([
          Apihelper.GetImpressionSummary(),
          Apihelper.GetTopAds({ limit: 5 })
        ]);
        setAnalytics(summaryRes.data.summary);
        setTopAds(topAdsRes.data.ads);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Real-time performance insights</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total Impressions</h3>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{(analytics.totalImpressions || 0).toLocaleString()}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total Clicks</h3>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{(analytics.totalClicks || 0).toLocaleString()}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-full">
              <MousePointer className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Overall CTR</h3>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{analytics.overallCTR || 0}%</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Active Ads</h3>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{analytics.totalAds || 0}</p>
            </div>
            <div className="p-2 sm:p-3 bg-orange-100 rounded-full">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Device Breakdown & Top Ads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Device Analytics */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Device Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Desktop</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{(analytics.webImpressions || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-600">impressions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Mobile</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{(analytics.mobileImpressions || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-600">impressions</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Average per Ad</span>
                <span className="font-medium">{analytics.avgImpressions || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Ads */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Top Performing Ads</h3>
          {topAds.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No performance data available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topAds.map((ad, index) => (
                <div key={ad.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-32">{ad.title}</p>
                      <p className="text-xs text-gray-600">{ad.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{ad.impressions.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{ad.ctr}% CTR</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
              {analytics.totalImpressions > 0 ? 
                Math.round((analytics.totalClicks / analytics.totalImpressions) * 100 * 100) / 100 : 0}%
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Engagement Rate</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              {analytics.avgImpressions || 0}
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Avg. Impressions per Ad</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
              {analytics.totalAds || 0}
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Total Active Campaigns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;