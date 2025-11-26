import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedAuth from './RoleBasedAuth';
import { getTokenFromCookie } from '../utils/cookieUtils';

const AuthContainer = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleAuthSuccess = (responseData) => {
    try {
      console.log('Authentication successful:', responseData);
      setLoading(true);
      
      // Ensure we have the required data
      if (!responseData || !responseData.user) {
        throw new Error('Invalid response data');
      }

      const { user, token } = responseData;
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(user));
      if (token) {
        localStorage.setItem('token', token);
      }
      
      // Store user role for easy access
      if (user.role) {
        localStorage.setItem('userRole', user.role);
      }
      
      // Extract token from cookie if available (fallback)
      setTimeout(() => {
        const cookieToken = getTokenFromCookie();
        if (cookieToken && !token) {
          localStorage.setItem('token', cookieToken);
        }
      }, 100);
      
      // Call parent success handler
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
      // Redirect based on user role with fallback
      const userRole = user.role || 'viewer';
      
      setTimeout(() => {
        switch (userRole) {
          case 'publisher':
          case 'advertiser':
          case 'admin':
          case 'superadmin':
            window.location.href = '/app/dashboard';
            break;
          case 'viewer':
          default:
            window.location.href = '/gallery';
            break;
        }
      }, 500);
      
    } catch (error) {
      console.error('Auth success handler error:', error);
      // Fallback redirect
      window.location.href = '/app/dashboard';
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <RoleBasedAuth onAuthSuccess={handleAuthSuccess} />
  );
};

export default AuthContainer;