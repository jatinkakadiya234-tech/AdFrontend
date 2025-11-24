import { useState, useEffect } from 'react';
import { 
  Code, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Download,
  Terminal,
  Settings,
  BarChart3,
  DollarSign,
  Users,
  Shield,
  Zap,
  Play,
  Copy,
  Check,
  Search,
  Filter,
  Star,
  Clock,
  TrendingUp,
  Eye,
  MousePointer,
  Sparkles,
  Rocket,
  Palette,
  Cpu,
  Smartphone as MobileIcon,
  Monitor,
  GamepadIcon
} from 'lucide-react';

const GettingStartedPage = () => {
  const [activeTab, setActiveTab] = useState('quickstart');
  const [activePlatform, setActivePlatform] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const integrationSteps = [
    {
      step: 1,
      title: "Create Account",
      description: "Sign up in 30 seconds and get instant access",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      duration: "30 sec"
    },
    {
      step: 2,
      title: "Get API Keys",
      description: "Copy your unique keys from the dashboard",
      icon: Key,
      color: "from-green-500 to-emerald-500",
      duration: "1 min"
    },
    {
      step: 3,
      title: "Install SDK",
      description: "Add our SDK with your package manager",
      icon: Download,
      color: "from-purple-500 to-pink-500",
      duration: "2 min"
    },
    {
      step: 4,
      title: "Integrate Code",
      description: "Copy-paste our ready-made snippets",
      icon: Code,
      color: "from-orange-500 to-red-500",
      duration: "5 min"
    },
    {
      step: 5,
      title: "Go Live & Earn",
      description: "Start monetizing immediately",
      icon: Rocket,
      color: "from-teal-500 to-blue-500",
      duration: "Instant"
    }
  ];

  const allPlatforms = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: Globe,
      category: 'web',
      description: 'Vanilla JS for websites and web apps',
      popularity: 98,
      difficulty: 'Beginner',
      installCommand: 'npm install @adplatform/web-sdk',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'react',
      name: 'React',
      icon: Palette,
      category: 'web',
      description: 'React components and hooks',
      popularity: 95,
      difficulty: 'Beginner',
      installCommand: 'npm install @adplatform/react-sdk',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'vue',
      name: 'Vue.js',
      icon: Sparkles,
      category: 'web',
      description: 'Vue plugins and components',
      popularity: 88,
      difficulty: 'Beginner',
      installCommand: 'npm install @adplatform/vue-sdk',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'angular',
      name: 'Angular',
      icon: Cpu,
      category: 'web',
      description: 'Angular modules and services',
      popularity: 85,
      difficulty: 'Intermediate',
      installCommand: 'npm install @adplatform/angular-sdk',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      icon: Smartphone,
      category: 'mobile',
      description: 'Cross-platform mobile apps',
      popularity: 92,
      difficulty: 'Beginner',
      installCommand: 'flutter pub add adplatform_sdk',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'react-native',
      name: 'React Native',
      icon: MobileIcon,
      category: 'mobile',
      description: 'Native mobile with React',
      popularity: 90,
      difficulty: 'Beginner',
      installCommand: 'npm install @adplatform/react-native-sdk',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'swift',
      name: 'Swift (iOS)',
      icon: Monitor,
      category: 'mobile',
      description: 'Native iOS applications',
      popularity: 89,
      difficulty: 'Intermediate',
      installCommand: '.package(url: "https://github.com/adplatform/ios-sdk", from: "1.0.0")',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'kotlin',
      name: 'Kotlin (Android)',
      icon: Smartphone,
      category: 'mobile',
      description: 'Native Android applications',
      popularity: 87,
      difficulty: 'Intermediate',
      installCommand: 'implementation "com.adplatform:android-sdk:1.0.0"',
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 'unity',
      name: 'Unity',
      icon: GamepadIcon,
      category: 'gaming',
      description: '3D and 2D game development',
      popularity: 94,
      difficulty: 'Beginner',
      installCommand: 'Install via Unity Package Manager',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'php',
      name: 'PHP',
      icon: Terminal,
      category: 'backend',
      description: 'Server-side integration',
      popularity: 82,
      difficulty: 'Beginner',
      installCommand: 'composer require adplatform/sdk',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'python',
      name: 'Python',
      icon: Code,
      category: 'backend',
      description: 'Backend and data applications',
      popularity: 91,
      difficulty: 'Beginner',
      installCommand: 'pip install adplatform-sdk',
      color: 'from-blue-500 to-green-500'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: Zap,
      category: 'backend',
      description: 'Server-side JavaScript',
      popularity: 93,
      difficulty: 'Beginner',
      installCommand: 'npm install @adplatform/node-sdk',
      color: 'from-green-600 to-green-400'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Platforms', count: allPlatforms.length },
    { id: 'web', name: 'Web', count: allPlatforms.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile', count: allPlatforms.filter(p => p.category === 'mobile').length },
    { id: 'gaming', name: 'Gaming', count: allPlatforms.filter(p => p.category === 'gaming').length },
    { id: 'backend', name: 'Backend', count: allPlatforms.filter(p => p.category === 'backend').length }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlatforms = allPlatforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         platform.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentPlatform = allPlatforms.find(p => p.id === activePlatform) || allPlatforms[0];

  const codeSnippets = {
    quickstart: `// 1. Install the SDK
${currentPlatform.installCommand}

// 2. Initialize in your app
import AdPlatform from '@adplatform/sdk';

const adPlatform = new AdPlatform({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// 3. Load your first ad
adPlatform.loadAdUnit('banner-ad', {
  format: 'banner',
  onLoad: () => console.log('Ad loaded successfully!'),
  onError: (error) => console.log('Ad failed:', error)
});`,

    web: `// Web Integration Example
import AdPlatform from '@adplatform/web-sdk';

// Initialize with your API key
const adPlatform = new AdPlatform({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Banner Ad Integration
adPlatform.showBanner({
  container: '#banner-ad',
  format: '728x90',
  onImpression: () => trackImpression(),
  onClick: () => trackClick()
});

// Interstitial Ad
adPlatform.showInterstitial({
  onClose: () => resumeGameplay(),
  onDisplay: () => pauseGameplay()
});`,

    mobile: `// ${currentPlatform.name} Mobile Example
import AdPlatform from '@adplatform/${currentPlatform.id}-sdk';

// Initialize SDK
AdPlatform.initialize('YOUR_API_KEY');

// Banner Ad
AdPlatform.showBanner({
  position: 'bottom',
  size: 'SMART_BANNER'
});

// Rewarded Video
AdPlatform.showRewardedVideo({
  onReward: (amount) => addCoins(amount),
  onClose: () => resumeGame()
});`,

    advanced: `// Advanced Configuration
const adPlatform = new AdPlatform({
  apiKey: 'YOUR_API_KEY',
  environment: 'production',
  logging: true,
  testMode: false,
  userConsent: true,
  privacySettings: {
    gdprCompliant: true,
    ccpaCompliant: true
  }
});

// Custom Ad Targeting
adPlatform.setTargeting({
  age: '25-34',
  interests: ['technology', 'gaming'],
  location: 'US'
});

// Event Tracking
adPlatform.on('adLoaded', (adUnit) => {
  analytics.track('ad_loaded', { adUnit });
});`
  };

  const copyToClipboard = async (code, key) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(key);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-100ms load times with our optimized SDK",
      metric: "<100ms",
      metricLabel: "Load Time"
    },
    {
      icon: DollarSign,
      title: "Maximize Revenue",
      description: "AI-powered ad optimization for highest CPMs",
      metric: "+40%",
      metricLabel: "Avg. Revenue"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "GDPR, CCPA compliant with fraud protection",
      metric: "99.99%",
      metricLabel: "Uptime"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Live dashboard with detailed performance insights",
      metric: "Real-time",
      metricLabel: "Analytics"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Developer, TechStart",
      content: "Integrated in under 15 minutes. Revenue increased by 60% in the first month!",
      platform: "React Native",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "CTO, GameStudio",
      content: "The Unity SDK is incredibly smooth. Our players love the non-intrusive ads.",
      platform: "Unity",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Frontend Lead, E-commerce",
      content: "Best documentation I've ever seen. Support team is incredibly responsive.",
      platform: "Vue.js",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
      {/* Floating Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AdPlatform
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 font-medium">Documentation</button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ developers</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Ship Ads
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              In Minutes
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The fastest way to integrate high-performing ads into your apps and websites. 
            <span className="font-semibold text-gray-900"> Start earning in 5 minutes.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3">
              <Rocket className="w-5 h-5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center space-x-3">
              <Play className="w-5 h-5" />
              <span>Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { value: '5min', label: 'Integration Time' },
              { value: '80%', label: 'Revenue Share' },
              { value: '12+', label: 'SDKs' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Integration Steps */}
      <div className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                5-Minute
              </span>
              {' '}Setup
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps and start monetizing immediately
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
            {/* Progress Line */}
            <div className="hidden lg:block absolute top-16 left-10 right-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -z-10"></div>
            
            {integrationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center relative overflow-hidden">
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="w-12 h-12 bg-white border-4 border-blue-500 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 shadow-lg">
                      {step.step}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{step.title}</h3>
                    <p className="text-gray-600 mb-4 relative z-10">{step.description}</p>
                    
                    <div className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium relative z-10">
                      <Clock className="w-3 h-3" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Platform Selection with Search & Filter */}
      <div className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Platform
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We support every major platform with optimized SDKs and comprehensive documentation
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search platforms (JavaScript, React, Flutter...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-sm opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = activePlatform === platform.id;
              
              return (
                <div
                  key={platform.id}
                  onClick={() => setActivePlatform(platform.id)}
                  className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                    isSelected
                      ? 'border-blue-500 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                  }`}
                >
                  {/* Popularity Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${platform.popularity}%` }}
                    ></div>
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{platform.popularity}%</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{platform.description}</p>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      platform.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {platform.difficulty}
                    </span>
                    
                    {isSelected && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Install Command Preview */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-xs text-gray-700 font-mono truncate block">
                      {platform.installCommand}
                    </code>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlatforms.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No platforms found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Code Playground */}
      <div className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Start Coding in{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {currentPlatform.name}
              </span>
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Copy-paste these ready-to-use code snippets into your project
            </p>
          </div>

          <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Platform Header */}
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${currentPlatform.color} rounded-lg flex items-center justify-center`}>
                    <currentPlatform.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{currentPlatform.name}</h3>
                    <p className="text-gray-400 text-sm">{currentPlatform.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{currentPlatform.popularity}% popularity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 bg-gray-850">
              <div className="flex overflow-x-auto">
                {Object.keys(codeSnippets).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-cyan-400 text-cyan-400 bg-gray-800'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    {tab === 'quickstart' && '🚀 Quick Start'}
                    {tab === 'web' && '🌐 Web Integration'}
                    {tab === 'mobile' && '📱 Mobile SDK'}
                    {tab === 'advanced' && '⚡ Advanced'}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="p-6">
              <div className="bg-gray-900 rounded-xl p-6 relative">
                <button
                  onClick={() => copyToClipboard(codeSnippets[activeTab], activeTab)}
                  className="absolute top-4 right-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 flex items-center space-x-2 text-sm font-medium shadow-lg"
                >
                  {copiedCode === activeTab ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedCode === activeTab ? 'Copied!' : 'Copy Code'}</span>
                </button>
                
                <div className="pr-20">
                  <pre className="text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors duration-200 font-medium">
                  <Terminal className="w-4 h-4" />
                  <span>View Full Documentation</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200 font-medium">
                  <Download className="w-4 h-4" />
                  <span>Download SDK</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium">
                  <Rocket className="w-4 h-4" />
                  <span>Get API Keys</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features */}
      <div className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developer Success
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{feature.metric}</div>
                  <div className="text-gray-600 text-sm mb-4">{feature.metricLabel}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Using {testimonial.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 lg:py-28 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Monetizing Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50,000+ developers who trust our platform. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center space-x-3">
              <Rocket className="w-5 h-5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-3">
              <Terminal className="w-5 h-5" />
              <span>Read Documentation</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Developers' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '5min', label: 'Avg. Setup' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

// Add missing icon component
const Key = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export default GettingStartedPage;