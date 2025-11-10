import { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';

const MyAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAd, setEditingAd] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await Apihelper.GetAds();
      setAds(response.data.ads);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch ads');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await Apihelper.DeleteAd(id);
        setAds(ads.filter(ad => ad._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete ad');
      }
    }
  };

  const handleEdit = (ad) => {
    setEditingAd({
      ...ad,
      targetDevices: ad.targetDevices || ['web', 'mobile'],
      targetPlatforms: ad.targetPlatforms || ['html']
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', editingAd.title);
      formData.append('width', editingAd.width);
      formData.append('height', editingAd.height);
      formData.append('clickUrl', editingAd.clickUrl);
      formData.append('isActive', editingAd.isActive);
      formData.append('targetDevices', JSON.stringify(editingAd.targetDevices));
      formData.append('targetPlatforms', JSON.stringify(editingAd.targetPlatforms));
      
      if (editingAd.file) {
        formData.append('file', editingAd.file);
      }

      await Apihelper.UpdateAd(editingAd._id, formData);
      setEditingAd(null);
      fetchAds();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ad');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePreview = async (ad) => {
    try {
      await Apihelper.TrackClick(ad._id, { device: 'web' });
      window.open(ad.clickUrl, '_blank');
    } catch (err) {
      console.log('Click tracking failed:', err);
      window.open(ad.clickUrl, '_blank');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Advertisements</h1>
        <button 
          onClick={() => window.location.href = '/create-ad'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create New Ad
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {ads.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No ads found</div>
          <p className="text-gray-400 mt-2">Create your first advertisement to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Ad Preview */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {ad.mediaType === 'video' ? (
                  <video 
                    src={ad.mediaUrl} 
                    className="max-w-full max-h-full"
                    controls
                  />
                ) : (
                  <img 
                    src={ad.mediaUrl} 
                    alt={ad.title}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              {/* Ad Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Size: {ad.width}x{ad.height}px
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Type: <span className="capitalize">{ad.mediaType}</span>
                </p>
                
                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ad.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {ad.mediaType.toUpperCase()}
                  </span>
                </div>

                {/* Analytics */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-blue-900 font-medium">{ad.analytics?.impressions || 0}</div>
                    <div className="text-blue-700 text-xs">Impressions</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-green-900 font-medium">{ad.analytics?.clicks || 0}</div>
                    <div className="text-green-700 text-xs">Clicks</div>
                  </div>
                </div>

                {/* Target Info */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Devices:</div>
                  <div className="flex flex-wrap gap-1">
                    {ad.targetDevices?.map(device => (
                      <span key={device} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {device}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePreview(ad)}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => handleEdit(ad)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(ad._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Advertisement</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editingAd.title}
                  onChange={(e) => setEditingAd({...editingAd, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <input
                    type="number"
                    value={editingAd.width}
                    onChange={(e) => setEditingAd({...editingAd, width: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <input
                    type="number"
                    value={editingAd.height}
                    onChange={(e) => setEditingAd({...editingAd, height: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Click URL</label>
                <input
                  type="url"
                  value={editingAd.clickUrl}
                  onChange={(e) => setEditingAd({...editingAd, clickUrl: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">New Media File (optional)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setEditingAd({...editingAd, file: e.target.files[0]})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingAd.isActive}
                    onChange={(e) => setEditingAd({...editingAd, isActive: e.target.checked})}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdsPage;