import { useState } from 'react';
import Apihelper from '../service/Apihelper';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    profile: {}
  });
  const naviget = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const { checks, score } = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await Apihelper.Ragister(registerData);
      onRegister(response.data);
      naviget("/login")
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex">
          {/* Left Side - Poster */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-700 items-center justify-center p-12">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
              <p className="text-xl mb-8">Create your account and start managing your business efficiently</p>
              <div className="w-64 h-64 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                <p className="mt-2 text-gray-600">Create your account to get started</p>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 text-sm">
                      <div className="flex items-center mb-1">
                        <div className="flex space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`h-1 w-4 rounded ${
                              i <= score ? 
                                score <= 2 ? 'bg-red-500' : 
                                score <= 3 ? 'bg-yellow-500' : 
                                score <= 4 ? 'bg-blue-500' : 'bg-green-500'
                              : 'bg-gray-200'
                            }`} />
                          ))}
                        </div>
                        <span className={`ml-2 text-xs ${
                          score <= 2 ? 'text-red-500' : 
                          score <= 3 ? 'text-yellow-500' : 
                          score <= 4 ? 'text-blue-500' : 'text-green-500'
                        }`}>
                          {score <= 2 ? 'Weak' : score <= 3 ? 'Fair' : score <= 4 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className={`flex items-center text-xs ${
                          checks.length ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <span className="mr-1">{checks.length ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-xs ${
                          checks.uppercase ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <span className="mr-1">{checks.uppercase ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center text-xs ${
                          checks.lowercase ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <span className="mr-1">{checks.lowercase ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center text-xs ${
                          checks.number ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <span className="mr-1">{checks.number ? '✓' : '○'}</span>
                          One number
                        </div>
                        <div className={`flex items-center text-xs ${
                          checks.special ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <span className="mr-1">{checks.special ? '✓' : '○'}</span>
                          One special character
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className={`mt-1 text-xs flex items-center ${
                      formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-500'
                    }`}>
                      <span className="mr-1">
                        {formData.password === formData.confirmPassword ? '✓' : '✗'}
                      </span>
                      {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center">
                <button
                  onClick={switchToLogin}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;