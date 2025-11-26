import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Image,
  Alert,
  Divider,
  Timeline,
  Row,
  Col,
  Progress,
  Badge,
  Collapse,
  message,
  Avatar,
  DatePicker
} from 'antd';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  DollarSign,
  Target,
  Eye,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Flag,
  Clock,
  Pause,
  MessageSquare,
  Globe,
  Image as ImageIcon,
  Video,
  Smartphone,
  Monitor,
  Link as LinkIcon,
  Play,
  Gift,
  Zap
} from 'lucide-react';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaImage,
  FaGift,
  FaExpand,
  FaLink,
  FaPlay,
  FaDesktop,
  FaMobile
} from 'react-icons/fa';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

// Mock Campaign Data
const mockCampaignData = {
  campaignId: 'CAMP00001',
  campaignName: 'Summer Sale 2024 - Premium Products',
  publisherId: 'PUB00001',
  publisherName: 'TechCorp Inc.',
  publisherEmail: 'contact@techcorp.com',
  publisherAvatar: 'https://ui-avatars.com/api/?name=TechCorp&background=random&size=200',
  status: 'pending',
  reviewStatus: 'pending_review',
  submissionDate: '2024-11-20',
  createdDate: '2024-11-15',
  
  overview: {
    objective: 'Drive sales for summer product lineup and increase brand awareness',
    adType: 'Banner', // Can be: Banner, Rewarded, Interstitial, URL Shortener
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    totalBudget: 25000,
    dailyBudgetCap: 1000,
    bidStrategy: 'Maximize Conversions',
    billingModel: 'CPC'
  },
  
  targeting: {
    countries: ['United States', 'Canada', 'United Kingdom'],
    devices: ['Desktop', 'Mobile', 'Tablet'],
    os: ['Windows', 'macOS', 'iOS', 'Android'],
    browsers: ['Chrome', 'Safari', 'Firefox'],
    languages: ['English'],
    ageRange: '25-45',
    gender: 'All',
    interests: ['Technology', 'Shopping', 'Electronics']
  },
  
  // Banner Ads Creative
  bannerCreative: {
    sizes: [
      { width: 300, height: 250, name: 'Medium Rectangle' },
      { width: 728, height: 90, name: 'Leaderboard' },
      { width: 160, height: 600, name: 'Wide Skyscraper' }
    ],
    images: [
      'https://via.placeholder.com/300x250/4F46E5/FFFFFF?text=Banner+300x250',
      'https://via.placeholder.com/728x90/7C3AED/FFFFFF?text=Banner+728x90',
      'https://via.placeholder.com/160x600/DB2777/FFFFFF?text=Banner+160x600'
    ],
    headline: 'Get 50% Off Summer Collection',
    description: 'Limited time offer on premium products. Shop now and save big!',
    callToAction: 'Shop Now',
    landingPageUrl: 'https://www.example.com/summer-sale',
    trackingUrl: 'https://track.example.com/click?campaign=summer2024'
  },
  
  // Rewarded Ads Creative
  rewardedCreative: {
    videoUrl: 'https://www.example.com/video/reward-ad.mp4',
    videoThumbnail: 'https://via.placeholder.com/640x360/059669/FFFFFF?text=Rewarded+Video+Ad',
    videoDuration: '00:30',
    fileFormat: 'MP4',
    fileSize: '15.2 MB',
    rewardType: 'Virtual Coins',
    rewardValue: '100 coins',
    rewardDelivery: 'Instant upon video completion',
    minWatchTime: '25 seconds',
    interactionRequired: 'Watch full video',
    postRewardLandingPage: 'https://www.example.com/rewards'
  },
  
  // Interstitial Ads Creative
  interstitialCreative: {
    fullScreenImages: [
      'https://via.placeholder.com/1080x1920/4F46E5/FFFFFF?text=Mobile+Portrait',
      'https://via.placeholder.com/1920x1080/7C3AED/FFFFFF?text=Mobile+Landscape',
      'https://via.placeholder.com/1920x1080/DB2777/FFFFFF?text=Desktop'
    ],
    frequencyCap: '3 times per day',
    timeInterval: '5 minutes between shows',
    triggerEvents: ['App Launch', 'Between Game Levels', 'After Content View'],
    skipDelay: '5 seconds',
    closeButtonPlacement: 'Top Right',
    creativeType: 'Image',
    landingPageUrl: 'https://www.example.com/interstitial'
  },
  
  // URL Shortener Creative
  urlShortenerCreative: {
    originalUrl: 'https://www.example.com/very-long-product-url/summer-sale-2024/premium-products',
    shortenedUrlPreview: 'short.link/summer24',
    interstitialAdImage: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Redirect+Ad',
    displayDuration: '5 seconds with countdown',
    skipOption: 'Skip after 5 seconds',
    redirectDelay: '5 seconds',
    cookieTracking: 'Enabled',
    analyticsParams: 'utm_source=short&utm_campaign=summer',
    linkExpiry: 'December 31, 2024',
    clickLimit: 'Unlimited'
  },
  
  complianceChecks: {
    noProhibitedContent: true,
    noMisleadingClaims: true,
    noCopyrightIssues: true,
    landingPageValid: true,
    noMalware: true,
    brandSafe: true,
    filesValid: true,
    fileSizeOk: true,
    landingPageLoads: true,
    noBrokenLinks: true,
    mobileResponsive: true,
    qualityScore: 92
  },
  
  reviewHistory: [
    { date: '2024-11-20', action: 'Campaign Submitted', user: 'TechCorp Inc.', status: 'info' },
    { date: '2024-11-20', action: 'Automated Checks Passed', user: 'System', status: 'success' },
    { date: '2024-11-20', action: 'Assigned to Admin Review', user: 'System', status: 'processing' }
  ]
};

