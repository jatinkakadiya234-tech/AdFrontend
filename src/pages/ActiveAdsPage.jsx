import { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';

const ActiveAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActiveAds();
  }, []);

  const fetchActiveAds = async () => {
    try {
      setLoading(true);
      const response = await Apihelper.GetAllAds();
      // Filter only active ads
      const activeAds = (response.data.ads || []).filter(ad => ad.isActive);
      setAds(activeAds);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch active ads');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdClick = async (ad) => {
    try {
      window.open(`http://localhost:5500/api/ad/click/${ad._id}?device=web`, '_blank');
    } catch (err) {
      console.error('Failed to track click:', err);
      window.open(ad.clickUrl, '_blank');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 p-4">Loading active ads...</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Active Advertisements</h1>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm w-fit">
          {ads.length} Active Ads
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {ads.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No active ads found</div>
          <p className="text-gray-400 mt-2">All advertisements are currently inactive</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Ad Media */}
                <div 
                  className="w-full lg:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0"
                  onClick={() => handleAdClick(ad)}
                >
                  {ad.mediaType === 'video' ? (
                    <video 
                      src={ad.mediaUrl} 
                      className="max-w-full max-h-full rounded-lg"
                      muted
                    />
                  ) : (
                    <img 
                      src={ad.mediaUrl} 
                      alt={ad.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Ad Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{ad.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs w-fit">
                      Active
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">
                    Size: {ad.width}x{ad.height}px • Type: {ad.mediaType.toUpperCase()}
                  </p>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-blue-900 font-semibold text-lg">
                        {ad.analytics?.impressions || 0}
                      </div>
                      <div className="text-blue-700 text-sm">Impressions</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-green-900 font-semibold text-lg">
                        {ad.analytics?.clicks || 0}
                      </div>
                      <div className="text-green-700 text-sm">Clicks</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-purple-900 font-semibold text-lg">
                        {ad.analytics?.impressions > 0 ? 
                          ((ad.analytics?.clicks || 0) / ad.analytics.impressions * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-purple-700 text-sm">CTR</div>
                    </div>
                  </div>

                  {/* Target Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-500">Devices:</span>
                      {ad.targetDevices?.map(device => (
                        <span key={device} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {device}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleAdClick(ad)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                      Visit Ad
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveAdsPage;