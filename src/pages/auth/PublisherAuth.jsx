import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, Checkbox, message, Steps } from 'antd';
import { Megaphone, Mail, Lock, User, Phone, Building, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthData, getPostLoginRedirect } from '../../utils/authUtils';
import Apihelper from '../../service/Apihelper';

const { TabPane } = Tabs;

const PublisherAuth = () => {
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
        // Check if user is publisher
        if (response.user.role !== 'publisher' && response.user.role !== 'advertiser') {
          message.error('Access denied. Publisher account required.');
          setLoading(false);
          return;
        }

        // Store auth data
        setAuthData(response.token, response.user);
        
        message.success('Login successful!');
        
        // Smart redirect based on KYC status
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

  // Registration Step 1: Account Details
  const handleStep1 = (values) => {
    setRegistrationData({ ...registrationData, ...values });
    setCurrentStep(1);
  };

  // Registration Step 2: Company Details
  const handleStep2 = (values) => {
    setRegistrationData({ ...registrationData, ...values });
    setCurrentStep(2);
  };

  // Final Registration
  const handleRegistration = async (values) => {
    setLoading(true);
    const finalData = {
      username: registrationData.fullName,
      email: registrationData.email,
      password: registrationData.password,
      role: 'publisher',
      profile: {
        fullName: registrationData.fullName,
        phone: registrationData.phone,
        company: registrationData.companyName,
        website: registrationData.website,
        industry: registrationData.industry
      },
      preferences: {
        preferredDevices: ['web'],
        preferredPlatforms: ['html'],
        notifications: true,
        language: 'en'
      },
      device: 'web',
      platform: 'html'
    };
    
    try {
      const response = await Apihelper.Register(finalData);
      
      if (response.success) {
        message.success('Registration successful! Please complete KYC verification.');
        
        // Store auth data
        setAuthData(response.token, response.user);
        
        // Redirect to KYC form
        navigate('/app/kyc');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
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
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Publisher Portal</h2>
            <p className="text-blue-100">Start advertising your products today</p>
          </div>

          <div className="p-8">
            <Tabs defaultActiveKey="login" size="large">
              {/* Login Tab */}
              <TabPane tab="Sign In" key="login">
                <Form
                  name="publisher-login"
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
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none h-12 text-lg font-semibold"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </Form.Item>
                </Form>

                <div className="text-center">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Forgot Password?
                  </a>
                </div>
              </TabPane>

              {/* Register Tab */}
              <TabPane tab="Sign Up" key="register">
                <Steps current={currentStep} className="mb-8">
                  <Steps.Step title="Account" />
                  <Steps.Step title="Company" />
                  <Steps.Step title="Confirm" />
                </Steps>

                {/* Step 1: Account Details */}
                {currentStep === 0 && (
                  <Form
                    name="register-step1"
                    onFinish={handleStep1}
                    layout="vertical"
                    size="large"
                    initialValues={registrationData}
                  >
                    <Form.Item
                      name="fullName"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                      <Input
                        prefix={<User className="w-4 h-4 text-gray-400" />}
                        placeholder="John Doe"
                      />
                    </Form.Item>

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
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                      <Input
                        prefix={<Phone className="w-4 h-4 text-gray-400" />}
                        placeholder="+1 234 567 8900"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        { required: true, message: 'Please enter a password' },
                        { min: 8, message: 'Password must be at least 8 characters' }
                      ]}
                    >
                      <Input.Password
                        prefix={<Lock className="w-4 h-4 text-gray-400" />}
                        placeholder="Create a strong password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<Lock className="w-4 h-4 text-gray-400" />}
                        placeholder="Confirm your password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none h-12"
                      >
                        Next Step
                      </Button>
                    </Form.Item>
                  </Form>
                )}

                {/* Step 2: Company Details */}
                {currentStep === 1 && (
                  <Form
                    name="register-step2"
                    onFinish={handleStep2}
                    layout="vertical"
                    size="large"
                    initialValues={registrationData}
                  >
                    <Form.Item
                      name="companyName"
                      label="Company Name"
                      rules={[{ required: true, message: 'Please enter company name' }]}
                    >
                      <Input
                        prefix={<Building className="w-4 h-4 text-gray-400" />}
                        placeholder="Acme Corporation"
                      />
                    </Form.Item>

                    <Form.Item
                      name="website"
                      label="Company Website"
                      rules={[
                        { required: true, message: 'Please enter website URL' },
                        { type: 'url', message: 'Please enter a valid URL' }
                      ]}
                    >
                      <Input
                        prefix={<Megaphone className="w-4 h-4 text-gray-400" />}
                        placeholder="https://example.com"
                      />
                    </Form.Item>

                    <Form.Item
                      name="industry"
                      label="Industry"
                      rules={[{ required: true, message: 'Please enter your industry' }]}
                    >
                      <Input placeholder="e.g., E-commerce, Technology, Finance" />
                    </Form.Item>

                    <div className="flex gap-4">
                      <Button onClick={() => setCurrentStep(0)} block>
                        Back
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none"
                      >
                        Next Step
                      </Button>
                    </div>
                  </Form>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 2 && (
                  <Form
                    name="register-step3"
                    onFinish={handleRegistration}
                    layout="vertical"
                    size="large"
                  >
                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-lg mb-4">Review Your Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {registrationData.fullName}</p>
                        <p><strong>Email:</strong> {registrationData.email}</p>
                        <p><strong>Phone:</strong> {registrationData.phone}</p>
                        <p><strong>Company:</strong> {registrationData.companyName}</p>
                        <p><strong>Website:</strong> {registrationData.website}</p>
                        <p><strong>Industry:</strong> {registrationData.industry}</p>
                      </div>
                    </div>

                    <Form.Item
                      name="terms"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Please accept terms')),
                        },
                      ]}
                    >
                      <Checkbox>
                        I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and{' '}
                        <a href="#" className="text-blue-600">Privacy Policy</a>
                      </Checkbox>
                    </Form.Item>

                    <div className="flex gap-4">
                      <Button onClick={() => setCurrentStep(1)} block>
                        Back
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        icon={<CheckCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none"
                      >
                        {loading ? 'Creating Account...' : 'Complete Registration'}
                      </Button>
                    </div>
                  </Form>
                )}
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          After registration, you'll need to complete KYC verification before accessing the platform
        </p>
      </div>
    </div>
  );
};

export default PublisherAuth;