const CampaignReviewDetail = () => {
  const [campaign] = useState(mockCampaignData);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [form] = Form.useForm();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Ad Type Config
  const getAdTypeConfig = (type) => {
    const config = {
      'Banner': { icon: FaImage, color: 'blue', label: 'Banner Ads' },
      'Rewarded': { icon: FaGift, color: 'green', label: 'Rewarded Ads' },
      'Interstitial': { icon: FaExpand, color: 'purple', label: 'Interstitial Ads' },
      'URL Shortener': { icon: FaLink, color: 'orange', label: 'URL Shortener' }
    };
    return config[type];
  };

  const adConfig = getAdTypeConfig(campaign.overview.adType);
  const AdTypeIcon = adConfig.icon;

  // Handle Actions
  const handleApprove = (values) => {
    message.success('Campaign approved and activated successfully!');
    setApproveModalVisible(false);
  };

  const handleReject = (values) => {
    message.error('Campaign rejected');
    setRejectModalVisible(false);
  };

  const handleRequestChanges = (values) => {
    message.info('Change request sent to publisher');
    setChangesModalVisible(false);
  };

  const handleSendMessage = (values) => {
    message.success('Message sent to publisher');
    setMessageModalVisible(false);
  };

  // Render Creative Section based on Ad Type
  const renderCreativeSection = () => {
    switch (campaign.overview.adType) {
      case 'Banner':
        return (
          <Card title={<span className="flex items-center gap-2"><FaImage className="text-blue-600" /> Banner Ads Creative</span>} className="mb-6">
            <div className="space-y-6">
              {/* Banner Sizes */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Banner Sizes & Creatives</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {campaign.bannerCreative.sizes.map((size, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-3">
                        <Image
                          src={campaign.bannerCreative.images[index]}
                          alt={`${size.width}x${size.height}`}
                          className="w-full rounded"
                        />
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="font-semibold text-gray-900">{size.name}</div>
                        <div className="text-gray-600">Dimensions: {size.width} × {size.height}</div>
                        <div className="text-gray-600">Format: JPG</div>
                        <div className="text-gray-600">Size: 245 KB</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Ad Copy */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ad Copy</h4>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Headline">
                    <span className="font-semibold">{campaign.bannerCreative.headline}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {campaign.bannerCreative.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Call-to-Action">
                    <Tag color="blue">{campaign.bannerCreative.callToAction}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Divider />

              {/* Landing Page */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Landing Page</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Destination URL</span>
                    <Tag color="success" icon={<CheckCircle className="w-3 h-3" />}>
                      Valid
                    </Tag>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href={campaign.bannerCreative.landingPageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      {campaign.bannerCreative.landingPageUrl}
                    </a>
                  </div>
                  <Space>
                    <Button size="small" icon={<ExternalLink className="w-3 h-3" />}>
                      Open in New Tab
                    </Button>
                    <Button size="small" icon={<Eye className="w-3 h-3" />}>
                      Preview
                    </Button>
                  </Space>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Click Tracking URL</div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-mono">{campaign.bannerCreative.trackingUrl}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'Rewarded':
        return (
          <Card title={<span className="flex items-center gap-2"><FaGift className="text-green-600" /> Rewarded Ads Creative</span>} className="mb-6">
            <div className="space-y-6">
              {/* Video Preview */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Video Creative</h4>
                <div className="bg-black rounded-lg overflow-hidden">
                  <Image
                    src={campaign.rewardedCreative.videoThumbnail}
                    alt="Video Thumbnail"
                    preview={false}
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">{campaign.rewardedCreative.videoDuration}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Format</div>
                    <div className="font-semibold text-gray-900">{campaign.rewardedCreative.fileFormat}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">File Size</div>
                    <div className="font-semibold text-gray-900">{campaign.rewardedCreative.fileSize}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Quality</div>
                    <Tag color="success">HD</Tag>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Reward Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Reward Configuration</h4>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Reward Type" span={1}>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{campaign.rewardedCreative.rewardType}</span>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Reward Value" span={1}>
                    <Tag color="green" className="font-semibold">{campaign.rewardedCreative.rewardValue}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Delivery Method" span={2}>
                    {campaign.rewardedCreative.rewardDelivery}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Divider />

              {/* Completion Requirements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Completion Requirements</h4>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Minimum Watch Time">
                    <Tag color="blue">{campaign.rewardedCreative.minWatchTime}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Interaction Required">
                    {campaign.rewardedCreative.interactionRequired}
                  </Descriptions.Item>
                  <Descriptions.Item label="Post-Reward Landing Page">
                    <a href={campaign.rewardedCreative.postRewardLandingPage} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      {campaign.rewardedCreative.postRewardLandingPage}
                    </a>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        );

      case 'Interstitial':
        return (
          <Card title={<span className="flex items-center gap-2"><FaExpand className="text-purple-600" /> Interstitial Ads Creative</span>} className="mb-6">
            <div className="space-y-6">
              {/* Full-Screen Previews */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Full-Screen Creative Previews</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMobile className="text-purple-600" />
                      <span className="font-semibold text-sm">Mobile Portrait</span>
                    </div>
                    <Image
                      src={campaign.interstitialCreative.fullScreenImages[0]}
                      alt="Mobile Portrait"
                      className="rounded"
                    />
                    <div className="text-xs text-gray-500 mt-2">1080 × 1920</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-sm">Mobile Landscape</span>
                    </div>
                    <Image
                      src={campaign.interstitialCreative.fullScreenImages[1]}
                      alt="Mobile Landscape"
                      className="rounded"
                    />
                    <div className="text-xs text-gray-500 mt-2">1920 × 1080</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaDesktop className="text-purple-600" />
                      <span className="font-semibold text-sm">Desktop</span>
                    </div>
                    <Image
                      src={campaign.interstitialCreative.fullScreenImages[2]}
                      alt="Desktop"
                      className="rounded"
                    />
                    <div className="text-xs text-gray-500 mt-2">1920 × 1080</div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Display Timing */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Display Timing Settings</h4>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Frequency Cap" span={1}>
                    <Tag color="purple">{campaign.interstitialCreative.frequencyCap}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Time Interval" span={1}>
                    {campaign.interstitialCreative.timeInterval}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trigger Events" span={2}>
                    <Space wrap>
                      {campaign.interstitialCreative.triggerEvents.map((event, i) => (
                        <Tag key={i} color="blue">{event}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Divider />

              {/* Skip Options */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Skip & Close Options</h4>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Skip Button Delay" span={1}>
                    <Tag color="orange">{campaign.interstitialCreative.skipDelay}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Close Button" span={1}>
                    {campaign.interstitialCreative.closeButtonPlacement}
                  </Descriptions.Item>
                  <Descriptions.Item label="Creative Type" span={1}>
                    {campaign.interstitialCreative.creativeType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Landing Page" span={1}>
                    <a href={campaign.interstitialCreative.landingPageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      View Page
                    </a>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        );

      case 'URL Shortener':
        return (
          <Card title={<span className="flex items-center gap-2"><FaLink className="text-orange-600" /> URL Shortener Creative</span>} className="mb-6">
            <div className="space-y-6">
              {/* URL Preview */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">URL Configuration</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">Original URL</div>
                    <div className="flex items-start gap-2">
                      <LinkIcon className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-900 break-all">{campaign.urlShortenerCreative.originalUrl}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="text-2xl text-gray-400">↓</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="text-sm font-medium text-blue-900 mb-2">Shortened URL Preview</div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">{campaign.urlShortenerCreative.shortenedUrlPreview}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Interstitial Ad Before Redirect */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Interstitial Ad (Before Redirect)</h4>
                <div className="mb-4">
                  <Image
                    src={campaign.urlShortenerCreative.interstitialAdImage}
                    alt="Interstitial Ad"
                    className="rounded-lg"
                  />
                </div>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Display Duration" span={1}>
                    <Tag color="orange">{campaign.urlShortenerCreative.displayDuration}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Skip Option" span={1}>
                    {campaign.urlShortenerCreative.skipOption}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Divider />

              {/* Redirect Settings */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Redirect & Tracking Settings</h4>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Redirect Delay" span={1}>
                    {campaign.urlShortenerCreative.redirectDelay}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cookie Tracking" span={1}>
                    <Tag color={campaign.urlShortenerCreative.cookieTracking === 'Enabled' ? 'success' : 'default'}>
                      {campaign.urlShortenerCreative.cookieTracking}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Analytics Parameters" span={2}>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {campaign.urlShortenerCreative.analyticsParams}
                    </code>
                  </Descriptions.Item>
                  <Descriptions.Item label="Link Expiry" span={1}>
                    {campaign.urlShortenerCreative.linkExpiry}
                  </Descriptions.Item>
                  <Descriptions.Item label="Click Limit" span={1}>
                    <Tag color="blue">{campaign.urlShortenerCreative.clickLimit}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button type="link" className="mb-2 pl-0" icon={<ArrowLeft className="w-4 h-4" />}>
          <a href="/admin/campaigns">Back to Campaigns List</a>
        </Button>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.campaignName}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Tag color={adConfig.color} icon={<AdTypeIcon />} className="text-sm">
                {adConfig.label}
              </Tag>
              <Tag color="warning">Pending Review</Tag>
              <span className="text-sm text-gray-500">Campaign ID: {campaign.campaignId}</span>
              <span className="text-sm text-gray-500">Submitted: {campaign.submissionDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Publisher Info Banner */}
      <Alert
        message={
          <div className="flex items-center gap-3">
            <Avatar src={campaign.publisherAvatar} size={40} />
            <div>
              <div className="font-semibold text-gray-900">
                Publisher: <a href={`/admin/publishers/${campaign.publisherId}`} className="text-blue-600 hover:underline">{campaign.publisherName}</a>
              </div>
              <div className="text-sm text-gray-600">{campaign.publisherEmail} • {campaign.publisherId}</div>
            </div>
          </div>
        }
        type="info"
        className="mb-6"
        showIcon
        icon={<User className="w-5 h-5" />}
      />

      {/* Campaign Overview */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Campaign Details" className="h-full">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Campaign Objective">
                <span className="font-medium">{campaign.overview.objective}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4" />Campaign Duration</span>}>
                <Space>
                  <Tag color="blue">{campaign.overview.startDate}</Tag>
                  <span>to</span>
                  <Tag color="blue">{campaign.overview.endDate}</Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="flex items-center gap-2"><DollarSign className="w-4 h-4" />Total Budget</span>}>
                <span className="text-xl font-bold text-green-600">{formatCurrency(campaign.overview.totalBudget)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Daily Budget Cap">
                {formatCurrency(campaign.overview.dailyBudgetCap)}
              </Descriptions.Item>
              <Descriptions.Item label="Bid Strategy">
                <Tag color="purple">{campaign.overview.bidStrategy}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Billing Model">
                <Tag color="orange">{campaign.overview.billingModel}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Targeting Settings" className="h-full">
            <Collapse ghost defaultActiveKey={['1']}>
              <Panel header="Geographic & Device Targeting" key="1">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Countries</div>
                    <Space wrap>
                      {campaign.targeting.countries.map((country, i) => (
                        <Tag key={i} color="blue">{country}</Tag>
                      ))}
                    </Space>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Devices</div>
                    <Space wrap>
                      {campaign.targeting.devices.map((device, i) => (
                        <Tag key={i} color="green">{device}</Tag>
                      ))}
                    </Space>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Operating Systems</div>
                    <Space wrap>
                      {campaign.targeting.os.map((os, i) => (
                        <Tag key={i}>{os}</Tag>
                      ))}
                    </Space>
                  </div>
                </div>
              </Panel>
              <Panel header="Audience Demographics" key="2">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Age Range">
                    {campaign.targeting.ageRange}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {campaign.targeting.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Interests">
                    <Space wrap>
                      {campaign.targeting.interests.map((interest, i) => (
                        <Tag key={i} color="purple">{interest}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Languages">
                    <Space wrap>
                      {campaign.targeting.languages.map((lang, i) => (
                        <Tag key={i}>{lang}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>

      {/* Creative Review Section - Dynamic based on ad type */}
      {renderCreativeSection()}

      {/* Compliance Checks */}
      <Card 
        title={<span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Compliance & Quality Checks</span>}
        className="mb-6"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">No Prohibited Content</span>
                {campaign.complianceChecks.noProhibitedContent ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">No Misleading Claims</span>
                {campaign.complianceChecks.noMisleadingClaims ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">No Copyright Issues</span>
                {campaign.complianceChecks.noCopyrightIssues ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">Landing Page Valid</span>
                {campaign.complianceChecks.landingPageValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">No Malware/Phishing</span>
                {campaign.complianceChecks.noMalware ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Brand Safety Approved</span>
                {campaign.complianceChecks.brandSafe ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">Creative Files Valid</span>
                {campaign.complianceChecks.filesValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">File Sizes Within Limits</span>
                {campaign.complianceChecks.fileSizeOk ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">Landing Page Loads Correctly</span>
                {campaign.complianceChecks.landingPageLoads ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">No Broken Links</span>
                {campaign.complianceChecks.noBrokenLinks ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-700">Mobile Responsive</span>
                {campaign.complianceChecks.mobileResponsive ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-700 mb-1">Overall Quality Score</div>
              <div className="text-3xl font-bold text-green-600">{campaign.complianceChecks.qualityScore}/100</div>
            </div>
            <Progress
              type="circle"
              percent={campaign.complianceChecks.qualityScore}
              strokeColor="#16a34a"
              width={80}
            />
          </div>
        </div>
      </Card>

      {/* Admin Notes */}
      <Card title="Admin Review Notes" className="mb-6">
        <TextArea
          rows={4}
          placeholder="Add internal notes about this campaign review (not visible to publisher)..."
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          className="mb-4"
        />
        <Space>
          <Button type="primary" ghost>Save Notes</Button>
          <Button icon={<Flag className="w-4 h-4" />} danger ghost>Flag Issue</Button>
        </Space>
      </Card>

      {/* Review History */}
      <Card title="Review Timeline" className="mb-24">
        <Timeline>
          {campaign.reviewHistory.map((item, index) => (
            <Timeline.Item
              key={index}
              color={item.status === 'success' ? 'green' : item.status === 'error' ? 'red' : 'blue'}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">{item.user}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{item.date}</span>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* Sticky Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AdTypeIcon className={`text-${adConfig.color}-600`} />
            <div>
              <div className="font-semibold text-gray-900">{campaign.campaignName}</div>
              <div className="text-xs text-gray-500">{campaign.campaignId}</div>
            </div>
          </div>
          
          <Space wrap size="middle">
            <Button
              size="large"
              icon={<Pause className="w-4 h-4" />}
              onClick={() => message.info('Campaign paused')}
            >
              Pause
            </Button>
            
            <Button
              size="large"
              icon={<MessageSquare className="w-4 h-4" />}
              onClick={() => setMessageModalVisible(true)}
            >
              Contact Publisher
            </Button>

            <Button
              type="default"
              size="large"
              icon={<FaExclamationTriangle />}
              onClick={() => setChangesModalVisible(true)}
              className="bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100"
            >
              Request Changes
            </Button>

            <Button
              danger
              size="large"
              icon={<FaTimesCircle />}
              onClick={() => setRejectModalVisible(true)}
            >
              Reject Campaign
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<FaCheckCircle />}
              onClick={() => setApproveModalVisible(true)}
              className="bg-green-600 hover:bg-green-700 border-green-600"
            >
              Approve & Activate
            </Button>
          </Space>
        </div>
      </div>

      {/* Modals */}
      {/* Approve Modal */}
      <Modal
        title="Approve Campaign"
        open={approveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleApprove} layout="vertical">
          <Alert
            message="Confirmation Required"
            description="You are about to approve this campaign. It will be activated and start serving ads immediately."
            type="success"
            showIcon
            className="mb-4"
          />
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setApproveModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-green-600">
                Confirm Approval
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Reject Campaign"
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleReject} layout="vertical">
          <Alert
            message="Rejection Action"
            description="Please provide a detailed reason for rejection to help the publisher understand what needs to be corrected."
            type="error"
            showIcon
            className="mb-4"
          />
          <Form.Item
            name="category"
            label="Rejection Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select rejection category">
              <Option value="policy">Policy Violation</Option>
              <Option value="quality">Poor Creative Quality</Option>
              <Option value="landing">Invalid Landing Page</Option>
              <Option value="misleading">Misleading Content</Option>
              <Option value="technical">Technical Issues</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="reason"
            label="Detailed Reason"
            rules={[{ required: true, message: 'Please provide details' }]}
          >
            <TextArea rows={4} placeholder="Explain the reason for rejection..." />
          </Form.Item>
          <Form.Item name="fixes" label="Suggest Specific Fixes (Optional)">
            <TextArea rows={3} placeholder="What should the publisher change or improve?" />
          </Form.Item>
          <Form.Item name="allowResubmission" valuePropName="checked" initialValue={true}>
            <Checkbox>Allow resubmission after corrections</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setRejectModalVisible(false)}>Cancel</Button>
              <Button type="primary" danger htmlType="submit">
                Confirm Rejection
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Request Changes Modal */}
      <Modal
        title="Request Changes"
        open={changesModalVisible}
        onCancel={() => setChangesModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleRequestChanges} layout="vertical">
          <Alert
            message="Request Campaign Changes"
            description="Select specific issues and provide instructions for the publisher to make corrections."
            type="warning"
            showIcon
            className="mb-4"
          />
          <Form.Item
            name="issues"
            label="Issues to Address"
            rules={[{ required: true, message: 'Please select at least one issue' }]}
          >
            <Checkbox.Group className="w-full">
              <Space direction="vertical" className="w-full">
                <Checkbox value="creative">Update creative/images</Checkbox>
                <Checkbox value="landing">Fix landing page</Checkbox>
                <Checkbox value="targeting">Adjust targeting settings</Checkbox>
                <Checkbox value="budget">Review budget allocation</Checkbox>
                <Checkbox value="copy">Improve ad copy</Checkbox>
                <Checkbox value="other">Other (specify below)</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="instructions"
            label="Detailed Instructions"
            rules={[{ required: true, message: 'Please provide instructions' }]}
          >
            <TextArea rows={5} placeholder="Provide specific instructions on what needs to be changed or improved..." />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline for Resubmission">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setChangesModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-orange-500">
                Send Request
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Contact Publisher Modal */}
      <Modal
        title="Contact Publisher"
        open={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleSendMessage} layout="vertical">
          <div className="mb-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar src={campaign.publisherAvatar} size={40} />
              <div>
                <div className="font-semibold text-gray-900">{campaign.publisherName}</div>
                <div className="text-sm text-gray-600">{campaign.publisherEmail}</div>
              </div>
            </div>
          </div>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter subject' }]}
            initialValue={`Regarding Campaign: ${campaign.campaignName}`}
          >
            <Input placeholder="Message subject" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter message' }]}
          >
            <TextArea rows={6} placeholder="Type your message to the publisher..." />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setMessageModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Send Message
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CampaignReviewDetail;
