import React, { useState } from 'react';
import { Search, Play, Book, AlertCircle, ChevronDown, CheckCircle, ExternalLink, Video, FileText, Zap } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book, count: 45 },
    { id: 'getting-started', name: 'Getting Started', icon: Zap, count: 12 },
    { id: 'integration', name: 'Integration', icon: FileText, count: 15 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: AlertCircle, count: 10 },
    { id: 'billing', name: 'Billing & Payments', icon: CheckCircle, count: 8 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first ad unit?',
      answer: 'To create your first ad unit: 1) Navigate to Ad Units page, 2) Click "Create Ad Unit" button, 3) Choose your platform (Web, iOS, Android, Flutter, React Native), 4) Select ad format (Banner, Interstitial, Rewarded, Native), 5) Configure size and settings, 6) Click "Create" and copy the integration code.',
      popular: true
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What platforms are supported?',
      answer: 'We support multiple platforms: Web (JavaScript SDK), iOS (Swift/Objective-C), Android (Java/Kotlin), Flutter, and React Native. Each platform has comprehensive documentation and code examples.',
      popular: true
    },
    {
      id: 3,
      category: 'integration',
      question: 'How long does it take for ads to start showing?',
      answer: 'After integration, ads typically start showing within 2-3 minutes. Make sure you\'ve: 1) Correctly implemented the SDK code, 2) Verified your domain/app bundle ID, 3) Set your ad unit to "Active" status. Check the console for any error messages.',
      popular: true
    },
    {
      id: 4,
      category: 'integration',
      question: 'Can I use multiple ad formats in the same app?',
      answer: 'Yes! You can implement multiple ad formats simultaneously. For example, use banner ads for continuous visibility, interstitial ads at natural transition points, and rewarded ads to offer users incentives. Each format requires its own ad unit ID.',
      popular: false
    },
    {
      id: 5,
      category: 'troubleshooting',
      question: 'Why aren\'t my ads showing?',
      answer: 'Common reasons: 1) Ad unit is paused (check status), 2) Domain not whitelisted, 3) Ad blockers enabled, 4) Incorrect SDK implementation, 5) Low fill rate in your region. Check browser console for error messages and verify your integration code.',
      popular: true
    },
    {
      id: 6,
      category: 'billing',
      question: 'When do I get paid?',
      answer: 'Payments are processed monthly, typically by the 15th of each month for the previous month\'s earnings. Minimum payout threshold is $100. You\'ll receive payment via your selected method (bank transfer, PayPal, wire transfer).',
      popular: true
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'Getting Started with YourPlatform Ads',
      duration: '5:30',
      views: '12.5K',
      category: 'getting-started',
      description: 'Complete walkthrough of creating your account and first ad unit'
    },
    {
      id: 2,
      title: 'Web Integration Guide',
      duration: '8:15',
      views: '8.2K',
      category: 'integration',
      description: 'Step-by-step guide to implementing ads on your website'
    },
    {
      id: 3,
      title: 'iOS SDK Integration',
      duration: '12:45',
      views: '6.8K',
      category: 'integration',
      description: 'Integrate ads into your iOS app with Swift'
    }
  ];

  const troubleshootingGuides = [
    {
      id: 1,
      title: 'Ads Not Showing',
      category: 'troubleshooting',
      steps: [
        'Check ad unit status is "Active" in dashboard',
        'Verify SDK script is properly loaded',
        'Ensure domain/bundle ID is registered',
        'Disable ad blockers and test again',
        'Check browser console for error messages'
      ],
      severity: 'high'
    },
    {
      id: 2,
      title: 'Low Fill Rate',
      category: 'troubleshooting',
      steps: [
        'Check targeting settings aren\'t too restrictive',
        'Verify content complies with ad policies',
        'Consider enabling multiple ad networks',
        'Review geographic targeting settings'
      ],
      severity: 'medium'
    },
    {
      id: 3,
      title: 'SDK Integration Errors',
      category: 'integration',
      steps: [
        'Ensure SDK version is up to date',
        'Check for conflicting JavaScript libraries',
        'Verify initialization code runs before ad loads',
        'Test with sample ad unit ID first'
      ],
      severity: 'high'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredVideos = videoTutorials.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGuides = troubleshootingGuides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Book className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers, watch tutorials, and troubleshoot integration issues
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
              placeholder="Search for help articles, tutorials, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Popular FAQs */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {filteredFaqs.map(faq => (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {faq.popular && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        POPULAR
                      </span>
                    )}
                    <span className="text-base font-medium text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Video Tutorials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative aspect-video bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 h-5 text-blue-600 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{video.views} views</span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Watch
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting Guides */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Troubleshooting Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGuides.map(guide => (
              <div
                key={guide.id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {guide.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    guide.severity === 'high'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {guide.severity === 'high' ? 'Critical' : 'Important'}
                  </span>
                </div>
                <ol className="space-y-2">
                  {guide.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 text-sm flex-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues you may have
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/support/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Contact Support
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/support/documentation"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;