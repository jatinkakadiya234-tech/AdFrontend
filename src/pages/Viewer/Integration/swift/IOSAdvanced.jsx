import React, { useState } from 'react';
import { Copy, Check, Settings, Sliders, AlertCircle, Info, CheckCircle, Zap, Shield, Globe, Code, ChevronDown } from 'lucide-react';

const IOSAdvanced = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('swift');
  const [expandedSection, setExpandedSection] = useState('att');

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
      id: 'att',
      name: 'App Tracking Transparency',
      icon: Shield,
      color: 'blue',
      description: 'iOS 14+ ATT framework implementation'
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
      description: 'Improve ad loading and memory usage'
    },
    {
      id: 'testing',
      name: 'Testing & Debug',
      icon: Code,
      color: 'orange',
      description: 'Test ads and debug integration'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Advanced iOS Configuration</h1>
              <p className="text-gray-600 mt-1">Customize and optimize your iOS ad integration</p>
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
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{lang.icon}</span>
                {lang.label}
              </button>
            ))}
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

        {/* App Tracking Transparency */}
        {expandedSection === 'att' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">App Tracking Transparency (iOS 14+)</h2>
                    <p className="text-sm text-gray-600">Request user permission for tracking and personalized ads</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Info.plist Configuration */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Configure Info.plist</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Add tracking usage description</p>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`<!-- Info.plist -->
<key>NSUserTrackingUsageDescription</key>
<string>This allows us to show you personalized ads and improve your experience</string>`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`<key>NSUserTrackingUsageDescription</key>\n<string>This allows us to show you personalized ads and improve your experience</string>`, 'att-plist')}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'att-plist' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'att-plist' ? (
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

                {/* Step 2: Request ATT Permission */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Request Tracking Authorization</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`import AppTrackingTransparency
import AdSupport

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        // Request ATT permission
        requestTrackingAuthorization()
    }
    
    func requestTrackingAuthorization() {
        // Only request on iOS 14+
        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization { status in
                switch status {
                case .authorized:
                    // Tracking authorized - can show personalized ads
                    print("✅ Tracking authorized")
                    self.initializeAdsWithPersonalization(true)
                    
                case .denied:
                    // User denied - show non-personalized ads
                    print("❌ Tracking denied")
                    self.initializeAdsWithPersonalization(false)
                    
                case .notDetermined:
                    // User hasn't decided yet
                    print("⏳ Tracking not determined")
                    
                case .restricted:
                    // Tracking restricted by device settings
                    print("🔒 Tracking restricted")
                    self.initializeAdsWithPersonalization(false)
                    
                @unknown default:
                    break
                }
            }
        } else {
            // iOS 13 and below - no ATT required
            initializeAdsWithPersonalization(true)
        }
    }
    
    func initializeAdsWithPersonalization(_ personalized: Bool) {
        YourPlatformAds.shared.personalizedAds = personalized
        print("Ads initialized with personalization: \\(personalized)")
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdSupport/AdSupport.h>

@implementation AppDelegate

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Request ATT permission
    [self requestTrackingAuthorization];
}

- (void)requestTrackingAuthorization {
    // Only request on iOS 14+
    if (@available(iOS 14, *)) {
        [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
            switch (status) {
                case ATTrackingManagerAuthorizationStatusAuthorized:
                    // Tracking authorized
                    NSLog(@"✅ Tracking authorized");
                    [self initializeAdsWithPersonalization:YES];
                    break;
                    
                case ATTrackingManagerAuthorizationStatusDenied:
                    // User denied
                    NSLog(@"❌ Tracking denied");
                    [self initializeAdsWithPersonalization:NO];
                    break;
                    
                case ATTrackingManagerAuthorizationStatusNotDetermined:
                    // Not determined yet
                    NSLog(@"⏳ Tracking not determined");
                    break;
                    
                case ATTrackingManagerAuthorizationStatusRestricted:
                    // Restricted
                    NSLog(@"🔒 Tracking restricted");
                    [self initializeAdsWithPersonalization:NO];
                    break;
            }
        }];
    } else {
        // iOS 13 and below
        [self initializeAdsWithPersonalization:YES];
    }
}

- (void)initializeAdsWithPersonalization:(BOOL)personalized {
    [YourPlatformAds sharedInstance].personalizedAds = personalized;
    NSLog(@"Ads initialized with personalization: %d", personalized);
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `import AppTrackingTransparency\n\nATTrackingManager.requestTrackingAuthorization { status in\n    switch status {\n    case .authorized:\n        initializeAdsWithPersonalization(true)\n    case .denied:\n        initializeAdsWithPersonalization(false)\n    default:\n        break\n    }\n}`
                          : `#import <AppTrackingTransparency/AppTrackingTransparency.h>\n\n[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {\n    if (status == ATTrackingManagerAuthorizationStatusAuthorized) {\n        [self initializeAdsWithPersonalization:YES];\n    }\n}];`,
                        'att-request'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'att-request' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'att-request' ? (
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
                    ATT Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Request at appropriate time:</strong> After user understands app value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Clear messaging:</strong> Explain benefits of personalized ads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Handle all statuses:</strong> Support both personalized and non-personalized ads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Test thoroughly:</strong> Test all ATT scenarios before release</span>
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
                    <p className="text-sm text-gray-600">Customize ad appearance and targeting</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Custom Ad Request */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Custom Ad Request Configuration</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Configure ad request with custom parameters
let request = YPAdRequest()

// Targeting
request.keywords = ["gaming", "puzzle", "casual"]
request.contentURL = URL(string: "https://yourapp.com/games/puzzle")
request.customTargeting = [
    "age_group": "25-34",
    "interests": "gaming,entertainment"
]

// Content rating
request.maxAdContentRating = .general // .general, .parentalGuidance, .teen, .mature

// Child-directed content (COPPA compliance)
request.tagForChildDirectedTreatment = false

// Location
if let location = locationManager.location {
    request.location = location
}

// Test devices (for development)
#if DEBUG
request.testDeviceIdentifiers = ["YOUR_TEST_DEVICE_ID"]
#endif

// Load banner with custom request
bannerView.load(request)`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Configure ad request with custom parameters
YPAdRequest *request = [[YPAdRequest alloc] init];

// Targeting
request.keywords = @[@"gaming", @"puzzle", @"casual"];
request.contentURL = [NSURL URLWithString:@"https://yourapp.com/games/puzzle"];
request.customTargeting = @{
    @"age_group": @"25-34",
    @"interests": @"gaming,entertainment"
};

// Content rating
request.maxAdContentRating = YPMaxAdContentRatingGeneral;

// Child-directed content (COPPA compliance)
request.tagForChildDirectedTreatment = NO;

// Location
if (self.locationManager.location) {
    request.location = self.locationManager.location;
}

// Test devices (for development)
#ifdef DEBUG
request.testDeviceIdentifiers = @[@"YOUR_TEST_DEVICE_ID"];
#endif

// Load banner with custom request
[self.bannerView loadRequest:request];`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `let request = YPAdRequest()\nrequest.keywords = ["gaming", "puzzle"]\nrequest.maxAdContentRating = .general\nbannerView.load(request)`
                          : `YPAdRequest *request = [[YPAdRequest alloc] init];\nrequest.keywords = @[@"gaming", @"puzzle"];\nrequest.maxAdContentRating = YPMaxAdContentRatingGeneral;\n[self.bannerView loadRequest:request];`,
                        'custom-request'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'custom-request' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'custom-request' ? (
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
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Configure SDK globally in AppDelegate
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    // Initialize with configuration
    let config = YPAdsConfiguration()
    config.appID = "YOUR_APP_ID"
    config.testMode = false
    
    // Global request settings
    config.defaultKeywords = ["mobile", "ios"]
    config.maxAdContentRating = .general
    config.tagForChildDirectedTreatment = false
    
    // Performance settings
    config.preloadInterstitials = true
    config.preloadRewarded = true
    config.adCacheSize = 3
    
    // Timeout settings
    config.requestTimeout = 30 // seconds
    
    // Logging
    #if DEBUG
    config.logLevel = .debug
    #else
    config.logLevel = .error
    #endif
    
    YourPlatformAds.initialize(with: config)
    
    return true
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Configure SDK globally in AppDelegate
- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    // Initialize with configuration
    YPAdsConfiguration *config = [[YPAdsConfiguration alloc] init];
    config.appID = @"YOUR_APP_ID";
    config.testMode = NO;
    
    // Global request settings
    config.defaultKeywords = @[@"mobile", @"ios"];
    config.maxAdContentRating = YPMaxAdContentRatingGeneral;
    config.tagForChildDirectedTreatment = NO;
    
    // Performance settings
    config.preloadInterstitials = YES;
    config.preloadRewarded = YES;
    config.adCacheSize = 3;
    
    // Timeout settings
    config.requestTimeout = 30; // seconds
    
    // Logging
#ifdef DEBUG
    config.logLevel = YPLogLevelDebug;
#else
    config.logLevel = YPLogLevelError;
#endif
    
    [YourPlatformAds initializeWithConfiguration:config];
    
    return YES;
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `let config = YPAdsConfiguration()\nconfig.appID = "YOUR_APP_ID"\nconfig.preloadInterstitials = true\nYourPlatformAds.initialize(with: config)`
                          : `YPAdsConfiguration *config = [[YPAdsConfiguration alloc] init];\nconfig.appID = @"YOUR_APP_ID";\nconfig.preloadInterstitials = YES;\n[YourPlatformAds initializeWithConfiguration:config];`,
                        'global-config'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
                    <p className="text-sm text-gray-600">Improve ad loading and memory management</p>
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
                    <h3 className="text-lg font-semibold text-gray-900">Pre-loading Multiple Ads</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`class AdManager {
    static let shared = AdManager()
    
    private var interstitialAd: YPInterstitialAd?
    private var rewardedAd: YPRewardedAd?
    private let adQueue = DispatchQueue(label: "com.app.adqueue")
    
    func preloadAds() {
        // Load ads in parallel
        let group = DispatchGroup()
        
        group.enter()
        loadInterstitial {
            group.leave()
        }
        
        group.enter()
        loadRewarded {
            group.leave()
        }
        
        group.notify(queue: .main) {
            print("✅ All ads preloaded")
        }
    }
    
    private func loadInterstitial(completion: @escaping () -> Void) {
        YPInterstitialAd.load(withAdUnitId: "ca-pub-123-002") { [weak self] ad, error in
            if let ad = ad {
                self?.interstitialAd = ad
                ad.delegate = self
            }
            completion()
        }
    }
    
    private func loadRewarded(completion: @escaping () -> Void) {
        YPRewardedAd.load(withAdUnitId: "ca-pub-123-003") { [weak self] ad, error in
            if let ad = ad {
                self?.rewardedAd = ad
                ad.delegate = self
            }
            completion()
        }
    }
    
    // Call from AppDelegate
    func applicationDidBecomeActive() {
        preloadAds()
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`@interface AdManager : NSObject
+ (instancetype)sharedManager;
- (void)preloadAds;
@end

@implementation AdManager

+ (instancetype)sharedManager {
    static AdManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[AdManager alloc] init];
    });
    return manager;
}

- (void)preloadAds {
    dispatch_group_t group = dispatch_group_create();
    
    dispatch_group_enter(group);
    [self loadInterstitialWithCompletion:^{
        dispatch_group_leave(group);
    }];
    
    dispatch_group_enter(group);
    [self loadRewardedWithCompletion:^{
        dispatch_group_leave(group);
    }];
    
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        NSLog(@"✅ All ads preloaded");
    });
}

