import React, { useState } from 'react';
import { Copy, Check, Layout, Maximize2, Gift, Code, AlertCircle, Info, CheckCircle, ChevronDown, Zap, ExternalLink } from 'lucide-react';

const IOSImplementationExamples = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('swift');
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">iOS Implementation Examples</h1>
              <p className="text-gray-600 mt-1">Complete code examples for Banner, Interstitial, and Rewarded ads</p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">Programming Language</label>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'swift', label: 'Swift', icon: '🟠' },
              { value: 'objc', label: 'Objective-C', icon: '🔵' }
            ].map(lang => (
              <button
                key={lang.value}
                onClick={() => setSelectedLanguage(lang.value)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border-2 font-medium transition-all ${
                  selectedLanguage === lang.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{lang.icon}</span>
                {lang.label}
              </button>
            ))}
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
                    <p className="text-sm text-gray-600">Display banner ads in your view controllers</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Add Banner View */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Banner View to ViewController</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`import UIKit
import YourPlatformAds

class ViewController: UIViewController {
    
    var bannerView: YPBannerAdView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Initialize banner ad
        bannerView = YPBannerAdView(
            adUnitId: "ca-pub-123-001",
            adSize: .banner // 320x50
        )
        
        // Set delegate
        bannerView.delegate = self
        
        // Position banner at bottom
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(bannerView)
        
        NSLayoutConstraint.activate([
            bannerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            bannerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            bannerView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            bannerView.heightAnchor.constraint(equalToConstant: 50)
        ])
        
        // Load ad
        bannerView.load()
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#import "ViewController.h"
#import <YourPlatformAds/YourPlatformAds.h>

@interface ViewController ()
@property (nonatomic, strong) YPBannerAdView *bannerView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Initialize banner ad
    self.bannerView = [[YPBannerAdView alloc] 
        initWithAdUnitId:@"ca-pub-123-001"
        adSize:YPAdSizeBanner]; // 320x50
    
    // Set delegate
    self.bannerView.delegate = self;
    
    // Position banner at bottom
    self.bannerView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:self.bannerView];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.bannerView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.bannerView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
        [self.bannerView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
        [self.bannerView.heightAnchor constraintEqualToConstant:50]
    ]];
    
    // Load ad
    [self.bannerView load];
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `bannerView = YPBannerAdView(adUnitId: "ca-pub-123-001", adSize: .banner)\nbannerView.delegate = self\nview.addSubview(bannerView)\nbannerView.load()`
                          : `self.bannerView = [[YPBannerAdView alloc] initWithAdUnitId:@"ca-pub-123-001" adSize:YPAdSizeBanner];\nself.bannerView.delegate = self;\n[self.view addSubview:self.bannerView];\n[self.bannerView load];`,
                        'banner-init'
                      )}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-init' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-init' ? (
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

                {/* Step 2: Available Banner Sizes */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Available Banner Sizes</h3>
                  </div>
                  
                  <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { size: '.banner', dimension: '320x50', desc: 'Standard mobile banner' },
                      { size: '.largeBanner', dimension: '320x100', desc: 'Large mobile banner' },
                      { size: '.mediumRectangle', dimension: '300x250', desc: 'Medium rectangle' },
                      { size: '.leaderboard', dimension: '728x90', desc: 'Tablet leaderboard' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <code className="text-sm font-semibold text-blue-900">{selectedLanguage === 'swift' ? `YPAdSize${item.size}` : `YPAdSize${item.size.charAt(1).toUpperCase() + item.size.slice(2)}`}</code>
                        <p className="text-xs text-gray-600 mt-1">{item.dimension} - {item.desc}</p>
                      </div>
                    ))}
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
                      <span>Place banners at top or bottom using Auto Layout constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Don't place banners too close to interactive UI elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Use safe area layout guides for proper positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Consider device orientation and size classes</span>
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
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`import UIKit
import YourPlatformAds

class GameViewController: UIViewController {
    
    var interstitialAd: YPInterstitialAd?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadInterstitialAd()
    }
    
    func loadInterstitialAd() {
        YPInterstitialAd.load(
            withAdUnitId: "ca-pub-123-002"
        ) { [weak self] ad, error in
            if let error = error {
                print("Failed to load interstitial: \\(error.localizedDescription)")
                return
            }
            
            self?.interstitialAd = ad
            self?.interstitialAd?.delegate = self
            print("Interstitial ad loaded successfully")
        }
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#import "GameViewController.h"
#import <YourPlatformAds/YourPlatformAds.h>

@interface GameViewController ()
@property (nonatomic, strong) YPInterstitialAd *interstitialAd;
@end

@implementation GameViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self loadInterstitialAd];
}

- (void)loadInterstitialAd {
    [YPInterstitialAd loadWithAdUnitId:@"ca-pub-123-002"
                     completionHandler:^(YPInterstitialAd *ad, NSError *error) {
        if (error) {
            NSLog(@"Failed to load interstitial: %@", error.localizedDescription);
            return;
        }
        
        self.interstitialAd = ad;
        self.interstitialAd.delegate = self;
        NSLog(@"Interstitial ad loaded successfully");
    }];
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `YPInterstitialAd.load(withAdUnitId: "ca-pub-123-002") { [weak self] ad, error in\n    guard let ad = ad else { return }\n    self?.interstitialAd = ad\n    self?.interstitialAd?.delegate = self\n}`
                          : `[YPInterstitialAd loadWithAdUnitId:@"ca-pub-123-002" completionHandler:^(YPInterstitialAd *ad, NSError *error) {\n    self.interstitialAd = ad;\n    self.interstitialAd.delegate = self;\n}];`,
                        'interstitial-load'
                      )}
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
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`func showInterstitialAd() {
    guard let interstitialAd = interstitialAd else {
        print("Ad not ready")
        proceedToNextLevel()
        return
    }
    
    if interstitialAd.isReady {
        interstitialAd.present(fromRootViewController: self)
    } else {
        print("Ad not ready")
        proceedToNextLevel()
    }
}

// Example: Show after level completion
func onLevelComplete() {
    showInterstitialAd()
}

func proceedToNextLevel() {
    let nextVC = NextLevelViewController()
    navigationController?.pushViewController(nextVC, animated: true)
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`- (void)showInterstitialAd {
    if (!self.interstitialAd) {
        NSLog(@"Ad not ready");
        [self proceedToNextLevel];
        return;
    }
    
    if ([self.interstitialAd isReady]) {
        [self.interstitialAd presentFromRootViewController:self];
    } else {
        NSLog(@"Ad not ready");
        [self proceedToNextLevel];
    }
}

