import React, { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';
import EmbedCodeGenerator from '../components/EmbedCodeGenerator';

const AdViewerPage = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('web');
  const [selectedDevice, setSelectedDevice] = useState('web');
  const [loading, setLoading] = useState(true);

  const platforms = [
    { value: 'web', label: 'HTML/CSS', icon: '🌐' },
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'flutter', label: 'Flutter', icon: '📱' },
    { value: 'swift', label: 'Swift', icon: '🍎' },
    { value: 'mobile', label: 'Mobile Web', icon: '📲' }
  ];

  const devices = [
    { value: 'web', label: 'Desktop', icon: '💻' },
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'tablet', label: 'Tablet', icon: '📟' }
  ];

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await Apihelper.GetAllAds();
      setAds(response.data.ads);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAdCode = async (adId) => {
    try {
      const response = await fetch(`http://localhost:5500/api/ad/${adId}?device=${selectedDevice}&platform=${selectedPlatform}`);
      const data = await response.json();
      return data.ad.embedCode;
    } catch (error) {
      console.error('Error getting ad code:', error);
      return 'Error loading ad code';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  const trackImpression = async (adId) => {
    try {
      await Apihelper.TrackImpression(adId, {
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'web',
        platform: 'web',
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const AdCard = ({ ad }) => {
    const [impressions, setImpressions] = useState(ad.analytics?.impressions || 0);
    const [clicks, setClicks] = useState(ad.analytics?.clicks || 0);
    const [hasTracked, setHasTracked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Track impression when ad comes into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTracked) {
              setIsVisible(true);
              trackImpression(ad._id);
              setImpressions(prev => prev + 1);
              setHasTracked(true);
            }
          });
        },
        { threshold: 0.5 } // Track when 50% of ad is visible
      );

      const adElement = document.getElementById(`ad-${ad._id}`);
      if (adElement) {
        observer.observe(adElement);
      }

      return () => {
        if (adElement) {
          observer.unobserve(adElement);
        }
      };
    }, [ad._id, hasTracked]);

    // Auto-refresh impression data every 30 seconds
    useEffect(() => {
      if (hasTracked) {
        const interval = setInterval(async () => {
          try {
            const response = await Apihelper.GetImpressionStats(ad._id);
            setImpressions(response.data.ad.totalImpressions);
            setClicks(response.data.ad.totalClicks);
          } catch (error) {
            console.error('Error refreshing impression data:', error);
          }
        }, 30000);
        
        return () => clearInterval(interval);
      }
    }, [hasTracked, ad._id]);

    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : 0;

    return (
      <div id={`ad-${ad._id}`} className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
          {ad.mediaType === 'video' ? (
            <video 
              src={ad.mediaUrl} 
              className="w-full h-full object-cover"
              controls
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
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base truncate">{ad.title}</h3>
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-3">
          <span>{ad.width}x{ad.height}</span>
          <span className="capitalize">{ad.mediaType}</span>
        </div>
        
        {/* Real-time Analytics */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 text-center">
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-600 text-sm sm:text-lg font-bold">{impressions}</div>
            <div className="text-xs text-blue-600">Views</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-600 text-sm sm:text-lg font-bold">{clicks}</div>
            <div className="text-xs text-green-600">Clicks</div>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <div className="text-purple-600 text-sm sm:text-lg font-bold">{ctr}%</div>
            <div className="text-xs text-purple-600">CTR</div>
          </div>
        </div>
        
        <button
          onClick={async () => {
            setSelectedAd(ad);
            try {
              await Apihelper.TrackImpression(ad._id, { 
                device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'web',
                isClick: true
              });
              setClicks(prev => prev + 1);
              setImpressions(prev => prev + 1);
            } catch (error) {
              console.error('Error tracking click:', error);
            }
          }}
          className={`w-full py-2 rounded-md transition-all text-sm sm:text-base ${
            isVisible 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {isVisible ? 'Get Code' : 'Loading...'}
        </button>
      </div>
    );
  };

  const CodeModal = () => {
    const [embedCode, setEmbedCode] = useState('Loading...');

    useEffect(() => {
      if (selectedAd) {
        getAdCode(selectedAd._id).then(setEmbedCode);
      }
    }, [selectedAd, selectedPlatform, selectedDevice]);

    if (!selectedAd) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Embed Code - {selectedAd.title}</h2>
              <button
                onClick={() => setSelectedAd(null)}
                className="text-gray-500 hover:text-gray-700 self-end sm:self-auto"
              >
                ✕
              </button>
            </div>

            {/* Platform Selection */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Select Platform:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {platforms.map(platform => (
                  <button
                    key={platform.value}
                    onClick={() => setSelectedPlatform(platform.value)}
                    className={`p-2 sm:p-3 rounded-lg border-2 transition-colors ${
                      selectedPlatform === platform.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg sm:text-2xl mb-1">{platform.icon}</div>
                    <div className="text-xs sm:text-sm font-medium">{platform.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Device Selection */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Select Device:</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {devices.map(device => (
                  <button
                    key={device.value}
                    onClick={() => setSelectedDevice(device.value)}
                    className={`p-2 sm:p-3 rounded-lg border-2 transition-colors flex-1 min-w-0 ${
                      selectedDevice === device.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg sm:text-xl mb-1">{device.icon}</div>
                    <div className="text-xs sm:text-sm font-medium">{device.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                <h3 className="text-base sm:text-lg font-semibold">Embed Code:</h3>
                <button
                  onClick={() => copyToClipboard(embedCode)}
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  📋 Copy Code
                </button>
              </div>
              <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all">{embedCode}</pre>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Preview:</h3>
              <div className="border-2 border-dashed border-gray-300 p-3 sm:p-4 rounded-lg bg-gray-50">
                <div className="max-w-sm sm:max-w-md mx-auto">
                  {selectedAd.mediaType === 'video' ? (
                    <video 
                      src={selectedAd.mediaUrl} 
                      width={selectedAd.width}
                      height={selectedAd.height}
                      controls
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <img 
                      src={selectedAd.mediaUrl} 
                      alt={selectedAd.title}
                      width={selectedAd.width}
                      height={selectedAd.height}
                      className="max-w-full h-auto"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Embed Code Generator */}
            <EmbedCodeGenerator adId={selectedAd._id} />
            
            {/* Instructions */}
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Integration Instructions:</h4>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• Select your programming language above</li>
                <li>• Copy the generated embed code</li>
                <li>• Paste it into your website/app where you want the ad to appear</li>
                <li>• The ad will automatically track impressions and clicks</li>
              </ul>
            </div>
          </div>
        </div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Ad Integration Center</h1>
          <p className="text-gray-600 text-sm sm:text-base">Browse and get embed codes for different platforms</p>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">📢</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Ads Available</h3>
            <p className="text-gray-600 text-sm sm:text-base">There are currently no active ads to display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {ads.map(ad => (
              <AdCard key={ad._id} ad={ad} />
            ))}
          </div>
        )}

        <CodeModal />
      </div>
    </div>
  );
};

export default AdViewerPage;