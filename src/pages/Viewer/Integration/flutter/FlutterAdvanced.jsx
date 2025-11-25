import React, { useState } from 'react';
import { Copy, Check, Settings, Sliders, AlertCircle, Info, CheckCircle, Zap, Shield, Globe, Smartphone, Code, ChevronDown } from 'lucide-react';

const FlutterAdvanced = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState('callbacks');

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const advancedTopics = [
    {
      id: 'callbacks',
      name: 'Ad Event Callbacks',
      icon: Zap,
      color: 'blue',
      description: 'Handle ad lifecycle events'
    },
    {
      id: 'customization',
      name: 'Ad Customization',
      icon: Sliders,
      color: 'purple',
      description: 'Customize ad appearance and behavior'
    },
    {
      id: 'optimization',
      name: 'Performance Optimization',
      icon: Zap,
      color: 'green',
      description: 'Improve ad loading and rendering'
    },
    {
      id: 'privacy',
      name: 'Privacy & Consent',
      icon: Shield,
      color: 'orange',
      description: 'GDPR and privacy compliance'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Advanced Configuration</h1>
              <p className="text-gray-600 mt-1">Customize and optimize your Flutter ad integration</p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {advancedTopics.map(topic => {
            const Icon = topic.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 border-blue-200',
              purple: 'from-purple-500 to-purple-600 border-purple-200',
              green: 'from-green-500 to-green-600 border-green-200',
              orange: 'from-orange-500 to-orange-600 border-orange-200'
            };
            return (
              <div
                key={topic.id}
                className={`bg-gradient-to-br ${colorClasses[topic.color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2`}
                onClick={() => toggleSection(topic.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-8 h-8" />
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === topic.id ? 'rotate-180' : ''}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                <p className="text-white/90 text-sm">{topic.description}</p>
              </div>
            );
          })}
        </div>

        {/* Ad Event Callbacks */}
        {expandedSection === 'callbacks' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Ad Event Callbacks</h2>
                    <p className="text-sm text-gray-600">Listen to ad lifecycle events for better control</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Banner Ad Callbacks */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Banner Ad Callbacks</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`YourPlatformBannerAd(
  adUnitId: 'ca-pub-123-001',
  size: BannerAdSize.standard,
  
  // Ad lifecycle callbacks
  onAdLoaded: () {
    print('Banner ad loaded successfully');
    // Update UI, track event, etc.
  },
  
  onAdFailedToLoad: (error) {
    print('Failed to load banner: \${error.message}');
    // Log error, show fallback content
  },
  
  onAdOpened: () {
    print('Banner ad opened');
    // Pause game, stop music, etc.
  },
  
  onAdClosed: () {
    print('Banner ad closed');
    // Resume game, restart music, etc.
  },
  
  onAdImpression: () {
    print('Banner ad impression recorded');
    // Track analytics
  },
  
  onAdClicked: () {
    print('Banner ad clicked');
    // Track user engagement
  },
)`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`YourPlatformBannerAd(\n  adUnitId: 'ca-pub-123-001',\n  size: BannerAdSize.standard,\n  onAdLoaded: () => print('Loaded'),\n  onAdFailedToLoad: (error) => print('Failed: \${error.message}'),\n  onAdClicked: () => print('Clicked'),\n)`, 'banner-callbacks')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-callbacks' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-callbacks' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Interstitial/Rewarded Callbacks */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Full-Screen Ad Callbacks</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`// Interstitial/Rewarded common callbacks
InterstitialAd.load(
  adUnitId: 'ca-pub-123-002',
  onAdLoaded: (ad) {
    _interstitialAd = ad;
    print('Interstitial loaded');
  },
  onAdFailedToLoad: (error) {
    print('Failed: \${error.message}');
  },
);

// When showing the ad
_interstitialAd?.show(
  onAdShowedFullScreenContent: () {
    print('Ad displayed');
    // Pause background activities
  },
  
  onAdDismissed: () {
    print('Ad dismissed');
    _interstitialAd = null;
    // Resume activities, load next ad
    _loadInterstitialAd();
  },
  
  onAdFailedToShowFullScreenContent: (error) {
    print('Failed to show: \${error.message}');
    _interstitialAd = null;
    // Continue app flow
  },
  
  onAdImpression: () {
    print('Impression recorded');
  },
  
  // Rewarded ads only
  onUserEarnedReward: (reward) {
    print('User earned: \${reward.amount} \${reward.type}');
    _grantReward(reward.amount);
  },
);`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`_interstitialAd?.show(\n  onAdShowedFullScreenContent: () => print('Showed'),\n  onAdDismissed: () {\n    _interstitialAd = null;\n    _loadInterstitialAd();\n  },\n  onUserEarnedReward: (reward) => _grantReward(reward.amount),\n)`, 'fullscreen-callbacks')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'fullscreen-callbacks' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'fullscreen-callbacks' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Callback Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Always handle <code className="px-1 py-0.5 bg-blue-100 rounded">onAdFailedToLoad</code> gracefully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Use callbacks to track analytics and user engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Pause/resume app activities based on ad state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Load next ad in <code className="px-1 py-0.5 bg-blue-100 rounded">onAdDismissed</code> callback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ad Customization */}
        {expandedSection === 'customization' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Sliders className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Ad Customization</h2>
                    <p className="text-sm text-gray-600">Customize ad appearance and behavior</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Banner Customization */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Banner Ad Customization</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`YourPlatformBannerAd(
  adUnitId: 'ca-pub-123-001',
  size: BannerAdSize.standard,
  
  // Custom positioning
  alignment: Alignment.bottomCenter,
  
  // Custom styling
  backgroundColor: Colors.white,
  borderRadius: 12.0,
  elevation: 4.0,
  
  // Auto-refresh interval (seconds)
  autoRefreshInterval: 60,
  
  // Keywords for better targeting
  keywords: ['gaming', 'puzzle', 'casual'],
  
  // Content URL for contextual ads
  contentUrl: 'https://yourapp.com/games/puzzle',
  
  // Custom request configuration
  requestConfiguration: AdRequestConfiguration(
    maxAdContentRating: MaxAdContentRating.general,
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
  ),
)`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`YourPlatformBannerAd(\n  adUnitId: 'ca-pub-123-001',\n  size: BannerAdSize.standard,\n  alignment: Alignment.bottomCenter,\n  backgroundColor: Colors.white,\n  autoRefreshInterval: 60,\n  keywords: ['gaming', 'puzzle'],\n)`, 'banner-custom')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-custom' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-custom' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Global SDK Configuration */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Global SDK Configuration</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize with advanced configuration
  await YourPlatformAds.initialize(
    appId: 'YOUR_APP_ID',
    testMode: true,
    
    // Global ad request settings
    globalRequestConfiguration: AdRequestConfiguration(
      maxAdContentRating: MaxAdContentRating.general,
      testDeviceIds: ['YOUR_DEVICE_ID'],
      nonPersonalizedAdsOnly: false,
    ),
    
    // Performance optimization
    preloadAds: true,
    cacheSize: 3, // Pre-cache 3 ads
    
    // Logging
    logLevel: LogLevel.debug,
    
    // Network settings
    requestTimeout: Duration(seconds: 30),
  );
  
  runApp(MyApp());
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`await YourPlatformAds.initialize(\n  appId: 'YOUR_APP_ID',\n  testMode: true,\n  preloadAds: true,\n  cacheSize: 3,\n  logLevel: LogLevel.debug,\n)`, 'global-config')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'global-config' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'global-config' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Optimization */}
        {expandedSection === 'optimization' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Performance Optimization</h2>
                    <p className="text-sm text-gray-600">Improve ad loading and app performance</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Pre-loading Ads */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Pre-loading Ads</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Load ads in advance for instant display</p>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`class _GameScreenState extends State<GameScreen> {
  InterstitialAd? _interstitialAd;
  RewardedAd? _rewardedAd;

  @override
  void initState() {
    super.initState();
    // Pre-load ads during initialization
    _preloadAds();
  }

  Future<void> _preloadAds() async {
    // Load multiple ads in parallel
    await Future.wait([
      _loadInterstitialAd(),
      _loadRewardedAd(),
    ]);
  }

  Future<void> _loadInterstitialAd() async {
    await InterstitialAd.load(
      adUnitId: 'ca-pub-123-002',
      onAdLoaded: (ad) => _interstitialAd = ad,
    );
  }

  Future<void> _loadRewardedAd() async {
    await RewardedAd.load(
      adUnitId: 'ca-pub-123-003',
      onAdLoaded: (ad) => _rewardedAd = ad,
    );
  }

  // Load next ad immediately after showing
  void _showInterstitial() {
    _interstitialAd?.show(
      onAdDismissed: () {
        _interstitialAd = null;
        _loadInterstitialAd(); // Immediate reload
      },
    );
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`Future<void> _preloadAds() async {\n  await Future.wait([\n    _loadInterstitialAd(),\n    _loadRewardedAd(),\n  ]);\n}`, 'preload')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'preload' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'preload' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Memory Management */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Memory Management</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`class _AdManagerState extends State<AdManager> {
  InterstitialAd? _interstitialAd;
  
  @override
  void dispose() {
    // Always dispose ads to prevent memory leaks
    _interstitialAd?.dispose();
    _interstitialAd = null;
    super.dispose();
  }

  // Clear ads when app goes to background
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused) {
      _clearAds();
    } else if (state == AppLifecycleState.resumed) {
      _reloadAds();
    }
  }

  void _clearAds() {
    _interstitialAd?.dispose();
    _interstitialAd = null;
  }

  void _reloadAds() {
    _loadInterstitialAd();
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`@override\nvoid dispose() {\n  _interstitialAd?.dispose();\n  _interstitialAd = null;\n  super.dispose();\n}`, 'memory')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'memory' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'memory' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Performance Tips */}
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Performance Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Pre-load ads during app initialization or idle time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Always dispose ads in widget <code className="px-1 py-0.5 bg-green-100 rounded">dispose()</code> method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Load next ad immediately after showing previous one</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Monitor memory usage and clear unused ad instances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use <code className="px-1 py-0.5 bg-green-100 rounded">const</code> constructors where possible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy & Consent */}
        {expandedSection === 'privacy' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Privacy & Consent</h2>
                    <p className="text-sm text-gray-600">GDPR, CCPA, and privacy compliance</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* GDPR Consent */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">User Consent Management</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';

class ConsentManager {
  static Future<void> requestConsent(BuildContext context) async {
    // Check if consent is required (EU users)
    final isConsentRequired = await YourPlatformAds.isConsentRequired();
    
    if (isConsentRequired) {
      // Show consent dialog
      final consentStatus = await YourPlatformAds.showConsentForm(
        context: context,
        privacyPolicyUrl: 'https://yourapp.com/privacy',
        userUnderAge: false,
      );
      
      // Configure ads based on consent
      await _configureAds(consentStatus);
    }
  }

  static Future<void> _configureAds(ConsentStatus status) async {
    switch (status) {
      case ConsentStatus.obtained:
        // User consented - show personalized ads
        await YourPlatformAds.setConsentStatus(
          personalized: true,
        );
        break;
        
      case ConsentStatus.notObtained:
        // User declined - show non-personalized ads only
        await YourPlatformAds.setConsentStatus(
          personalized: false,
        );
        break;
        
      case ConsentStatus.unknown:
        // Handle unknown state
        break;
    }
  }

  // Allow users to change consent later
  static Future<void> resetConsent() async {
    await YourPlatformAds.resetConsent();
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`final isConsentRequired = await YourPlatformAds.isConsentRequired();\n\nif (isConsentRequired) {\n  final status = await YourPlatformAds.showConsentForm(\n    context: context,\n    privacyPolicyUrl: 'https://yourapp.com/privacy',\n  );\n}`, 'consent')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'consent' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'consent' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Child-Directed Treatment */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Child-Directed Content</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`// Configure for child-directed content (COPPA compliance)
await YourPlatformAds.initialize(
  appId: 'YOUR_APP_ID',
  globalRequestConfiguration: AdRequestConfiguration(
    // Tag for child-directed treatment
    tagForChildDirectedTreatment: true,
    
    // Tag for users under age of consent (EU)
    tagForUnderAgeOfConsent: true,
    
    // Maximum ad content rating
    maxAdContentRating: MaxAdContentRating.general,
  ),
);

// Or configure per ad request
YourPlatformBannerAd(
  adUnitId: 'ca-pub-123-001',
  size: BannerAdSize.standard,
  requestConfiguration: AdRequestConfiguration(
    tagForChildDirectedTreatment: true,
    maxAdContentRating: MaxAdContentRating.general,
  ),
)`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`globalRequestConfiguration: AdRequestConfiguration(\n  tagForChildDirectedTreatment: true,\n  tagForUnderAgeOfConsent: true,\n  maxAdContentRating: MaxAdContentRating.general,\n)`, 'coppa')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'coppa' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'coppa' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Privacy Compliance */}
                <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Compliance Checklist
                  </h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Implement user consent flow for EU users (GDPR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Tag child-directed content appropriately (COPPA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Provide privacy policy link in consent form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Allow users to change consent preferences anytime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Set appropriate max ad content rating for your audience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Test consent flow before production release</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testing & Debugging */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 mb-3">Testing & Debugging Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">🧪</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Test Mode</h4>
                  <p className="text-sm text-gray-600 mb-2">Enable during development</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded block">testMode: true</code>
                </div>

                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Test Devices</h4>
                  <p className="text-sm text-gray-600 mb-2">Add your device ID</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded block">testDeviceIds: ['ABC123']</code>
                </div>

                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">📋</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Debug Logging</h4>
                  <p className="text-sm text-gray-600 mb-2">View detailed logs</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded block">logLevel: LogLevel.debug</code>
                </div>

                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">🔍</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ad Inspector</h4>
                  <p className="text-sm text-gray-600 mb-2">Test ad requests</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded block">YourPlatformAds.openAdInspector()</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/docs/flutter/setup-guide"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
                <Smartphone className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Setup Guide</div>
                <div className="text-xs text-gray-500">Get started quickly</div>
              </div>
            </a>

            <a
              href="/docs/flutter/dart-examples"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Dart Examples</div>
                <div className="text-xs text-gray-500">Code snippets</div>
              </div>
            </a>

            <a
              href="https://github.com/yourplatform/flutter-ads-example"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">GitHub Examples</div>
                <div className="text-xs text-gray-500">Full projects</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlutterAdvanced;
