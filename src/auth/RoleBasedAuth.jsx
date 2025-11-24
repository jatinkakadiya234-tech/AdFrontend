import { useState } from 'react';
import { Users, Eye, Megaphone, ArrowRight } from 'lucide-react';
import PublisherAuth from './PublisherAuth';
import ViewerAuth from './ViewerAuth';

const RoleBasedAuth = ({ onAuthSuccess }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  if (selectedRole) {
    return selectedRole === 'publisher' ? (
      <PublisherAuth 
        mode={authMode}
        onAuthSuccess={onAuthSuccess}
        onBack={() => setSelectedRole(null)}
      />
    ) : (
      <ViewerAuth 
        mode={authMode}
        onAuthSuccess={onAuthSuccess}
        onBack={() => setSelectedRole(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to AdPlatform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to get started with the perfect experience tailored for you
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                authMode === 'register'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Publisher Card */}
          <div 
            onClick={() => setSelectedRole('publisher')}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Megaphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Publisher</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create and manage advertising campaigns, track performance, and monetize your content
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Create ad campaigns
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Analytics dashboard
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Revenue tracking
                </div>
              </div>
              <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700">
                <span className="mr-2">{authMode === 'login' ? 'Sign in' : 'Sign up'} as Publisher</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Viewer Card */}
          <div 
            onClick={() => setSelectedRole('viewer')}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Viewer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse and discover amazing content, interact with ads, and enjoy personalized experiences
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Browse ad gallery
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Personalized content
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Interactive experience
                </div>
              </div>
              <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                <span className="mr-2">{authMode === 'login' ? 'Sign in' : 'Sign up'} as Viewer</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedAuth;