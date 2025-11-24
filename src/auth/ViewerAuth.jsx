import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Heart, Star, Zap } from 'lucide-react';
import Apihelper from '../service/Apihelper';

const ViewerAuth = ({ mode, onAuthSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer',
    profile: {
      interests: [],
      preferences: {
        notifications: true,
        newsletter: false
      }
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interests = [
    'Technology', 'Gaming', 'Fashion', 'Travel', 'Food', 'Sports',
    'Music', 'Movies', 'Books', 'Art', 'Health', 'Finance'
  ];

  const toggleInterest = (interest) => {
    const currentInterests = formData.profile.interests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        interests: updatedInterests
      }
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-700 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative text-center text-white z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-3xl mb-8 backdrop-blur-sm">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Viewer Portal</h1>
              <p className="text-xl mb-8 opacity-90">
                {mode === 'register' 
                  ? 'Discover amazing content tailored just for you'
                  : 'Welcome back! Continue exploring personalized content'
                }
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <Heart className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-semibold mb-1">Personalized</div>
                  <div className="opacity-80">Content for you</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <Star className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-semibold mb-1">Premium</div>
                  <div className="opacity-80">Quality content</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <Zap className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-semibold mb-1">Fast</div>
                  <div className="opacity-80">Quick access</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <Eye className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-semibold mb-1">Discover</div>
                  <div className="opacity-80">New experiences</div>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {mode === 'register' ? 'Create Viewer Account' : 'Viewer Sign In'}
                </h2>
                <p className="mt-2 text-gray-600">
                  {mode === 'register' 
                    ? 'Join our community of content explorers'
                    : 'Access your personalized content feed'
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
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Interests Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        What interests you? (Optional)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {interests.map(interest => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                              formData.profile.interests.includes(interest)
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Preferences
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={formData.profile.preferences.notifications}
                            onChange={(e) => setFormData({
                              ...formData,
                              profile: {
                                ...formData.profile,
                                preferences: {
                                  ...formData.profile.preferences,
                                  notifications: e.target.checked
                                }
                              }
                            })}
                          />
                          <span className="ml-2 text-sm text-gray-700">Enable notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={formData.profile.preferences.newsletter}
                            onChange={(e) => setFormData({
                              ...formData,
                              profile: {
                                ...formData.profile,
                                preferences: {
                                  ...formData.profile.preferences,
                                  newsletter: e.target.checked
                                }
                              }
                            })}
                          />
                          <span className="ml-2 text-sm text-gray-700">Subscribe to newsletter</span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Login Fields */
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Username or Email"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading 
                    ? (mode === 'register' ? 'Creating Account...' : 'Signing In...') 
                    : (mode === 'register' ? 'Create Viewer Account' : 'Sign In to Explore')
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

export default ViewerAuth;