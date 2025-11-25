import React, { useState } from 'react';
import { Copy, Check, Layout, Maximize2, Gift, Code, Play, AlertCircle, Info, CheckCircle, ChevronDown, Zap, ExternalLink } from 'lucide-react';

const FlutterDartExamples = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState('banner');

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const adTypes = [
    {
      id: 'banner',
      name: 'Banner Ads',
      icon: Layout,
      color: 'blue',
      description: 'Display ads at top or bottom of your screen',
      useCases: ['Continuous visibility', 'Non-intrusive monetization', 'Content integration']
    },
    {
      id: 'interstitial',
      name: 'Interstitial Ads',
      icon: Maximize2,
      color: 'purple',
      description: 'Full-screen ads shown at natural transition points',
      useCases: ['Level completion', 'Screen transitions', 'Natural breaks']
    },
    {
      id: 'rewarded',
      name: 'Rewarded Ads',
      icon: Gift,
      color: 'green',
      description: 'Users watch video ads to earn in-app rewards',
      useCases: ['Extra lives', 'Bonus coins', 'Premium features', 'Unlock content']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flutter Dart Examples</h1>
              <p className="text-gray-600 mt-1">Complete implementation examples for all ad formats</p>
            </div>
          </div>
        </div>

        {/* Ad Types Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {adTypes.map(adType => {
            const Icon = adType.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 border-blue-200',
              purple: 'from-purple-500 to-purple-600 border-purple-200',
              green: 'from-green-500 to-green-600 border-green-200'
            };
            return (
              <div
                key={adType.id}
                className={`bg-gradient-to-br ${colorClasses[adType.color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2`}
                onClick={() => toggleSection(adType.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-8 h-8" />
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === adType.id ? 'rotate-180' : ''}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{adType.name}</h3>
                <p className="text-white/90 text-sm">{adType.description}</p>
              </div>
            );
          })}
        </div>

        {/* Banner Ads Implementation */}
        {expandedSection === 'banner' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Banner Ads Implementation</h2>
                    <p className="text-sm text-gray-600">Display banner ads in your Flutter widgets</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Basic Banner */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Basic Banner Widget</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Add a simple banner ad to your widget tree</p>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My App')),
      body: Column(
        children: [
          // Your content
          Expanded(
            child: Center(child: Text('Main Content')),
          ),
          
          // Banner Ad at bottom
          YourPlatformBannerAd(
            adUnitId: 'ca-pub-123-001',
            size: BannerAdSize.standard, // 320x50
            onAdLoaded: () {
              print('Banner ad loaded');
            },
            onAdFailedToLoad: (error) {
              print('Banner failed to load: \$error');
            },
          ),
        ],
      ),
    );
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`import 'package:yourplatform_ads/yourplatform_ads.dart';\n\nYourPlatformBannerAd(\n  adUnitId: 'ca-pub-123-001',\n  size: BannerAdSize.standard,\n  onAdLoaded: () => print('Banner ad loaded'),\n  onAdFailedToLoad: (error) => print('Failed: \$error'),\n)`, 'banner-basic')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-basic' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-basic' ? (
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

                {/* Step 2: Banner Sizes */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Available Banner Sizes</h3>
                  </div>
                  
                  <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { size: 'BannerAdSize.standard', dimension: '320x50', desc: 'Standard mobile banner' },
                      { size: 'BannerAdSize.large', dimension: '320x100', desc: 'Large mobile banner' },
                      { size: 'BannerAdSize.mediumRectangle', dimension: '300x250', desc: 'Medium rectangle' },
                      { size: 'BannerAdSize.leaderboard', dimension: '728x90', desc: 'Tablet leaderboard' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <code className="text-sm font-semibold text-blue-900">{item.size}</code>
                        <p className="text-xs text-gray-600 mt-1">{item.dimension} - {item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: Stateful Banner */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Banner with State Management</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  bool _bannerLoaded = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(child: YourContent()),
          
          if (_bannerLoaded)
            YourPlatformBannerAd(
              adUnitId: 'ca-pub-123-001',
              size: BannerAdSize.standard,
              onAdLoaded: () {
                setState(() => _bannerLoaded = true);
              },
              onAdFailedToLoad: (error) {
                setState(() => _bannerLoaded = false);
              },
            )
          else
            SizedBox(height: 50), // Placeholder
        ],
      ),
    );
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`bool _bannerLoaded = false;\n\nif (_bannerLoaded)\n  YourPlatformBannerAd(\n    adUnitId: 'ca-pub-123-001',\n    size: BannerAdSize.standard,\n    onAdLoaded: () => setState(() => _bannerLoaded = true),\n  )\nelse\n  SizedBox(height: 50)`, 'banner-stateful')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-stateful' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-stateful' ? (
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
                    Banner Ad Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Place banners at top or bottom for better visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Use state management to handle ad loading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Provide placeholder space to prevent layout shifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Choose appropriate size based on screen size</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interstitial Ads Implementation */}
        {expandedSection === 'interstitial' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Interstitial Ads Implementation</h2>
                    <p className="text-sm text-gray-600">Full-screen ads at natural transition points</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Load Interstitial */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Load Interstitial Ad</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';

class GameScreen extends StatefulWidget {
  @override
  _GameScreenState createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  InterstitialAd? _interstitialAd;
  bool _isAdLoaded = false;

  @override
  void initState() {
    super.initState();
    _loadInterstitialAd();
  }

  void _loadInterstitialAd() {
    InterstitialAd.load(
      adUnitId: 'ca-pub-123-002',
      onAdLoaded: (ad) {
        setState(() {
          _interstitialAd = ad;
          _isAdLoaded = true;
        });
        print('Interstitial ad loaded');
      },
      onAdFailedToLoad: (error) {
        print('Failed to load: \$error');
        _isAdLoaded = false;
      },
    );
  }

  @override
  void dispose() {
    _interstitialAd?.dispose();
    super.dispose();
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`InterstitialAd? _interstitialAd;\nbool _isAdLoaded = false;\n\nvoid _loadInterstitialAd() {\n  InterstitialAd.load(\n    adUnitId: 'ca-pub-123-002',\n    onAdLoaded: (ad) {\n      setState(() {\n        _interstitialAd = ad;\n        _isAdLoaded = true;\n      });\n    },\n    onAdFailedToLoad: (error) => print('Failed: \$error'),\n  );\n}`, 'interstitial-load')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'interstitial-load' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'interstitial-load' ? (
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

                {/* Step 2: Show Interstitial */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Show Interstitial Ad</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Display the ad at appropriate moments</p>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`void _showInterstitialAd() {
  if (_isAdLoaded && _interstitialAd != null) {
    _interstitialAd!.show(
      onAdDismissed: () {
        print('Ad dismissed');
        _interstitialAd = null;
        _isAdLoaded = false;
        // Load next ad
        _loadInterstitialAd();
        // Continue to next screen
        _goToNextLevel();
      },
      onAdShowedFullScreenContent: () {
        print('Ad showed');
      },
      onAdFailedToShowFullScreenContent: (error) {
        print('Failed to show: \$error');
        _goToNextLevel();
      },
    );
  } else {
    print('Ad not ready, proceeding anyway');
    _goToNextLevel();
  }
}

// Example: Show after level completion
void _onLevelComplete() {
  _showInterstitialAd();
}

void _goToNextLevel() {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (_) => NextLevelScreen()),
  );
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`void _showInterstitialAd() {\n  if (_isAdLoaded && _interstitialAd != null) {\n    _interstitialAd!.show(\n      onAdDismissed: () {\n        _interstitialAd = null;\n        _loadInterstitialAd();\n        _goToNextLevel();\n      },\n    );\n  } else {\n    _goToNextLevel();\n  }\n}`, 'interstitial-show')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'interstitial-show' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'interstitial-show' ? (
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
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Interstitial Ad Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Show at natural transition points (level complete, screen change)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Pre-load ads before showing to avoid delays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Always check if ad is loaded before showing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Load next ad immediately after dismissal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Don't show too frequently</strong> - respect user experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewarded Ads Implementation */}
        {expandedSection === 'rewarded' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Rewarded Ads Implementation</h2>
                    <p className="text-sm text-gray-600">Users earn rewards by watching video ads</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Load Rewarded Ad */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Load Rewarded Ad</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';

class RewardScreen extends StatefulWidget {
  @override
  _RewardScreenState createState() => _RewardScreenState();
}

class _RewardScreenState extends State<RewardScreen> {
  RewardedAd? _rewardedAd;
  bool _isAdLoaded = false;
  int _userCoins = 100;

  @override
  void initState() {
    super.initState();
    _loadRewardedAd();
  }

  void _loadRewardedAd() {
    RewardedAd.load(
      adUnitId: 'ca-pub-123-003',
      onAdLoaded: (ad) {
        setState(() {
          _rewardedAd = ad;
          _isAdLoaded = true;
        });
        print('Rewarded ad loaded');
      },
      onAdFailedToLoad: (error) {
        print('Failed to load: \$error');
        setState(() => _isAdLoaded = false);
      },
    );
  }

  @override
  void dispose() {
    _rewardedAd?.dispose();
    super.dispose();
  }
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`RewardedAd? _rewardedAd;\nbool _isAdLoaded = false;\n\nvoid _loadRewardedAd() {\n  RewardedAd.load(\n    adUnitId: 'ca-pub-123-003',\n    onAdLoaded: (ad) {\n      setState(() {\n        _rewardedAd = ad;\n        _isAdLoaded = true;\n      });\n    },\n    onAdFailedToLoad: (error) => print('Failed: \$error'),\n  );\n}`, 'rewarded-load')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'rewarded-load' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'rewarded-load' ? (
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

                {/* Step 2: Show and Handle Reward */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Show Ad and Grant Reward</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`void _showRewardedAd() {
  if (_isAdLoaded && _rewardedAd != null) {
    _rewardedAd!.show(
      onUserEarnedReward: (reward) {
        // User watched the full ad
        int amount = reward.amount;
        String type = reward.type;
        
        print('User earned: \$amount \$type');
        _grantReward(amount);
      },
      onAdDismissed: () {
        print('Ad dismissed');
        _rewardedAd = null;
        _isAdLoaded = false;
        // Load next ad
        _loadRewardedAd();
      },
      onAdShowedFullScreenContent: () {
        print('Ad showed');
      },
      onAdFailedToShowFullScreenContent: (error) {
        print('Failed to show: \$error');
      },
    );
  } else {
    _showMessage('Video not available yet');
  }
}

void _grantReward(int amount) {
  setState(() {
    _userCoins += amount;
  });
  _showMessage('You earned \$amount coins!');
}

void _showMessage(String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(message)),
  );
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`void _showRewardedAd() {\n  if (_isAdLoaded && _rewardedAd != null) {\n    _rewardedAd!.show(\n      onUserEarnedReward: (reward) {\n        _grantReward(reward.amount);\n      },\n      onAdDismissed: () {\n        _rewardedAd = null;\n        _loadRewardedAd();\n      },\n    );\n  }\n}`, 'rewarded-show')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'rewarded-show' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'rewarded-show' ? (
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

                {/* Step 3: UI Button */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Watch Ad Button</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Your Coins: \$_userCoins',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 30),
          ElevatedButton.icon(
            onPressed: _isAdLoaded ? _showRewardedAd : null,
            icon: Icon(Icons.play_circle_filled),
            label: Text('Watch Ad for 50 Coins'),
            style: ElevatedButton.styleFrom(
              padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              backgroundColor: Colors.green,
              disabledBackgroundColor: Colors.grey,
            ),
          ),
          SizedBox(height: 10),
          Text(
            _isAdLoaded ? 'Ad ready!' : 'Loading ad...',
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    ),
  );
}`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`ElevatedButton.icon(\n  onPressed: _isAdLoaded ? _showRewardedAd : null,\n  icon: Icon(Icons.play_circle_filled),\n  label: Text('Watch Ad for 50 Coins'),\n  style: ElevatedButton.styleFrom(\n    backgroundColor: Colors.green,\n  ),\n)`, 'rewarded-ui')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'rewarded-ui' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'rewarded-ui' ? (
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
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Rewarded Ad Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Clear value proposition:</strong> Tell users what they'll earn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Always user-initiated:</strong> Never force rewarded ads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Grant rewards immediately:</strong> Update UI right away</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Handle dismissals gracefully:</strong> Don't penalize early exit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Pre-load ads:</strong> Have them ready when users want to watch</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complete Example Link */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Complete Example Project</h3>
              <p className="text-indigo-800 mb-4">
                Check out our GitHub repository for a complete Flutter app with all ad types implemented.
              </p>
              <a
                href="https://github.com/yourplatform/flutter-ads-example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlutterDartExamples;
