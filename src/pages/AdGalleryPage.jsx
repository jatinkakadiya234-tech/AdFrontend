import React, { useState, useEffect } from 'react';
import AdLink from '../components/AdLink';
import EmbedCodeApi from '../service/EmbedCodeApi';

const AdGalleryPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await EmbedCodeApi.getAllAds();
      setAds(response.ads || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchAds}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ad Gallery</h1>
          <p className="text-gray-600">Browse and interact with active advertisements</p>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No ads available</p>
            <p className="text-gray-400 mt-2">Create some ads to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map((ad) => (
              <AdLink key={ad._id} ad={ad} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          Total ads: {ads.length}
        </div>
      </div>
    </div>
  );
};

export default AdGalleryPage;