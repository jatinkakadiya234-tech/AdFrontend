import { useState, useEffect } from 'react';
import { Upload, Code, Eye, Settings } from 'lucide-react';
import Apihelper from '../service/Apihelper';

const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    width: '',
    height: '',
    mediaType: 'image',
    clickUrl: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Apihelper.GetCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      if (file.type.startsWith('video/')) {
        setFormData({...formData, mediaType: 'video'});
      } else if (file.type === 'image/gif') {
        setFormData({...formData, mediaType: 'gif'});
      } else {
        setFormData({...formData, mediaType: 'image'});
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!selectedFile) {
      setError('Please select a media file');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('width', formData.width);
      formDataToSend.append('height', formData.height);
      formDataToSend.append('mediaType', formData.mediaType);
      formDataToSend.append('clickUrl', formData.clickUrl);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('file', selectedFile);

      const response = await Apihelper.CreateAd(formDataToSend);
      setSuccess('Campaign created successfully!');
      
      setFormData({
        title: '',
        width: '',
        height: '',
        mediaType: 'image',
        clickUrl: '',
        category: ''
      });
      setSelectedFile(null);
      setPreviewUrl('');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Code className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Campaign Information</h2>
                      <p className="text-sm text-gray-600">Define your campaign's core details and objectives</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter compelling campaign title"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Choose a descriptive name for internal tracking</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL</label>
                      <input
                        type="url"
                        value={formData.clickUrl}
                        onChange={(e) => setFormData({...formData, clickUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://your-landing-page.com"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Where users will be directed when they click</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose the most relevant category for your ad</p>
                  </div>
                </div>

                {/* Creative Assets */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Upload className="w-6 h-6 text-purple-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Creative Assets</h2>
                      <p className="text-sm text-gray-600">Upload and configure your advertising media</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media Upload</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          {selectedFile ? selectedFile.name : 'Upload Creative Asset'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Drag & drop or click to browse • JPG, PNG, GIF, MP4, WebM • Max 50MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width (pixels)</label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => setFormData({...formData, width: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (pixels)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                      <select
                        value={formData.mediaType}
                        onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="gif">GIF</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Creating...' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-sm text-gray-600">Real-time campaign visualization</p>
                </div>
              </div>
              
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    {formData.mediaType === 'video' ? (
                      <video 
                        src={previewUrl} 
                        className="w-full h-32 rounded object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={previewUrl} 
                        alt="Preview"
                        className="w-full h-32 rounded object-cover"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-2">📷</div>
                  <h4 className="font-medium text-gray-700 mb-1">No Asset Selected</h4>
                  <p className="text-gray-500 text-sm">Upload a creative asset to see the preview</p>
                </div>
              )}
            </div>

            {/* Campaign Insights */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-orange-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Insights</h3>
                  <p className="text-sm text-gray-600">Optimization recommendations</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 text-sm mb-1">Multi-Platform Ready</h4>
                  <p className="text-blue-800 text-xs">Your campaign will generate optimized code for all selected platforms automatically.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-900 text-sm mb-1">Performance Tracking</h4>
                  <p className="text-green-800 text-xs">Built-in analytics will track impressions, clicks, and conversion metrics.</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-medium text-purple-900 text-sm mb-1">Responsive Design</h4>
                  <p className="text-purple-800 text-xs">Automatically adapts to different screen sizes and device orientations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdPage;