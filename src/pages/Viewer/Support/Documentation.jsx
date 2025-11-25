import React, { useState } from 'react';
import { Book, Code, CheckCircle, Search, ChevronRight, Copy, Check, Clock, Headphones, FileText } from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState(null);

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: Book,
      description: 'Quick start guides for all platforms'
    },
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: Code,
      description: 'Complete API documentation'
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: CheckCircle,
      description: 'Optimization tips and guidelines'
    }
  ];

  const gettingStartedGuides = [
    {
      id: 'web-quickstart',
      title: 'Web Integration Quick Start',
      platform: 'Website',
      icon: '🌐',
      time: '5 minutes',
      difficulty: 'Beginner',
      steps: [
        {
          title: 'Add SDK Script',
          description: 'Include our JavaScript SDK in your HTML',
          code: `<script src="https://cdn.yourplatform.com/ads.js"></script>`
        },
        {
          title: 'Create Ad Container',
          description: 'Place a div where you want the ad to appear',
          code: `<div data-ad-unit-id="YOUR_AD_UNIT_ID" 
     data-ad-format="banner"
     data-ad-size="728x90">
</div>`
        },
        {
          title: 'Initialize SDK',
          description: 'Initialize with your publisher ID',
          code: `YourPlatformAds.init({
  publisherId: 'YOUR_PUBLISHER_ID'
});`
        }
      ]
    },
    {
      id: 'ios-quickstart',
      title: 'iOS Integration Quick Start',
      platform: 'iOS App',
      icon: '📱',
      time: '10 minutes',
      difficulty: 'Intermediate',
      steps: [
        {
          title: 'Install via CocoaPods',
          description: 'Add to your Podfile',
          code: `pod 'YourPlatformAds', '~> 4.2'`
        },
        {
          title: 'Initialize in AppDelegate',
          description: 'Set up the SDK on app launch',
          code: `YourPlatformAds.initialize(withAppId: "YOUR_APP_ID")`
        },
        {
          title: 'Load Banner Ad',
          description: 'Add a banner ad to your view controller',
          code: `let banner = YPBannerAdView(
  adUnitId: "YOUR_AD_UNIT_ID",
  adSize: .banner
)
banner.load()`
        }
      ]
    }
  ];

  const apiReference = [
    {
      category: 'Web SDK',
      methods: [
        {
          name: 'YourPlatformAds.init()',
          description: 'Initialize the SDK with your configuration',
          params: [
            { name: 'publisherId', type: 'string', required: true, description: 'Your publisher ID' },
            { name: 'testMode', type: 'boolean', required: false, description: 'Enable test ads' }
          ],
          returns: 'void',
          example: `YourPlatformAds.init({
  publisherId: 'pub-123456789',
  testMode: false
});`
        }
      ]
    }
  ];

  const bestPractices = [
    {
      category: 'Ad Placement',
      practices: [
        {
          title: 'Above the Fold Placement',
          description: 'Place banner ads in visible areas without forcing scrolling',
          dos: [
            'Position banners at the top or bottom of content',
            'Ensure ads are visible on initial page load',
            'Use appropriate sizes for different screen sizes'
          ],
          donts: [
            'Don\'t hide ads behind modals or overlays',
            'Don\'t place too many ads above the fold',
            'Don\'t use deceptive placement tricks'
          ]
        }
      ]
    }
  ];

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredGuides = gettingStartedGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Book className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Documentation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete guides, API reference, and best practices for integrating ads
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all min-w-[200px] ${
                  selectedCategory === cat.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Getting Started */}
          {selectedCategory === 'getting-started' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGuides.map(guide => (
                  <div
                    key={guide.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{guide.icon}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {guide.time}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          guide.difficulty === 'Beginner'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {guide.title}
                    </h3>

                    <div className="space-y-4">
                      {guide.steps.map((step, index) => (
                        <div key={index} className="border-l-2 border-blue-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <h4 className="font-medium text-gray-900">{step.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                              <code>{step.code}</code>
                            </pre>
                            <button
                              onClick={() => copyCode(step.code, `${guide.id}-${index}`)}
                              className={`absolute top-2 right-2 p-1.5 rounded transition-colors ${
                                copiedCode === `${guide.id}-${index}`
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                              }`}
                            >
                              {copiedCode === `${guide.id}-${index}` ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform Links */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Guides</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Web SDK', url: '/docs/web', icon: '🌐' },
                    { name: 'iOS SDK', url: '/docs/ios', icon: '📱' },
                    { name: 'Android SDK', url: '/docs/android', icon: '🤖' },
                    { name: 'Flutter SDK', url: '/docs/flutter', icon: '🦋' },
                    { name: 'React Native', url: '/docs/react-native', icon: '⚛️' },
                    { name: 'Unity Plugin', url: '/docs/unity', icon: '🎮' }
                  ].map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-xl">{platform.icon}</span>
                      <span className="font-medium text-gray-700">{platform.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* API Reference */}
          {selectedCategory === 'api-reference' && (
            <div className="space-y-6">
              {apiReference.map((api, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{api.category}</h2>
                  </div>

                  <div className="p-6 space-y-6">
                    {api.methods.map((method, mIndex) => (
                      <div key={mIndex} className="border-l-2 border-blue-500 pl-5">
                        <div className="mb-4">
                          <code className="text-lg font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            {method.name}
                          </code>
                          <p className="text-gray-600 mt-2">{method.description}</p>
                        </div>

                        {method.params && method.params.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Parameters</h4>
                            <div className="space-y-2">
                              {method.params.map((param, pIndex) => (
                                <div key={pIndex} className="flex gap-3 p-2 bg-gray-50 rounded">
                                  <code className="px-2 py-1 bg-white border border-gray-200 text-blue-700 rounded text-sm font-medium">
                                    {param.name}
                                  </code>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm text-gray-700">{param.type}</span>
                                      {param.required && (
                                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                          Required
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">{param.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Returns</h4>
                          <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {method.returns}
                          </code>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Example</h4>
                          <div className="relative">
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                              <code>{method.example}</code>
                            </pre>
                            <button
                              onClick={() => copyCode(method.example, `api-${index}-${mIndex}`)}
                              className={`absolute top-2 right-2 p-1.5 rounded transition-colors ${
                                copiedCode === `api-${index}-${mIndex}`
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                              }`}
                            >
                              {copiedCode === `api-${index}-${mIndex}` ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Best Practices */}
          {selectedCategory === 'best-practices' && (
            <div className="space-y-6">
              {bestPractices.map((section, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
                  </div>

                  <div className="p-6 space-y-6">
                    {section.practices.map((practice, pIndex) => (
                      <div key={pIndex} className="border-l-2 border-green-500 pl-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{practice.title}</h3>
                        <p className="text-gray-600 mb-4">{practice.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 border border-green-200 rounded">
                            <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Do's
                            </h4>
                            <ul className="space-y-2">
                              {practice.dos.map((item, iIndex) => (
                                <li key={iIndex} className="flex items-start gap-2 text-sm text-green-700">
                                  <span className="text-green-600 mt-0.5">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-red-50 border border-red-200 rounded">
                            <h4 className="font-medium text-red-800 mb-3 flex items-center gap-2">
                              <span className="text-red-600">✗</span>
                              Don'ts
                            </h4>
                            <ul className="space-y-2">
                              {practice.donts.map((item, iIndex) => (
                                <li key={iIndex} className="flex items-start gap-2 text-sm text-red-700">
                                  <span className="text-red-600 mt-0.5">✗</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Need More Help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/support/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Headphones className="w-4 h-4" />
              Contact Support
            </a>
            <a
              href="/support/help-center"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;