import { useState, useEffect } from 'react';
import { 
  Search, Filter, Grid3X3, List, Eye, MousePointer, 
  TrendingUp, Zap, Globe, Smartphone, Monitor, Tablet,
  Play, Image, Video, ExternalLink, BarChart3, Users,
  Clock, Star, ArrowUpRight, Sparkles
} from 'lucide-react';
import Apihelper from '../service/Apihelper';

const AdListPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    device: '',
    platform: '',
    mediaType: ''
  });

  useEffect(() => {
    fetchAds();
  }, [filters]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await Apihelper.GetAllAds(filters);
      setAds(response.data.ads || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch campaigns');
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

  const filteredAds = ads.filter(ad => 
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.mediaType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDeviceIcon = (device) => {
    switch(device) {
      case 'web': return Monitor;
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Globe;
    }
  };

  const getMediaIcon = (mediaType) => {
    switch(mediaType) {
      case 'video': return Video;
      case 'gif': return Play;
      default: return Image;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading Campaign Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Campaign Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover high-performance advertising campaigns from leading brands and creative agencies
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns, brands, or formats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50/50"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={filters.device}
                onChange={(e) => setFilters({...filters, device: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All Devices</option>
                <option value="web">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
              </select>
              
              <select
                value={filters.platform}
                onChange={(e) => setFilters({...filters, platform: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All Platforms</option>
                <option value="html">HTML/CSS</option>
                <option value="react">React</option>
                <option value="php">PHP</option>
                <option value="java">Java</option>
                <option value="flutter">Flutter</option>
                <option value="swift">Swift</option>
              </select>

              <select
                value={filters.mediaType}
                onChange={(e) => setFilters({...filters, mediaType: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All Formats</option>
                <option value="image">Static Image</option>
                <option value="video">Video</option>
                <option value="gif">Animated GIF</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Campaigns</p>
                <p className="text-3xl font-bold">{filteredAds.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Campaigns</p>
                <p className="text-3xl font-bold">{filteredAds.filter(ad => ad.isActive).length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Impressions</p>
                <p className="text-3xl font-bold">
                  {filteredAds.reduce((sum, ad) => sum + (ad.analytics?.impressions || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Clicks</p>
                <p className="text-3xl font-bold">
                  {filteredAds.reduce((sum, ad) => sum + (ad.analytics?.clicks || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center">
            <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Unable to Load Campaigns</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Campaign Grid */}
        {filteredAds.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Campaigns Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filters to discover more advertising campaigns
            </p>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredAds.map((ad) => {
              const MediaIcon = getMediaIcon(ad.mediaType);
              const ctr = ad.analytics?.impressions > 0 
                ? ((ad.analytics?.clicks || 0) / ad.analytics.impressions * 100).toFixed(2)
                : 0;

              return (
                <div 
                  key={ad._id} 
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Campaign Media */}
                  <div 
                    className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer overflow-hidden"
                    onClick={() => handleAdClick(ad)}
                  >
                    {ad.mediaType === 'video' ? (
                      <video 
                        src={ad.mediaUrl} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        muted
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                    ) : (
                      <img 
                        src={ad.mediaUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-2">
                            <MediaIcon className="w-5 h-5" />
                            <span className="text-sm font-medium capitalize">{ad.mediaType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">View Campaign</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ad.isActive 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}>
                        {ad.isActive ? 'Live' : 'Paused'}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {ad.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {ad.width} × {ad.height}px • Created by {ad.createdBy?.username || 'Anonymous'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="w-4 h-4 text-blue-600 mr-1" />
                        </div>
                        <p className="text-lg font-bold text-blue-900">{(ad.analytics?.impressions || 0).toLocaleString()}</p>
                        <p className="text-xs text-blue-700">Impressions</p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <MousePointer className="w-4 h-4 text-green-600 mr-1" />
                        </div>
                        <p className="text-lg font-bold text-green-900">{(ad.analytics?.clicks || 0).toLocaleString()}</p>
                        <p className="text-xs text-green-700">Clicks</p>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                        </div>
                        <p className="text-lg font-bold text-purple-900">{ctr}%</p>
                        <p className="text-xs text-purple-700">CTR</p>
                      </div>
                    </div>

                    {/* Target Devices */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Target Devices</p>
                      <div className="flex flex-wrap gap-2">
                        {ad.targetDevices?.map(device => {
                          const DeviceIcon = getDeviceIcon(device);
                          return (
                            <div key={device} className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full">
                              <DeviceIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-xs font-medium text-gray-700 capitalize">{device}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Platform Integration */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Platform Integration</p>
                      <div className="flex flex-wrap gap-2">
                        {ad.targetPlatforms?.slice(0, 3).map(platform => (
                          <span key={platform} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg font-medium uppercase">
                            {platform}
                          </span>
                        ))}
                        {ad.targetPlatforms?.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                            +{ad.targetPlatforms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleAdClick(ad)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Experience Campaign</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Section */}
        {filteredAds.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 font-semibold rounded-2xl hover:bg-white transition-all shadow-lg">
              Load More Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdListPage;