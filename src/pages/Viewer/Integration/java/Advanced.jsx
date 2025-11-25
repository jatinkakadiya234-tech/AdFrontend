import React, { useState } from 'react';
import { Copy, Check, Maximize2, Gift, Layout, Code, Play, Settings, Sliders, AlertCircle, Info, CheckCircle, ChevronDown, ChevronRight, Smartphone, Monitor, Palette, Zap } from 'lucide-react';

const Advanced = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
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
      useCases: ['Continuous visibility', 'Non-intrusive monetization', 'Content integration'],
      sizes: ['320x50 (Mobile)', '728x90 (Leaderboard)', '300x250 (Rectangle)', 'Responsive']
    },
    {
      id: 'interstitial',
      name: 'Interstitial Ads',
      icon: Maximize2,
      color: 'purple',
      description: 'Full-screen ads shown at natural transition points',
      useCases: ['Level completion', 'App pause/resume', 'Content transitions'],
      sizes: ['Full Screen']
    },
    {
      id: 'rewarded',
      name: 'Rewarded Ads',
      icon: Gift,
      color: 'green',
      description: 'Users watch video ads to earn in-app rewards',
      useCases: ['Extra lives', 'Bonus coins', 'Premium features', 'Unlock content'],
      sizes: ['Full Screen Video']
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
              <h1 className="text-3xl font-bold text-gray-900">Advanced Implementation</h1>
              <p className="text-gray-600 mt-1">Complete guide for Banner, Interstitial, and Rewarded ads</p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">Programming Language</label>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'java', label: 'Java', icon: '☕' },
              { value: 'kotlin', label: 'Kotlin', icon: '🎯' }
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
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === adType.id ? 'rotate-90' : ''}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{adType.name}</h3>
                <p className="text-white/90 text-sm mb-3">{adType.description}</p>
                <div className="flex items-center gap-2 text-xs bg-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                  <span className="font-semibold">Sizes:</span>
                  <span>{adType.sizes.join(', ')}</span>
                </div>
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
                    <p className="text-sm text-gray-600">Display banner ads in your Activity or Fragment</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: XML Layout */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Banner View to Layout</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Add this to your XML layout file (e.g., activity_main.xml)</p>
                  
                  <div className="relative ml-9">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                      <code>{`<!-- activity_main.xml -->
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!-- Your content here -->
    
    <!-- Banner Ad Container -->
    <com.yourplatform.ads.BannerAdView
        android:id="@+id/bannerAd"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center" />
        
</LinearLayout>`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`<com.yourplatform.ads.BannerAdView\n    android:id="@+id/bannerAd"\n    android:layout_width="match_parent"\n    android:layout_height="wrap_content"\n    android:layout_gravity="center" />`, 'banner-xml')}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-xml' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-xml' ? (
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

                {/* Step 2: Load Banner in Activity */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Load Banner in Activity/Fragment</h3>
                  </div>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'java' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`public class MainActivity extends AppCompatActivity {
    private BannerAdView bannerAd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize banner ad
        bannerAd = findViewById(R.id.bannerAd);
        
        // Configure banner
        bannerAd.setAdUnitId("ca-pub-123-001");
        bannerAd.setAdSize(AdSize.BANNER); // 320x50
        
        // Set ad listener (optional)
        bannerAd.setAdListener(new AdListener() {
            @Override
            public void onAdLoaded() {
                Log.d("BannerAd", "Ad loaded successfully");
            }

            @Override
            public void onAdFailedToLoad(AdError error) {
                Log.e("BannerAd", "Failed to load: " + error.getMessage());
            }

            @Override
            public void onAdClicked() {
                Log.d("BannerAd", "Ad clicked");
            }
        });

        // Load the ad
        bannerAd.loadAd();
    }

    @Override
    protected void onDestroy() {
        if (bannerAd != null) {
            bannerAd.destroy();
        }
        super.onDestroy();
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`class MainActivity : AppCompatActivity() {
    private lateinit var bannerAd: BannerAdView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize banner ad
        bannerAd = findViewById(R.id.bannerAd)
        
        // Configure banner
        bannerAd.apply {
            adUnitId = "ca-pub-123-001"
            adSize = AdSize.BANNER // 320x50
            
            // Set ad listener (optional)
            adListener = object : AdListener() {
                override fun onAdLoaded() {
                    Log.d("BannerAd", "Ad loaded successfully")
                }

                override fun onAdFailedToLoad(error: AdError) {
                    Log.e("BannerAd", "Failed to load: \${error.message}")
                }

                override fun onAdClicked() {
                    Log.d("BannerAd", "Ad clicked")
                }
            }
            
            // Load the ad
            loadAd()
        }
    }

    override fun onDestroy() {
        bannerAd.destroy()
        super.onDestroy()
    }
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'java'
                          ? `bannerAd = findViewById(R.id.bannerAd);\nbannerAd.setAdUnitId("ca-pub-123-001");\nbannerAd.setAdSize(AdSize.BANNER);\nbannerAd.loadAd();`
                          : `bannerAd = findViewById(R.id.bannerAd)\nbannerAd.adUnitId = "ca-pub-123-001"\nbannerAd.adSize = AdSize.BANNER\nbannerAd.loadAd()`,
                        'banner-activity'
                      )}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedSection === 'banner-activity' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copiedSection === 'banner-activity' ? (
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

                {/* Banner Sizes */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Available Banner Sizes</h3>
                  </div>
                  
                  <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { size: 'AdSize.BANNER', dimension: '320x50', desc: 'Standard mobile banner' },
                      { size: 'AdSize.LARGE_BANNER', dimension: '320x100', desc: 'Large mobile banner' },
                      { size: 'AdSize.MEDIUM_RECTANGLE', dimension: '300x250', desc: 'Medium rectangle' },
                      { size: 'AdSize.LEADERBOARD', dimension: '728x90', desc: 'Tablet leaderboard' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <code className="text-sm font-semibold text-blue-900">{item.size}</code>
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
                      <span>Place banners at top or bottom of the screen for better visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Don't place banners too close to clickable UI elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Always call destroy() in onDestroy() to prevent memory leaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Use appropriate ad sizes based on device screen</span>
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
                    {selectedLanguage === 'java' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`public class MainActivity extends AppCompatActivity {
    private InterstitialAd interstitialAd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Load interstitial ad
        loadInterstitialAd();
    }

    private void loadInterstitialAd() {
        InterstitialAd.load(
            this,
            "ca-pub-123-002", // Your ad unit ID
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd ad) {
                    interstitialAd = ad;
                    Log.d("InterstitialAd", "Ad loaded successfully");
                    
                    // Set full screen content callback
                    interstitialAd.setFullScreenContentCallback(
                        new FullScreenContentCallback() {
                            @Override
                            public void onAdShowedFullScreenContent() {
                                Log.d("InterstitialAd", "Ad showed");
                            }

                            @Override
                            public void onAdDismissedFullScreenContent() {
                                Log.d("InterstitialAd", "Ad dismissed");
                                interstitialAd = null;
                                // Load next ad
                                loadInterstitialAd();
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError error) {
                                Log.e("InterstitialAd", "Failed to show: " + error.getMessage());
                                interstitialAd = null;
                            }
                        }
                    );
                }

                @Override
                public void onAdFailedToLoad(@NonNull AdError error) {
                    Log.e("InterstitialAd", "Failed to load: " + error.getMessage());
                    interstitialAd = null;
                }
            }
        );
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`class MainActivity : AppCompatActivity() {
    private var interstitialAd: InterstitialAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Load interstitial ad
        loadInterstitialAd()
    }

    private fun loadInterstitialAd() {
        InterstitialAd.load(
            this,
            "ca-pub-123-002", // Your ad unit ID
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                    Log.d("InterstitialAd", "Ad loaded successfully")
                    
                    // Set full screen content callback
                    ad.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdShowedFullScreenContent() {
                            Log.d("InterstitialAd", "Ad showed")
                        }

                        override fun onAdDismissedFullScreenContent() {
                            Log.d("InterstitialAd", "Ad dismissed")
                            interstitialAd = null
                            // Load next ad
                            loadInterstitialAd()
                        }

                        override fun onAdFailedToShowFullScreenContent(error: AdError) {
                            Log.e("InterstitialAd", "Failed to show: \${error.message}")
                            interstitialAd = null
                        }
                    }
                }

                override fun onAdFailedToLoad(error: AdError) {
                    Log.e("InterstitialAd", "Failed to load: \${error.message}")
                    interstitialAd = null
                }
            }
        )
    }
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'java'
                          ? `InterstitialAd.load(this, "ca-pub-123-002", new InterstitialAdLoadCallback() {\n    @Override\n    public void onAdLoaded(@NonNull InterstitialAd ad) {\n        interstitialAd = ad;\n    }\n});`
                          : `InterstitialAd.load(this, "ca-pub-123-002", object : InterstitialAdLoadCallback() {\n    override fun onAdLoaded(ad: InterstitialAd) {\n        interstitialAd = ad\n    }\n})`,
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
                  <p className="text-sm text-gray-600 mb-3 ml-9">Show the ad at appropriate moments (e.g., level completion, pause)</p>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'java' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Show interstitial when appropriate
private void showInterstitial() {
    if (interstitialAd != null) {
        interstitialAd.show(this);
    } else {
        Log.d("InterstitialAd", "Ad not ready yet");
        // Proceed with your flow
        proceedToNextScreen();
    }
}

// Example: Show on button click
findViewById(R.id.nextLevelButton).setOnClickListener(v -> {
    showInterstitial();
});`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Show interstitial when appropriate
private fun showInterstitial() {
    interstitialAd?.show(this) ?: run {
        Log.d("InterstitialAd", "Ad not ready yet")
        // Proceed with your flow
        proceedToNextScreen()
    }
}

// Example: Show on button click
findViewById<Button>(R.id.nextLevelButton).setOnClickListener {
    showInterstitial()
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'java'
                          ? `if (interstitialAd != null) {\n    interstitialAd.show(this);\n} else {\n    Log.d("InterstitialAd", "Ad not ready yet");\n}`
                          : `interstitialAd?.show(this) ?: run {\n    Log.d("InterstitialAd", "Ad not ready yet")\n}`,
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
                      <span>Show at natural transition points (level complete, app pause)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Pre-load ads before showing them to avoid delays</span>
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
                    {selectedLanguage === 'java' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`public class MainActivity extends AppCompatActivity {
    private RewardedAd rewardedAd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Load rewarded ad
        loadRewardedAd();
    }

    private void loadRewardedAd() {
        RewardedAd.load(
            this,
            "ca-pub-123-003", // Your ad unit ID
            new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull RewardedAd ad) {
                    rewardedAd = ad;
                    Log.d("RewardedAd", "Ad loaded successfully");
                    
                    // Set full screen content callback
                    rewardedAd.setFullScreenContentCallback(
                        new FullScreenContentCallback() {
                            @Override
                            public void onAdShowedFullScreenContent() {
                                Log.d("RewardedAd", "Ad showed");
                            }

                            @Override
                            public void onAdDismissedFullScreenContent() {
                                Log.d("RewardedAd", "Ad dismissed");
                                rewardedAd = null;
                                // Load next ad
                                loadRewardedAd();
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError error) {
                                Log.e("RewardedAd", "Failed to show: " + error.getMessage());
                                rewardedAd = null;
                            }
                        }
                    );
                }

                @Override
                public void onAdFailedToLoad(@NonNull AdError error) {
                    Log.e("RewardedAd", "Failed to load: " + error.getMessage());
                    rewardedAd = null;
                }
            }
        );
    }
}`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`class MainActivity : AppCompatActivity() {
    private var rewardedAd: RewardedAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Load rewarded ad
        loadRewardedAd()
    }

    private fun loadRewardedAd() {
        RewardedAd.load(
            this,
            "ca-pub-123-003", // Your ad unit ID
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) {
                    rewardedAd = ad
                    Log.d("RewardedAd", "Ad loaded successfully")
                    
                    // Set full screen content callback
                    ad.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdShowedFullScreenContent() {
                            Log.d("RewardedAd", "Ad showed")
                        }

                        override fun onAdDismissedFullScreenContent() {
                            Log.d("RewardedAd", "Ad dismissed")
                            rewardedAd = null
                            // Load next ad
                            loadRewardedAd()
                        }

                        override fun onAdFailedToShowFullScreenContent(error: AdError) {
                            Log.e("RewardedAd", "Failed to show: \${error.message}")
                            rewardedAd = null
                        }
                    }
                }

                override fun onAdFailedToLoad(error: AdError) {
                    Log.e("RewardedAd", "Failed to load: \${error.message}")
                    rewardedAd = null
                }
            }
        )
    }
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'java'
                          ? `RewardedAd.load(this, "ca-pub-123-003", new RewardedAdLoadCallback() {\n    @Override\n    public void onAdLoaded(@NonNull RewardedAd ad) {\n        rewardedAd = ad;\n    }\n});`
                          : `RewardedAd.load(this, "ca-pub-123-003", object : RewardedAdLoadCallback() {\n    override fun onAdLoaded(ad: RewardedAd) {\n        rewardedAd = ad\n    }\n})`,
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

                {/* Step 2: Show Rewarded Ad with Reward */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Show Ad and Handle Reward</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-9">Show the ad and grant reward when user completes watching</p>
                  
                  <div className="relative ml-9">
                    {selectedLanguage === 'java' ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Show rewarded ad
private void showRewardedAd() {
    if (rewardedAd != null) {
        rewardedAd.show(this, new OnUserEarnedRewardListener() {
            @Override
            public void onUserEarnedReward(@NonNull RewardItem reward) {
                // User earned reward!
                int amount = reward.getAmount();
                String type = reward.getType();
                
                Log.d("RewardedAd", "User earned: " + amount + " " + type);
                
                // Grant reward to user
                grantReward(amount, type);
            }
        });
    } else {
        Log.d("RewardedAd", "Ad not ready yet");
        Toast.makeText(this, "Video not available yet", Toast.LENGTH_SHORT).show();
    }
}

// Grant reward to user
private void grantReward(int amount, String type) {
    // Update user's coins/lives/etc
    // Example: userCoins += amount;
    Toast.makeText(this, "You earned " + amount + " coins!", Toast.LENGTH_LONG).show();
    updateUI();
}

// Example: Show on button click
findViewById(R.id.watchAdButton).setOnClickListener(v -> {
    showRewardedAd();
});`}</code>
                      </pre>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`// Show rewarded ad
private fun showRewardedAd() {
    rewardedAd?.show(this) { reward ->
        // User earned reward!
        val amount = reward.amount
        val type = reward.type
        
        Log.d("RewardedAd", "User earned: $amount $type")
        
        // Grant reward to user
        grantReward(amount, type)
    } ?: run {
        Log.d("RewardedAd", "Ad not ready yet")
        Toast.makeText(this, "Video not available yet", Toast.LENGTH_SHORT).show()
    }
}

// Grant reward to user
private fun grantReward(amount: Int, type: String) {
    // Update user's coins/lives/etc
    // Example: userCoins += amount
    Toast.makeText(this, "You earned $amount coins!", Toast.LENGTH_LONG).show()
    updateUI()
}

// Example: Show on button click
findViewById<Button>(R.id.watchAdButton).setOnClickListener {
    showRewardedAd()
}`}</code>
                      </pre>
                    )}
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'java'
                          ? `rewardedAd.show(this, new OnUserEarnedRewardListener() {\n    @Override\n    public void onUserEarnedReward(@NonNull RewardItem reward) {\n        grantReward(reward.getAmount(), reward.getType());\n    }\n});`
                          : `rewardedAd?.show(this) { reward ->\n    grantReward(reward.amount, reward.type)\n}`,
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

                {/* Reward Configuration */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Configure Rewards in Dashboard</h3>
                  </div>
                  
                  <div className="ml-9 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 mb-3">
                      Set up your reward configuration in the dashboard:
                    </p>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Reward Type:</strong> coins, lives, gems, etc.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Reward Amount:</strong> Quantity to grant per ad</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Daily Limit:</strong> Max rewards per user per day</span>
                      </li>
                    </ul>
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
                      <span><strong>Clear value proposition:</strong> Tell users what they'll earn before showing ad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Always user-initiated:</strong> Don't force rewarded ads on users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Grant rewards immediately:</strong> Reward users as soon as ad completes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Handle dismissals gracefully:</strong> User should be able to exit without penalty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Pre-load ads:</strong> Have ads ready when users want to watch them</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Customization Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Advanced Customization</h2>
                <p className="text-sm text-gray-600">Additional configuration options</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ad Request Options */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sliders className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Ad Request Options</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-white rounded border border-blue-200">
                    <code className="text-blue-900 text-xs">setRequestAgent(String)</code>
                    <p className="text-gray-600 text-xs mt-1">Custom request agent identifier</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-200">
                    <code className="text-blue-900 text-xs">setMaxAdContentRating(String)</code>
                    <p className="text-gray-600 text-xs mt-1">Content rating filter</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-200">
                    <code className="text-blue-900 text-xs">setTestDeviceIds(List)</code>
                    <p className="text-gray-600 text-xs mt-1">Add test device IDs</p>
                  </div>
                </div>
              </div>

              {/* Ad Event Tracking */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Event Tracking</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-white rounded border border-purple-200">
                    <code className="text-purple-900 text-xs">onAdLoaded()</code>
                    <p className="text-gray-600 text-xs mt-1">Ad successfully loaded</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-purple-200">
                    <code className="text-purple-900 text-xs">onAdImpression()</code>
                    <p className="text-gray-600 text-xs mt-1">Ad impression recorded</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-purple-200">
                    <code className="text-purple-900 text-xs">onAdClicked()</code>
                    <p className="text-gray-600 text-xs mt-1">User clicked on ad</p>
                  </div>
                </div>
              </div>

              {/* Performance Optimization */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Performance Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">▸</span>
                    <span>Pre-load ads during idle time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">▸</span>
                    <span>Cache multiple ads for better fill rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">▸</span>
                    <span>Implement retry logic with exponential backoff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">▸</span>
                    <span>Monitor memory usage and release resources</span>
                  </li>
                </ul>
              </div>

              {/* Mediation Setup */}
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-900">Mediation</h3>
                </div>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">▸</span>
                    <span>Configure waterfall in dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">▸</span>
                    <span>Add network adapters as dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">▸</span>
                    <span>Set eCPM floors for each network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5">▸</span>
                    <span>Monitor performance by network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Guide */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 mb-3">Testing Your Implementation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">🧪</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Test Mode</h4>
                  <p className="text-sm text-gray-600">Enable test mode to see sample ads during development</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded mt-2 block">YourPlatformAds.setTestMode(true)</code>
                </div>
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Test Devices</h4>
                  <p className="text-sm text-gray-600">Add device IDs to receive test ads on specific devices</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded mt-2 block">setTestDeviceIds(Arrays.asList("..."))</code>
                </div>
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-2xl mb-2">✅</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Verify</h4>
                  <p className="text-sm text-gray-600">Check Logcat for ad lifecycle events and errors</p>
                  <code className="text-xs bg-indigo-50 px-2 py-1 rounded mt-2 block">adb logcat | grep YourPlatform</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advanced;
