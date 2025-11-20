import React, { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';


const AdViewerPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedAdType, setSelectedAdType] = useState('all');
  const [loading, setLoading] = useState(true);

  const adTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'banner', label: 'Banner' },
    { value: 'popup', label: 'Popup' },
    { value: 'video', label: 'Video' },
    { value: 'native', label: 'Native' },
    { value: 'interstitial', label: 'Interstitial' },
    { value: 'rewarded', label: 'Rewarded' }
  ];

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await Apihelper.GetAllCampaigns();
      setCampaigns(response.data.campaigns || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };



  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  const trackCampaignImpression = async (campaignId) => {
    try {
      await Apihelper.TrackCampaignImpression(campaignId);
    } catch (error) {
      console.error('Error tracking campaign impression:', error);
    }
  };

  // Filter campaigns by ad type
  const filteredCampaigns = campaigns.filter(campaign => {
    if (selectedAdType === 'all') return true;
    return campaign.adCreatives?.[0]?.type === selectedAdType;
  });

  const CampaignCard = ({ campaign }) => {
    const ad = campaign.adCreatives?.[0] || {};
    const [impressions, setImpressions] = useState(ad.analytics?.impressions || 0);
    const [clicks, setClicks] = useState(ad.analytics?.clicks || 0);
    const [hasTracked, setHasTracked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Track impression when campaign comes into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTracked) {
              setIsVisible(true);
              trackCampaignImpression(campaign._id);
              setImpressions(prev => prev + 1);
              setHasTracked(true);
            }
          });
        },
        { threshold: 0.5 }
      );

      const campaignElement = document.getElementById(`campaign-${campaign._id}`);
      if (campaignElement) {
        observer.observe(campaignElement);
      }

      return () => {
        if (campaignElement) {
          observer.unobserve(campaignElement);
        }
      };
    }, [campaign._id, hasTracked]);



    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : 0;

    return (
      <div id={`campaign-${campaign._id}`} className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
          {ad.imageUrl ? (
            <img 
              src={ad.imageUrl} 
              alt={campaign.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>No Image</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base truncate">{campaign.name}</h3>
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-3">
          <span>{ad.adFormat?.size || '300x250'}</span>
          <span className="capitalize">{ad.type || 'banner'}</span>
        </div>
        

        
        <button
          onClick={async () => {
            try {
              const response = await Apihelper.TrackCampaignClick(campaign._id);
              alert(`Campaign clicked! $0.50 deducted. Remaining balance: $${response.data.remainingBalance}`);
              setClicks(prev => prev + 1);
            } catch (error) {
              console.error('Error tracking click:', error);
              alert('Error tracking click or insufficient balance');
            }
          }}
          className="w-full py-2 rounded-md transition-all text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700"
        >
          Click Campaign ($0.50)
        </button>
      </div>
    );
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Campaign Center</h1>
          <p className="text-gray-600 text-sm sm:text-base">Browse available campaigns</p>
          
          {/* Ad Type Filter */}
          <div className="mt-4 flex justify-center">
            <select
              value={selectedAdType}
              onChange={(e) => setSelectedAdType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {adTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">📢</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Campaigns Available</h3>
            <p className="text-gray-600 text-sm sm:text-base">No campaigns found for the selected ad type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default AdViewerPage;