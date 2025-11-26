import React from 'react';
import { Checkbox, Button, Card, Tag, Alert, Divider, Space, Modal } from 'antd';
import {
  Edit,
  AlertCircle,
  CheckCircle,
  FileText,
  Settings,
  Target,
  Image as ImageIcon,
  Eye,
  Shield,
  Globe,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Zap,
  Link,
  Monitor,
  Gift,
  Maximize2,
  BookOpen,
  CheckSquare
} from 'lucide-react';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';

const Step4Review = ({ data, errors, onChange, onEdit }) => {
  const BANNER_SIZES = [
    { value: '300x250', label: '300×250 (Medium Rectangle)' },
    { value: '336x280', label: '336×280 (Large Rectangle)' },
    { value: '728x90', label: '728×90 (Leaderboard)' },
    { value: '300x600', label: '300×600 (Half Page)' },
    { value: '320x50', label: '320×50 (Mobile Banner)' },
    { value: '320x100', label: '320×100 (Large Mobile Banner)' },
  ];

  const getAdTypeDescription = (type) => {
    const descriptions = {
      'Banner Ads': 'Display advertisements in various sizes',
      'Rewarded Ads': 'Video ads that reward users for watching',
      'Interstitial Ads': 'Full-screen ads between content transitions',
      'URL Shortener': 'Shortened links with monetized interstitial ads',
    };
    return descriptions[type] || '';
  };

  const getAdTypeIcon = (type) => {
    const icons = {
      'Banner Ads': <Monitor className="w-4 h-4" />,
      'Rewarded Ads': <Gift className="w-4 h-4" />,
      'Interstitial Ads': <Maximize2 className="w-4 h-4" />,
      'URL Shortener': <Link className="w-4 h-4" />,
    };
    return icons[type] || <Zap className="w-4 h-4" />;
  };

  const allCompliance =
    data.policyCompliance &&
    data.landingPageFunctional &&
    data.creativeRights &&
    data.adminApproval;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600">
          Review your campaign details before submitting for approval
        </p>
      </div>

      {/* Compliance Status Alert */}
      {!allCompliance && (
        <Alert
          type="warning"
          message="Complete All Requirements"
          description="Please review and accept all policy confirmations before submitting."
          icon={<AlertCircle className="w-5 h-5" />}
          showIcon
        />
      )}

      {/* SECTION 1: CAMPAIGN OVERVIEW */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">Campaign Overview</span>
            </div>
            <Button
              type="text"
              size="small"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => onEdit(0)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
          </div>
        }
        className="border border-gray-200"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Campaign Name
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {data.campaignName || '—'}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Ad Type
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {getAdTypeIcon(data.adType)}
                  <Tag color="blue" className="text-sm font-semibold">
                    {data.adType || '—'}
                  </Tag>
                </div>
                <span className="text-xs text-gray-600">
                  {getAdTypeDescription(data.adType)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Objective
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {data.campaignObjective || 'Not specified'}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Duration
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-lg font-semibold text-gray-900">
                  {data.durationType === 'continuous' ? (
                    <span>Continuous</span>
                  ) : (
                    <span>
                      {data.startDate && data.endDate
                        ? `${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}`
                        : 'Not specified'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {data.noDailyLimit ? (
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Daily Budget
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <p className="text-lg font-semibold text-gray-900">Unlimited</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Daily Budget
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <p className="text-lg font-semibold text-gray-900">
                    {data.dailyBudget ? `$${data.dailyBudget}` : 'Not specified'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* SECTION 2: CREATIVE DETAILS */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">Creative Details</span>
            </div>
            <Button
              type="text"
              size="small"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => onEdit(1)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
          </div>
        }
        className="border border-gray-200"
      >
        <div className="space-y-6">
          {/* Banner Ads Details */}
          {data.adType === 'Banner Ads' && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Banner Sizes & Creatives
              </h4>
              <div className="space-y-3">
                {data.selectedBannerSizes.map((size) => {
                  const sizeLabel = BANNER_SIZES.find(s => s.value === size)?.label;
                  const creative = data.bannerCreatives[size] || {};
                  return (
                    <div key={size} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{sizeLabel}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {creative.image ? '✓ Creative uploaded' : 'Creative pending'}
                          </p>
                        </div>
                        {creative.image && (
                          <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>

                      {creative.image && (
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Alt Text:</span>
                            <p className="text-gray-900 font-medium">
                              {creative.altText || 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Click URL:</span>
                            <p className="text-gray-900 font-medium break-all">
                              {creative.clickUrl || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rewarded Ads Details */}
          {data.adType === 'Rewarded Ads' && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Rewarded Ad Configuration
              </h4>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Reward Type</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {data.rewardType || '—'}
                      </p>
                    </div>
                    {data.rewardType === 'Custom' && (
                      <div>
                        <p className="text-xs font-medium text-gray-600">Custom Reward</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {data.customRewardName || '—'}
                        </p>
                      </div>
                    )}
                  </div>

                  <Divider className="my-3" />

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Headline</p>
                      <p className="text-gray-900">{data.rewardedHeadline || '—'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Description</p>
                      <p className="text-gray-900">{data.rewardedDescription || '—'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">CTA Text</p>
                      <Tag color="blue">{data.rewardedCTA || '—'}</Tag>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Click URL</p>
                      <p className="text-gray-900 break-all">
                        {data.rewardedClickURL || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interstitial Ads Details */}
          {data.adType === 'Interstitial Ads' && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                Interstitial Configuration
              </h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-600">Type</p>
                  <Tag color="blue" className="mt-1">
                    {data.interstitialType || '—'}
                  </Tag>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Devices</p>
                  <div className="flex gap-2 mt-1">
                    {data.selectedDeviceTypes.map((device) => (
                      <Tag key={device} color="blue">
                        {device === 'mobile' ? 'Mobile' : 'Tablet'}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* URL Shortener Details */}
          {data.adType === 'URL Shortener' && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Link className="w-4 h-4" />
                URL Shortener Configuration
              </h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-600">Long URL</p>
                  <p className="text-sm font-medium text-gray-900 break-all mt-1">
                    {data.longURL || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Short URL</p>
                  <Tag color="blue" className="mt-1">
                    adplatform.com/{data.customAlias || 'auto-generated'}
                  </Tag>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Ad Display Duration</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {data.adDisplayDuration}s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* SECTION 3: TARGETING SETTINGS */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">Targeting Settings</span>
            </div>
            <Button
              type="text"
              size="small"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
          </div>
        }
        className="border border-gray-200"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                <Globe className="w-4 h-4 inline mr-1" />
                Geographic
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {data.geoTargeting === 'all'
                  ? 'All Countries'
                  : `${data.selectedCountries.length} countries`}
              </p>
              {data.geoTargeting === 'specific' && data.selectedCountries.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {data.selectedCountries.slice(0, 3).map((country) => (
                    <Tag key={country} size="small">
                      {country}
                    </Tag>
                  ))}
                  {data.selectedCountries.length > 3 && (
                    <Tag>+{data.selectedCountries.length - 3} more</Tag>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                <Users className="w-4 h-4 inline mr-1" />
                Demographics
              </p>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-900">
                  Age: {data.ageGroups.length > 0 ? `${data.ageGroups.length} groups` : 'All'}
                </p>
                <p className="text-sm text-gray-900">
                  Gender: {data.gender === 'all' ? 'All' : data.gender}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 inline mr-1" />
                Interests
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {data.interests.length > 0 ? `${data.interests.length} interests` : 'Not specified'}
              </p>
              {data.interests.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {data.interests.slice(0, 3).map((interest) => (
                    <Tag key={interest} size="small" color="blue">
                      {interest}
                    </Tag>
                  ))}
                  {data.interests.length > 3 && (
                    <Tag>+{data.interests.length - 3} more</Tag>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                <Clock className="w-4 h-4 inline mr-1" />
                Schedule
              </p>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-900">
                  Days: {data.selectedDays.length > 0 ? `${data.selectedDays.length} days` : 'All'}
                </p>
                <p className="text-sm text-gray-900">
                  Time: {data.allDay ? 'All day' : `${data.timeFrom} - ${data.timeTo}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 4: COMPLIANCE DECLARATIONS - ENHANCED */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">Policy Compliance</span>
          </div>
        }
        className="border border-gray-200"
      >
        <div className="space-y-4">
          <Alert
            type="info"
            message="Final Verification Required"
            description="Please confirm all compliance requirements to proceed with campaign submission."
            icon={<CheckSquare className="w-5 h-5" />}
            showIcon
            className="mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Policy Compliance */}
            <div className={`border rounded-lg p-4 transition-all ${
              data.policyCompliance 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex-shrink-0 mt-0.5">
                  {data.policyCompliance ? (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaRegCheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Advertising Policy Compliance
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Adheres to platform policies and guidelines
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={data.policyCompliance}
                  onChange={(e) => onChange('policyCompliance', e.target.checked)}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Landing Page Functional */}
            <div className={`border rounded-lg p-4 transition-all ${
              data.landingPageFunctional 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex-shrink-0 mt-0.5">
                  {data.landingPageFunctional ? (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaRegCheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Landing Page Functional
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Page loads correctly and is relevant
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={data.landingPageFunctional}
                  onChange={(e) => onChange('landingPageFunctional', e.target.checked)}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Creative Rights */}
            <div className={`border rounded-lg p-4 transition-all ${
              data.creativeRights 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex-shrink-0 mt-0.5">
                  {data.creativeRights ? (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaRegCheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Creative Rights
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Rights to use all creative assets
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={data.creativeRights}
                  onChange={(e) => onChange('creativeRights', e.target.checked)}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Admin Approval */}
            <div className={`border rounded-lg p-4 transition-all ${
              data.adminApproval 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex-shrink-0 mt-0.5">
                  {data.adminApproval ? (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaRegCheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Admin Review Acknowledgment
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Understand review process requirements
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={data.adminApproval}
                  onChange={(e) => onChange('adminApproval', e.target.checked)}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {errors.policyCompliance ||
          errors.landingPageFunctional ||
          errors.creativeRights ||
          errors.adminApproval ? (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">All policy confirmations are required</p>
            </div>
          ) : null}
        </div>
      </Card>

      {/* SECTION 5: SUBMISSION STATUS */}
      <Card
        className={`border-2 ${
          allCompliance ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {allCompliance ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            )}
            <div>
              <p className="font-bold text-gray-900">
                {allCompliance ? 'Ready to Submit' : 'Review Required'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {allCompliance
                  ? 'Your campaign is ready for submission to our review team.'
                  : 'Please complete all required sections before submitting.'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* INFO BOX */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-900 mb-3">What Happens Next?</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Your campaign will be reviewed within 24-48 hours
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Our team will verify all creatives and compliance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                You'll receive email notification when approved
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Campaign goes live automatically once approved
              </li>
              <li className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Monitor performance metrics in real-time dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Review;