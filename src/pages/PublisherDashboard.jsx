import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Settings, Bell } from 'lucide-react';
import PublisherRegistration from '../components/PublisherRegistration';
import CampaignCreator from '../components/CampaignCreator';
import CampaignStatus from '../components/CampaignStatus';
import Apihelper from '../service/Apihelper';

const PublisherDashboard = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    checkProfileStatus();
    fetchCampaigns();
  }, []);

  const checkProfileStatus = async () => {
    try {
      const response = await Apihelper.CheckPublisherProfile();
      setIsProfileComplete(response.data.profileStatus?.isComplete || false);
      
      if (!response.data.profileStatus?.isComplete) {
        setShowRegistration(true);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await Apihelper.GetMyCampaigns();
      console.log('Campaigns response:', response.data);
      setCampaigns(response.data.campaigns || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]);
    }
  };

  const handleProfileComplete = async (profileData) => {
    try {
      const updateData = {
        profile: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          company: profileData.businessName,
          website: profileData.website,
          address: {
            street: profileData.street,
            city: profileData.city,
            state: profileData.state,
            country: profileData.country,
            zipCode: profileData.zipCode
          }
        },
        publisherProfile: {
          businessDetails: {
            businessName: profileData.businessName,
            businessRegistrationNumber: profileData.businessRegistrationNumber,
            businessCategory: profileData.businessCategory,
            yearEstablished: profileData.yearEstablished,
            employeeCount: profileData.employeeCount
          },
          bankingDetails: {
            accountHolderName: profileData.accountHolderName,
            bankName: profileData.bankName,
            accountNumber: profileData.accountNumber,
            routingNumber: profileData.routingNumber
          },
          regionalDetails: {
            primaryMarkets: profileData.primaryMarkets,
            targetAudience: profileData.targetAudience,
            preferredLanguages: profileData.preferredLanguages,
            timeZone: profileData.timeZone
          }
        }
      };
      
      const response = await Apihelper.UpdateUserProfile(updateData);
      
      // Automatically set profile as complete if backend confirms it
      if (response.data.profileComplete) {
        setIsProfileComplete(true);
        setShowRegistration(false);
        alert('Profile completed successfully! You can now create campaigns.');
      } else {
        alert('Profile updated, but some required fields may be missing.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCampaignCreate = async (campaignData) => {
    try {
      await Apihelper.CreateCampaign(campaignData);
      setShowCampaignCreator(false);
      fetchCampaigns();
      alert('Campaign created successfully!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Please try again.');
    }
  };

  const handleCampaignStatusChange = async (action) => {
    if (!selectedCampaign) return;

    try {
      switch (action) {
        case 'submit':
          await Apihelper.SubmitCampaignForReview(selectedCampaign._id);
          break;
        case 'activate':
          await Apihelper.ActivateCampaign(selectedCampaign._id);
          break;
        case 'pause':
        case 'resume':
          await Apihelper.ToggleCampaignStatus(selectedCampaign._id);
          break;
        default:
          return;
      }

      fetchCampaigns();
      const updatedCampaign = campaigns.find(c => c._id === selectedCampaign._id);
      setSelectedCampaign(updatedCampaign);
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Publisher Dashboard!</h1>
            <p className="text-lg text-gray-600 mb-6">Before you can create campaigns, we need some important information to set up your account properly.</p>
            
            {/* Benefits */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Why we need this information:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Secure Payments</p>
                    <p className="text-sm text-blue-700">Banking details ensure you get paid accurately and on time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Better Targeting</p>
                    <p className="text-sm text-blue-700">Regional settings help optimize your campaign performance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Compliance</p>
                    <p className="text-sm text-blue-700">Business information ensures regulatory compliance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Account Security</p>
                    <p className="text-sm text-blue-700">Verification protects your account and earnings</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Time Estimate */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-800 font-medium">Takes only 5-7 minutes to complete</span>
              </div>
            </div>
            
            {/* Skip for now button */}
            <div className="text-center mb-6">
              <button
                onClick={() => {
                  setIsProfileComplete(true);
                  setShowRegistration(false);
                }}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Skip for now (for testing)
              </button>
            </div>
          </div>
          
          <PublisherRegistration onComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  if (showCampaignCreator) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowCampaignCreator(false)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="text-gray-600">Set up your advertising campaign with targeting and budget options</p>
          </div>
          <CampaignCreator
            isProfileComplete={isProfileComplete}
            onCampaignCreate={handleCampaignCreate}
          />
        </div>
      </div>
    );
  }

  if (selectedCampaign) {
    return (
      <div>
        <button
          onClick={() => setSelectedCampaign(null)}
          className="mb-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          ← Back to Campaigns
        </button>
        <CampaignStatus
          campaign={selectedCampaign}
          onStatusChange={handleCampaignStatusChange}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publisher Dashboard</h1>
          <p className="text-gray-600">Manage your advertising campaigns</p>
        </div>
        <button
          onClick={() => setShowCampaignCreator(true)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Campaign
        </button>
      </div>



      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Campaigns</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.displayStatus === 'active' && campaign.canRun ? 'bg-green-100 text-green-800' :
                      campaign.displayStatus === 'inactive' || !campaign.canRun ? 'bg-red-100 text-red-800' :
                      campaign.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.canRun ? (campaign.status.replace('_', ' ')) : 'Inactive (No Balance)'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns yet. Create your first campaign to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublisherDashboard;