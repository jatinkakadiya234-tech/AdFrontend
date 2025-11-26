// src/utils/authUtils.js

import Apihelper from '../service/Apihelper';

/**
 * Logout user and clear all auth data
 */
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
    localStorage.removeItem('kycStatus');
    localStorage.removeItem('platformStatus');
    
    // Redirect to landing page
    window.location.href = '/';
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  } catch {
    return false;
  }
};

/**
 * Get current user object
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get user role
 */
export const getUserRole = () => {
  try {
    const user = getCurrentUser();
    return user?.role || localStorage.getItem('userRole') || null;
  } catch {
    return null;
  }
};

/**
 * Set authentication data
 */
export const setAuthData = (token, userData) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Also store role separately for quick access
    if (userData?.role) {
      localStorage.setItem('userRole', userData.role);
    }
    
    // Store KYC status for publishers
    if (userData?.kycStatus) {
      localStorage.setItem('kycStatus', userData.kycStatus);
    }
    
    // Store platform status for viewers
    if (userData?.platformStatus) {
      localStorage.setItem('platformStatus', userData.platformStatus);
    }
  } catch (error) {
    console.error('Error setting auth data:', error);
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

/**
 * Check Publisher KYC status
 */
export const checkKYCStatus = () => {
  try {
    const user = getCurrentUser();
    return user?.kycStatus || localStorage.getItem('kycStatus') || 'not_submitted';
  } catch {
    return 'not_submitted';
  }
};

/**
 * Check Viewer Platform status
 */
export const checkPlatformStatus = () => {
  try {
    const user = getCurrentUser();
    return user?.platformStatus || localStorage.getItem('platformStatus') || 'not_submitted';
  } catch {
    return 'not_submitted';
  }
};

/**
 * Update user data in localStorage
 */
export const updateUserData = (updatedData) => {
  try {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const newUserData = { ...currentUser, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      // Update individual fields
      if (updatedData.kycStatus) {
        localStorage.setItem('kycStatus', updatedData.kycStatus);
      }
      if (updatedData.platformStatus) {
        localStorage.setItem('platformStatus', updatedData.platformStatus);
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

/**
 * Redirect user based on role and status
 */
export const redirectBasedOnRole = (role, kycStatus = null, platformStatus = null) => {
  switch (role) {
    case 'admin':
    case 'superadmin':
      return '/app/admin-dashboard';
    
    case 'publisher':
    case 'advertiser':
      // Check KYC status for publishers
      if (kycStatus === 'pending') {
        return '/app/publisher-kyc-pending';
      } else if (kycStatus === 'approved') {
        return '/app/publisher-dashboard';
      } else if (kycStatus === 'rejected') {
        return '/app/publisher-kyc-rejected';
      } else {
        return '/app/publisher-kyc-form';
      }
    
    case 'viewer':
      // Check platform status for viewers
      if (platformStatus === 'pending') {
        return '/app/viewer-platform-pending';
      } else if (platformStatus === 'approved') {
        return '/app/dashboard';
      } else if (platformStatus === 'rejected') {
        return '/app/viewer-platform-rejected';
      } else {
        return '/app/viewer-platform-registration';
      }
    
    default:
      return '/app/dashboard';
  }
};

/**
 * Get redirect path after login
 */
export const getPostLoginRedirect = () => {
  const user = getCurrentUser();
  if (!user) return '/';
  
  const role = user.role;
  const kycStatus = user.kycStatus || checkKYCStatus();
  const platformStatus = user.platformStatus || checkPlatformStatus();
  
  return redirectBasedOnRole(role, kycStatus, platformStatus);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('kycStatus');
    localStorage.removeItem('platformStatus');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

/**
 * Validate token (optional - for refresh token logic)
 */
export const validateToken = async () => {
  try {
    const token = getAuthToken();
    if (!token) return false;
    
    // Call API to validate token
    const response = await Apihelper.validateToken(token);
    return response.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

/**
 * Check if user has required role
 */
export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  // Array of roles
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  
  // Single role
  return userRole === requiredRole;
};

/**
 * Check if user has permission (for future use)
 */
export const hasPermission = (permission) => {
  const user = getCurrentUser();
  if (!user || !user.permissions) return false;
  
  return user.permissions.includes(permission);
};

/**
 * Get user display name
 */
export const getUserDisplayName = () => {
  const user = getCurrentUser();
  return user?.username || user?.name || user?.email || 'User';
};

/**
 * Get user initials for avatar
 */
export const getUserInitials = () => {
  const name = getUserDisplayName();
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if session is valid
 */
export const isSessionValid = () => {
  const token = getAuthToken();
  const user = getCurrentUser();
  
  if (!token || !user) return false;
  
  // Add additional validation logic here
  // For example, check token expiration
  
  return true;
};

export default {
  logout,
  isAuthenticated,
  getCurrentUser,
  getUserRole,
  setAuthData,
  getAuthToken,
  checkKYCStatus,
  checkPlatformStatus,
  updateUserData,
  redirectBasedOnRole,
  getPostLoginRedirect,
  clearAuthData,
  validateToken,
  hasRole,
  hasPermission,
  getUserDisplayName,
  getUserInitials,
  isSessionValid
};
