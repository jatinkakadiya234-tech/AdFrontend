import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Apihelper from '../service/Apihelper';

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [ads, setAds] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ads');

  useEffect(() => {
    if (id) {
      fetchCategoryDetails();
      fetchCategoryTrends();
    }
  }, [id]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await Apihelper.GetAdsByCategory(id);
      setCategory(response.data.category);
      setAds(response.data.ads);
    } catch (err) {
      setError('Failed to fetch category details');
    }
  };

  const fetchCategoryTrends = async () => {
    try {
      const response = await Apihelper.GetCategoryTrends(id, { days: 30 });
      setTrends(response.data.trends);
    } catch (err) {
      console.error('Failed to fetch trends:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/categories" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
        <p className="text-gray-600">Category performance and ads overview</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('ads')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ads'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Ads ({ads.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Ads Tab */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          {ads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ads in this category</h3>
              <p className="text-gray-500">Be the first to create an ad in this category!</p>
              <Link 
                to="/create-ad" 
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Ad
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad) => (
                <div key={ad._id} className="bg-white rounded-lg shadow border p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    {ad.mediaType === 'video' ? (
                      <video 
                        src={ad.mediaUrl} 
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={ad.mediaUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>{ad.width}x{ad.height}</span>
                    <span className="capitalize">{ad.mediaType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      {ad.analytics?.impressions || 0} impressions
                    </span>
                    <span className="text-gray-500">
                      {ad.analytics?.clicks || 0} clicks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-sm font-medium text-gray-500">Total Ads</h3>
              <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-sm font-medium text-gray-500">Total Impressions</h3>
              <p className="text-2xl font-bold text-gray-900">
                {ads.reduce((sum, ad) => sum + (ad.analytics?.impressions || 0), 0)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
              <p className="text-2xl font-bold text-gray-900">
                {ads.reduce((sum, ad) => sum + (ad.analytics?.clicks || 0), 0)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-sm font-medium text-gray-500">Average CTR</h3>
              <p className="text-2xl font-bold text-gray-900">
                {ads.length > 0 
                  ? (ads.reduce((sum, ad) => {
                      const impressions = ad.analytics?.impressions || 0;
                      const clicks = ad.analytics?.clicks || 0;
                      return sum + (impressions > 0 ? (clicks / impressions) * 100 : 0);
                    }, 0) / ads.length).toFixed(2)
                  : 0}%
              </p>
            </div>
          </div>

          {/* Trends Chart */}
          {trends.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">30-Day Trends</h3>
              <div className="space-y-4">
                {trends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">
                      {new Date(trend.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-blue-600">{trend.adsCreated} ads</span>
                      <span className="text-green-600">{trend.totalImpressions} views</span>
                      <span className="text-purple-600">{trend.totalClicks} clicks</span>
                      <span className="text-orange-600">{trend.ctr}% CTR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDetailsPage;