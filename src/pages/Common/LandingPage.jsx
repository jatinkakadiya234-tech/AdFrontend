import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { Shield, Megaphone, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Admin',
      icon: Shield,
      description: 'Manage the entire platform, approve users, and oversee operations',
      path: '/auth/admin',
      color: 'purple',
      bgGradient: 'from-purple-500 to-indigo-600',
      features: ['Full platform control', 'User management', 'Analytics & reports']
    },
    {
      title: 'Publisher',
      icon: Megaphone,
      description: 'Advertise your products and services to reach millions',
      path: '/auth/publisher',
      color: 'blue',
      bgGradient: 'from-blue-500 to-cyan-600',
      features: ['Create campaigns', 'Manage budgets', 'Track performance']
    },
    {
      title: 'Viewer',
      icon: Globe,
      description: 'Monetize your website or app by displaying ads',
      path: '/auth/viewer',
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600',
      features: ['Easy integration', 'Earn revenue', 'Real-time analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AdIntegrate
            </span>
          </div>
          <Button type="primary" size="large" className="bg-blue-600">
            Contact Us
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AdIntegrate</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The ultimate ad integration platform connecting advertisers with publishers. 
            Choose your role to get started.
          </p>
        </div>

        {/* Role Cards */}
        <Row gutter={[24, 24]} className="mb-16">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Col xs={24} md={8} key={role.title}>
                <Card
                  className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 cursor-pointer group"
                  onClick={() => navigate(role.path)}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${role.bgGradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                    <p className="text-gray-600 mb-6">{role.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      icon={<ArrowRight className="w-4 h-4" />}
                      className={`w-full bg-gradient-to-r ${role.bgGradient} border-none`}
                      onClick={() => navigate(role.path)}
                    >
                      Continue as {role.title}
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose AdIntegrate?</h2>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
                <p className="text-gray-600">Bank-level security with complete data protection</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
                <p className="text-gray-600">Get started in minutes with our simple setup</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maximum Revenue</h3>
                <p className="text-gray-600">Optimize earnings with smart ad placement</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 AdIntegrate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