- (void)loadInterstitialWithCompletion:(void (^)(void))completion {
    [YPInterstitialAd loadWithAdUnitId:@"ca-pub-123-002" 
                     completionHandler:^(YPInterstitialAd *ad, NSError *error) {
        if (ad) {
            self.interstitialAd = ad;
            ad.delegate = self;
        }
        completion();
    }];
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `let group = DispatchGroup()\n\ngroup.enter()\nloadInterstitial { group.leave() }\n\ngroup.enter()\nloadRewarded { group.leave() }\n\ngroup.notify(queue: .main) {\n    print("All ads loaded")\n}`
                          : `dispatch_group_t group = dispatch_group_create();\n\ndispatch_group_enter(group);\n[self loadInterstitial];\n\ndispatch_group_notify(group, dispatch_get_main_queue(), ^{\n    NSLog(@"All ads loaded");\n});`,
                        'preload'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`class ViewController: UIViewController {
    var bannerView: YPBannerAdView?
    
    deinit {
        // Clean up ads
        bannerView?.removeFromSuperview()
        bannerView = nil
        print("ViewController deallocated")
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        // Pause banner refresh
        bannerView?.pause()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // Resume banner refresh
        bannerView?.resume()
    }
    
    // Handle memory warnings
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
        // Release cached ads
        clearAdCache()
    }
    
    func clearAdCache() {
        // Remove banner if not visible
        if !isViewLoaded || view.window == nil {
            bannerView?.removeFromSuperview()
            bannerView = nil
        }
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`@implementation ViewController

- (void)dealloc {
    // Clean up ads
    [self.bannerView removeFromSuperview];
    self.bannerView = nil;
    NSLog(@"ViewController deallocated");
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    // Pause banner refresh
    [self.bannerView pause];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    // Resume banner refresh
    [self.bannerView resume];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
    // Release cached ads
    [self clearAdCache];
}

- (void)clearAdCache {
    // Remove banner if not visible
    if (!self.isViewLoaded || !self.view.window) {
        [self.bannerView removeFromSuperview];
        self.bannerView = nil;
    }
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `deinit {\n    bannerView?.removeFromSuperview()\n    bannerView = nil\n}\n\noverride func didReceiveMemoryWarning() {\n    super.didReceiveMemoryWarning()\n    clearAdCache()\n}`
                          : `- (void)dealloc {\n    [self.bannerView removeFromSuperview];\n    self.bannerView = nil;\n}\n\n- (void)didReceiveMemoryWarning {\n    [super didReceiveMemoryWarning];\n    [self clearAdCache];\n}`,
                        'memory'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
                      <span>Pre-load ads during app launch or idle time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use DispatchGroup for parallel ad loading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Pause/resume banner refresh based on view visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Release ads in deinit and didReceiveMemoryWarning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Monitor memory usage with Instruments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testing & Debug */}
        {expandedSection === 'testing' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Testing & Debug</h2>
                    <p className="text-sm text-gray-600">Test ads and debug integration issues</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Test Mode */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Enable Test Mode</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Enable test mode in AppDelegate
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    YourPlatformAds.initialize(withAppId: "YOUR_APP_ID")
    
    // Enable test mode for development
    #if DEBUG
    YourPlatformAds.shared.testMode = true
    YourPlatformAds.shared.logLevel = .verbose
    
    // Add test device IDs
    YourPlatformAds.shared.testDeviceIDs = [
        "YOUR_DEVICE_IDFA",
        "SIMULATOR"
    ]
    #endif
    
    return true
}

// Get device IDFA for testing
import AdSupport

func printDeviceIDFA() {
    let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
    print("📱 Device IDFA: \\(idfa)")
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Enable test mode in AppDelegate
- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [YourPlatformAds initializeWithAppId:@"YOUR_APP_ID"];
    
    // Enable test mode for development
#ifdef DEBUG
    [YourPlatformAds sharedInstance].testMode = YES;
    [YourPlatformAds sharedInstance].logLevel = YPLogLevelVerbose;
    
    // Add test device IDs
    [YourPlatformAds sharedInstance].testDeviceIDs = @[
        @"YOUR_DEVICE_IDFA",
        @"SIMULATOR"
    ];
#endif
    
    return YES;
}

// Get device IDFA for testing
#import <AdSupport/AdSupport.h>

- (void)printDeviceIDFA {
    NSString *idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    NSLog(@"📱 Device IDFA: %@", idfa);
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `#if DEBUG\nYourPlatformAds.shared.testMode = true\nYourPlatformAds.shared.logLevel = .verbose\nYourPlatformAds.shared.testDeviceIDs = ["YOUR_DEVICE_IDFA"]\n#endif`
                          : `#ifdef DEBUG\n[YourPlatformAds sharedInstance].testMode = YES;\n[YourPlatformAds sharedInstance].logLevel = YPLogLevelVerbose;\n[YourPlatformAds sharedInstance].testDeviceIDs = @[@"YOUR_DEVICE_IDFA"];\n#endif`,
                        'test-mode'
                      )}
                      className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'test-mode' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'test-mode' ? (
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

                {/* Debug Logging */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Debug Logging</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Monitor ad requests and responses in console</p>
                  
                  <div className="ml-9 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm border border-gray-700">
                    <code className="block whitespace-pre-wrap">{`✅ [YourPlatformAds] SDK initialized successfully
📱 [YourPlatformAds] Test mode: ENABLED
🔍 [YourPlatformAds] Loading banner ad: ca-pub-123-001
⏱️ [YourPlatformAds] Ad request sent (0.2s)
✅ [YourPlatformAds] Banner ad loaded successfully (1.3s)
👁️ [YourPlatformAds] Ad impression recorded
👆 [YourPlatformAds] Ad clicked
❌ [YourPlatformAds] Failed to load ad: No fill`}</code>
                  </div>
                </div>

                {/* Testing Checklist */}
                <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Testing Checklist
                  </h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Enable test mode and add device IDFA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Test all ad formats (banner, interstitial, rewarded)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Verify delegate callbacks are called</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Test on both simulator and real device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Check console logs for errors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Test with/without internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Verify ads appear in dashboard within 2-3 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">☐</span>
                      <span>Disable test mode before production release</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/docs/ios/setup-guide"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Setup Guide</div>
                <div className="text-xs text-gray-500">Get started quickly</div>
              </div>
            </a>

            <a
              href="/docs/ios/implementation-examples"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Code className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Implementation Examples</div>
                <div className="text-xs text-gray-500">Code snippets</div>
              </div>
            </a>

            <a
              href="https://github.com/yourplatform/ios-ads-example"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Globe className="w-5 h-5 text-green-600" />
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

export default IOSAdvanced;
