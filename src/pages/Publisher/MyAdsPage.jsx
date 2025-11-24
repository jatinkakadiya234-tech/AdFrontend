import { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, Eye, Play, Pause, BarChart3, 
  TrendingUp, MousePointer, Monitor, Smartphone, Tablet,
  Image, Video, Zap, Settings, ExternalLink, Calendar,
  CheckCircle, XCircle, AlertCircle, Sparkles, Target,
  Globe, Code, Coffee, Apple, Upload, X, Save, List,
  Grid3X3, Search, Filter, DollarSign
} from 'lucide-react';
import { SiReact, SiPhp, SiFlutter } from 'react-icons/si';
import Apihelper from '../../service/Apihelper';

const MyAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAd, setEditingAd] = useState(null);
  const [viewingAd, setViewingAd] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [rechargeAd, setRechargeAd] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeLoading, setRechargeLoading] = useState(false);
  const [userWalletBalance, setUserWalletBalance] = useState(0);

  useEffect(() => {
    fetchAds();
    fetchUserWallet();
    
    // Auto-refresh impressions every 10 seconds
    const interval = setInterval(() => {
      fetchAds();
      fetchUserWallet();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchAds = async () => {
    try {
      const response = await Apihelper.GetAds();
      setAds(response.data.ads);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWallet = async () => {
    try {
      const response = await Apihelper.GetWalletData();
      setUserWalletBalance(response.data.balance || 0);
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this campaign?')) {
      try {
        await Apihelper.DeleteAd(id);
        setAds(ads.filter(ad => ad._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete campaign');
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

  const handleView = (ad) => {
    setViewingAd(ad);
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
      formData.append('targetDevices', JSON.stringify(editingAd.targetDevices || ['web', 'mobile']));
      formData.append('targetPlatforms', JSON.stringify(editingAd.targetPlatforms || ['html']));
      
      if (editingAd.file) {
        formData.append('file', editingAd.file);
      }

      await Apihelper.UpdateAd(editingAd._id, formData);
      setEditingAd(null);
      fetchAds();
      // Auto-close error after 3 seconds if successful
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update campaign');
      // Auto-close error after 3 seconds
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePreview = async (ad) => {
    try {
      await Apihelper.TrackImpression(ad._id, { 
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'web',
        isClick: true
      });
      // Refresh data to show updated counts
      setTimeout(() => fetchAds(), 500);
      window.open(ad.clickUrl, '_blank');
    } catch (err) {
      console.log('Click tracking failed:', err);
      window.open(ad.clickUrl, '_blank');
    }
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setRechargeLoading(true);
    try {
      const response = await Apihelper.RechargeAdWallet(rechargeAd._id, {
        amount: parseFloat(rechargeAmount),
        method: 'manual'
      });
      setUserWalletBalance(response.data.userWalletBalance);
      setRechargeAd(null);
      setRechargeAmount('');
      fetchAds();
    } catch (err) {
      setError(err.response?.data?.message || 'Recharge failed');
      // Auto-close error after 3 seconds
      setTimeout(() => setError(''), 3000);
    } finally {
      setRechargeLoading(false);
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

  const totalImpressions = ads.reduce((sum, ad) => sum + (ad.analytics?.impressions || 0), 0);
  const totalClicks = ads.reduce((sum, ad) => sum + (ad.analytics?.clicks || 0), 0);
  const activeAds = ads.filter(ad => ad.isActive).length;
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading Campaign Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
     

        {/* Performance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-3xl font-bold text-gray-900">{ads.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                <p className="text-3xl font-bold text-blue-600">{totalImpressions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-3xl font-bold text-green-600">{totalClicks.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-2xl">
                <MousePointer className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average CTR</p>
                <p className="text-3xl font-bold text-purple-600">{avgCTR}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1 w-fit mx-auto sm:mx-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'table' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>

              <button 
                onClick={() => window.location.href = '/create-ad'}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Error</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError('')}
              className="p-1 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        )}

        {/* Campaign Display */}
        {filteredAds.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Campaigns Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {searchTerm ? 'Try adjusting your search criteria' : 'Start building your advertising portfolio by creating your first campaign'}
            </p>
            <button 
              onClick={() => window.location.href = '/create-ad'}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Create First Campaign
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Campaign</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Media</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Performance</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden lg:table-cell">Targeting</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAds.map((ad) => {
                    const MediaIcon = getMediaIcon(ad.mediaType);
                    const ctr = ad.analytics?.impressions > 0 
                      ? ((ad.analytics?.clicks || 0) / ad.analytics.impressions * 100).toFixed(2)
                      : 0;

                    return (
                      <tr key={ad._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                            <p className="text-sm text-gray-600">{ad.width} × {ad.height}px</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                              {ad.mediaType === 'video' ? (
                                <video 
                                  src={ad.mediaUrl} 
                                  className="w-full h-full object-cover"
                                  muted
                                />
                              ) : (
                                <img 
                                  src={ad.mediaUrl} 
                                  alt={ad.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <MediaIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600 capitalize">{ad.mediaType}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            ad.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ad.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{ad.isActive ? 'Live' : 'Paused'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Eye className="w-3 h-3 text-blue-500" />
                              <span className="text-gray-900 font-medium">{(ad.analytics?.impressions || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <MousePointer className="w-3 h-3 text-green-500" />
                              <span className="text-gray-900 font-medium">{(ad.analytics?.clicks || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <TrendingUp className="w-3 h-3 text-purple-500" />
                              <span className="text-gray-900 font-medium">{ctr}% CTR</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {ad.targetDevices?.slice(0, 2).map(device => {
                              const DeviceIcon = getDeviceIcon(device);
                              return (
                                <div key={device} className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                  <DeviceIcon className="w-3 h-3" />
                                  <span className="capitalize">{device}</span>
                                </div>
                              );
                            })}
                            {ad.targetDevices?.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{ad.targetDevices.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleView(ad)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Campaign"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => window.open(`/embed-code/${ad._id}`, '_blank')}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Get Embed Code"
                            >
                              <Code className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEdit(ad)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Campaign"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(ad._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        ad.isActive 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}>
                        {ad.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{ad.isActive ? 'Live' : 'Paused'}</span>
                      </div>
                    </div>

                    {/* Media Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        <MediaIcon className="w-3 h-3" />
                        <span className="capitalize">{ad.mediaType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {ad.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {ad.width} × {ad.height}px • Created {new Date(ad.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <Eye className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-blue-900">{(ad.analytics?.impressions || 0).toLocaleString()}</p>
                        <p className="text-xs text-blue-700">Impressions</p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <MousePointer className="w-4 h-4 text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-900">{(ad.analytics?.clicks || 0).toLocaleString()}</p>
                        <p className="text-xs text-green-700">Clicks</p>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <TrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-purple-900">{ctr}%</p>
                        <p className="text-xs text-purple-700">CTR</p>
                      </div>
                    </div>

                    {/* Wallet Balance */}
                    <div className="text-center p-3 bg-orange-50 rounded-xl mb-3">
                      <DollarSign className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-orange-900">${(ad.wallet?.balance || 0).toFixed(2)}</p>
                      <p className="text-xs text-orange-700">Wallet</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(ad)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button 
                        onClick={() => window.open(`/embed-code/${ad._id}`, '_blank')}
                        className="px-4 py-2 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
                        title="Get Embed Code"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setRechargeAd(ad)}
                        className="px-4 py-2 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(ad)}
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(ad._id)}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Modal */}
        {viewingAd && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
                    <p className="text-gray-600">View campaign information and media</p>
                  </div>
                  <button 
                    onClick={() => setViewingAd(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Media Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Preview</h3>
                    <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                      {viewingAd.mediaType === 'video' ? (
                        <video 
                          src={viewingAd.mediaUrl} 
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img 
                          src={viewingAd.mediaUrl} 
                          alt={viewingAd.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Campaign Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Title</label>
                          <p className="text-lg font-semibold text-gray-900">{viewingAd.title}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Dimensions</label>
                            <p className="text-lg font-semibold text-gray-900">{viewingAd.width} × {viewingAd.height}px</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Media Type</label>
                            <p className="text-lg font-semibold text-gray-900 capitalize">{viewingAd.mediaType}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Destination URL</label>
                          <p className="text-lg font-semibold text-blue-600 break-all">{viewingAd.clickUrl}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                              viewingAd.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {viewingAd.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                              <span>{viewingAd.isActive ? 'Live' : 'Paused'}</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Wallet Balance</label>
                            <div className="flex items-center space-x-2">
                              <p className="text-lg font-semibold text-green-600">${(viewingAd.wallet?.balance || 0).toFixed(2)}</p>
                              <button
                                onClick={() => {
                                  setViewingAd(null);
                                  setRechargeAd(viewingAd);
                                }}
                                className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700"
                              >
                                Recharge
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-blue-900">{(viewingAd.analytics?.impressions || 0).toLocaleString()}</p>
                          <p className="text-sm text-blue-700">Impressions</p>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <MousePointer className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-green-900">{(viewingAd.analytics?.clicks || 0).toLocaleString()}</p>
                          <p className="text-sm text-green-700">Clicks</p>
                        </div>
                        
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                          <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-purple-900">
                            {viewingAd.analytics?.impressions > 0 
                              ? ((viewingAd.analytics?.clicks || 0) / viewingAd.analytics.impressions * 100).toFixed(2)
                              : 0}%
                          </p>
                          <p className="text-sm text-purple-700">CTR</p>
                        </div>
                        
                        <div className="text-center p-4 bg-orange-50 rounded-xl">
                          <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-orange-900">${(viewingAd.wallet?.balance || 0).toFixed(2)}</p>
                          <p className="text-sm text-orange-700">Wallet Balance</p>
                        </div>
                      </div>
                    </div>

                    {/* Targeting */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Targeting Configuration</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Target Devices</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {viewingAd.targetDevices?.map(device => {
                              const DeviceIcon = getDeviceIcon(device);
                              return (
                                <div key={device} className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-lg">
                                  <DeviceIcon className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-medium text-gray-700 capitalize">{device}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Platform Integration</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {viewingAd.targetPlatforms?.map(platform => (
                              <span key={platform} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-lg font-medium uppercase">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handlePreview(viewingAd)}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Preview Campaign</span>
                  </button>
                  <button 
                    onClick={() => {
                      setViewingAd(null);
                      handleEdit(viewingAd);
                    }}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Edit Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingAd && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Campaign</h2>
                    <p className="text-gray-600">Update your campaign settings and configuration</p>
                  </div>
                  <button 
                    onClick={() => setEditingAd(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Campaign Title</label>
                    <input
                      type="text"
                      value={editingAd.title}
                      onChange={(e) => setEditingAd({...editingAd, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Width (px)</label>
                      <input
                        type="number"
                        value={editingAd.width}
                        onChange={(e) => setEditingAd({...editingAd, width: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Height (px)</label>
                      <input
                        type="number"
                        value={editingAd.height}
                        onChange={(e) => setEditingAd({...editingAd, height: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Destination URL</label>
                    <input
                      type="url"
                      value={editingAd.clickUrl}
                      onChange={(e) => setEditingAd({...editingAd, clickUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Update Creative Asset (Optional)</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setEditingAd({...editingAd, file: e.target.files[0]})}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {editingAd.file ? editingAd.file.name : 'Click to upload new media file'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Target Devices</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['web', 'mobile', 'tablet'].map(device => (
                        <label key={device} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingAd.targetDevices?.includes(device)}
                            onChange={(e) => {
                              const devices = editingAd.targetDevices || [];
                              if (e.target.checked) {
                                setEditingAd({...editingAd, targetDevices: [...devices, device]});
                              } else {
                                setEditingAd({...editingAd, targetDevices: devices.filter(d => d !== device)});
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700 capitalize">{device}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Target Platforms</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['html', 'react', 'php', 'java', 'flutter', 'swift'].map(platform => (
                        <label key={platform} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingAd.targetPlatforms?.includes(platform)}
                            onChange={(e) => {
                              const platforms = editingAd.targetPlatforms || [];
                              if (e.target.checked) {
                                setEditingAd({...editingAd, targetPlatforms: [...platforms, platform]});
                              } else {
                                setEditingAd({...editingAd, targetPlatforms: platforms.filter(p => p !== platform)});
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700 uppercase">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={editingAd.isActive}
                          onChange={(e) => setEditingAd({...editingAd, isActive: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                          Campaign Status
                        </label>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        editingAd.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {editingAd.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-orange-900">Ad Wallet Balance</h4>
                          <p className="text-2xl font-bold text-orange-600">${(editingAd.wallet?.balance || 0).toFixed(2)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAd(null);
                            setRechargeAd(editingAd);
                          }}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>Recharge</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setEditingAd(null)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      {updateLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Update Campaign</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Recharge Modal */}
        {rechargeAd && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recharge Ad Wallet</h2>
                    <p className="text-gray-600">{rechargeAd.title}</p>
                  </div>
                  <button 
                    onClick={() => setRechargeAd(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="mb-6 space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">Ad Wallet Balance</p>
                    <p className="text-2xl font-bold text-green-600">${(rechargeAd.wallet?.balance || 0).toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">Your Main Wallet</p>
                    <p className="text-2xl font-bold text-blue-600">${userWalletBalance.toFixed(2)}</p>
                  </div>
                </div>
                
                <form onSubmit={handleRecharge}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recharge Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                      required
                    />
                    <div className="flex space-x-2 mt-3">
                      {[1, 5, 10, 25, 50].map(amount => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setRechargeAmount(amount.toString())}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setRechargeAd(null)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={rechargeLoading}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
                    >
                      {rechargeLoading ? 'Processing...' : 'Recharge'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdsPage;