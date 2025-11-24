import { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  User, 
  Key, 
  Shield, 
  Mail, 
  Edit3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || '',
        email: parsedUser.email || ''
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const copyToClipboard = async (text, field) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const maskSecretKey = (key) => {
    if (!key) return '••••••••••••••••••••';
    return '•'.repeat(Math.min(key.length, 20));
  };

  // Mock data for demonstration
  const mockUser = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    secretKey: '1234',
    userId: '1234',
    memberSince: '2024-01-15',
    lastActive: new Date().toISOString(),
    status: 'active'
  };

  // Use mock data if no user from localStorage
  const currentUser = user || mockUser;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
            Account Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your account settings and security preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* User Card */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-xl font-bold border-2 border-white/30">
                    {getInitials(currentUser?.username)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg truncate">{currentUser?.username}</h2>
                    <p className="text-blue-100 text-sm truncate">{currentUser?.email}</p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 text-green-300 mr-1" />
                      <span className="text-green-200 text-xs font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'security'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Security</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'settings'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(currentUser?.memberSince)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Active</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(currentUser?.lastActive)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <User className="w-6 h-6 mr-2 text-blue-600" />
                      Profile Information
                    </h2>
                    <p className="text-gray-600 mt-1">Manage your personal account details</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 sm:mt-0 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center space-x-2 shadow-sm hover:shadow-md"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Username & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Enter your username"
                      />
                    ) : (
                      <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <p className="text-gray-900 font-medium">{currentUser?.username}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <p className="text-gray-900">{currentUser?.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ID Fields Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      User ID
                    </label>
                    <div className="relative">
                      <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 pr-20">
                        <p className="text-gray-900 font-mono text-sm truncate">
                          {currentUser?.userId || 'Not available'}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(currentUser?.userId, 'userId')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Copy User ID"
                      >
                        {copiedField === 'userId' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Your unique user identifier
                    </p>
                  </div>

                  {/* Secret Key */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Key className="w-4 h-4 mr-2 text-purple-600" />
                      Secret Key
                    </label>
                    <div className="relative">
                      <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 pr-24">
                        <p className="text-gray-900 font-mono text-sm truncate">
                          {showSecretKey ? (currentUser?.secretKey || 'Not available') : maskSecretKey(currentUser?.secretKey)}
                        </p>
                      </div>
                      
                      {/* Reveal/Hide Button */}
                      <button
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                        title={showSecretKey ? 'Hide Secret Key' : 'Reveal Secret Key'}
                      >
                        {showSecretKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      
                      {/* Copy Button */}
                      <button
                        onClick={() => copyToClipboard(currentUser?.secretKey, 'secretKey')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                        title="Copy Secret Key"
                      >
                        {copiedField === 'secretKey' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      {showSecretKey 
                        ? 'Keep this key secure and confidential' 
                        : 'Click the eye icon to reveal your secret key'
                      }
                    </p>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security & Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Security Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Security Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Email Verified</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">2FA Enabled</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Manage
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Last Key Rotation</span>
                    </div>
                    <span className="text-orange-700 text-sm">30 days ago</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-purple-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Export Data</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Rotate Secret Key</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Privacy Settings</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 text-lg mb-2">Security Notice</h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Your secret key provides full access to your account and should be treated with extreme care. 
                    Never share it in emails, chats, or public forums. Store it securely and consider rotating it 
                    regularly for enhanced security. If you suspect your key has been compromised, rotate it immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;