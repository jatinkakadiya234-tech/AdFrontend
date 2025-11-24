import React, { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';
import { Target, DollarSign, Calendar, Image, Send } from 'lucide-react';

const CampaignCreator = ({ isProfileComplete, onCampaignCreate }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    category: '',
    campaignDetails: {
      objective: 'traffic',
      budget: { type: 'daily', amount: 10, currency: 'USD' },
      schedule: { startDate: '', endDate: '', timeZone: 'UTC' },
      bidding: { strategy: 'cpc', amount: 0.5 }
    },
    targeting: {
      demographics: { ageRange: { min: 18, max: 65 }, gender: 'all' },
      geographic: { countries: ['US'], locationType: 'people_in_location' },
      devices: ['desktop', 'mobile']
    },
    adCreatives: [{
      type: 'banner',
      title: '',
      description: '',
      clickUrl: '',
      callToAction: 'learn_more',
      imageUrl: '',
      imageFile: null,
      adFormat: {
        size: '300x250',
        position: 'inline',
        animation: false,
        autoplay: false
      }
    }]
  });
  const [categories, setCategories] = useState([]);

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

  if (!isProfileComplete) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Complete Your Profile First</h3>
          <p className="text-yellow-700">Please complete your publisher profile before creating campaigns.</p>
        </div>
      </div>
    );
  }

  const updateCampaign = (path, value) => {
    setCampaign(prev => {
      const newCampaign = { ...prev };
      const keys = path.split('.');
      let current = newCampaign;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newCampaign;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const adType = campaign.adCreatives[0].type;
    const selectedSize = campaign.adCreatives[0].adFormat.size;
    
    if (file) {
      // Validate file size based on type
      const maxSize = adType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File size must be less than ${adType === 'video' ? '50MB' : '10MB'}`);
        return;
      }
      
      // Validate file type based on ad type
      const isValidType = adType === 'video' ? 
        file.type.startsWith('video/') : 
        file.type.startsWith('image/');
        
      if (!isValidType) {
        setError(`Please select a ${adType === 'video' ? 'video' : 'image'} file`);
        return;
      }
      
      // Accept any image for now
      if (file.type.startsWith('image/')) {
        const mediaUrl = URL.createObjectURL(file);
        updateCampaign('adCreatives.0.imageFile', file);
        updateCampaign('adCreatives.0.imageUrl', mediaUrl);
      } else if (file.type.startsWith('video/')) {
        // Validate video dimensions
        const video = document.createElement('video');
        video.onloadedmetadata = function() {
          if (!this.videoWidth || !this.videoHeight || this.videoWidth === 0 || this.videoHeight === 0) {
            setError('Invalid video file. Video has no dimensions.');
            return;
          }
          
          // If video is valid, update campaign
          const mediaUrl = URL.createObjectURL(file);
          updateCampaign('adCreatives.0.imageFile', file);
          updateCampaign('adCreatives.0.imageUrl', mediaUrl);
        };
        video.onerror = function() {
          setError('Invalid video file. Cannot read video dimensions.');
        };
        video.src = URL.createObjectURL(file);
      } else {
        // For videos or fullscreen, no dimension check
        const mediaUrl = URL.createObjectURL(file);
        updateCampaign('adCreatives.0.imageFile', file);
        updateCampaign('adCreatives.0.imageUrl', mediaUrl);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!campaign.name || !campaign.adCreatives[0].title || !campaign.adCreatives[0].clickUrl) {
        setError('Please fill in all required fields');
        return;
      }
      
      if (!campaign.adCreatives[0].imageFile) {
        setError('Please upload an image for your ad');
        return;
      }
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add campaign data
      const campaignData = { ...campaign };
      delete campaignData.adCreatives[0].imageFile;
      delete campaignData.adCreatives[0].imageUrl;
      
      formData.append('campaignData', JSON.stringify(campaignData));
      formData.append('adImage', campaign.adCreatives[0].imageFile);
      
      onCampaignCreate(formData);
    } catch (error) {
      console.error('Error preparing campaign data:', error);
      alert('Error creating campaign. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Campaign Basics</h3>
            </div>
            
            <input
              type="text"
              placeholder="Campaign Name"
              value={campaign.name}
              onChange={(e) => updateCampaign('name', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <textarea
              placeholder="Campaign Description"
              value={campaign.description}
              onChange={(e) => updateCampaign('description', e.target.value)}
              rows={3}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              value={campaign.category}
              onChange={(e) => updateCampaign('category', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={campaign.campaignDetails.objective}
              onChange={(e) => updateCampaign('campaignDetails.objective', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="brand_awareness">Brand Awareness</option>
              <option value="traffic">Website Traffic</option>
              <option value="conversions">Conversions</option>
              <option value="lead_generation">Lead Generation</option>
            </select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Image className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-xl font-semibold">Ad Creative</h3>
            </div>
            
            {/* Ad Type Selection */}
            <select
              value={campaign.adCreatives[0].type}
              onChange={(e) => updateCampaign('adCreatives.0.type', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="banner">Banner Ad</option>
              <option value="popup">Popup Ad</option>
              <option value="video">Video Ad</option>
              <option value="native">Native Ad</option>
              <option value="interstitial">Interstitial Ad</option>
              <option value="rewarded">Rewarded Ad</option>
            </select>
            
            {/* Ad Size Selection */}
            <select
              value={campaign.adCreatives[0].adFormat.size}
              onChange={(e) => updateCampaign('adCreatives.0.adFormat.size', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="300x250">Medium Rectangle (300x250)</option>
              <option value="728x90">Leaderboard (728x90)</option>
              <option value="320x50">Mobile Banner (320x50)</option>
              <option value="160x600">Wide Skyscraper (160x600)</option>
              <option value="970x250">Billboard (970x250)</option>
              <option value="fullscreen">Fullscreen</option>
            </select>
            
            <input
              type="text"
              placeholder="Ad Title"
              value={campaign.adCreatives[0].title}
              onChange={(e) => updateCampaign('adCreatives.0.title', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <textarea
              placeholder="Ad Description"
              value={campaign.adCreatives[0].description}
              onChange={(e) => updateCampaign('adCreatives.0.description', e.target.value)}
              rows={3}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Media Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {campaign.adCreatives[0].type === 'video' ? 'Ad Video' : 
                 campaign.adCreatives[0].type === 'native' ? 'Ad Content' : 'Ad Image'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept={campaign.adCreatives[0].type === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleImageUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  {campaign.adCreatives[0].imageUrl ? (
                    <div className="space-y-2">
                      {campaign.adCreatives[0].type === 'video' ? (
                        <video 
                          src={campaign.adCreatives[0].imageUrl} 
                          className="mx-auto h-32 w-auto rounded-lg"
                          controls
                        />
                      ) : (
                        <img 
                          src={campaign.adCreatives[0].imageUrl} 
                          alt="Preview" 
                          className="mx-auto h-32 w-auto rounded-lg"
                        />
                      )}
                      <p className="text-sm text-gray-600">
                        Click to change {campaign.adCreatives[0].type === 'video' ? 'video' : 'image'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload {campaign.adCreatives[0].type === 'video' ? 'video' : 'image'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {campaign.adCreatives[0].type === 'video' ? 
                            'MP4, AVI, MOV up to 50MB' : 
                            `PNG, JPG, GIF up to 10MB${campaign.adCreatives[0].adFormat.size !== 'fullscreen' ? 
                              ` (${campaign.adCreatives[0].adFormat.size}px required)` : ''}`
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            <input
              type="url"
              placeholder="Click URL"
              value={campaign.adCreatives[0].clickUrl}
              onChange={(e) => updateCampaign('adCreatives.0.clickUrl', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              value={campaign.adCreatives[0].callToAction}
              onChange={(e) => updateCampaign('adCreatives.0.callToAction', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="learn_more">Learn More</option>
              <option value="shop_now">Shop Now</option>
              <option value="sign_up">Sign Up</option>
              <option value="download">Download</option>
              <option value="contact_us">Contact Us</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Error Popup */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => setError('')}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2].map((stepNum) => (
            <div key={stepNum} className={`w-1/2 h-2 rounded ${
              step >= stepNum ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Basics</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className={`px-6 py-2 rounded-lg ${
            step === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>

        {step < 2 ? (
          <button
            onClick={() => {
              // Basic validation before moving to next step
              if (step === 1 && !campaign.name.trim()) {
                setError('Please enter a campaign name');
                return;
              }
              setStep(step + 1);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignCreator;