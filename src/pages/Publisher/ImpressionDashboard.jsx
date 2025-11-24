import React, { useState, useEffect } from 'react';
import { Eye, MousePointer, TrendingUp, Monitor, Smartphone, BarChart3, RefreshCw } from 'lucide-react';
import Apihelper from '../../service/Apihelper';

const ImpressionDashboard = () => {
  const [summary, setSummary] = useState({});
  const [topAds, setTopAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 15 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [summaryRes, topAdsRes] = await Promise.all([
        Apihelper.GetImpressionSummary(),
        Apihelper.GetTopAds({ limit: 10 })
      ]);
      
      setSummary(summaryRes.data.summary);
      setTopAds(topAdsRes.data.ads);
    } catch (error) {
      console.error('Error fetching impression data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const [summaryRes, topAdsRes] = await Promise.all([
        Apihelper.GetImpressionSummary(),
        Apihelper.GetTopAds({ limit: 10 })
      ]);
      
      setSummary(summaryRes.data.summary);
      setTopAds(topAdsRes.data.ads);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading impression analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Impression Analytics</h1>
            <p className="text-gray-600 text-sm sm:text-base">Real-time ad performance tracking</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Ads</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{summary.totalAds || 0}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                <p className="text-3xl font-bold text-blue-600">{(summary.totalImpressions || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-3xl font-bold text-green-600">{(summary.totalClicks || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <MousePointer className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall CTR</p>
                <p className="text-3xl font-bold text-purple-600">{summary.overallCTR || 0}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Desktop</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{(summary.webImpressions || 0).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">impressions</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Mobile</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{(summary.mobileImpressions || 0).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">impressions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Impressions per Ad</span>
                <span className="font-bold">{summary.avgImpressions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Active Ads</span>
                <span className="font-bold">{summary.totalAds || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Performing CTR</span>
                <span className="font-bold text-green-600">{summary.overallCTR || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Ads */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top Performing Ads</h3>
            <p className="text-xs sm:text-sm text-gray-600">Ranked by total impressions</p>
          </div>
          
          {topAds.length === 0 ? (
            <div className="p-8 text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No ad performance data available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad Title</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Category</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topAds.map((ad, index) => (
                    <tr key={ad.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-bold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{ad.title}</p>
                          <p className="text-sm text-gray-600">{ad.dimensions}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {ad.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{ad.impressions.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{ad.clicks.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-purple-500" />
                          <span className={`font-medium ${parseFloat(ad.ctr) > 2 ? 'text-green-600' : parseFloat(ad.ctr) > 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {ad.ctr}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full capitalize">
                          {ad.mediaType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpressionDashboard;