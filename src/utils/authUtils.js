import Apihelper from '../service/Apihelper';

export const logout = async () => {
  try {
    // Call logout API
    await Apihelper.Logout();
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Clear all auth data regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    // Redirect to home
    window.location.href = '/';
  }
};

export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  } catch {
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const getUserRole = () => {
  try {
    const user = getCurrentUser();
    return user?.role || localStorage.getItem('userRole') || 'viewer';
  } catch {
    return 'viewer';
  }
};

export const redirectBasedOnRole = (role) => {
  switch (role) {
    case 'publisher':
    case 'advertiser':
    case 'admin':
    case 'superadmin':
      return '/app/dashboard';
    case 'viewer':
    default:
      return '/gallery';
  }
};