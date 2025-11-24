import { useState } from 'react';
import { ArrowLeft, Megaphone, Eye, EyeOff, Building, User, Mail, Lock, Briefcase, Globe } from 'lucide-react';
import Apihelper from '../service/Apihelper';

const PublisherAuth = ({ mode, onAuthSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'publisher',
    profile: {
      companyName: '',
      website: '',
      businessType: '',
      description: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessTypes = [
    'Technology', 'E-commerce', 'Healthcare', 'Finance', 'Education', 
    'Entertainment', 'Travel', 'Food & Beverage', 'Fashion', 'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (mode === 'register') {
        if (!formData.username?.trim()) {
          setError('Username is required');
          return;
        }
        if (!formData.email?.trim()) {
          setError('Email is required');
          return;
        }
        if (!formData.profile?.companyName?.trim()) {
          setError('Company name is required');
          return;
        }
        if (!formData.profile?.businessType) {
          setError('Business type is required');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        
        const { confirmPassword, ...registerData } = formData;
        const response = await Apihelper.Ragister(registerData);
        
        if (response.data) {
          onAuthSuccess(response.data);
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        if (!formData.email?.trim()) {
          setError('Username or email is required');
          return;
        }
        if (!formData.password?.trim()) {
          setError('Password is required');
          return;
        }
        
        const response = await Apihelper.Login({
          usernameOrEmail: formData.email || formData.username,
          password: formData.password
        });
        
        if (response.data) {
          onAuthSuccess(response.data);
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      
      let errorMessage = `${mode === 'register' ? 'Registration' : 'Login'} failed`;
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.status === 401) {
        errorMessage = 'Invalid credentials';
      } else if (err.response?.status === 400) {
        errorMessage = 'Please check your input and try again';
      } else if (err.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative text-center text-white z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-3xl mb-8 backdrop-blur-sm">
                <Megaphone className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Publisher Portal</h1>
              <p className="text-xl mb-8 opacity-90">
                {mode === 'register' 
                  ? 'Start your advertising journey and reach millions of users'
                  : 'Welcome back! Manage your campaigns and track performance'
                }
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="font-semibold mb-1">Campaign Management</div>
                  <div className="opacity-80">Create & optimize ads</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="font-semibold mb-1">Analytics</div>
                  <div className="opacity-80">Track performance</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="font-semibold mb-1">Revenue</div>
                  <div className="opacity-80">Monetize content</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="font-semibold mb-1">Support</div>
                  <div className="opacity-80">24/7 assistance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-8">
              {/* Header */}
              <div className="text-center">
                <button
                  onClick={onBack}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to role selection
                </button>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                  <Megaphone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {mode === 'register' ? 'Create Publisher Account' : 'Publisher Sign In'}
                </h2>
                <p className="mt-2 text-gray-600">
                  {mode === 'register' 
                    ? 'Join thousands of successful publishers'
                    : 'Access your publisher dashboard'
                  }
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {mode === 'register' ? (
                  <>
                    {/* Registration Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Username"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={formData.profile.companyName}
                        onChange={(e) => setFormData({
                          ...formData, 
                          profile: {...formData.profile, companyName: e.target.value}
                        })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="url"
                          placeholder="Website (optional)"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={formData.profile.website}
                          onChange={(e) => setFormData({
                            ...formData, 
                            profile: {...formData.profile, website: e.target.value}
                          })}
                        />
                      </div>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                          value={formData.profile.businessType}
                          onChange={(e) => setFormData({
                            ...formData, 
                            profile: {...formData.profile, businessType: e.target.value}
                          })}
                          required
                        >
                          <option value="">Business Type</option>
                          {businessTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <textarea
                        placeholder="Brief description of your business (optional)"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        value={formData.profile.description}
                        onChange={(e) => setFormData({
                          ...formData, 
                          profile: {...formData.profile, description: e.target.value}
                        })}
                      />
                    </div>
                  </>
                ) : (
                  /* Login Fields */
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Username or Email"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                )}

                {/* Password Fields */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {mode === 'register' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading 
                    ? (mode === 'register' ? 'Creating Account...' : 'Signing In...') 
                    : (mode === 'register' ? 'Create Publisher Account' : 'Sign In to Dashboard')
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherAuth;