// PropertyManagement.jsx
import { useState, useEffect } from 'react';
import {
  Globe,
  Smartphone,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Copy,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  ExternalLink,
  Code,
  FileText,
  Shield,
  Eye,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Upload,
  X
} from 'lucide-react';

const PropertyManagement = () => {
  const [activeTab, setActiveTab] = useState('websites');
  const [properties, setProperties] = useState({
    websites: [],
    apps: []
  });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    setTimeout(() => {
      setProperties({
        websites: [
          {
            id: 1,
            name: 'My Portfolio Site',
            url: 'https://myportfolio.com',
            status: 'verified',
            verificationMethod: 'html-file',
            dateAdded: '2024-10-15',
            lastVerified: '2024-11-20',
            adUnits: 4,
            impressions: 125640,
            revenue: 1856.23
          },
          {
            id: 2,
            name: 'Tech Blog',
            url: 'https://techblog.io',
            status: 'pending',
            verificationMethod: 'meta-tag',
            dateAdded: '2024-11-18',
            lastVerified: null,
            adUnits: 0,
            impressions: 0,
            revenue: 0
          },
          {
            id: 3,
            name: 'E-commerce Store',
            url: 'https://mystore.com',
            status: 'verified',
            verificationMethod: 'dns',
            dateAdded: '2024-09-22',
            lastVerified: '2024-11-19',
            adUnits: 6,
            impressions: 298450,
            revenue: 4234.56
          },
          {
            id: 4,
            name: 'News Portal',
            url: 'https://newsportal.net',
            status: 'failed',
            verificationMethod: 'html-file',
            dateAdded: '2024-11-10',
            lastVerified: '2024-11-15',
            adUnits: 0,
            impressions: 0,
            revenue: 0
          }
        ],
        apps: [
          {
            id: 1,
            name: 'Fitness Tracker Pro',
            platform: 'Android',
            packageName: 'com.mycompany.fitnesspro',
            status: 'verified',
            verificationMethod: 'google-play',
            dateAdded: '2024-08-10',
            lastVerified: '2024-11-18',
            adUnits: 3,
            impressions: 456789,
            revenue: 6789.12
          },
          {
            id: 2,
            name: 'Recipe Manager',
            platform: 'iOS',
            packageName: 'com.mycompany.recipes',
            status: 'verified',
            verificationMethod: 'app-store',
            dateAdded: '2024-07-05',
            lastVerified: '2024-11-17',
            adUnits: 2,
            impressions: 234567,
            revenue: 3456.78
          },
          {
            id: 3,
            name: 'Study Buddy',
            platform: 'Android',
            packageName: 'com.mycompany.studybuddy',
            status: 'pending',
            verificationMethod: 'google-play',
            dateAdded: '2024-11-19',
            lastVerified: null,
            adUnits: 0,
            impressions: 0,
            revenue: 0
          }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      verified: {
        icon: CheckCircle,
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        label: 'Verified'
      },
      pending: {
        icon: Clock,
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        label: 'Pending'
      },
      failed: {
        icon: XCircle,
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200',
        label: 'Failed'
      }
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const filteredProperties = properties[activeTab].filter(prop => {
    const matchesSearch = activeTab === 'websites'
      ? prop.url.toLowerCase().includes(searchQuery.toLowerCase()) || prop.name.toLowerCase().includes(searchQuery.toLowerCase())
      : prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || prop.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || prop.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const AddPropertyModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      platform: 'Android',
      packageName: ''
    });

    const handleSubmit = () => {
      console.log('Adding property:', formData);
      setShowAddModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h3 className="text-xl font-bold text-gray-900">
              Add New {activeTab === 'websites' ? 'Website' : 'Mobile App'}
            </h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === 'websites' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Awesome Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Include the full URL with https://
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">
                        Verification Required
                      </h4>
                      <p className="text-xs text-blue-700">
                        After adding your website, you'll need to verify ownership using one of our verification methods (HTML file, Meta tag, or DNS record).
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    App Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Amazing App"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Platform *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Android', 'iOS'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => setFormData({ ...formData, platform })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.platform === platform
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Smartphone className={`w-8 h-8 ${
                            formData.platform === platform ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <span className={`font-semibold ${
                            formData.platform === platform ? 'text-blue-900' : 'text-gray-700'
                          }`}>
                            {platform}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Package Name / Bundle ID *
                  </label>
                  <input
                    type="text"
                    value={formData.packageName}
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                    placeholder={formData.platform === 'Android' ? 'com.example.app' : 'com.example.AppName'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {formData.platform === 'Android' 
                      ? 'Android package name (e.g., com.company.appname)'
                      : 'iOS bundle identifier (e.g., com.company.AppName)'}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900 text-sm mb-1">
                        Store Verification
                      </h4>
                      <p className="text-xs text-purple-700">
                        We'll verify your app through {formData.platform === 'Android' ? 'Google Play Console' : 'App Store Connect'}. Make sure your app is published.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.name || (activeTab === 'websites' ? !formData.url : !formData.packageName)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add {activeTab === 'websites' ? 'Website' : 'App'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const VerificationModal = () => {
    const [verificationMethod, setVerificationMethod] = useState('html-file');
    const [verificationCode] = useState('ads-verify-' + Math.random().toString(36).substr(2, 16));

    const verificationMethods = {
      'html-file': {
        title: 'HTML File Upload',
        description: 'Download and upload an HTML file to your website root directory',
        icon: FileText,
        steps: [
          'Download the verification file below',
          'Upload it to your website\'s root directory (where index.html is located)',
          'Make sure the file is accessible at: yoursite.com/ads-verification.html',
          'Click "Verify" button below'
        ]
      },
      'meta-tag': {
        title: 'HTML Meta Tag',
        description: 'Add a meta tag to your website\'s homepage',
        icon: Code,
        steps: [
          'Copy the meta tag below',
          'Paste it in the <head> section of your homepage HTML',
          'Make sure it\'s visible in the page source',
          'Click "Verify" button below'
        ]
      },
      'dns': {
        title: 'DNS TXT Record',
        description: 'Add a TXT record to your domain\'s DNS settings',
        icon: Globe,
        steps: [
          'Log in to your domain registrar or DNS provider',
          'Create a new TXT record with the value below',
          'Set the host/name as @ or your domain name',
          'Wait for DNS propagation (can take up to 48 hours)',
          'Click "Verify" button below'
        ]
      }
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    };

    const currentMethod = verificationMethods[verificationMethod];
    const Icon = currentMethod.icon;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Verify Website Ownership</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedProperty?.url}</p>
            </div>
            <button
              onClick={() => setShowVerificationModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Method Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Verification Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(verificationMethods).map(([key, method]) => {
                  const MethodIcon = method.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setVerificationMethod(key)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        verificationMethod === key
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <MethodIcon className={`w-6 h-6 mb-2 ${
                        verificationMethod === key ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <h4 className={`font-semibold text-sm mb-1 ${
                        verificationMethod === key ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {method.title}
                      </h4>
                      <p className="text-xs text-gray-600">{method.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{currentMethod.title}</h4>
                  <p className="text-sm text-gray-700">{currentMethod.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {currentMethod.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Code/File */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {verificationMethod === 'html-file' ? 'Verification File' : 
                 verificationMethod === 'meta-tag' ? 'Meta Tag Code' : 'DNS TXT Record Value'}
              </label>
              
              {verificationMethod === 'html-file' ? (
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400">
                    <div className="text-gray-400 mb-2">// ads-verification.html</div>
                    <div>&lt;html&gt;</div>
                    <div className="ml-4">&lt;head&gt;</div>
                    <div className="ml-8">&lt;meta name="ads-verification" content="{verificationCode}" /&gt;</div>
                    <div className="ml-4">&lt;/head&gt;</div>
                    <div>&lt;/html&gt;</div>
                  </div>
                  <button
                    onClick={() => {
                      const blob = new Blob([`<html><head><meta name="ads-verification" content="${verificationCode}" /></head></html>`], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'ads-verification.html';
                      a.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Verification File
                  </button>
                </div>
              ) : verificationMethod === 'meta-tag' ? (
                <div className="relative">
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    &lt;meta name="ads-verification" content="{verificationCode}" /&gt;
                  </div>
                  <button
                    onClick={() => copyToClipboard(`<meta name="ads-verification" content="${verificationCode}" />`)}
                    className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    ads-verification={verificationCode}
                  </div>
                  <button
                    onClick={() => copyToClipboard(`ads-verification=${verificationCode}`)}
                    className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 text-sm mb-1">Important</h4>
                  <p className="text-xs text-amber-700">
                    Keep the verification code in place even after successful verification. Removing it may cause your site to become unverified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setShowVerificationModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Verification in progress...');
                setShowVerificationModal(false);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Verify Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/10 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Property Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your registered websites and mobile applications
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add {activeTab === 'websites' ? 'Website' : 'App'}</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{properties.websites.length + properties.apps.length}</h3>
            <p className="text-gray-600 text-sm font-medium mt-1">Properties</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {[...properties.websites, ...properties.apps].filter(p => p.status === 'verified').length}
            </h3>
            <p className="text-gray-600 text-sm font-medium mt-1">Verified</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Queue</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {[...properties.websites, ...properties.apps].filter(p => p.status === 'pending').length}
            </h3>
            <p className="text-gray-600 text-sm font-medium mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {[...properties.websites, ...properties.apps].reduce((sum, p) => sum + p.adUnits, 0)}
            </h3>
            <p className="text-gray-600 text-sm font-medium mt-1">Ad Units</p>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('websites')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'websites'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Websites</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'websites' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {properties.websites.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('apps')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'apps'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>Mobile Apps</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'apps' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {properties.apps.length}
                </span>
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties List */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="max-w-md mx-auto">
              {activeTab === 'websites' ? (
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              ) : (
                <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No {activeTab === 'websites' ? 'websites' : 'apps'} found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : `Get started by adding your first ${activeTab === 'websites' ? 'website' : 'mobile app'}`}
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add {activeTab === 'websites' ? 'Website' : 'App'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                          activeTab === 'websites'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                            : property.platform === 'Android'
                            ? 'bg-gradient-to-br from-green-500 to-green-600'
                            : 'bg-gradient-to-br from-gray-700 to-gray-900'
                        }`}>
                          {activeTab === 'websites' ? (
                            <Globe className="w-7 h-7" />
                          ) : (
                            <Smartphone className="w-7 h-7" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                            {getStatusBadge(property.status)}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            {activeTab === 'websites' ? (
                              <>
                                <a
                                  href={property.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                                >
                                  <span className="font-mono">{property.url}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <span className="flex items-center gap-1">
                                  <Shield className="w-4 h-4" />
                                  {property.verificationMethod === 'html-file' && 'HTML File'}
                                  {property.verificationMethod === 'meta-tag' && 'Meta Tag'}
                                  {property.verificationMethod === 'dns' && 'DNS Record'}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{property.packageName}</span>
                                <span className="flex items-center gap-1">
                                  <Smartphone className="w-4 h-4" />
                                  {property.platform}
                                </span>
                              </>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Added {property.dateAdded}
                            </span>
                          </div>

                          {/* Performance Metrics */}
                          {property.status === 'verified' && (
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Ad Units</p>
                                <p className="text-lg font-bold text-gray-900">{property.adUnits}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Impressions</p>
                                <p className="text-lg font-bold text-gray-900">{property.impressions.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Revenue</p>
                                <p className="text-lg font-bold text-green-600">${property.revenue.toFixed(2)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {property.status === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowVerificationModal(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                        >
                          <Shield className="w-4 h-4" />
                          Verify
                        </button>
                      )}
                      
                      {property.status === 'failed' && (
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowVerificationModal(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-medium"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Retry
                        </button>
                      )}
                      
                      {property.status === 'verified' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all font-medium">
                          <Eye className="w-4 h-4" />
                          View Stats
                        </button>
                      )}
                      
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <Settings className="w-5 h-5" />
                      </button>
                      
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Verification Alert */}
                {property.status === 'pending' && (
                  <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-800 font-medium">
                        Verification pending - Click "Verify" to complete the process
                      </span>
                    </div>
                  </div>
                )}

                {property.status === 'failed' && (
                  <div className="bg-red-50 border-t border-red-200 px-6 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-red-800 font-medium">
                        Verification failed - Please check your verification method and retry
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modals */}
      {showAddModal && <AddPropertyModal />}
      {showVerificationModal && <VerificationModal />}
    </div>
  );
};

export default PropertyManagement;
