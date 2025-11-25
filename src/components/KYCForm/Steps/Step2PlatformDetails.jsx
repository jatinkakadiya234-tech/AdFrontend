import React from 'react';
import { AlertCircle, Upload, CheckCircle } from 'lucide-react';

const Step2PlatformDetails = ({ formData, errors, onChange, onFileUpload, onMultiSelect }) => {
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 
    'Germany', 'France', 'Japan', 'Brazil', 'Mexico', 'Spain', 'Italy'
  ];

  return (
    <div className="min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Platform Details</h2>
      <p className="text-gray-600 mb-8">
        Tell us about your website and online presence
      </p>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          We'll verify your website URL and check for accessibility. Please ensure your website is live and accessible.
        </p>
      </div>

      <div className="space-y-5">
        {/* Website URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.websiteUrl ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            value={formData.websiteUrl}
            onChange={(e) => onChange('websiteUrl', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
          {errors.websiteUrl && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.websiteUrl}
            </div>
          )}
        </div>

        {/* Website Category & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Website Category <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.websiteCategory ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.websiteCategory}
              onChange={(e) => onChange('websiteCategory', e.target.value)}
            >
              <option value="">Select category</option>
              <option value="News">News</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Gaming">Gaming</option>
              <option value="Education">Education</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Blog">Blog</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
            </select>
            {errors.websiteCategory && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.websiteCategory}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Website Language <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.websiteLanguage ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.websiteLanguage}
              onChange={(e) => onChange('websiteLanguage', e.target.value)}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Hindi">Hindi</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Arabic">Arabic</option>
              <option value="Other">Other</option>
            </select>
            {errors.websiteLanguage && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.websiteLanguage}
              </div>
            )}
          </div>
        </div>

        {/* Website Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px] resize-y ${
              errors.websiteDescription ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            value={formData.websiteDescription}
            onChange={(e) => onChange('websiteDescription', e.target.value)}
            placeholder="Describe your website, its purpose, target audience, and main content (200-500 characters)"
            maxLength={500}
          />
          <div className="text-xs text-gray-600 text-right mt-1">
            {formData.websiteDescription.length} / 500 characters (min 200)
          </div>
          {errors.websiteDescription && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.websiteDescription}
            </div>
          )}
        </div>

        {/* Monthly Visitors */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website Monthly Visitors <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.monthlyVisitors ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            value={formData.monthlyVisitors}
            onChange={(e) => onChange('monthlyVisitors', e.target.value)}
          >
            <option value="">Select range</option>
            <option value="0-10K">0 - 10K</option>
            <option value="10K-50K">10K - 50K</option>
            <option value="50K-100K">50K - 100K</option>
            <option value="100K-500K">100K - 500K</option>
            <option value="500K+">500K+</option>
          </select>
          {errors.monthlyVisitors && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.monthlyVisitors}
            </div>
          )}
        </div>

        {/* Primary Audience Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Audience Geographic Location <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => onMultiSelect('audienceLocation', country)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.audienceLocation.includes(country)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
          {errors.audienceLocation && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.audienceLocation}
            </div>
          )}
        </div>

        {/* Website Screenshot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website Screenshot <span className="text-red-500">*</span>
          </label>
          <label
            className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              formData.websiteScreenshot
                ? 'border-green-500 bg-green-50'
                : errors.websiteScreenshot
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-600 hover:bg-blue-50'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFileUpload('websiteScreenshot', e.target.files[0])}
            />
            <Upload className={`w-8 h-8 mx-auto mb-3 ${formData.websiteScreenshot ? 'text-green-500' : 'text-gray-400'}`} />
            {formData.websiteScreenshot ? (
              <>
                <p className="font-semibold text-green-600 mb-1">✓ {formData.websiteScreenshot.name}</p>
                <p className="text-xs text-gray-600">Click to change file</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-700 mb-1">Upload Homepage Screenshot</p>
                <p className="text-xs text-gray-600">PNG, JPG (Max 5MB)</p>
              </>
            )}
          </label>
          {errors.websiteScreenshot && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.websiteScreenshot}
            </div>
          )}
        </div>

        {/* Additional Platforms */}
        <div className="pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Platforms (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile App Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
                value={formData.mobileAppName}
                onChange={(e) => onChange('mobileAppName', e.target.value)}
                placeholder="Enter app name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile App URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
                value={formData.mobileAppUrl}
                onChange={(e) => onChange('mobileAppUrl', e.target.value)}
                placeholder="Play Store or App Store URL"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Social Media Presence (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="url"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
              value={formData.facebookUrl}
              onChange={(e) => onChange('facebookUrl', e.target.value)}
              placeholder="Facebook Page URL"
            />
            <input
              type="url"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
              value={formData.instagramUrl}
              onChange={(e) => onChange('instagramUrl', e.target.value)}
              placeholder="Instagram Profile"
            />
            <input
              type="url"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
              value={formData.twitterUrl}
              onChange={(e) => onChange('twitterUrl', e.target.value)}
              placeholder="Twitter/X Handle"
            />
            <input
              type="url"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
              value={formData.youtubeUrl}
              onChange={(e) => onChange('youtubeUrl', e.target.value)}
              placeholder="YouTube Channel"
            />
          </div>
        </div>

        {/* Confirmations */}
        <div className="pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Confirmations <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                checked={formData.ownsWebsite}
                onChange={(e) => onChange('ownsWebsite', e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                I own this website and have full control over its content
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                checked={formData.monetizationRights}
                onChange={(e) => onChange('monetizationRights', e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                I have the rights to monetize this platform
              </span>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                checked={formData.noCopyright}
                onChange={(e) => onChange('noCopyright', e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                My content doesn't violate copyright laws
              </span>
            </label>
          </div>
          {(errors.ownsWebsite || errors.monetizationRights || errors.noCopyright) && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
              <AlertCircle className="w-3 h-3" />
              All confirmations are required
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2PlatformDetails;