// Example: Show after level completion
- (void)onLevelComplete {
    [self showInterstitialAd];
}

- (void)proceedToNextLevel {
    NextLevelViewController *nextVC = [[NextLevelViewController alloc] init];
    [self.navigationController pushViewController:nextVC animated:YES];
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `if interstitialAd?.isReady == true {\n    interstitialAd?.present(fromRootViewController: self)\n} else {\n    proceedToNextLevel()\n}`
                          : `if ([self.interstitialAd isReady]) {\n    [self.interstitialAd presentFromRootViewController:self];\n} else {\n    [self proceedToNextLevel];\n}`,
                        'interstitial-show'
                      )}
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
                      <span>Always check <code className="px-1 py-0.5 bg-purple-100 rounded">isReady</code> before presenting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Load next ad in delegate callback after dismissal</span>
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
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`import UIKit
import YourPlatformAds

class RewardViewController: UIViewController {
    
    var rewardedAd: YPRewardedAd?
    var userCoins: Int = 100
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadRewardedAd()
    }
    
    func loadRewardedAd() {
        YPRewardedAd.load(
            withAdUnitId: "ca-pub-123-003"
        ) { [weak self] ad, error in
            if let error = error {
                print("Failed to load rewarded ad: \\(error.localizedDescription)")
                return
            }
            
            self?.rewardedAd = ad
            self?.rewardedAd?.delegate = self
            print("Rewarded ad loaded successfully")
        }
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#import "RewardViewController.h"
#import <YourPlatformAds/YourPlatformAds.h>

@interface RewardViewController ()
@property (nonatomic, strong) YPRewardedAd *rewardedAd;
@property (nonatomic, assign) NSInteger userCoins;
@end

@implementation RewardViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.userCoins = 100;
    [self loadRewardedAd];
}

- (void)loadRewardedAd {
    [YPRewardedAd loadWithAdUnitId:@"ca-pub-123-003"
                  completionHandler:^(YPRewardedAd *ad, NSError *error) {
        if (error) {
            NSLog(@"Failed to load rewarded ad: %@", error.localizedDescription);
            return;
        }
        
        self.rewardedAd = ad;
        self.rewardedAd.delegate = self;
        NSLog(@"Rewarded ad loaded successfully");
    }];
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `YPRewardedAd.load(withAdUnitId: "ca-pub-123-003") { [weak self] ad, error in\n    guard let ad = ad else { return }\n    self?.rewardedAd = ad\n    self?.rewardedAd?.delegate = self\n}`
                          : `[YPRewardedAd loadWithAdUnitId:@"ca-pub-123-003" completionHandler:^(YPRewardedAd *ad, NSError *error) {\n    self.rewardedAd = ad;\n    self.rewardedAd.delegate = self;\n}];`,
                        'rewarded-load'
                      )}
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
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`func showRewardedAd() {
    guard let rewardedAd = rewardedAd else {
        showMessage("Video not available yet")
        return
    }
    
    if rewardedAd.isReady {
        rewardedAd.present(fromRootViewController: self)
    } else {
        showMessage("Video not ready")
    }
}

func showMessage(_ message: String) {
    let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default))
    present(alert, animated: true)
}

// Add button action
@IBAction func watchAdButtonTapped(_ sender: UIButton) {
    showRewardedAd()
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`- (void)showRewardedAd {
    if (!self.rewardedAd) {
        [self showMessage:@"Video not available yet"];
        return;
    }
    
    if ([self.rewardedAd isReady]) {
        [self.rewardedAd presentFromRootViewController:self];
    } else {
        [self showMessage:@"Video not ready"];
    }
}

- (void)showMessage:(NSString *)message {
    UIAlertController *alert = [UIAlertController 
        alertControllerWithTitle:nil 
        message:message 
        preferredStyle:UIAlertControllerStyleAlert];
    
    [alert addAction:[UIAlertAction actionWithTitle:@"OK" 
                                              style:UIAlertActionStyleDefault 
                                            handler:nil]];
    [self presentViewController:alert animated:YES completion:nil];
}

// Add button action
- (IBAction)watchAdButtonTapped:(UIButton *)sender {
    [self showRewardedAd];
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `if rewardedAd?.isReady == true {\n    rewardedAd?.present(fromRootViewController: self)\n} else {\n    showMessage("Video not ready")\n}`
                          : `if ([self.rewardedAd isReady]) {\n    [self.rewardedAd presentFromRootViewController:self];\n} else {\n    [self showMessage:@"Video not ready"];\n}`,
                        'rewarded-show'
                      )}
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
                Check out our GitHub repository for a complete iOS app with all ad types implemented.
              </p>
              <a
                href="https://github.com/yourplatform/ios-ads-example"
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

export default IOSImplementationExamples;
