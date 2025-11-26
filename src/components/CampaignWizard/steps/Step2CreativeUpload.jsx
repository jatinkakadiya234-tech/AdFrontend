import React, { useState } from 'react';
import { Upload, Input, Select, Button, Checkbox, InputNumber, Tag, Space, Collapse, Alert, Radio, DatePicker, message } from 'antd';
import { Upload as UploadIcon, AlertCircle, Eye, X, Plus, Trash2, Copy } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';

const { TextArea } = Input;
const { Option } = Select;

const Step2CreativeUpload = ({ data, errors, onChange }) => {
  const [expandedBanner, setExpandedBanner] = useState(null);
  const [expandedInterstitial, setExpandedInterstitial] = useState(null);

  // Banner Sizes Constant
  const BANNER_SIZES = [
    { value: '300x250', label: '300×250 (Medium Rectangle)' },
    { value: '336x280', label: '336×280 (Large Rectangle)' },
    { value: '728x90', label: '728×90 (Leaderboard)' },
    { value: '300x600', label: '300×600 (Half Page)' },
    { value: '320x50', label: '320×50 (Mobile Banner)' },
    { value: '320x100', label: '320×100 (Large Mobile Banner)' },
  ];

  const DEVICE_TYPES = [
    { value: 'mobile', label: 'Mobile (320×480 or 9:16)' },
    { value: 'tablet', label: 'Tablet (768×1024 or 1:1.33)' },
  ];

  // Handle Banner Size Toggle
  const handleBannerSizeToggle = (size) => {
    const updated = data.selectedBannerSizes.includes(size)
      ? data.selectedBannerSizes.filter(s => s !== size)
      : [...data.selectedBannerSizes, size];
    onChange('selectedBannerSizes', updated);
  };

  // Handle Banner Creative Change
  const handleBannerCreativeChange = (size, field, value) => {
    const updated = { ...data.bannerCreatives };
    if (!updated[size]) updated[size] = {};
    updated[size][field] = value;
    onChange('bannerCreatives', updated);
  };

  // Handle File Upload for Banner
  const handleBannerFileUpload = (size, file) => {
    handleBannerCreativeChange(size, 'image', file);
    message.success(`${file.name} uploaded successfully`);
    return false; // Prevent auto upload
  };

  // Handle File Upload for Rewarded Video
  const handleRewardedVideoUpload = (file) => {
    onChange('rewardedVideoFile', file);
    message.success(`${file.name} uploaded successfully`);
    return false; // Prevent auto upload
  };

  // Handle File Upload for Rewarded Thumbnail
  const handleRewardedThumbnailUpload = (file) => {
    onChange('rewardedThumbnail', file);
    message.success(`Thumbnail uploaded successfully`);
    return false;
  };

  // Handle File Upload for Rewarded Static Image
  const handleRewardedStaticImageUpload = (file) => {
    onChange('rewardedStaticImage', file);
    message.success(`Image uploaded successfully`);
    return false;
  };

  // Custom Upload Props
  const uploadProps = {
    beforeUpload: () => false, // Prevent automatic upload
    showUploadList: false,
    accept: 'image/*',
  };

  const videoUploadProps = {
    beforeUpload: () => false,
    showUploadList: false,
    accept: 'video/mp4,video/webm,video/quicktime',
  };

  // ====================
  // BANNER ADS SECTION
  // ====================
  if (data.adType === 'Banner Ads') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Banner Creative Upload</h2>
          <p className="text-gray-600">Upload and configure banners for each selected size</p>
        </div>

        {/* Select Banner Sizes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Banner Size(s) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BANNER_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => handleBannerSizeToggle(size.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  data.selectedBannerSizes.includes(size.value)
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 bg-white hover:border-purple-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{size.label}</p>
                  </div>
                  {data.selectedBannerSizes.includes(size.value) && (
                    <FaCheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {errors.selectedBannerSizes && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
              <AlertCircle className="w-3 h-3" />
              {errors.selectedBannerSizes}
            </div>
          )}
        </div>

        {/* Banner Creatives Upload */}
        {data.selectedBannerSizes.length > 0 && (
          <div className="space-y-4">
            <Collapse
              items={data.selectedBannerSizes.map((size) => {
                const sizeLabel = BANNER_SIZES.find(s => s.value === size)?.label;
                const creative = data.bannerCreatives[size] || {};
                return {
                  key: size,
                  label: (
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold text-gray-900">{sizeLabel}</span>
                      {creative.image && (
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  ),
                  children: (
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      {/* Banner Image Upload with Immediate Preview */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Banner Image <span className="text-red-500">*</span>
                        </label>
                        
                        {!creative.image ? (
                          <Upload
                            {...uploadProps}
                            beforeUpload={(file) => handleBannerFileUpload(size, file)}
                          >
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-colors cursor-pointer">
                              <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="font-medium text-gray-700 mb-1">Click to upload</p>
                              <p className="text-xs text-gray-500">JPG, PNG, GIF, WebP • Max 500KB • {size} px</p>
                            </div>
                          </Upload>
                        ) : (
                          <div className="border-2 border-green-300 rounded-lg overflow-hidden bg-white">
                            <div className="relative">
                              <div className="bg-gray-100 p-4 flex items-center justify-center" style={{ minHeight: '200px' }}>
                                <img
                                  src={URL.createObjectURL(creative.image)}
                                  alt={creative.altText || 'Banner preview'}
                                  className="max-w-full max-h-80 object-contain"
                                />
                              </div>
                              <div className="absolute top-2 right-2">
                                <button
                                  type="button"
                                  onClick={() => handleBannerCreativeChange(size, 'image', null)}
                                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="p-3 bg-green-50 border-t border-green-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                                  <p className="text-sm font-medium text-green-700">{creative.image.name}</p>
                                </div>
                                <Upload
                                  {...uploadProps}
                                  beforeUpload={(file) => handleBannerFileUpload(size, file)}
                                >
                                  <Button size="small" type="link">Change</Button>
                                </Upload>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Banner Alt Text */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Banner Alt Text <span className="text-red-500">*</span>
                        </label>
                        <Input
                          size="large"
                          placeholder="Describe what the banner shows (for accessibility)"
                          value={creative.altText || ''}
                          onChange={(e) =>
                            handleBannerCreativeChange(size, 'altText', e.target.value)
                          }
                          maxLength={100}
                          showCount
                        />
                      </div>

                      {/* Click-Through URL */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Click-Through URL <span className="text-red-500">*</span>
                        </label>
                        <Input
                          size="large"
                          placeholder="https://yourwebsite.com/landing-page"
                          value={creative.clickUrl || ''}
                          onChange={(e) =>
                            handleBannerCreativeChange(size, 'clickUrl', e.target.value)
                          }
                          prefix="🔗"
                        />
                        <Checkbox
                          className="mt-2"
                          checked={creative.openNewTab || false}
                          onChange={(e) =>
                            handleBannerCreativeChange(size, 'openNewTab', e.target.checked)
                          }
                        >
                          <span className="text-sm">Open in new tab</span>
                        </Checkbox>
                      </div>

                      {/* UTM Parameters */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          UTM Parameters <span className="text-gray-500 text-xs">(Optional)</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <Input
                            placeholder="UTM Source"
                            value={creative.utmSource || ''}
                            onChange={(e) =>
                              handleBannerCreativeChange(size, 'utmSource', e.target.value)
                            }
                            size="large"
                          />
                          <Input
                            placeholder="UTM Medium"
                            value={creative.utmMedium || ''}
                            onChange={(e) =>
                              handleBannerCreativeChange(size, 'utmMedium', e.target.value)
                            }
                            size="large"
                          />
                          <Input
                            placeholder="UTM Campaign"
                            value={creative.utmCampaign || ''}
                            onChange={(e) =>
                              handleBannerCreativeChange(size, 'utmCampaign', e.target.value)
                            }
                            size="large"
                          />
                          <Input
                            placeholder="UTM Content"
                            value={creative.utmContent || ''}
                            onChange={(e) =>
                              handleBannerCreativeChange(size, 'utmContent', e.target.value)
                            }
                            size="large"
                          />
                        </div>
                        <Button
                          type="dashed"
                          size="small"
                          onClick={() => {
                            handleBannerCreativeChange(size, 'utmSource', 'adplatform');
                            handleBannerCreativeChange(size, 'utmMedium', 'banner');
                            handleBannerCreativeChange(
                              size,
                              'utmCampaign',
                              data.campaignName?.toLowerCase().replace(/\s/g, '-') || 'campaign'
                            );
                            handleBannerCreativeChange(size, 'utmContent', size);
                          }}
                        >
                          Auto-Generate UTM Parameters
                        </Button>
                      </div>
                    </div>
                  ),
                };
              })}
            />
          </div>
        )}

        {/* Creative Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Creative Notes <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <TextArea
            rows={4}
            placeholder="Add internal notes about this creative..."
            value={data.creativeNotes || ''}
            onChange={(e) => onChange('creativeNotes', e.target.value)}
          />
        </div>
      </div>
    );
  }

  // ====================
  // REWARDED ADS SECTION
  // ====================
  if (data.adType === 'Rewarded Ads') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rewarded Ad Creative</h2>
          <p className="text-gray-600">Configure your rewarded ad with video or static image</p>
        </div>

        {/* Reward Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Reward Type <span className="text-red-500">*</span>
          </label>
          <Select
            size="large"
            placeholder="Select reward type"
            className="w-full"
            value={data.rewardType || undefined}
            onChange={(value) => onChange('rewardType', value)}
            status={errors.rewardType ? 'error' : ''}
          >
            <Option value="In-Game Currency">In-Game Currency</Option>
            <Option value="Extra Lives">Extra Lives</Option>
            <Option value="Bonus Points">Bonus Points</Option>
            <Option value="Premium Content Access">Premium Content Access</Option>
            <Option value="Custom">Custom</Option>
          </Select>
          {errors.rewardType && (
            <p className="text-red-500 text-xs mt-1">{errors.rewardType}</p>
          )}
        </div>

        {/* Custom Reward Name */}
        {data.rewardType === 'Custom' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reward Name <span className="text-red-500">*</span>
            </label>
            <Input
              size="large"
              placeholder="Enter custom reward name"
              value={data.customRewardName || ''}
              onChange={(e) => onChange('customRewardName', e.target.value)}
              maxLength={50}
              showCount
            />
          </div>
        )}

        {/* Video Upload */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <Alert
            type="info"
            message="Video Upload Recommended"
            description="Video ads typically have higher engagement and conversion rates compared to static images."
            showIcon={false}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Video File <span className="text-gray-500 text-xs">(Recommended)</span>
          </label>
          
          {!data.rewardedVideoFile ? (
            <Upload
              {...videoUploadProps}
              beforeUpload={handleRewardedVideoUpload}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-colors cursor-pointer">
                <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700 mb-1">Click to upload video</p>
                <p className="text-xs text-gray-500 mb-3">
                  MP4, WebM, MOV • Max 50MB • 15-30s recommended • Min 720p
                </p>
              </div>
            </Upload>
          ) : (
            <div className="border-2 border-green-300 rounded-lg overflow-hidden bg-white">
              <div className="relative">
                <div className="bg-gray-100 p-8 flex flex-col items-center justify-center">
                  <video
                    src={URL.createObjectURL(data.rewardedVideoFile)}
                    controls
                    className="max-w-full max-h-80 rounded"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => onChange('rewardedVideoFile', null)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-green-50 border-t border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-700">{data.rewardedVideoFile.name}</p>
                  </div>
                  <Upload
                    {...videoUploadProps}
                    beforeUpload={handleRewardedVideoUpload}
                  >
                    <Button size="small" type="link">Change</Button>
                  </Upload>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Thumbnail */}
        {data.rewardedVideoFile && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Video Thumbnail <span className="text-red-500">*</span>
            </label>
            
            {!data.rewardedThumbnail ? (
              <Upload
                {...uploadProps}
                beforeUpload={handleRewardedThumbnailUpload}
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-600 transition-colors cursor-pointer">
                  <UploadIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">JPG, PNG • 1280×720px</p>
                </div>
              </Upload>
            ) : (
              <div className="border-2 border-green-300 rounded-lg overflow-hidden bg-white">
                <div className="relative">
                  <div className="bg-gray-100 p-4 flex items-center justify-center" style={{ minHeight: '150px' }}>
                    <img
                      src={URL.createObjectURL(data.rewardedThumbnail)}
                      alt="Video thumbnail"
                      className="max-w-full max-h-60 object-contain"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => onChange('rewardedThumbnail', null)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border-t border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-green-700">Thumbnail uploaded</p>
                    </div>
                    <Upload
                      {...uploadProps}
                      beforeUpload={handleRewardedThumbnailUpload}
                    >
                      <Button size="small" type="link">Change</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Static Image Alternative */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-medium">Or</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Static Image <span className="text-gray-500 text-xs">(Alternative)</span>
          </label>
          
          {!data.rewardedStaticImage ? (
            <Upload
              {...uploadProps}
              beforeUpload={handleRewardedStaticImageUpload}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-colors cursor-pointer">
                <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700 mb-1">Click to upload image</p>
                <p className="text-xs text-gray-500">JPG, PNG • 1200×627px • Max 1MB</p>
              </div>
            </Upload>
          ) : (
            <div className="border-2 border-green-300 rounded-lg overflow-hidden bg-white">
              <div className="relative">
                <div className="bg-gray-100 p-4 flex items-center justify-center" style={{ minHeight: '200px' }}>
                  <img
                    src={URL.createObjectURL(data.rewardedStaticImage)}
                    alt="Static image preview"
                    className="max-w-full max-h-80 object-contain"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => onChange('rewardedStaticImage', null)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-green-50 border-t border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-700">{data.rewardedStaticImage.name}</p>
                  </div>
                  <Upload
                    {...uploadProps}
                    beforeUpload={handleRewardedStaticImageUpload}
                  >
                    <Button size="small" type="link">Change</Button>
                  </Upload>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ad Copy */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Headline <span className="text-red-500">*</span>
            </label>
            <Input
              size="large"
              placeholder="Enter headline (max 40 characters)"
              value={data.rewardedHeadline || ''}
              onChange={(e) => onChange('rewardedHeadline', e.target.value)}
              maxLength={40}
              showCount
              status={errors.rewardedHeadline ? 'error' : ''}
            />
            {errors.rewardedHeadline && (
              <p className="text-red-500 text-xs mt-1">{errors.rewardedHeadline}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <TextArea
              rows={3}
              placeholder="Enter description (max 120 characters)"
              value={data.rewardedDescription || ''}
              onChange={(e) => onChange('rewardedDescription', e.target.value)}
              maxLength={120}
              showCount
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Call-to-Action Text <span className="text-red-500">*</span>
            </label>
            <Select
              size="large"
              placeholder="Select CTA text"
              className="w-full"
              value={data.rewardedCTA || undefined}
              onChange={(value) => onChange('rewardedCTA', value)}
            >
              <Option value="Get Reward">Get Reward</Option>
              <Option value="Claim Now">Claim Now</Option>
              <Option value="Watch & Earn">Watch & Earn</Option>
              <Option value="Start Now">Start Now</Option>
            </Select>
          </div>
        </div>

        {/* Click-Through URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Click-Through URL <span className="text-red-500">*</span>
          </label>
          <Input
            size="large"
            placeholder="https://yourwebsite.com/landing-page"
            value={data.rewardedClickURL || ''}
            onChange={(e) => onChange('rewardedClickURL', e.target.value)}
            prefix="🔗"
            status={errors.rewardedClickURL ? 'error' : ''}
          />
          {errors.rewardedClickURL && (
            <p className="text-red-500 text-xs mt-1">{errors.rewardedClickURL}</p>
          )}
        </div>

        {/* Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">Preview</p>
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{data.rewardedHeadline || 'Your Headline Here'}</p>
            <p className="text-xs text-gray-600 mb-3">{data.rewardedDescription || 'Your description will appear here'}</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700">
              {data.rewardedCTA || 'Get Reward'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Step2CreativeUpload;
