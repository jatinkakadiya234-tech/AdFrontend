import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { getTokenFromCookie } from '../utils/cookieUtils';

const AuthContainer = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleLogin = (responseData) => {
    console.log('Login successful:', responseData);
    
    // Store user data immediately
    localStorage.setItem('user', JSON.stringify(responseData.user));
    localStorage.setItem('token', responseData.token);
    
    onAuthSuccess && onAuthSuccess();
    
    // Direct redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handleRegister = (responseData) => {
    console.log('Registration successful:', responseData);
    
    // Extract token from cookie and store in localStorage
    setTimeout(() => {
      const token = getTokenFromCookie();
      if (token) {
        localStorage.setItem('token', token);
      }
    }, 100);
    
    localStorage.setItem('user', JSON.stringify(responseData.user));
    onAuthSuccess && onAuthSuccess();
    navigate('/login');
  };

  return isLogin ? (
    <Login 
      onLogin={handleLogin} 
      switchToRegister={() => navigate('/register')} 
    />
  ) : (
    <Register 
      onRegister={handleRegister} 
      switchToLogin={() => navigate('/login')} 
    />
  );
};

export default AuthContainer;