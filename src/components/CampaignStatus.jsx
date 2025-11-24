import React from 'react';
import { Clock, CheckCircle, XCircle, Pause, Play, Eye } from 'lucide-react';

const CampaignStatus = ({ campaign, onStatusChange }) => {
  const getStatusConfig = (status) => {
    const configs = {
      draft: { icon: Clock, color: 'gray', bg: 'bg-gray-100', text: 'Draft' },
      pending_review: { icon: Clock, color: 'yellow', bg: 'bg-yellow-100', text: 'Under Review' },
      approved: { icon: CheckCircle, color: 'green', bg: 'bg-green-100', text: 'Approved' },
      rejected: { icon: XCircle, color: 'red', bg: 'bg-red-100', text: 'Rejected' },
      active: { icon: Play, color: 'blue', bg: 'bg-blue-100', text: 'Active' },
      paused: { icon: Pause, color: 'orange', bg: 'bg-orange-100', text: 'Paused' },
      completed: { icon: CheckCircle, color: 'green', bg: 'bg-green-100', text: 'Completed' }
    };
    return configs[status] || configs.draft;
  };

  const config = getStatusConfig(campaign.status);
  const Icon = config.icon;

  const renderStatusActions = () => {
    switch (campaign.status) {
      case 'draft':
        return (
          <div className="space-y-2">
            <button
              onClick={() => onStatusChange('submit')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit for Review
            </button>
          </div>
        );

      case 'pending_review':
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
              <div>
                <h4 className="font-medium text-yellow-800">Review in Progress</h4>
                <p className="text-sm text-yellow-700">Your campaign is being reviewed by our team.</p>
                <p className="text-xs text-yellow-600 mt-1">Estimated review time: 24-48 hours</p>
              </div>
            </div>
          </div>
        );

      case 'approved':
        return (
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Campaign Approved!</span>
              </div>
            </div>
            <button
              onClick={() => onStatusChange('activate')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Activate Campaign
            </button>
          </div>
        );

      case 'rejected':
        return (
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start">
                <XCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Campaign Rejected</h4>
                  <p className="text-sm text-red-700 mt-1">
                    {campaign.reviewProcess?.rejectionReason || 'Please review and resubmit.'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onStatusChange('edit')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit & Resubmit
            </button>
          </div>
        );

      case 'active':
        return (
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Play className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Campaign Live</span>
                </div>
                <div className="text-sm text-blue-700">
                  Spend: ${campaign.performance?.spend || 0}
                </div>
              </div>
            </div>
            <button
              onClick={() => onStatusChange('pause')}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Pause Campaign
            </button>
          </div>
        );

      case 'paused':
        return (
          <div className="space-y-2">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
              <div className="flex items-center">
                <Pause className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-medium">Campaign Paused</span>
              </div>
            </div>
            <button
              onClick={() => onStatusChange('resume')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Resume Campaign
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Campaign Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{campaign.name}</h2>
          <p className="text-gray-600">{campaign.description}</p>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full ${config.bg}`}>
          <Icon className={`w-4 h-4 text-${config.color}-600 mr-2`} />
          <span className={`text-${config.color}-800 font-medium`}>{config.text}</span>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <span className="text-sm text-gray-600">Budget:</span>
          <p className="font-semibold">${campaign.campaignDetails?.budget?.amount} / {campaign.campaignDetails?.budget?.type}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Objective:</span>
          <p className="font-semibold capitalize">{campaign.campaignDetails?.objective?.replace('_', ' ')}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Start Date:</span>
          <p className="font-semibold">
            {campaign.campaignDetails?.schedule?.startDate ? 
              new Date(campaign.campaignDetails.schedule.startDate).toLocaleDateString() : 'Not set'}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Performance:</span>
          <p className="font-semibold">
            {campaign.performance?.impressions || 0} impressions, {campaign.performance?.clicks || 0} clicks
          </p>
        </div>
      </div>

      {/* Status Actions */}
      {renderStatusActions()}

      {/* Review History */}
      {campaign.reviewProcess?.reviewHistory?.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Review History
          </h4>
          <div className="space-y-2">
            {campaign.reviewProcess.reviewHistory.map((review, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="capitalize">{review.action.replace('_', ' ')}</span>
                <span className="text-gray-600">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignStatus;