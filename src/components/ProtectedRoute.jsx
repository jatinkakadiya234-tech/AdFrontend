import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/authUtils';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        setIsValid(false);
        return;
      }

      const user = getCurrentUser();
      if (!user || !user.id) {
        setIsValid(false);
        return;
      }

      // Check role if required
      if (requiredRole && user.role !== requiredRole) {
        setIsValid(false);
        return;
      }

      setIsValid(true);
    };

    checkAuth();
  }, [location.pathname, requiredRole]);

  if (isValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl font-semibold text-gray-700">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (isValid === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;