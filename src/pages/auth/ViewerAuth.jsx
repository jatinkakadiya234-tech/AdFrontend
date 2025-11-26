import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, Checkbox, message, Steps, Select } from 'antd';
import { Globe, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthData, getPostLoginRedirect } from '../../utils/authUtils';
import Apihelper from '../../service/Apihelper';

const { TabPane } = Tabs;
const { Option } = Select;

const ViewerAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState({});

  // Login Handler
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await Apihelper.Login({
        email: values.email,
        password: values.password
      });

      if (response.success) {
        // Check if user is viewer
        if (response.user.role !== 'viewer') {
          message.error('Access denied. Viewer account required.');
          setLoading(false);
          return;
        }

        // Store auth data
        setAuthData(response.token, response.user);
        
        message.success('Login successful!');
        
        // Smart redirect based on platform status
        const redirectPath = getPostLoginRedirect();
        navigate(redirectPath);
      } else {
        message.error(response.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Registration handlers
  const handleStep1 = (values) => {
    setRegistrationData({ ...registrationData, ...values });
    setCurrentStep(1);
  };

  const handleStep2 = (values) => {
    setRegistrationData({ ...registrationData, ...values });
    setCurrentStep(2);
  };

  const handleRegistration = async (values) => {
    setLoading(true);
    const finalData = {
      username: registrationData.fullName,
      email: registrationData.email,
      password: registrationData.password,
      role: 'viewer',
      profile: {
        fullName: registrationData.fullName,
        phone: registrationData.phone,
        platformName: registrationData.platformName,
        platformUrl: registrationData.platformUrl,
        platformType: registrationData.platformType,
        category: registrationData.category
      },
      preferences: {
        preferredDevices: [registrationData.platformType === 'website' ? 'web' : 'mobile'],
        preferredPlatforms: [registrationData.platformType === 'website' ? 'html' : 'app'],
        notifications: true,
        language: 'en'
      },
      device: registrationData.platformType === 'website' ? 'web' : 'mobile',
      platform: registrationData.platformType === 'website' ? 'html' : 'app'
    };
    
    try {
      const response = await Apihelper.Register(finalData);
      
      if (response.success) {
        message.success('Registration successful! Please register your platform.');
        
        // Store auth data
        setAuthData(response.token, response.user);
        
        // Redirect to platform registration
        navigate('/app/property-management');
      } else {
        message.error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button
          type="link"
          icon={<ArrowLeft />}
          onClick={() => navigate('/')}
          className="mb-4"
        >
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Viewer Portal</h2>
            <p className="text-green-100">Monetize your website or app</p>
          </div>

          <div className="p-8">
            <Tabs defaultActiveKey="login" size="large">
              {/* Login Tab */}
              <TabPane tab="Sign In" key="login">
                <Form
                  name="viewer-login"
                  onFinish={handleLogin}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input
                      prefix={<Mail className="w-4 h-4 text-gray-400" />}
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                  >
                    <Input.Password
                      prefix={<Lock className="w-4 h-4 text-gray-400" />}
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 border-none h-12 text-lg font-semibold"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </Form.Item>
                </Form>

                <div className="text-center">
                  <a href="#" className="text-green-600 hover:text-green-800 text-sm">
                    Forgot Password?
                  </a>
                </div>
              </TabPane>

              {/* Register Tab - Same structure as Publisher with platform fields */}
              <TabPane tab="Sign Up" key="register">
                <Steps current={currentStep} className="mb-8">
                  <Steps.Step title="Account" />
                  <Steps.Step title="Platform" />
                  <Steps.Step title="Confirm" />
                </Steps>

                {/* Same implementation as Publisher but with platform-specific fields */}
                {/* Step 1: Account Details - Same as Publisher */}
                {/* Step 2: Platform Details - Platform Type, URL, Category */}
                {/* Step 3: Confirmation */}
                
                {/* Implementation same as PublisherAuth with platform fields instead of company fields */}
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          After registration, you'll need to complete platform verification before monetization
        </p>
      </div>
    </div>
  );
};

export default ViewerAuth;
