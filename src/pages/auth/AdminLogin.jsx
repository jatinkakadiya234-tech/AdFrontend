import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, message } from 'antd';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../../utils/authUtils';
import Apihelper from '../../service/Apihelper';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await Apihelper.Login({
        email: values.email,
        password: values.password
      });

      if (response.success) {
        // Check if user is admin
        if (response.user.role !== 'admin' && response.user.role !== 'superadmin') {
          setError('Access denied. Admin privileges required.');
          setLoading(false);
          return;
        }

        // Store auth data
        setAuthData(response.token, response.user);
        
        message.success('Login successful!');
        navigate('/app/admin-dashboard');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          type="link"
          icon={<ArrowLeft />}
          onClick={() => navigate('/')}
          className="mb-4"
        >
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-purple-100">Secure access for administrators only</p>
          </div>

          <div className="p-8">
            <Alert
              message="Admin Access Only"
              description="This portal is restricted to authorized administrators."
              type="info"
              showIcon
              className="mb-6"
            />

            {error && (
              <Alert
                message="Login Failed"
                description={error}
                type="error"
                showIcon
                closable
                onClose={() => setError('')}
                className="mb-4"
              />
            )}

            <Form
              name="admin-login"
              onFinish={onFinish}
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
                  placeholder="admin@adintegrate.com"
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none h-12 text-lg font-semibold"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-6">
              <a href="#" className="text-purple-600 hover:text-purple-800 text-sm">
                Forgot Password?
              </a>
            </div>
          </div>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          Protected by enterprise-level security
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
