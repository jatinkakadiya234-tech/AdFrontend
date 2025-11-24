import React, { useState } from 'react';
import EmbedCodeApi from '../service/EmbedCodeApi';

const AdLink = ({ ad }) => {
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleLinkClick = async (e) => {
    e.preventDefault();
    
    if (clicked) {
      // If already clicked, just open the link
      window.open(ad.clickUrl, '_blank');
      return;
    }

    setLoading(true);
    try {
      // API call to get full ad data
      const response = await EmbedCodeApi.getAdById(ad._id);
      setAdData(response.ad);
      setClicked(true);
      
      // Track the click
      await EmbedCodeApi.trackClick(ad._id);
    } catch (error) {
      console.error('Error loading ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const openActualLink = () => {
    window.open(adData?.clickUrl || ad.clickUrl, '_blank');
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {!clicked ? (
        // Show only link before click
        <div>
          <h3 className="font-semibold mb-2">{ad.title}</h3>
          <button
            onClick={handleLinkClick}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'View Advertisement'}
          </button>
          <div className="mt-2 text-sm text-gray-500">
            <p>Size: {ad.width}x{ad.height}</p>
            <p>Category: {ad.category?.name || 'N/A'}</p>
          </div>
        </div>
      ) : (
        // Show full content after click
        <div>
          <h3 className="font-semibold mb-2">{adData?.title || ad.title}</h3>
          
          {adData && (
            <div 
              onClick={openActualLink}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              {adData.mediaType === 'video' ? (
                <video 
                  src={adData.mediaUrl} 
                  width={adData.width} 
                  height={adData.height}
                  controls
                  className="w-full h-auto rounded"
                />
              ) : (
                <img 
                  src={adData.mediaUrl} 
                  alt={adData.title}
                  width={adData.width}
                  height={adData.height}
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          )}
          
          <div className="mt-2 text-sm text-gray-600">
            <p>Clicks: {adData?.analytics?.clicks || 0}</p>
            <p>Views: {adData?.analytics?.impressions || 0}</p>
            <button
              onClick={openActualLink}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Visit Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdLink;