import React, { useState, useEffect } from 'react';
import { 
  Shield, Eye, CheckCircle, XCircle, AlertTriangle, 
  Search, Filter, MoreVertical, User, Calendar,
  TrendingUp, MousePointer, DollarSign, Settings,
  Ban, Play, Pause, Trash2, Edit3, ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import Apihelper from '../../service/Apihelper';

const AdminCampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  const fetchAllCampaigns = async () => {
    try {
      const response = await Apihelper.GetAllCampaigns();
      setCampaigns(response.data.campaigns || []);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (campaignId, newStatus) => {
    setActionLoading(true);
    try {
      await Apihelper.ToggleCampaignStatus(campaignId);
      fetchAllCampaigns();
    } catch (err) {
      setError('Failed to update campaign status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }
    
    setActionLoading(true);
    try {
      await Apihelper.DeleteCampaign(campaignId);
      setCampaigns(campaigns.filter(c => c._id !== campaignId));
    } catch (err) {
      setError('Failed to delete campaign');
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveCampaign = async (campaignId) => {
    setActionLoading(true);
    try {
      await Apihelper.ApproveCampaign(campaignId, 'Campaign approved by admin');
      fetchAllCampaigns();
    } catch (err) {
      setError('Failed to approve campaign');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectCampaign = async (campaignId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    
    setActionLoading(true);
    try {
      await Apihelper.RejectCampaign(campaignId, reason);
      fetchAllCampaigns();
    } catch (err) {
      setError('Failed to reject campaign');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.createdBy?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (isActive) => {
    return isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? CheckCircle : XCircle;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
              <p className="text-gray-600">Monitor and manage all advertising campaigns</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-green-600">
                    {campaigns.filter(c => c.isActive).length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {campaigns.reduce((sum, c) => sum + (c.analytics?.impressions || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {campaigns.reduce((sum, c) => sum + (c.analytics?.clicks || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MousePointer className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns or advertisers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredCampaigns.length} of {campaigns.length} campaigns
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredCampaigns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'No campaigns have been created yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Advertiser
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => {
                    const StatusIcon = getStatusIcon(campaign.isActive);
                    const ctr = campaign.analytics?.impressions > 0 
                      ? ((campaign.analytics?.clicks || 0) / campaign.analytics.impressions * 100).toFixed(2)
                      : 0;

                    return (
                      <tr key={campaign._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-4">
                              {campaign.adCreatives?.[0]?.imageUrl ? (
                                <img 
                                  src={campaign.adCreatives[0].imageUrl} 
                                  alt={campaign.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <ImageIcon className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                              <div className="text-sm text-gray-500">
                                {campaign.adCreatives?.[0]?.type || 'No media'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {campaign.createdBy?.username || 'Unknown'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {campaign.createdBy?.email || 'No email'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'pending_review' ? 'text-yellow-600 bg-yellow-100' :
                            campaign.status === 'approved' ? 'text-green-600 bg-green-100' :
                            campaign.status === 'rejected' ? 'text-red-600 bg-red-100' :
                            campaign.status === 'active' ? 'text-blue-600 bg-blue-100' :
                            'text-gray-600 bg-gray-100'
                          }`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {campaign.status?.replace('_', ' ') || 'Draft'}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Eye className="w-3 h-3 text-blue-500 mr-1" />
                              <span className="font-medium">{(campaign.analytics?.impressions || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MousePointer className="w-3 h-3 text-green-500 mr-1" />
                              <span className="font-medium">{(campaign.analytics?.clicks || 0).toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-500">CTR: {ctr}%</div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedCampaign(campaign)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleStatusChange(campaign._id, !campaign.isActive)}
                              disabled={actionLoading}
                              className={`p-2 rounded-lg transition-colors ${
                                campaign.isActive 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                              title={campaign.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {campaign.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => window.open(campaign.clickUrl, '_blank')}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Visit Landing Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>

                            {campaign.status === 'pending_review' && (
                              <>
                                <button
                                  onClick={() => handleApproveCampaign(campaign._id)}
                                  disabled={actionLoading}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve Campaign"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleRejectCampaign(campaign._id)}
                                  disabled={actionLoading}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject Campaign"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => handleDeleteCampaign(campaign._id)}
                              disabled={actionLoading}
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
          )}
        </div>

        {/* Campaign Detail Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
                  <button 
                    onClick={() => setSelectedCampaign(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Media Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Preview</h3>
                    <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                      {selectedCampaign.mediaType === 'video' ? (
                        <video 
                          src={selectedCampaign.mediaUrl} 
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img 
                          src={selectedCampaign.mediaUrl} 
                          alt={selectedCampaign.title}
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
                          <p className="text-lg font-semibold text-gray-900">{selectedCampaign.title}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Dimensions</label>
                            <p className="font-semibold text-gray-900">
                              {selectedCampaign.width} × {selectedCampaign.height}px
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Media Type</label>
                            <p className="font-semibold text-gray-900 capitalize">{selectedCampaign.mediaType}</p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Advertiser</label>
                          <div className="flex items-center mt-1">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {selectedCampaign.advertiser?.username || 'Unknown'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {selectedCampaign.advertiser?.email || 'No email'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Destination URL</label>
                          <a 
                            href={selectedCampaign.clickUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 break-all"
                          >
                            {selectedCampaign.clickUrl}
                          </a>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Status</label>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(selectedCampaign.isActive)}`}>
                            {React.createElement(getStatusIcon(selectedCampaign.isActive), { className: "w-4 h-4 mr-1" })}
                            {selectedCampaign.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-blue-900">
                            {(selectedCampaign.analytics?.impressions || 0).toLocaleString()}
                          </p>
                          <p className="text-sm text-blue-700">Impressions</p>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <MousePointer className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-green-900">
                            {(selectedCampaign.analytics?.clicks || 0).toLocaleString()}
                          </p>
                          <p className="text-sm text-green-700">Clicks</p>
                        </div>
                        
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                          <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-purple-900">
                            {selectedCampaign.analytics?.impressions > 0 
                              ? ((selectedCampaign.analytics?.clicks || 0) / selectedCampaign.analytics.impressions * 100).toFixed(2)
                              : 0}%
                          </p>
                          <p className="text-sm text-purple-700">CTR</p>
                        </div>
                        
                        <div className="text-center p-4 bg-orange-50 rounded-xl">
                          <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-orange-900">
                            ${(selectedCampaign.wallet?.balance || 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-orange-700">Wallet Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handleStatusChange(selectedCampaign._id, !selectedCampaign.isActive)}
                    disabled={actionLoading}
                    className={`px-6 py-3 font-semibold rounded-xl transition-colors flex items-center space-x-2 ${
                      selectedCampaign.isActive 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedCampaign.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{selectedCampaign.isActive ? 'Deactivate' : 'Activate'}</span>
                  </button>
                  
                  <button 
                    onClick={() => window.open(selectedCampaign.clickUrl, '_blank')}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Visit Landing Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCampaignPage;