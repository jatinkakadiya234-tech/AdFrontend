import React, { useState } from 'react';
import { Copy, Check, Code, AlertCircle, Info, CheckCircle, Zap, ChevronDown } from 'lucide-react';

const IOSDelegateMethods = () => {
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

  const delegateTypes = [
    {
      id: 'banner',
      name: 'Banner Ad Delegate',
      icon: '📐',
      color: 'blue',
      description: 'Handle banner ad lifecycle events'
    },
    {
      id: 'interstitial',
      name: 'Interstitial Delegate',
      icon: '🖼️',
      color: 'purple',
      description: 'Handle full-screen ad events'
    },
    {
      id: 'rewarded',
      name: 'Rewarded Ad Delegate',
      icon: '🎁',
      color: 'green',
      description: 'Handle rewarded video events and rewards'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delegate Methods & Protocols</h1>
              <p className="text-gray-600 mt-1">Implement delegate methods to handle ad lifecycle events</p>
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

        {/* Delegate Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {delegateTypes.map(type => {
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 border-blue-200',
              purple: 'from-purple-500 to-purple-600 border-purple-200',
              green: 'from-green-500 to-green-600 border-green-200'
            };
            return (
              <div
                key={type.id}
                className={`bg-gradient-to-br ${colorClasses[type.color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2`}
                onClick={() => toggleSection(type.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{type.icon}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === type.id ? 'rotate-180' : ''}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                <p className="text-white/90 text-sm">{type.description}</p>
              </div>
            );
          })}
        </div>

        {/* Banner Ad Delegate */}
        {expandedSection === 'banner' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📐</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Banner Ad Delegate</h2>
                    <p className="text-sm text-gray-600">YPBannerAdViewDelegate protocol implementation</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Protocol Conformance */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conform to Protocol</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Add protocol conformance to your view controller
extension ViewController: YPBannerAdViewDelegate {
    
    // MARK: - Banner Ad Delegate Methods
    
    func bannerAdViewDidLoad(_ bannerView: YPBannerAdView) {
        print("✅ Banner ad loaded successfully")
        // Update UI, track analytics
    }
    
    func bannerAdView(_ bannerView: YPBannerAdView, didFailToLoadWithError error: Error) {
        print("❌ Banner failed to load: \\(error.localizedDescription)")
        // Log error, show fallback content
    }
    
    func bannerAdViewDidRecordImpression(_ bannerView: YPBannerAdView) {
        print("👁️ Banner impression recorded")
        // Track impression in analytics
    }
    
    func bannerAdViewWillPresentScreen(_ bannerView: YPBannerAdView) {
        print("📱 Banner will present full screen")
        // Pause gameplay, stop music
    }
    
    func bannerAdViewDidDismissScreen(_ bannerView: YPBannerAdView) {
        print("🔙 Banner full screen dismissed")
        // Resume gameplay, restart music
    }
    
    func bannerAdViewWillLeaveApplication(_ bannerView: YPBannerAdView) {
        print("🚪 User left application from banner ad")
        // Save app state
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Add protocol conformance in header
@interface ViewController () <YPBannerAdViewDelegate>
@end

// Implement delegate methods
@implementation ViewController

#pragma mark - Banner Ad Delegate Methods

- (void)bannerAdViewDidLoad:(YPBannerAdView *)bannerView {
    NSLog(@"✅ Banner ad loaded successfully");
    // Update UI, track analytics
}

- (void)bannerAdView:(YPBannerAdView *)bannerView 
    didFailToLoadWithError:(NSError *)error {
    NSLog(@"❌ Banner failed to load: %@", error.localizedDescription);
    // Log error, show fallback content
}

- (void)bannerAdViewDidRecordImpression:(YPBannerAdView *)bannerView {
    NSLog(@"👁️ Banner impression recorded");
    // Track impression in analytics
}

- (void)bannerAdViewWillPresentScreen:(YPBannerAdView *)bannerView {
    NSLog(@"📱 Banner will present full screen");
    // Pause gameplay, stop music
}

- (void)bannerAdViewDidDismissScreen:(YPBannerAdView *)bannerView {
    NSLog(@"🔙 Banner full screen dismissed");
    // Resume gameplay, restart music
}

- (void)bannerAdViewWillLeaveApplication:(YPBannerAdView *)bannerView {
    NSLog(@"🚪 User left application from banner ad");
    // Save app state
}

@end`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `extension ViewController: YPBannerAdViewDelegate {\n    func bannerAdViewDidLoad(_ bannerView: YPBannerAdView) {\n        print("Banner loaded")\n    }\n    \n    func bannerAdView(_ bannerView: YPBannerAdView, didFailToLoadWithError error: Error) {\n        print("Failed: \\(error)")\n    }\n}`
                          : `- (void)bannerAdViewDidLoad:(YPBannerAdView *)bannerView {\n    NSLog(@"Banner loaded");\n}\n\n- (void)bannerAdView:(YPBannerAdView *)bannerView didFailToLoadWithError:(NSError *)error {\n    NSLog(@"Failed: %@", error);\n}`,
                        'banner-delegate'
                      )}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-delegate' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-delegate' ? (
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

                {/* Delegate Method Reference */}
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Delegate Method Reference
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">✅</span>
                      <div>
                        <code className="text-blue-900 font-semibold">bannerAdViewDidLoad</code>
                        <p className="text-gray-600 mt-1">Called when ad loads successfully</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">❌</span>
                      <div>
                        <code className="text-blue-900 font-semibold">didFailToLoadWithError</code>
                        <p className="text-gray-600 mt-1">Called when ad fails to load</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">👁️</span>
                      <div>
                        <code className="text-blue-900 font-semibold">didRecordImpression</code>
                        <p className="text-gray-600 mt-1">Called when impression is recorded</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">📱</span>
                      <div>
                        <code className="text-blue-900 font-semibold">willPresentScreen</code>
                        <p className="text-gray-600 mt-1">Called before showing full-screen content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interstitial Delegate */}
        {expandedSection === 'interstitial' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🖼️</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Interstitial Ad Delegate</h2>
                    <p className="text-sm text-gray-600">YPInterstitialAdDelegate protocol implementation</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Implement Delegate Methods</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`extension GameViewController: YPInterstitialAdDelegate {
    
    // MARK: - Interstitial Ad Delegate Methods
    
    func interstitialAdDidPresent(_ interstitialAd: YPInterstitialAd) {
        print("✅ Interstitial ad presented")
        // Pause game, stop audio
        pauseGame()
    }
    
    func interstitialAdDidDismiss(_ interstitialAd: YPInterstitialAd) {
        print("🔙 Interstitial ad dismissed")
        // Resume game, restart audio
        resumeGame()
        
        // Load next ad
        loadInterstitialAd()
        
        // Continue to next level
        proceedToNextLevel()
    }
    
    func interstitialAd(_ interstitialAd: YPInterstitialAd, 
                       didFailToPresentWithError error: Error) {
        print("❌ Failed to present: \\(error.localizedDescription)")
        // Continue without ad
        proceedToNextLevel()
    }
    
    func interstitialAdDidRecordImpression(_ interstitialAd: YPInterstitialAd) {
        print("👁️ Interstitial impression recorded")
        // Track in analytics
    }
    
    func interstitialAdDidRecordClick(_ interstitialAd: YPInterstitialAd) {
        print("👆 Interstitial clicked")
        // Track user engagement
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#pragma mark - Interstitial Ad Delegate Methods

- (void)interstitialAdDidPresent:(YPInterstitialAd *)interstitialAd {
    NSLog(@"✅ Interstitial ad presented");
    // Pause game, stop audio
    [self pauseGame];
}

- (void)interstitialAdDidDismiss:(YPInterstitialAd *)interstitialAd {
    NSLog(@"🔙 Interstitial ad dismissed");
    // Resume game, restart audio
    [self resumeGame];
    
    // Load next ad
    [self loadInterstitialAd];
    
    // Continue to next level
    [self proceedToNextLevel];
}

- (void)interstitialAd:(YPInterstitialAd *)interstitialAd 
    didFailToPresentWithError:(NSError *)error {
    NSLog(@"❌ Failed to present: %@", error.localizedDescription);
    // Continue without ad
    [self proceedToNextLevel];
}

- (void)interstitialAdDidRecordImpression:(YPInterstitialAd *)interstitialAd {
    NSLog(@"👁️ Interstitial impression recorded");
    // Track in analytics
}

- (void)interstitialAdDidRecordClick:(YPInterstitialAd *)interstitialAd {
    NSLog(@"👆 Interstitial clicked");
    // Track user engagement
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `extension GameViewController: YPInterstitialAdDelegate {\n    func interstitialAdDidPresent(_ interstitialAd: YPInterstitialAd) {\n        pauseGame()\n    }\n    \n    func interstitialAdDidDismiss(_ interstitialAd: YPInterstitialAd) {\n        resumeGame()\n        loadInterstitialAd()\n        proceedToNextLevel()\n    }\n}`
                          : `- (void)interstitialAdDidPresent:(YPInterstitialAd *)interstitialAd {\n    [self pauseGame];\n}\n\n- (void)interstitialAdDidDismiss:(YPInterstitialAd *)interstitialAd {\n    [self resumeGame];\n    [self loadInterstitialAd];\n    [self proceedToNextLevel];\n}`,
                        'interstitial-delegate'
                      )}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'interstitial-delegate' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'interstitial-delegate' ? (
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

                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Implementation Points
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Always pause gameplay/audio in <code className="px-1 py-0.5 bg-purple-100 rounded">didPresent</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Load next ad immediately in <code className="px-1 py-0.5 bg-purple-100 rounded">didDismiss</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Handle failure gracefully - continue app flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Track impressions and clicks for analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewarded Ad Delegate */}
        {expandedSection === 'rewarded' && (
          <div className="space-y-6 mb-6 animate-fadeIn">
            <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎁</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Rewarded Ad Delegate</h2>
                    <p className="text-sm text-gray-600">YPRewardedAdDelegate protocol implementation</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Implement Reward Handling</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'swift' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`extension RewardViewController: YPRewardedAdDelegate {
    
    // MARK: - Rewarded Ad Delegate Methods
    
    func rewardedAdDidPresent(_ rewardedAd: YPRewardedAd) {
        print("✅ Rewarded ad presented")
        // Pause gameplay
    }
    
    func rewardedAd(_ rewardedAd: YPRewardedAd, didRewardUserWith reward: YPAdReward) {
        print("🎁 User earned reward!")
        print("Type: \\(reward.type), Amount: \\(reward.amount)")
        
        // Grant reward to user
        grantReward(amount: reward.amount, type: reward.type)
    }
    
    func rewardedAdDidDismiss(_ rewardedAd: YPRewardedAd) {
        print("🔙 Rewarded ad dismissed")
        // Resume gameplay
        
        // Load next ad
        loadRewardedAd()
    }
    
    func rewardedAd(_ rewardedAd: YPRewardedAd, 
                   didFailToPresentWithError error: Error) {
        print("❌ Failed to present: \\(error.localizedDescription)")
        showMessage("Video not available")
    }
    
    func rewardedAdDidRecordImpression(_ rewardedAd: YPRewardedAd) {
        print("👁️ Rewarded ad impression recorded")
    }
    
    // Helper method to grant rewards
    func grantReward(amount: Int, type: String) {
        userCoins += amount
        
        let message = "You earned \\(amount) coins!"
        showMessage(message)
        
        // Update UI
        updateCoinsLabel()
        
        // Save to persistent storage
        UserDefaults.standard.set(userCoins, forKey: "userCoins")
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`#pragma mark - Rewarded Ad Delegate Methods

- (void)rewardedAdDidPresent:(YPRewardedAd *)rewardedAd {
    NSLog(@"✅ Rewarded ad presented");
    // Pause gameplay
}

- (void)rewardedAd:(YPRewardedAd *)rewardedAd 
    didRewardUserWith:(YPAdReward *)reward {
    NSLog(@"🎁 User earned reward!");
    NSLog(@"Type: %@, Amount: %ld", reward.type, (long)reward.amount);
    
    // Grant reward to user
    [self grantRewardWithAmount:reward.amount type:reward.type];
}

- (void)rewardedAdDidDismiss:(YPRewardedAd *)rewardedAd {
    NSLog(@"🔙 Rewarded ad dismissed");
    // Resume gameplay
    
    // Load next ad
    [self loadRewardedAd];
}

- (void)rewardedAd:(YPRewardedAd *)rewardedAd 
    didFailToPresentWithError:(NSError *)error {
    NSLog(@"❌ Failed to present: %@", error.localizedDescription);
    [self showMessage:@"Video not available"];
}

- (void)rewardedAdDidRecordImpression:(YPRewardedAd *)rewardedAd {
    NSLog(@"👁️ Rewarded ad impression recorded");
}

#pragma mark - Helper Methods

- (void)grantRewardWithAmount:(NSInteger)amount type:(NSString *)type {
    self.userCoins += amount;
    
    NSString *message = [NSString stringWithFormat:@"You earned %ld coins!", (long)amount];
    [self showMessage:message];
    
    // Update UI
    [self updateCoinsLabel];
    
    // Save to persistent storage
    [[NSUserDefaults standardUserDefaults] setInteger:self.userCoins forKey:@"userCoins"];
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'swift'
                          ? `extension RewardViewController: YPRewardedAdDelegate {\n    func rewardedAd(_ rewardedAd: YPRewardedAd, didRewardUserWith reward: YPAdReward) {\n        grantReward(amount: reward.amount, type: reward.type)\n    }\n    \n    func rewardedAdDidDismiss(_ rewardedAd: YPRewardedAd) {\n        loadRewardedAd()\n    }\n}`
                          : `- (void)rewardedAd:(YPRewardedAd *)rewardedAd didRewardUserWith:(YPAdReward *)reward {\n    [self grantRewardWithAmount:reward.amount type:reward.type];\n}\n\n- (void)rewardedAdDidDismiss:(YPRewardedAd *)rewardedAd {\n    [self loadRewardedAd];\n}`,
                        'rewarded-delegate'
                      )}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'rewarded-delegate' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'rewarded-delegate' ? (
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

                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Reward Handling Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Grant rewards immediately</strong> in <code className="px-1 py-0.5 bg-green-100 rounded">didRewardUserWith</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Persist rewards</strong> to UserDefaults or database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Update UI immediately</strong> to show new balance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Show confirmation message</strong> to acknowledge reward</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Load next ad</strong> in <code className="px-1 py-0.5 bg-green-100 rounded">didDismiss</code> callback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Common Patterns */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-600" />
            Common Implementation Patterns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-xl">⏸️</span>
                Pause/Resume Logic
              </h4>
              <p className="text-sm text-gray-600">
                Always pause gameplay, audio, and animations when ads are presented. Resume in dismiss callbacks.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Ad Preloading
              </h4>
              <p className="text-sm text-gray-600">
                Load next ad immediately after dismissal to ensure ads are ready when needed.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Analytics Tracking
              </h4>
              <p className="text-sm text-gray-600">
                Track impressions, clicks, and rewards in your analytics platform for optimization.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-xl">❌</span>
                Error Handling
              </h4>
              <p className="text-sm text-gray-600">
                Always handle failures gracefully and continue app flow without blocking users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSDelegateMethods;
