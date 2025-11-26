// src/service/Apihelper.js

import axios from "axios";

const url = "http://localhost:5500/api";

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Add token to headers for authenticated requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const Apihelper = {
  // ===== Authentication APIs =====
  
  /**
   * Register new user (Publisher or Viewer)
   */
  Register: async (data) => {
    try {
      const response = await axios.post(`${url}/user/register`, data);
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  /**
   * Login user (Admin, Publisher, or Viewer)
   */
  Login: async (data) => {
    try {
      const response = await axios.post(`${url}/user/login`, {
        usernameOrEmail: data.email || data.usernameOrEmail,
        password: data.password
      });
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  /**
   * Logout user
   */
  Logout: async () => {
    try {
      await axios.post(`${url}/user/logout`);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },

  /**
   * Validate token
   */
  ValidateToken: async (token) => {
    try {
      const response = await axios.get(`${url}/user/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return {
        valid: true,
        user: response.data.user
      };
    } catch (error) {
      return { valid: false };
    }
  },

  // Legacy aliases (for backward compatibility)
  Ragister: function(data) {
    return this.Register(data);
  },
  
  login: function(data) {
    return this.Login(data);
  },

  logout: function() {
    return this.Logout();
  },



  // Join Request APIs
  SubmitJoinRequest: (data) => {
    return axios.post(url + "/join-request/submit", data)
  },
  GetAllJoinRequests: (params) => {
    return axios.get(url + "/join-request/all", { params })
  },
  ApproveJoinRequest: (id, data) => {
    return axios.put(url + `/join-request/${id}/approve`, data)
  },
  RejectJoinRequest: (id, data) => {
    return axios.put(url + `/join-request/${id}/reject`, data)
  },
  GetJoinRequestStats: () => {
    return axios.get(url + "/join-request/stats")
  },
  
  // Category APIs
  CreateCategory: (data) => {
    return axios.post(url + "/category/create", data)
  },
  GetCategories: (params) => {
    return axios.get(url + "/category/all", { params })
  },
  UpdateCategory: (id, data) => {
    return axios.put(url + `/category/update/${id}`, data)
  },
  DeactivateCategory: (id) => {
    return axios.put(url + `/category/deactivate/${id}`)
  },
  DeleteCategory: (id) => {
    return axios.delete(url + `/category/delete/${id}`)
  },
  
  // Category Analytics APIs
  GetCategoryStats: () => {
    return axios.get(url + "/category/stats")
  },
  GetTopCategories: (params) => {
    return axios.get(url + "/category/top", { params })
  },
  GetAdsByCategory: (id, params) => {
    return axios.get(url + `/category/${id}/ads`, { params })
  },
  GetCategoryTrends: (id, params) => {
    return axios.get(url + `/category/${id}/trends`, { params })
  },
  

  
  // Dashboard APIs
  GetUserDashboardStats: () => {
    return axios.get(url + "/user/dashboard-stats")
  },
  GetAdvertiserAnalytics: () => {
    return axios.get(url + "/user/advertiser-analytics")
  },
  GetCategoryAnalytics: () => {
    return axios.get(url + "/category/stats")
  },
  
  // Common APIs
  ChangePassword: (data) => {
    const role = localStorage.getItem('userRole');
    return axios.put(url + `/${role}/change-password`, data)
  },
  LogoutUser: () => {
    const role = localStorage.getItem('userRole');
    return axios.post(url + `/${role}/logout`)
  },
  
  // Wallet APIs
  GetWalletData: () => {
    return axios.get(url + "/user/wallet")
  },
  AddWalletBalance: (data) => {
    return axios.post(url + "/user/wallet/add", data)
  },
  

  
  // Campaign APIs
  CreateCampaign: (data) => {
    return axios.post(url + "/campaign/create", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  GetMyCampaigns: (params) => {
    return axios.get(url + "/campaign/my-campaigns", { params })
  },
  GetCampaign: (id) => {
    return axios.get(url + `/campaign/${id}`)
  },
  UpdateCampaign: (id, data) => {
    return axios.put(url + `/campaign/${id}`, data)
  },
  DeleteCampaign: (id) => {
    return axios.delete(url + `/campaign/${id}`)
  },
  SubmitCampaignForReview: (id) => {
    return axios.post(url + `/campaign/${id}/submit-review`)
  },
  ActivateCampaign: (id) => {
    return axios.post(url + `/campaign/${id}/activate`)
  },
  ToggleCampaignStatus: (id) => {
    return axios.post(url + `/campaign/${id}/toggle-status`)
  },
  GetCampaignAnalytics: (id) => {
    return axios.get(url + `/campaign/${id}/analytics`)
  },
  
  // Publisher Profile APIs
  CheckPublisherProfile: () => {
    return axios.get(url + "/user/publisher/profile-status")
  },
  UpdateUserProfile: (data) => {
    return axios.put(url + "/user/profile", data)
  },
  
  // Admin APIs
  GetUsersByRole: (role) => {
    return axios.get(url + `/user/users?role=${role}`)
  },
  GetDashboardStats: () => {
    return axios.get(url + "/user/dashboard-stats")
  },
  
  // Campaign Management APIs
  GetAllCampaigns: (params) => {
    return axios.get(url + "/campaign/all", { params })
  },
  GetPendingCampaigns: () => {
    return axios.get(url + "/campaign/pending")
  },
  ApproveCampaign: (id, notes) => {
    return axios.post(url + `/campaign/${id}/approve`, { notes })
  },
  RejectCampaign: (id, reason, notes) => {
    return axios.post(url + `/campaign/${id}/reject`, { reason, notes })
  },
  SubmitCampaignForReview: (id) => {
    return axios.post(url + `/campaign/${id}/submit-review`)
  },
  
  // Campaign Tracking APIs
  TrackCampaignClick: (id) => {
    return axios.post(url + `/campaign/${id}/click`)
  },
  TrackCampaignImpression: (id) => {
    return axios.post(url + `/campaign/${id}/impression`)
  },
  
  // Admin User Management APIs
  GetAllUsers: () => {
    return axios.get(url + "/user/all")
  },
  BanUser: (id, reason) => {
    return axios.post(url + `/user/${id}/ban`, { reason })
  },
  UnbanUser: (id) => {
    return axios.post(url + `/user/${id}/unban`)
  },
  DeleteUser: (id) => {
    return axios.delete(url + `/user/${id}`)
  }
}

export default Apihelper