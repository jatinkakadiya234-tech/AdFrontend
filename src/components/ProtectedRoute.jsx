import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      // Clear any remaining data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, []);

  if (isValid === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isValid === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;