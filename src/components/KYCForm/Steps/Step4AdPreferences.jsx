import React from 'react';
import { AlertCircle, Monitor, Gift, Maximize2, Link2 } from 'lucide-react';
import { adTypes , AD_SIZE_LIST as AD_SIZES } from '../../../Constants/AdSize';

const Step4AdPreferences = ({ formData, errors, onChange, onMultiSelect }) => {
 

  const interests = [
    'Technology', 'Gaming', 'Sports', 'Fashion', 'Food',
    'Travel', 'Entertainment', 'Education', 'Health & Fitness',
    'Finance', 'Business', 'Music', 'Movies', 'Books'
  ];

  return (
    <div className="min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Ad Preferences</h2>
      <p className="text-gray-600 mb-8">
        Select the types of ads you want to publish and configure your preferences
      </p>

      <div className="space-y-5">
        {/* Ad Types Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Ad Types You Want to Publish <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.adTypes.includes(type.value);
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => onMultiSelect('adTypes', type.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{type.value}</h4>
                      <p className="text-xs text-gray-600">
                        {type.value === 'Banner Ads' && 'Display ads in various sizes'}
                        {type.value === 'Rewarded Ads' && 'Reward users for watching ads'}
                        {type.value === 'Interstitial Ads' && 'Full-screen ads between content'}
                        {type.value === 'URL Shortener' && 'Monetize shortened links'}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.adTypes && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
              <AlertCircle className="w-3 h-3" />
              {errors.adTypes}
            </div>
          )}
        </div>

        {/* Banner Ads Configuration */}
        {formData.adTypes.includes('Banner Ads') && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Banner Ads Configuration</h3>
            </div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Sizes You'll Support <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AD_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => onMultiSelect('bannerSizes', size.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.bannerSizes.includes(size.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {errors.bannerSizes && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle className="w-3 h-3" />
                {errors.bannerSizes}
              </div>
            )}
          </div>
        )}

        {/* Rewarded Ads Configuration */}
        {formData.adTypes.includes('Rewarded Ads') && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Rewarded Ads Configuration</h3>
            </div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Platform Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onChange('rewardedPlatform', 'Mobile App')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.rewardedPlatform === 'Mobile App'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => onChange('rewardedPlatform', 'Website')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.rewardedPlatform === 'Website'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                Website
              </button>
            </div>
            {errors.rewardedPlatform && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle className="w-3 h-3" />
                {errors.rewardedPlatform}
              </div>
            )}
          </div>
        )}

        {/* Interstitial Ads Configuration */}
        {formData.adTypes.includes('Interstitial Ads') && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Maximize2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Interstitial Ads Configuration</h3>
            </div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Platform Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onChange('interstitialPlatform', 'Mobile App')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.interstitialPlatform === 'Mobile App'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => onChange('interstitialPlatform', 'Website')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.interstitialPlatform === 'Website'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                Website
              </button>
            </div>
            {errors.interstitialPlatform && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle className="w-3 h-3" />
                {errors.interstitialPlatform}
              </div>
            )}
          </div>
        )}

        {/* URL Shortener Configuration */}
        {formData.adTypes.includes('URL Shortener') && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">URL Shortener Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimated Daily Links <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.dailyLinks ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                  }`}
                  value={formData.dailyLinks}
                  onChange={(e) => onChange('dailyLinks', e.target.value)}
                >
                  <option value="">Select range</option>
                  <option value="0-100">0 - 100</option>
                  <option value="100-500">100 - 500</option>
                  <option value="500-1K">500 - 1,000</option>
                  <option value="1K+">1,000+</option>
                </select>
                {errors.dailyLinks && (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.dailyLinks}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Use Case <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.urlUseCase ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                  }`}
                  value={formData.urlUseCase}
                  onChange={(e) => onChange('urlUseCase', e.target.value)}
                >
                  <option value="">Select use case</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Content Sharing">Content Sharing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
                {errors.urlUseCase && (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.urlUseCase}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Target Audience */}
        <div className="pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Target Audience (Optional but Recommended)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary Audience Age Group
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
                value={formData.audienceAgeGroup}
                onChange={(e) => onChange('audienceAgeGroup', e.target.value)}
              >
                <option value="">Select age group</option>
                <option value="13-17">13-17</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Audience Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => onMultiSelect('audienceInterests', interest)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.audienceInterests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4AdPreferences;